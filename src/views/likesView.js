import { elements } from './base'
export const toggleLiked = isLiked => {
    const likedString = isLiked ? "icon-heart" : "icon-heart-outlined"
    document.querySelector( '.recipe__love use' ).setAttribute( "href", `img/icons.svg#${likedString}` )
}