/*
====================================
GHCC System Engine
====================================
*/

class SystemEngine {
    constructor() {
        this.systems = [];
        this.filtered = [];
        this.category = "all";
        this.modal = document.getElementById("branch-modal");
        this.branchList = document.getElementById("branch-list");
        this.branchTitle = document.getElementById("branch-title");
    }

    async init() {
        try {
            this.bindModalEvents();
            await this.loadSystems();
            this.filtered = [...this.systems];
            this.detectPage();
            this.bindEvents();
            console.log("System Engine Ready");
        }
        catch (error) {
            console.error("System Engine Error:", error);
        }
    }

    bindModalEvents() {
        document.getElementById("close-modal")
            ?.addEventListener("click", () => this.closeBranchModal());

        this.modal?.addEventListener("click", (event) => {
            if (event.target === this.modal) {
                this.closeBranchModal();
            }
        });
    }

    async loadSystems() {
        const path = location.pathname.includes("/pages/")
            ? "../data/systems.json"
            : "data/systems.json";

        const response = await fetch(path);

        if (!response.ok) {
            throw new Error("Cannot load systems.json");
        }

        this.systems = await response.json();
    }

    detectPage() {
        if (document.getElementById("favorite-container")) {
            this.renderFavorite();
        }

        if (document.getElementById("systems-container")) {
            this.renderCatalog();
        }
    }

    openBranchModal(system) {
        if (!this.modal || !this.branchList || !this.branchTitle) return;

        this.branchTitle.textContent = system.name;
        this.branchList.innerHTML = "";

        const lastBranch = this.getLastBranch(system.name);

        if (lastBranch) {
            const lastElement = document.createElement("div");
            lastElement.className = "last-used-branch";
            lastElement.innerHTML = `
                <strong>Last Used</strong>
                <div class="branch-item">
                    ${lastBranch.name}
                    <span>Open</span>
                </div>
            `;

            lastElement
                .querySelector(".branch-item")
                .addEventListener("click", () => {
                    window.open(lastBranch.url, "_blank", "noopener,noreferrer");
                });

            this.branchList.appendChild(lastElement);

            const reset = document.createElement("button");
            reset.className = "reset-branch-btn";
            reset.type = "button";
            reset.textContent = "Forget Last Branch";
            reset.addEventListener("click", () => {
                this.removeLastBranch(system.name);
                this.openBranchModal(system);
            });

            this.branchList.appendChild(reset);
        }

        system.branches.forEach((branch) => {
            const button = document.createElement("button");
            button.className = "branch-item";
            button.type = "button";
            button.innerHTML = `
                ${branch.name}
                <span>Open</span>
            `;

            button.addEventListener("click", () => {
                this.saveLastBranch(system.name, branch);
                window.open(branch.url, "_blank", "noopener,noreferrer");
            });

            this.branchList.appendChild(button);
        });

        this.modal.classList.add("show");
    }

    saveLastBranch(systemName, branch) {
        const storageKey = "ghcc-last-branches";
        const history = JSON.parse(localStorage.getItem(storageKey)) || {};

        history[systemName] = {
            name: branch.name,
            url: branch.url,
            timestamp: Date.now()
        };

        localStorage.setItem(storageKey, JSON.stringify(history));
    }

    getLastBranch(systemName) {
        const history = JSON.parse(localStorage.getItem("ghcc-last-branches")) || {};
        return history[systemName] || null;
    }

    removeLastBranch(systemName) {
        const storageKey = "ghcc-last-branches";
        const history = JSON.parse(localStorage.getItem(storageKey)) || {};
        delete history[systemName];
        localStorage.setItem(storageKey, JSON.stringify(history));
    }

    closeBranchModal() {
        this.modal?.classList.remove("show");
    }

    bindBranchButton() {
        document.querySelectorAll(".branch-button").forEach((button) => {
            button.addEventListener("click", () => {
                const system = this.systems.find(
                    (item) => item.name === button.dataset.system
                );

                if (system) {
                    this.openBranchModal(system);
                }
            });
        });
    }

    renderFavorite() {
        const container = document.getElementById("favorite-container");
        if (!container) return;

        const favorites = this.filtered.filter((item) => item.favorite);

        if (favorites.length === 0) {
            container.innerHTML = this.emptyState("No favorites found", "Try another keyword.");
            return;
        }

        container.innerHTML = favorites.map((item) => this.card(item)).join("");
        this.bindBranchButton();
    }

    renderCatalog() {
        const container = document.getElementById("systems-container");
        if (!container) return;

        const counter = document.getElementById("system-count");

        if (counter) {
            counter.textContent = `${this.filtered.length} Applications Available`;
        }

        if (this.filtered.length === 0) {
            container.innerHTML = this.emptyState("No Applications Found", "Try another keyword or category.");
            return;
        }

        container.innerHTML = this.filtered.map((item) => this.card(item)).join("");
        this.bindBranchButton();
    }

    card(item) {
        const hasBranches = item.branches && item.branches.length > 0;
        const lastBranch = this.getLastBranch(item.name);

        const branchInfo = hasBranches
            ? lastBranch
                ? `<div class="last-branch">Last: ${lastBranch.name}</div>`
                : `<div class="branch-count">${item.branches.length} Branches</div>`
            : "";

        const button = hasBranches
            ? lastBranch
                ? `
                    <a href="${lastBranch.url}" target="_blank" rel="noopener noreferrer" class="application-link">
                        Open Last Branch
                    </a>
                    <button class="change-branch-btn branch-button" type="button" data-system="${item.name}">
                        Change Branch
                    </button>
                `
                : `
                    <button class="application-link branch-button" type="button" data-system="${item.name}">
                        Select Branch
                    </button>
                `
            : `
                <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="application-link">
                    Open System
                </a>
            `;

        return `
            <article class="application-card fade-up">
                <div class="application-icon" aria-hidden="true">${item.icon || "APP"}</div>
                <h3 class="application-title">${item.name.trim()}</h3>
                <p class="application-description">${item.description || ""}</p>
                <span class="application-category">${item.category}</span>
                ${branchInfo}
                ${button}
            </article>
        `;
    }

    emptyState(title, message) {
        return `
            <div class="application-empty">
                <h3>${title}</h3>
                <p>${message}</p>
            </div>
        `;
    }

    bindEvents() {
        const search = document.getElementById("search-input");

        if (search) {
            search.addEventListener("input", () => {
                this.applyFilters(search.value);
            });
        }

        document.querySelectorAll(".filter-btn").forEach((button) => {
            button.addEventListener("click", () => {
                document
                    .querySelectorAll(".filter-btn")
                    .forEach((item) => item.classList.remove("active"));

                button.classList.add("active");
                this.category = button.dataset.category;
                this.applyFilters(search?.value || "");
            });
        });
    }

    applyFilters(keyword) {
        const query = keyword.toLowerCase().trim();

        this.filtered = this.systems.filter((item) => {
            const matchText = [
                item.name,
                item.description || "",
                item.category
            ]
                .join(" ")
                .toLowerCase()
                .includes(query);

            const matchCategory =
                this.category === "all" || item.category === this.category;

            return matchText && matchCategory;
        });

        this.renderFavorite();
        this.renderCatalog();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const system = new SystemEngine();
    system.init();
});
