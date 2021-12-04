import {elements} from './base';
import {Fraction} from 'fractional'
export const clearRecipe = ()=>{
    elements.recipe.innerHTML='';
}

const formatCount = count =>{
    //console.log("count="+count);
    if(count)
    {
        let [int,dec]= count.toString().split('.').map(el=>parseInt(el));
        //console.log(int+":"+dec);
        if(dec===undefined)
        {
            return `${count}`;
        }
        else if(int===0)
        {
            let fr=new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`;
        }
        else
        {
            let fr=new Fraction(count-int);
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
            
    }
    return '?';
}

export const makeActive=id=>{
    Array.from(document.querySelectorAll('.results__link--active')).map(el=>el.classList.remove('results__link--active'));
    document.querySelector(`a[href*="${id}"]`).classList.add('results__link--active');
}

export const renderRecipe= (recipe,toLike)=>{
    const markup=`
         <figure class="recipe__fig">
                <img src=${recipe.imageUrl} alt=${recipe.title} class="recipe__img">
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
                        <button class="btn-tiny serv-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny serv-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${toLike?'':'-outlined'}"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${recipe.ingredients.map(ing=>`
                        <li class="recipe__item">
                            <svg class="recipe__icon">
                                <use href="img/icons.svg#icon-check"></use>
                            </svg>
                            <div class="recipe__count">${formatCount(parseFloat(ing.count))}</div>
                            <div class="recipe__ingredient">
                                <span class="recipe__unit">${ing.unit}</span>
                                ${ing.ingredient}
                            </div>
                        </li>
                    `).join()}
                    
                </ul>

                <button class="btn-small recipe__btn recipe__btn--cart">
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
                    <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href=${recipe.sourceUrl} target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>

    `;
    elements.recipe.insertAdjacentHTML('afterbegin',markup);
}

export const updateServNIng=recipe=>{
    //update servings in UI
    document.querySelector('.recipe__info-data--people').textContent=recipe.servings;
    
    //update ingredients in UI
    Array.from(document.querySelectorAll(".recipe__count")).forEach((el,i)=>{
        el.textContent=formatCount(recipe.ingredients[i].count);
        console.log("el:"+el,"count:"+formatCount(recipe.ingredients[i].count));
        console.log("countUF:"+recipe.ingredients[i].count);
    });
}