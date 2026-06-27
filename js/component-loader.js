/* ==========================================
   GHCC Digital Hub
   Advanced Component Loader v2
   Enterprise Edition
========================================== */


class ComponentLoader {


    constructor() {

        this.cache = new Map();

        this.basePath = this.detectBasePath();

    }


    /*
    =========================================
    Detect Current Page Level
    =========================================
    */


    detectBasePath() {


        const path =
            window.location.pathname;


        if (path.includes("/pages/")) {

            return "../";

        }


        return "";

    }


    /*
    =========================================
    Load All Components
    =========================================
    */


    async loadAll() {


        const components = [

            {
                id: "header",
                file: "components/header.html"
            },

            {
                id: "navbar",
                file: "components/navbar.html"
            },

            {
                id: "footer",
                file: "components/footer.html"
            }

        ];


        const tasks = components.map(component =>
            this.load(
                component.id,
                component.file
            )
        );


        await Promise.all(tasks);


        this.dispatchReadyEvent();

    }



    /*
    =========================================
    Load Single Component
    =========================================
    */


    async load(id, file) {


        const target =
            document.getElementById(id);


        if (!target) return;


        target.innerHTML =
            this.loadingTemplate();


        try {


            const html =
                await this.getComponent(file);


            target.innerHTML = html;


            console.log(
                `✅ Loaded: ${file}`
            );


        }


        catch(error) {


            console.error(error);


            target.innerHTML =
                this.errorTemplate(file);


        }


    }



    /*
    =========================================
    Component Cache
    =========================================
    */


    async getComponent(file) {


        const fullPath =
            this.basePath + file;


        if (this.cache.has(fullPath)) {


            return this.cache.get(fullPath);


        }


        const response =
            await fetch(fullPath);


        if (!response.ok) {


            throw new Error(
                `Cannot load ${fullPath}`
            );


        }


        const html =
            await response.text();


        this.cache.set(
            fullPath,
            html
        );


        return html;


    }



    /*
    =========================================
    Loading UI
    =========================================
    */


    loadingTemplate() {

    return `
    
    <div class="skeleton">
    </div>

    `;

}



    /*
    =========================================
    Error UI
    =========================================
    */


    errorTemplate(file) {


        return `
        
        <div class="component-error">
        
            ⚠ Component Error<br>
            
            ${file}
        
        </div>
        
        `;


    }


    /*
    =========================================
    Component Ready Event
    =========================================
    */


    dispatchReadyEvent() {


        document.dispatchEvent(
            new CustomEvent(
                "componentsLoaded"
            )
        );


        console.log(
            "🚀 All Components Ready"
        );


    }


}



/*
=========================================
Initialize
=========================================
*/


document.addEventListener(
    "DOMContentLoaded",
    async () => {


        const loader =
            new ComponentLoader();


        await loader.loadAll();


    }
);