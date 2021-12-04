import {elements} from './base';

export const getInput = ()=>elements.inputField.value;

export const clearInput=()=>{
  elements.inputField.value='';  
};
export const clearResList=()=>{
    elements.resultList.innerHTML='';
    elements.pagginationBtn.innerHTML='';
}

const formatTitle=(title,limit=17)=>{
    let newTitle='';
    if(title.length>limit)
    {
        title.split(' ').reduce((acc,cur)=>{
            if(acc+cur.length<=limit)
                newTitle=newTitle+' '+cur;
            return acc+cur.length;
        },0);
        newTitle+=' ...';
        return newTitle;
    }
    return title;
}

const renderResult = result =>{
    const markup=`
                <li>
                    <a class="results__link" href="#${result.recipe_id}">
                        <figure class="results__fig">
                            <img src="${result.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${formatTitle(result.title)}</h4>
                            <p class="results__author">${result.publisher}</p>
                        </div>
                    </a>
                </li>
    `;
    elements.resultList.insertAdjacentHTML("beforeend",markup);
};

const constructButtonMarkup = (pageNo,type)=>`
                <button class="btn-inline results__btn--${type}" data-goto=${type==="prev"?pageNo-1:pageNo+1}>
                    <span>Page ${type==="prev"?pageNo-1:pageNo+1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type==="prev"?"left":"right"}"></use>
                    </svg>
                </button>
`;

const addButtons =(pageNo,noOfPages)=>{
    let buttonMarkup='';
    if(pageNo===1&&noOfPages>1)
    {
        buttonMarkup=constructButtonMarkup(1,"next");
    }
    else if(pageNo>1&&noOfPages!==pageNo)
    {
        buttonMarkup=`${constructButtonMarkup(pageNo,"prev")}${constructButtonMarkup(pageNo,"next")}`;
    }
    else if(pageNo===noOfPages&&noOfPages>1)
    {
        buttonMarkup=constructButtonMarkup(pageNo,"prev");
    }
    elements.pagginationBtn.insertAdjacentHTML('beforeend',buttonMarkup);
}

export const renderResults=(results,pageNo=1,resultPerPage=10)=>{
    let start= (pageNo-1)*resultPerPage;
    let end = pageNo*resultPerPage;
    results.slice(start,end).forEach(renderResult);
    
    //add prev and next button
    addButtons(pageNo,Math.ceil(results.length/resultPerPage));
}