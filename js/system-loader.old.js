/*
=================================
GHCC System Loader
Version: Recovery v1.0
=================================
*/

class SystemLoader {

    constructor() {

        this.systems = [];
        this.filteredSystems = [];

    }


    async init() {

        try {

            const response =
                await fetch("data/systems.json");


            if (!response.ok) {

                throw new Error(
                    "Cannot load systems.json"
                );

            }


            this.systems =
                await response.json();


            this.filteredSystems =
                [...this.systems];


            this.renderFavorites();


            console.log(
                "🚀 System Engine Ready"
            );


        } catch(error) {

            console.error(
                "System Loader Error:",
                error
            );

        }

    }


    renderFavorites() {


        const container =
            document.getElementById(
                "favorite-container"
            );


        if(!container) return;


        const favorites =
            this.systems.filter(
                system => system.favorite
            );


        if(favorites.length === 0) {


            container.innerHTML = `
            
            <div class="empty-state">

                ⭐ No favorite systems

            </div>

            `;


            return;

        }


        container.innerHTML =
            favorites.map(system => `

            <div class="system-card">

                <div class="system-icon">

                    ${system.icon || "🖥️"}

                </div>


                <h3>
                    ${system.name}
                </h3>


            </div>

            `).join("");

    }

}


/*
=================================
Auto Start
=================================
*/


document.addEventListener(
    "DOMContentLoaded",
    () => {


        const systems =
            new SystemLoader();


        systems.init();

    }
);