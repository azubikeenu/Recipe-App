import { elements } from './base'

export const renderList = ( list ) => {
    const markup = list.items.map( ( { count, ingredient, unit, id } ) => {
        return `
           <li class="shopping__item" data-value =${id}>
           <div class="shopping__count">
               <input type="number" class="item__count" value="${count}" step="1">
               <p>${unit}</p>
           </div>
           <p class="shopping__description">${ingredient}</p>
           <button class="shopping__delete btn-tiny">
               <svg>
                   <use href="img/icons.svg#icon-circle-with-cross"></use>
               </svg>
           </button>
       </li>
           `
    } ).join( '\n' )

    elements.shoppingList.insertAdjacentHTML( 'beforeend', markup )


}

export const deleteItem = ( id ) => {
    const item = document.querySelector( `[data-value='${id}']` );
    if ( item ) item.parentElement.removeChild( item )
}