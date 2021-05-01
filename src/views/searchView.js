import { elements } from './base'

export const getInput = () => elements.searchField.value

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

`
image_url: "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"
publisher: "101 Cookbooks"
publisher_url: "http://www.101cookbooks.com"
recipe_id: "47746"
social_rank: 100
source_url: "http://www.101cookbooks.com/archives/001199.html"
title: "Best Pizza Dough Ever"
`
const renderRecipe = ( { image_url, publisher, title, recipe_id } ) => {
    const markup =
        `  <li>
        <a class="results__link" href="${recipe_id}">
            <figure class="results__fig">
                <img src="${image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${title}</h4>
                <p class="results__author">${publisher}</p>
            </div>
        </a>
    </li>
   `
    elements.searchResultList.insertAdjacentHTML( 'beforeend', markup )
}
