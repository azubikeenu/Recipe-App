export const elements = {
    searchField: document.querySelector( '.search__field' ),
    searchForm: document.querySelector( '.search' ),
    searchResultList: document.querySelector( '.results__list' ),
    results: document.querySelector( '.results' )

}

const classStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
            <div class="${classStrings.loader}">
                <svg>
                    <use href="img/icons.svg#icon-cw"></use>
                </svg>
            </div>
        `;
    parent.insertAdjacentHTML( 'afterbegin', loader );
}

export const removeLoader = () => {
    const loader = document.querySelector( `.${classStrings.loader}` );
    loader.parentElement.removeChild( loader );
}
