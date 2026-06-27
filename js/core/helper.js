class Helper {


    static basePath() {


        return location.pathname
        .includes("/pages/")
        ? "../"
        : "";


    }


    static async fetchJSON(file){


        const response =
        await fetch(
            this.basePath()
            + "data/"
            + file
        );


        if(!response.ok){

            throw new Error(
            `Cannot load ${file}`
            );

        }


        return response.json();

    }

}