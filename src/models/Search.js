import axios from 'axios'

export default class Search {
    constructor( query ) {
        this.query = query
    }
    async getResults () {
        try {
            const res = await axios( `https://forkify-api.herokuapp.com/api/search`, {
                params: {
                    q: this.query
                }
            } );
            this.result = res.data.recipes;
            //return this.result;

        } catch ( err ) {
            alert( err )
        }



    }



}
