import {elements} from './base';

export const toggleLikeBtn = toLike =>{
    const str=toLike?'img/icons.svg#icon-heart':'img/icons.svg#icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',str);      
}

export const renderLike = like =>{
    const markup=`      <li>
                            <a class="likes__link" href="#${like.id}">
                                <figure class="likes__fig">
                                    <img src="${like.imgUrl}" alt="${like.title}">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${like.title}</h4>
                                    <p class="likes__author">${like.publisher}</p>
                                </div>
                            </a>
                        </li>`;
    document.querySelector('.likes__list').insertAdjacentHTML('beforeend',markup);
}

export const toggleLikeMenu = likeLength=>{ 
    if(likeLength>0)
        document.querySelector('.likes').style.visibility='visible';
    else
        document.querySelector('.likes').style.visibility='hidden';
    
}

export const deleteLike = id =>{
    const ele=document.querySelector(`.likes__link[href*="${id}"]`);
    ele.parentElement.removeChild(ele);
}