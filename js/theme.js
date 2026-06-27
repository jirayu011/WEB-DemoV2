/* ==========================================
   GHCC Digital Hub
   Theme Management Engine
   Version 1.0
========================================== */


class ThemeManager {


    constructor() {

        this.storageKey = "ghcc-theme";

    }


    /*
    ==========================================
    Initialize Theme
    ==========================================
    */


    init() {

        this.applySavedTheme();

        this.registerToggle();

    }



    /*
    ==========================================
    Load Theme From Storage
    ==========================================
    */


    applySavedTheme() {


        const savedTheme =
            localStorage.getItem(
                this.storageKey
            );


        if (savedTheme === "dark") {


            document.body.classList.add(
                "dark"
            );


        }

    }



    /*
    ==========================================
    Register Theme Button
    ==========================================
    */


    registerToggle() {


        const button =
            document.getElementById(
                "theme-toggle"
            );


        if (!button) {


            console.warn(
                "Theme button not found"
            );


            return;

        }


        button.addEventListener(
            "click",
            () => {


                this.toggle();


            }
        );


    }



    /*
    ==========================================
    Toggle Theme
    ==========================================
    */


    toggle() {


        const isDark =
            document.body.classList.toggle(
                "dark"
            );


        localStorage.setItem(
            this.storageKey,
            isDark
                ? "dark"
                : "light"
        );


        console.log(
            `Theme changed: ${
                isDark ? "Dark" : "Light"
            }`
        );


    }


}


/*
=============================================
Initialize After Components Ready
=============================================
*/


document.addEventListener(
    "componentsLoaded",
    () => {


        const theme =
            new ThemeManager();


        theme.init();


        console.log(
            "🎨 Theme Engine Ready"
        );


    }
);