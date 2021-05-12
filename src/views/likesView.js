import { elements } from './base'
import * as searchView from './searchView'
export const toggleLiked = isLiked => {
    const likedString = isLiked ? "icon-heart" : "icon-heart-outlined"
    document.querySelector( '.recipe__love use' ).setAttribute( "href", `img/icons.svg#${likedString}` )
}

// display the likes

export const toggleLikesMenu = numberOflikes => {
    document.querySelector( '.likes__field' ).style.visibility = ( numberOflikes > 0 ) ? 'visible' : 'hidden'
}

// adding elements to the likes panel

export const clearLikesPanel = () => {
    elements.likesList.innerHTML = '';
}
export const showLikesInPanel = ( { likes } ) => {
    const markUp = likes.map( ( { id, image, author, title } ) => {
        return `
     <li>
        <a class="likes__link" href="#${id}">
            <figure class="likes__fig">
                <img src="${image}" alt="${title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${searchView.limitRecipeTitle( title )}</h4>
                <p class="likes__author">${author}</p>
            </div>
        </a>
    </li>`

    } ).join( '\n' );

    elements.likesList.insertAdjacentHTML( 'afterbegin', markUp );
}