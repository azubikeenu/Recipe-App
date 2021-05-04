import axios from 'axios'
export default class Recipe {
    constructor( id ) {
        this.id = id;
    }

    async getRecipe () {
        try {
            const res = await axios( `https://forkify-api.herokuapp.com/api/get`, {
                params: {
                    rId: this.id
                }
            } );
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

        } catch ( err ) {
            alert( err );
        }
    }
    // multiply 15 minutes for every indgredients > 3

    calcTime () {
        const numberOfIngredients = this.ingredients.length;
        const period = Math.ceil( numberOfIngredients / 3 )
        this.time = period * 15;
    }

    calcServings () {
        this.servings = 4;
    }
}