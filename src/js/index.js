import Search from '../models/Search'
import { elements, renderLoader, removeLoader } from '../views/base'
import * as searchView from '../views/searchView'
import * as recipeView from '../views/recipeView'
import Recipe from '../models/Recipe';

/**
 * The global state contains
 *-- The Search Object
     The Recipe Object
     The Likes Object
     The Shopping List
 */

// global state
const state = {}


//----Search Controller-------//

const searchCtrl = async () => {

    // get the query from the view
    // const query = searchView.getInput();
    // TESTING
    const query = 'pizza';

    if ( query ) {
        state.search = new Search( query );
        // prepare the UI for the result
        searchView.clearResults();
        renderLoader( elements.results );
        try {
            await state.search.getResults();
            // Render the result to the UI
            removeLoader();
            searchView.renderResult( state.search.result );
        } catch ( err ) {
            console.log( "Something went wrong!!" )
        }

    }
}


//--------Recipe Controller -----------//

const recipeCtrl = async () => {
    // get the Id from the URL
    const id = window.location.hash.slice( 1 );
    if ( id ) {
        // prepare the UI for changes
        recipeView.clearResults()
        renderLoader( elements.recipeContainer )

        // create the recipe object

        state.recipe = new Recipe( id );



        // get the recipie data

        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients()
            // calculate recipie methods
            state.recipe.calcTime();
            state.recipe.calcServings();
            // render the recipe to the UI
            removeLoader();
            recipeView.renderRecipe( state.recipe );
            // highlight selected

            if ( state.search ) recipeView.recipieSelected( state.recipe.id )

        } catch ( err ) {
            console.log( err )
        }

    }

}


///----- Event Listeners------------//////

// add event listener for search form
elements.searchForm.addEventListener( 'submit', e => {
    e.preventDefault();
    searchCtrl();
} )

// TESTING
window.addEventListener( 'load', searchCtrl )

// add event listener for pagination
elements.paginationContainer.addEventListener( 'click', e => {
    const btn = e.target.closest( '.btn-inline' )

    if ( btn ) {
        searchView.clearResults();
        const page = parseInt( btn.dataset.value, 10 );
        searchView.renderResult( state.search.result, page );

    }
} )

// add event listener for hashchange and load

const arrElements = ['hashchange', 'load'];
arrElements.forEach( el => {
    window.addEventListener( el, recipeCtrl )
} );


// handling servings button
elements.recipeContainer.addEventListener( 'click', e => {
    if ( e.target.matches( '.btn-decrease, .btn-decrease *' ) ) {
        state.recipe.updateServings( 'dec' )
    } else if ( e.target.matches( '.btn-increase, .btn-increase *' ) ) {
        state.recipe.updateServings( 'inc' )
    }
    recipeView.modifyIngredients( state.recipe );
} )