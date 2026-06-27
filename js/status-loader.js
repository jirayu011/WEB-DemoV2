/*
==========================================
GHCC Digital Hub
System Status Engine
==========================================
*/

class StatusManager {
    constructor() {
        this.status = [];
        this.basePath = this.detectPath();
        this.refreshTime = 60000;
    }

    detectPath() {
        return window.location.pathname.includes("/pages/") ? "../" : "";
    }

    async init() {
        try {
            await this.load();
            this.render();
            this.startAutoRefresh();
            console.log("Status Engine Ready");
        }
        catch (error) {
            console.error("Status Error:", error);
        }
    }

    async load() {
        const response = await fetch(this.basePath + "data/status.json");

        if (!response.ok) {
            throw new Error("Cannot load status.json");
        }

        this.status = await response.json();
    }

    render() {
        this.renderSummary();
        this.renderCards();
    }

    renderSummary() {
        const summary = document.getElementById("status-summary");
        if (!summary) return;

        const online = this.status.filter((item) => item.status === "online").length;
        const maintenance = this.status.filter((item) => item.status === "maintenance").length;
        const offline = this.status.filter((item) => item.status === "offline").length;

        summary.innerHTML = `
            <div class="info-grid">
                <div class="info-card">
                    Online<br>
                    <strong>${online}</strong>
                </div>

                <div class="info-card">
                    Maintenance<br>
                    <strong>${maintenance}</strong>
                </div>

                <div class="info-card">
                    Offline<br>
                    <strong>${offline}</strong>
                </div>
            </div>
        `;
    }

    renderCards() {
        const container = document.getElementById("status-container");
        if (!container) return;

        container.innerHTML = "";

        this.status.forEach((item) => {
            const card = document.createElement("article");
            card.className = "system-card fade-in";

            card.innerHTML = `
                <div class="section-header">
                    <h3>${item.name}</h3>
                    <span class="status ${item.status}">
                        ${this.getStatusText(item.status)}
                    </span>
                </div>

                <p>${item.message}</p>

                <small>
                    Updated:
                    ${this.formatDate(item.lastUpdate)}
                </small>
            `;

            container.appendChild(card);
        });
    }

    getStatusText(status) {
        const map = {
            online: "Online",
            maintenance: "Maintenance",
            offline: "Offline"
        };

        return map[status] || "Unknown";
    }

    formatDate(date) {
        return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }).format(new Date(date));
    }

    startAutoRefresh() {
        setInterval(async () => {
            await this.load();
            this.render();
            console.log("Status refreshed");
        }, this.refreshTime);
    }
}

document.addEventListener("componentsLoaded", async () => {
    const status = new StatusManager();
    await status.init();
});
