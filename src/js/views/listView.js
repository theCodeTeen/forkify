import {elements} from './base';
export const renderItem = item =>{
    const markup=`
                <li class="shopping__item" data-id="${item.id}">
                    <div class="shopping__count" >
                        <input type="number" value="${item.count}" step="${item.count}" class="count-Inp">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.ingredient}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
    `;
    elements.shoppingList.insertAdjacentHTML('beforeend',markup);
}
export const deleteItem = id=>{
    console.log(`[data-id="${id}"]`);
    const ele=document.querySelector(`[data-id="${id}"]`);
    ele.parentElement.removeChild(ele);
}