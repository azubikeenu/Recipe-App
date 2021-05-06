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
        this.servings = 1;
    }

    parseIngredients () {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'g', 'kg'];
        let unitsShorts = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        unitsShorts = [...unitsShorts, 'g', 'kg']
        if ( this.ingredients ) {
            const newIngredients = this.ingredients.map( el => {
                // uniform units
                let ingredient = el.toLowerCase();
                unitsLong.forEach( ( unit, index ) => {
                    if ( ingredient.includes( unit ) )
                        ingredient = ingredient.replace( unit, unitsShorts[index] );
                } )

                // remove parenthesis and commas
                ingredient = ingredient.replace( / *\([^)]*\) */g, " " ).replace( /,/g, '' );

                // parse ingredients into count , unit and ingredients
                const ingrdArr = ingredient.split( ' ' );
                const unitIndex = ingrdArr.findIndex( el => unitsShorts.includes( el ) )
                const ingredientObj = {
                    count: 1,
                    unit: '',
                    ingredient
                }
                if ( unitIndex > -1 ) {
                    ingredientObj.unit = ingrdArr[unitIndex]
                    let countArr = ingrdArr.slice( 0, unitIndex )

                    if ( countArr.length > 1 ) {
                        const [first, second] = countArr;
                        ingredientObj.count = parseFloat( first ) + eval( second.replace( '-', '+' ) ) || 0;

                    } else {
                        ingredientObj.count = eval( countArr[0].replace( '-', '+' ) ) || 0;
                    }
                    ingredientObj.ingredient = ingrdArr.slice( unitIndex + 1 ).join( ' ' )

                } else if ( parseInt( ingrdArr[0] ) ) {
                    ingredientObj.count = parseInt( ingrdArr[0] );
                    ingredientObj.ingredient = ingrdArr.slice( 1 ).join( ' ' );
                }
                return ingredientObj;

            } )
            this.ingredients = newIngredients;
        }

    }

    updateServings ( type ) {
        let newServings = 0;
        if ( type === 'dec' ) {
            newServings = ( this.servings > 1 ) ? this.servings - 1 : 1
        } else {
            newServings = this.servings + 1;
        }
        this.ingredients.forEach( ing => {
            ing.count *= ( newServings / this.servings );
        } )

        this.servings = newServings;

    }

}