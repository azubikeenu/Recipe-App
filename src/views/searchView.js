import { elements } from './base'

export const getInput = () => elements.searchField.value

const limitRecipeTitle = ( title, limit = 17 ) => {
    const newTitle = [];
    if ( title.length > limit ) {
        title.split( ' ' ).reduce( ( acc, curr ) => {
            if ( curr.length + acc <= limit ) {
                newTitle.push( curr );
            }
            return acc + curr.length;
        }, 0 )

        return `${newTitle.join( ' ' )} ...`
    }
    return title;
}

export const clearInput = () => {
    elements.searchField.value = ""
}

export const clearResults = () => {
    clearInput();
    elements.searchResultList.innerHTML = "";
}

export const renderResult = ( recipes ) => {
    recipes.forEach( renderRecipe );

}

const renderRecipe = ( { image_url, publisher, title, recipe_id } ) => {
    const markup =
        `  <li>
        <a class="results__link" href="${recipe_id}">
            <figure class="results__fig">
                <img src="${image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle( title )}</h4>
                <p class="results__author">${publisher}</p>
            </div>
        </a>
    </li>
   `
    elements.searchResultList.insertAdjacentHTML( 'beforeend', markup )
}
