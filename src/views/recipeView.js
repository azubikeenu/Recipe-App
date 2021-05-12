import { elements } from './base'
import { Fraction } from 'fractional'

const formatCount = ( count ) => {
    if ( count ) {
        const [int, dec] = count.toString().split( '.' ).map( el => parseInt( el ) );
        if ( !dec ) return count;

        if ( int === 0 ) {
            const { numerator, denominator } = new Fraction( count );
            return `${numerator}/${denominator}`;
        } else {
            const { numerator, denominator } = new Fraction( count - int );
            return `${int} ${numerator}/${denominator}`
        }

    }

    return 1;
}

const renderIngredients = ( indgredients ) => {
    return indgredients.map( el => {
        return `   <li class="recipe__item">
                    <svg class="recipe__icon">
                        <use href="img/icons.svg#icon-check"></use>
                    </svg>
                    <div class="recipe__count">${formatCount( el.count )}</div>
                    <div class="recipe__ingredient">
                        <span class="recipe__unit">${el.unit}</span>
                          ${el.ingredient}
                     </div>
               </li>`
    } ).join( '\n' );

}


export const renderRecipe = ( recipe, isLiked ) => {

    const markup =
        `
        <figure class="recipe__fig">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
            ${renderIngredients( recipe.ingredients )}
            </ul>

            <button class="btn-small recipe__btn add_item">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>

        `

    elements.recipeContainer.insertAdjacentHTML( "afterbegin", markup )

}

export const recipieSelected = ( id ) => {
    if ( document.querySelectorAll( '.results__link' ) ) {
        Array.from( document.querySelectorAll( '.results__link' ) ).forEach( link => link.classList.remove( "results__link--active" ) );
        document.querySelector( `.results__list [href="#${id}"]` ).classList.add( "results__link--active" );
    }

}


export const clearResults = () => {
    elements.recipeContainer.innerHTML = "";
}

export const modifyIngredients = ( recipe ) => {
    // update servings
    document.querySelector( '.recipe__info-data--people' ).textContent = recipe.servings
    // updateIngredients
    document.querySelector( '.recipe__ingredient-list' ).innerHTML = renderIngredients( recipe.ingredients )

}