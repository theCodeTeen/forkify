import axios from 'axios';
export default class{
    constructor(id)
    {
        this.id=id;
    }
    async getRecipe()
    {
        try{
        const results=await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        this.publisher=results.data.recipe.publisher;
        this.title=results.data.recipe.title;
        this.sourceUrl=results.data.recipe.source_url;
        this.ingredients=results.data.recipe.ingredients;
        this.imageUrl=results.data.recipe.image_url;
        }catch(err)
        {
            alert(err);
        }
    }
    calcTime()
    {
        this.time=15*(Math.ceil(this.ingredients.length/3));
    }
    calcServings()
    {
        this.servings=4;
    }
    parseIngredients()
    {
        let ingredientTemp=this.ingredients;
        const unitsLong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','pounds','cups'];
        const unitsShort=['tbsp','tbsp','oz','oz','tsp','tsp','pound','cup','g','kg'];
        this.ingredients=ingredientTemp.map(ingredient=>{
            let tempIng = ingredient;
            let unitIndex,t1,t2;
            //replacing units with shortforms
            unitsLong.forEach((el,i)=>{
                if(tempIng.includes(el))
                {
                    tempIng=tempIng.replace(el,unitsShort[i]);
                }
            });
            t1=tempIng.indexOf('(');
            t2=tempIng.indexOf(')');
            if(t1>-1&&t2>-1)
            {
                tempIng=tempIng.replace(tempIng.slice(t1,t2+2),'');
            }
            tempIng=tempIng.split(' ');
            unitIndex=tempIng.findIndex(el=>unitsShort.includes(el));
            
            if(unitIndex>-1)
            {
                let no=eval(tempIng.slice(0,unitIndex).join('+'));
                tempIng={
                    count:no,
                    unit:tempIng[unitIndex],
                    ingredient:tempIng.slice(unitIndex+1).join(' ')
                }
            }
            else if(parseInt(tempIng[0]))
            {
                tempIng={
                    count:parseInt(tempIng[0]),
                    unit:'',
                    ingredient:tempIng.slice(1).join(' ')
                }
                
            }
            else if(unitIndex===-1)
            {
                tempIng={
                    count:1,
                    unit:'',
                    ingredient
                }
            }
            return tempIng;
        });
    }
    updateServNIng(type)
    {
        const newServing=type==="dec"?this.servings-1:this.servings+1;
        this.ingredients.forEach(ing=>ing.count=ing.count*(newServing/this.servings));
        this.servings=newServing;
    };    
}