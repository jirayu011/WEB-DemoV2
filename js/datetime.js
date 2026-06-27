/* ==========================================
   GHCC Digital Hub
   Date Time Engine
   Version 1.0
========================================== */


class DateTimeManager {


    constructor() {

        this.element = null;

        this.timer = null;

    }


    /*
    ==========================================
    Initialize
    ==========================================
    */


    init() {


        this.element =
            document.getElementById(
                "datetime"
            );


        if (!this.element) {


            console.warn(
                "DateTime element not found"
            );


            return;

        }


        // Render immediately

        this.update();


        // Update every second

        this.timer = setInterval(
            () => this.update(),
            1000
        );


        console.log(
            "🕒 DateTime Engine Ready"
        );

    }



    /*
    ==========================================
    Update Date Time
    ==========================================
    */


    update() {


        const now = new Date();


        const options = {

            weekday: "long",

            day: "numeric",

            month: "long",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit"

        };


        const dateTime =
            new Intl.DateTimeFormat(
                "en-US",
                options
            )
            .format(now);


        this.element.innerHTML =
            dateTime;


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


        const clock =
            new DateTimeManager();


        clock.init();


    }
);