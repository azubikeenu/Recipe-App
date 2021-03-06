import Search from '../models/Search'
import { elements, renderLoader, removeLoader } from '../views/base'
import * as searchView from '../views/searchView'
import * as recipeView from '../views/recipeView'
import * as listView from '../views/listView'
import * as likesView from '../views/likesView'
import Recipe from '../models/Recipe';
import List from '../models/List';
import Likes from '../models/Likes'


// global state
const state = {}

//----Search Controller-------//
const searchCtrl = async () => {

    const query = searchView.getInput();
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
            recipeView.renderRecipe( state.recipe, state.likes.isLiked( id ) );
            // highlight selected
            if ( state.search ) recipeView.recipieSelected( state.recipe.id )

        } catch ( err ) {
            console.log( err )
        }
    }
}

//-------List Controller ------------//

const listCtrl = () => {

    state.list = new List();
    state.recipe.ingredients.forEach( ( { count, ingredient, unit } ) => state.list.addItem( count, unit, ingredient ) )
    // render the ingredients
    listView.renderList( state.list )
}


//----------Likes Controller----------------//
const likeCtrl = () => {
    const { id, author, image, title } = state.recipe;
    if ( !state.likes ) state.likes = new Likes();
    if ( !state.likes.isLiked( id ) ) {
        //add to the list of liked items
        state.likes.addLike( id, title, author, image );
    } else {
        // remove from the list of liked items
        state.likes.removeLike( id )
    }
    likesView.toggleLiked( state.likes.isLiked( id ) );
    likesView.toggleLikesMenu( state.likes.numberOfLikes() )
    likesView.clearLikesPanel()
    likesView.showLikesInPanel( state.likes )
}

// restore liked recipes on page load

window.addEventListener( 'load', e => {
    state.likes = new Likes();
    state.likes.getLikes()
    likesView.toggleLikesMenu( state.likes.numberOfLikes() )
    likesView.clearLikesPanel()
    likesView.showLikesInPanel( state.likes )

} )


///----- Event Listeners------------//////

// add event listener for search form
elements.searchForm.addEventListener( 'submit', e => {
    e.preventDefault();
    searchCtrl();
} )

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
        recipeView.modifyIngredients( state.recipe );
    } else if ( e.target.matches( '.btn-increase, .btn-increase *' ) ) {
        state.recipe.updateServings( 'inc' )
        recipeView.modifyIngredients( state.recipe );
    } else if ( e.target.matches( '.recipe__love ,.recipe__love *' ) ) {
        likeCtrl();
    }
} )

// handling add items to the list
elements.recipeContainer.addEventListener( 'click', e => {
    const btn = e.target.closest( '.add_item' );
    if ( btn ) listCtrl()
} )

// handling remove item from list
elements.shoppingList.addEventListener( 'click', e => {
    const id = e.target.closest( '.shopping__item' ).dataset.value;
    if ( e.target.matches( '.shopping__delete, .shopping__delete *' ) ) {
        state.list.removeItem( id )
        listView.deleteItem( id )
    }
    if ( e.target.matches( ".shopping__count, .shopping__count *" ) ) {
        const { value } = e.target.closest( '.item__count' );
        state.list.updateCount( id, parseFloat( value ) )
    }
} )