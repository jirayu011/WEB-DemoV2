/*
====================================
GHCC Announcement Engine
====================================
*/

class AnnouncementEngine {
    constructor() {
        this.announcements = [];
        this.filtered = [];
        this.category = "all";
        this.priority = "all";
        this.keyword = "";
    }

    async init() {
        try {
            await this.loadAnnouncements();
            this.sortAnnouncements();
            this.filtered = [...this.announcements];
            this.bindEvents();
            this.render();
            console.log("Announcement Engine Ready");
        }
        catch (error) {
            console.error("Announcement Error:", error);
        }
    }

    async loadAnnouncements() {
        const path = location.pathname.includes("/pages/")
            ? "../data/announcements.json"
            : "data/announcements.json";

        const response = await fetch(path);

        if (!response.ok) {
            throw new Error("Cannot load announcements.json");
        }

        this.announcements = await response.json();
    }

    sortAnnouncements() {
        this.announcements.sort(
            (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
        );
    }

    bindEvents() {
        const search = document.getElementById("announcement-search");

        search?.addEventListener("input", () => {
            this.keyword = search.value;
            this.applyFilters();
        });

        document.querySelectorAll(".announcement-filter .filter-btn").forEach((button) => {
            button.addEventListener("click", () => {
                document
                    .querySelectorAll(".announcement-filter .filter-btn")
                    .forEach((item) => item.classList.remove("active"));

                button.classList.add("active");
                this.category = button.dataset.category;
                this.applyFilters();
            });
        });

        document.querySelectorAll(".priority-btn").forEach((button) => {
            button.addEventListener("click", () => {
                document
                    .querySelectorAll(".priority-btn")
                    .forEach((item) => item.classList.remove("active"));

                button.classList.add("active");
                this.priority = button.dataset.priority;
                this.applyFilters();
            });
        });
    }

    applyFilters() {
        const query = this.keyword.toLowerCase().trim();

        this.filtered = this.announcements.filter((item) => {
            const matchText = [
                item.title,
                item.description,
                item.content,
                item.author,
                item.category
            ]
                .join(" ")
                .toLowerCase()
                .includes(query);

            const matchCategory =
                this.category === "all" || item.category === this.category;

            const matchPriority =
                this.priority === "all" || item.priority === this.priority;

            return matchText && matchCategory && matchPriority;
        });

        this.render();
    }

    render() {
        const container = document.getElementById("announcement-container");
        if (!container) return;

        const counter = document.getElementById("announcement-count");

        if (counter) {
            counter.textContent = `${this.filtered.length} Announcements Available`;
        }

        if (this.filtered.length === 0) {
            container.innerHTML = `
                <div class="announcement-empty">
                    <h3>No Announcements Found</h3>
                    <p>Try another keyword, category, or priority.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filtered.map((item) => this.card(item)).join("");
    }

    card(item) {
        const priorityClass = {
            Critical: "priority-critical",
            Important: "priority-important",
            General: "priority-general"
        };

        return `
            <article class="announcement-card fade-up">
                <div class="priority-badge ${priorityClass[item.priority] || "priority-general"}">
                    ${item.priority}
                </div>

                <h3 class="announcement-title">${item.title}</h3>
                <p class="announcement-description">${item.description}</p>
                <span class="announcement-category">${item.category}</span>

                <div class="announcement-meta">
                    <div class="announcement-author">${item.author}</div>
                    <div>${this.formatDate(item.publishDate)}</div>
                </div>

                <details class="announcement-details">
                    <summary>Read more</summary>
                    <p>${item.content}</p>
                </details>
            </article>
        `;
    }

    formatDate(value) {
        return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(new Date(value));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const announcement = new AnnouncementEngine();
    announcement.init();
});
