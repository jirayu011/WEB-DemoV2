class SearchOptimizer {

    constructor() {

        this.delay = 300;

        this.timer = null;

    }


    debounce(callback) {


        clearTimeout(this.timer);


        this.timer = setTimeout(() => {

            callback();

        }, this.delay);


    }

}
