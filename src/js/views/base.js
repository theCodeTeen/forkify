export const elements ={
    inputField:document.querySelector('.search__field'),
    inputBtn:document.querySelector('.search'),
    resultList:document.querySelector('.results__list'),
    resultDiv:document.querySelector('.results'),
    pagginationBtn:document.querySelector('.results__pages'),
    recipe:document.querySelector('.recipe'),
    shoppingList:document.querySelector('.shopping__list')
}
export const addLoader = parent =>{
    const loader=`
         <div class="loader">
             <svg>
                 <use href="img/icons.svg#icon-cw"></use>
             </svg>
         </div>
    `;
    parent.insertAdjacentHTML("afterbegin",loader);
}

export const removeLoader = () =>{
    document.querySelector('.loader').parentElement.removeChild(document.querySelector('.loader'));
}