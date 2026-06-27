/* ==========================================
   GHCC Digital Hub
   Global Settings Engine
   Version 1.0
========================================== */


class SettingsManager {


    constructor() {

        this.settings = null;

        this.basePath = this.detectPath();

    }


    /*
    ==========================================
    Detect Current Path
    ==========================================
    */


    detectPath() {


        return window.location.pathname
            .includes("/pages/")
            ? "../"
            : "";

    }


    /*
    ==========================================
    Initialize
    ==========================================
    */


    async init() {


        try {


            await this.loadSettings();


            this.applyPortalInfo();


            this.applyFeatureToggle();


            console.log(
                "⚙ Settings Engine Ready"
            );


        }


        catch(error) {


            console.error(
                "Settings Error:",
                error
            );


        }

    }


    /*
    ==========================================
    Load JSON Config
    ==========================================
    */


    async loadSettings() {


        const response =
            await fetch(
                this.basePath +
                "data/settings.json"
            );


        if(!response.ok) {


            throw new Error(
                "Cannot load settings.json"
            );


        }


        this.settings =
            await response.json();


    }



    /*
    ==========================================
    Apply Portal Information
    ==========================================
    */


    applyPortalInfo() {


        // Browser title


        if (
            document.title === "" ||
            document.title === "GHCC Digital Hub"
        ) {
            document.title = this.settings.portalName;
        }



        // Portal name (Header)


        document
            .querySelectorAll(
                "[data-portal-name]"
            )
            .forEach(element => {


                element.textContent =
                    this.settings.portalName;


            });



        // Version


        document
            .querySelectorAll(
                "[data-version]"
            )
            .forEach(element => {


                element.textContent =
                    "Version " +
                    this.settings.version;


            });



        // Company


        document
            .querySelectorAll(
                "[data-company]"
            )
            .forEach(element => {


                element.textContent =
                    this.settings.company;


            });


    }


    /*
    ==========================================
    Feature Toggle System
    ==========================================
    */


    applyFeatureToggle() {


        const features =
            this.settings.feature;


        Object.keys(features)
        .forEach(feature => {


            if(features[feature] === false) {


                document
                    .querySelectorAll(
                        `[data-feature="${feature}"]`
                    )
                    .forEach(element => {


                        element.style.display =
                            "none";


                    });


            }


        });


    }


}


/*
=========================================
Initialize After Components Ready
=========================================
*/


document.addEventListener(
    "componentsLoaded",
    async () => {


        const settings =
            new SettingsManager();


        await settings.init();


    }
);
