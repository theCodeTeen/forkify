import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Like';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';


import {elements,addLoader,removeLoader} from './views/base';


const state={};

const controlSearch = async ()=>{
    //get input from UI
    const query=searchView.getInput();
    
    //create new search object and update to state
    state.search=new Search(query);
    
    //prepare the UI 
    searchView.clearInput();
    searchView.clearResList();
    
    //add loader
    addLoader(elements.resultDiv);
    try{
    //Hit the api for results
    await state.search.getRecipe();
    
    //remove loader
    removeLoader();
    
    //display the results on UI
    searchView.renderResults(state.search.recipes);

    }catch(err){
        alert(err);
        removeLoader();
    }
}

elements.inputBtn.addEventListener('submit',e=>{
    e.preventDefault();
    controlSearch();
});
const recipeControl = async ()=>{
    
    //get ID from url;
    const ID=window.location.hash.replace("#","");
    
    if(ID)
    {
        //create and store the recipe obj to state
        state.recipe=new Recipe(ID);
        
        //make active
        if(state.search) recipeView.makeActive(ID);
        
        //prepare the UI
        recipeView.clearRecipe();
        addLoader(elements.recipe);
        
        try{
        //fetch the recipe data from API
        await state.recipe.getRecipe();
        
        //calculate time and servings
        state.recipe.calcTime();
        state.recipe.calcServings();
        state.recipe.parseIngredients();
        
        //render on UI 
        removeLoader();
        recipeView.renderRecipe(state.recipe,state.likes.isLiked(state.recipe.id));
        }catch(err)
        {
            alert(err);
        }
    }
}

const listControl =()=>{
    
    //create a list if not created
    if(!state.list) state.list = new List();
    
    state.recipe.ingredients.forEach(ing=>{
        //add ingredient to state
        const item=state.list.addItem(ing.count,ing.unit,ing.ingredient);
        
        //add ingredient to UI
        listView.renderItem(item);
    });
    
}

const likeControl = ()=>{
    
    //create a like if not created
    if(!state.likes) state.likes=new Like();
    
    const ID=state.recipe.id;
    
    if(!state.likes.isLiked(ID))
    {
        //add a like to state
        const like=state.likes.addLike(ID,state.recipe.title,state.recipe.publisher,state.recipe.imageUrl);
        
        //toggle the like button
        likeView.toggleLikeBtn(true);
        likeView.toggleLikeMenu(state.likes.getNumLikes());
        
        //add a like to UI
        likeView.renderLike(like);
       
    }
    else
    {
        //remove a like to state
        state.likes.deleteLike(ID);
        
        //toggle the like button
        likeView.toggleLikeBtn(false);
        likeView.toggleLikeMenu(state.likes.getNumLikes());
        
        //remove a like to UI
        likeView.deleteLike(ID);
       
    }
}


elements.pagginationBtn.addEventListener('click',e=>{
    const btnClicked=e.target.closest('.btn-inline');
    if(btnClicked)
    {
        searchView.clearResList();
        searchView.renderResults(state.search.recipes,parseInt(btnClicked.dataset.goto));
    }
});

['hashchange','load'].forEach(cur=>window.addEventListener(cur,recipeControl));
window.addEventListener('load',e=>{
    //creating a like obj
    state.likes=new Like();
    
    //retrieve data
    state.likes.retriveData();
    
    //toggle like menu
    likeView.toggleLikeMenu(state.likes.getNumLikes());
    
    //render likes on menu
    state.likes.likes.forEach(like=>likeView.renderLike(like));
});

elements.recipe.addEventListener('click',e=>{
    if(e.target.closest('.serv-decrease')&&state.recipe.servings>1)
    {
        //decrease the values in state
        state.recipe.updateServNIng("dec");
        
        //update the UI
        recipeView.updateServNIng(state.recipe);
    }
    else if(e.target.closest('.serv-increase'))
    {
        //increasee the values in state
        state.recipe.updateServNIng("inc");
        
        //update the UI
        recipeView.updateServNIng(state.recipe);
    }
    else if(e.target.closest('.recipe__btn--cart'))
    {
        listControl();
    }
    else if(e.target.closest('.recipe__love'))
    {
        likeControl();
    }
});
elements.shoppingList.addEventListener('click',e=>{
    //get Id
    const ID =e.target.closest('.shopping__item').dataset.id;
    if(e.target.closest('.shopping__item'))
    if(e.target.closest('.shopping__delete'))
    {       
       //delete the item from state
       state.list.deleteItem(ID);
       
       //delete from UI
       listView.deleteItem(ID);
    }
    else if(e.target.closest('.count-Inp'))
    {
        state.list.updateCount(ID,parseFloat(e.target.value));
    }
})
// #include<bits/stdc++.h>
// using namespace std;
// int main()
// {
//     long long int noOfTestCases,count0,count1,count0after1,countafter1flag,lastModeSwitch;
//     char mode;
//     string binary,uniqueString,initString;
//     vector<string> allSubstr;
//     set<string> uniqueSubstr;
//     cin>>noOfTestCases;
//     while(noOfTestCases--)
//     {
//         cin>>binary;
//         count0=0;
//         count1=0;
//         count0after1=0;
//         countafter1flag=1;
//         mode=binary[0];
//         lastModeSwitch=0;
//         uniqueSubstr.clear();
//         allSubstr.clear();
//         uniqueString="";
//         initString="";
//         for(long long int i=0;i<binary.length();i++)
//         {
//             if(binary[i]=='1')
//             {count1++;
//              countafter1flag=0;
//             }
//             else if(binary[i]=='0')
//             {
//                 count0++;
//                 if(countafter1flag==0)
//                 count0after1++;
//             }
            
//             if(binary[i]!=mode)
//             {
//                 uniqueSubstr.insert(binary.substr(lastModeSwitch,i-lastModeSwitch));
//                 allSubstr.push_back(binary.substr(lastModeSwitch,i-lastModeSwitch));
//                 lastModeSwitch=i;
//                 mode=binary[i];
//             }
//         }
//         uniqueSubstr.insert(binary.substr(lastModeSwitch,binary.length()-lastModeSwitch));
//         allSubstr.push_back(binary.substr(lastModeSwitch,binary.length()-lastModeSwitch));
//         for(long long int i=0;i<allSubstr.size();i++)
//         {
//             if(uniqueSubstr.find(allSubstr[i])!=uniqueSubstr.end())
//             {
//                 uniqueString+=allSubstr[i];
//                 uniqueSubstr.erase(allSubstr[i]);
//             }
//         }
        //cout<<"us:"<<uniqueString<<endl;
        // for(auto item=uniqueSubstr.begin();item!=uniqueSubstr.end();item++)
        // {
        //     cout<<*item<<" ";
        // }
//         if(count1<=count0after1)
//         {
//            if(count1!=0)
//            {
//            initString="1";
//            for(long long int i=0;i<count1;i++)
//            initString+="0";
//            //cout<<initString<<":1"<<endl;
           
           
//            }
//             else
//             {
//                 cout<<"0"<<endl;
//                 return 0;
//             }
            
//         }
//         else
//         {
//             if(count0!=0)
//             {
//             initString="1";
//             for(long long int i=0;i<count0after1-1;i++)
//             initString+="0";
//             initString+="1";
//             //cout<<initString<<":1"<<endl;
//             }
//             else
//             {
//                 cout<<"0"<<endl;
//                 return 0;
//             }
//         }    
        
//     }
//     return 0;
// }
// #include<bits/stdc++.h>
// using namespace std;
// int main()
// {
//     long long int noOfTestCases,count0,count1,count0after1,countafter1flag,lastModeSwitch;
//     char mode;
//     string binary,uniqueString,initString;
//     vector<string> allSubstr;
//     set<string> uniqueSubstr;
//     cin>>noOfTestCases;
//     while(noOfTestCases--)
//     {
//         cin>>binary;
//         count0=0;
//         count1=0;
//         count0after1=0;
//         countafter1flag=1;
//         mode=binary[0];
//         lastModeSwitch=0;
//         uniqueSubstr.clear();
//         allSubstr.clear();
//         uniqueString="";
//         initString="";
//         for(long long int i=0;i<binary.length();i++)
//         {
//             if(binary[i]=='1')
//             {count1++;
//              countafter1flag=0;
//             }
//             else if(binary[i]=='0')
//             {
//                 count0++;
//                 if(countafter1flag==0)
//                 count0after1++;
//             }
            
//             if(binary[i]!=mode)
//             {
//                 uniqueSubstr.insert(binary.substr(lastModeSwitch,i-lastModeSwitch));
//                 allSubstr.push_back(binary.substr(lastModeSwitch,i-lastModeSwitch));
//                 lastModeSwitch=i;
//                 mode=binary[i];
//             }
//         }
//         uniqueSubstr.insert(binary.substr(lastModeSwitch,binary.length()-lastModeSwitch));
//         allSubstr.push_back(binary.substr(lastModeSwitch,binary.length()-lastModeSwitch));
//         for(long long int i=0;i<allSubstr.size();i++)
//         {
//             if(uniqueSubstr.find(allSubstr[i])!=uniqueSubstr.end())
//             {
//                 uniqueString+=allSubstr[i];
//                 uniqueSubstr.erase(allSubstr[i]);
//             }
//         }
//         //cout<<"us:"<<uniqueString<<endl;
//         // for(auto item=uniqueSubstr.begin();item!=uniqueSubstr.end();item++)
//         // {
//         //     cout<<*item<<" ";
//         // }
//         if(count1<=count0after1)
//         {
//            if(count1!=0)
//            {
//            initString="1";
//            for(long long int i=0;i<count1;i++)
//            initString+="0";
//            //cout<<initString<<":1"<<endl;
           
           
//            }
//             else
//             {
//                 cout<<"0"<<endl;
//                 return 0;
//             }
            
//         }
//         else
//         {
//             if(count0!=0)
//             {
//             initString="1";
//             for(long long int i=0;i<count0after1-1;i++)
//             initString+="0";
//             initString+="1";
//             //cout<<initString<<":1"<<endl;
//             }
//             else
//             {
//                 cout<<"0"<<endl;
//                 return 0;
//             }
//         }    
        
//     }
//     return 0;
// }

