/* ==========================================
   GHCC Digital Hub
   Smart Navigation Engine
   Version 1.0
========================================== */


class NavigationManager {


    constructor() {

        this.links = [];

    }


    /*
    ==========================================
    Initialize
    ==========================================
    */


    init() {


        this.links =
            document.querySelectorAll(".nav-link");


        if (this.links.length === 0) {


            console.warn(
                "Navigation not found"
            );


            return;

        }


        this.setActiveMenu();


        console.log(
            "🧭 Navigation Engine Ready"
        );

    }



    /*
    ==========================================
    Detect Current Page
    ==========================================
    */


    getCurrentPage() {


        const path =
            window.location.pathname;


        let page =
            path.split("/").pop();


        // Home Page


        if (
            page === "" ||
            page === "index.html"
        ) {


            page = "index.html";

        }


        return page;

    }



    /*
    ==========================================
    Set Active Navigation
    ==========================================
    */


    setActiveMenu() {


        const currentPage =
            this.getCurrentPage();


        this.links.forEach(link => {


            const href =
                link.getAttribute("href");


            const targetPage =
                href.split("/").pop();


            if (targetPage === currentPage) {


                link.classList.add(
                    "active"
                );


            }


            else {


                link.classList.remove(
                    "active"
                );


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
    () => {


        const navigation =
            new NavigationManager();


        navigation.init();


    }
);