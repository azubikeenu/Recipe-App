import Search from '../models/Search'
import { elements, renderLoader, removeLoader } from '../views/base'
import * as searchView from '../views/searchView'
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
    const query = searchView.getInput();
    if ( query ) {
        state.search = new Search( query );
        // prepare the UI for the result
        searchView.clearResults();

        renderLoader( elements.results );

        await state.search.getResults();

        console.log( state.search.result );

        // Render the result to the UI

        removeLoader();

        searchView.renderResult( state.search.result )

    }

}


//--------Recipe Controller -----------//

const recipeCtrl = async () => {
    // get the Id from the URL
    const id = window.location.hash.slice( 1 );
    if ( id ) {
        // prepare the UI for changes


        // create the recipe object
        state.recipe = new Recipe( id );

        // get the recipie data

        await state.recipe.getRecipe();

        // calculate recipie methods
        state.recipe.calcTime();

        state.recipe.calcServings();

        // render the recipe to the UI
        console.log( state.recipe )
    }




}





///----- Event Listeners------------//////

// add event listener for search form
elements.searchForm.addEventListener( 'submit', e => {
    e.preventDefault();
    searchCtrl();

} )

// add event listener for pagination
elements.paginationContainer.addEventListener( 'click', e => {
    const btn = e.target.closest( '.btn-inline' )
    searchView.clearResults();
    if ( btn ) {
        const page = parseInt( btn.dataset.value, 10 );
        searchView.renderResult( state.search.result, page );
    }
} )


// add event listener for the hashchange
window.addEventListener( 'hashchange', recipeCtrl );

// add event listener on pageload
window.addEventListener( 'load', recipeCtrl )