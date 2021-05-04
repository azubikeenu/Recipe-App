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
    elements.paginationContainer.innerHTML = '';
}

const createButton = ( page, type ) => {

    return `<button class="btn-inline results__btn--${type}" data-value='${page}'>
    <span>Page ${page}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${( type === 'prev' ? "left" : "right" )}"></use>
            </svg>
            </button>`
}

const renderPagination = ( page, numberOfResults, itemsPerPage ) => {
    let button;
    const totalNumberOfPages = Math.ceil( numberOfResults / itemsPerPage );
    if ( page === 1 && numberOfResults > itemsPerPage ) {
        button = createButton( page + 1, 'next' );
    }
    else if ( page > 1 && page < totalNumberOfPages ) {
        button = `${createButton( page - 1, 'prev' )}${createButton( page + 1, 'next' )}`
    } else if ( page === totalNumberOfPages ) {
        button = createButton( page - 1, 'prev' );
    }
    elements.paginationContainer.insertAdjacentHTML( 'afterbegin', button );


}

export const renderResult = ( recipes, page = 1, itemsPerPage = 10 ) => {
    const start = ( page - 1 ) * itemsPerPage;
    const end = page * itemsPerPage;
    recipes.slice( start, end ).forEach( renderRecipe );
    // render pagination buttons
    renderPagination( page, recipes.length, itemsPerPage );

}

const renderRecipe = ( { image_url, publisher, title, recipe_id } ) => {
    const markup =
        `  <li>
        <a class="results__link" href="#${recipe_id}">
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
