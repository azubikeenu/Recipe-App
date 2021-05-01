import Search from '../models/Search'
import { elements, renderLoader, removeLoader } from '../views/base'
import * as searchView from '../views/searchView'

/**
 * The global state contains
 *-- The Search Object
     The Recipe Object
     The Likes Object
     The Shopping List
 */

// global state
const state = {}

const searchCtrl = async () => {

    // get the query from the view
    const query = searchView.getInput();
    if ( query ) {
        state.search = new Search( query );

        // prepare the UI for the result

        searchView.clearResults();

        renderLoader( elements.results );

        state.search.result = await state.search.getResults();

        console.log( state.search.result );

        // Render the result to the UI

        removeLoader();

        searchView.renderResult( state.search.result )
    }

    // pass it into the Search Object

    // get search result

}

elements.searchForm.addEventListener( 'submit', ( e ) => {
    e.preventDefault();
    searchCtrl();

} )
