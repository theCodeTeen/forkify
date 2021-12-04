import axios from 'axios';
export default class Search{
    constructor(query)
    {
      this.query=query;
    }
   
    async getRecipe()
    {
        const url=`https://forkify-api.herokuapp.com/api/search?q=`;
        this.recipes=await axios(`${url}${this.query}`);
        this.recipes = this.recipes.data.recipes;
        //console.log(this.recipes);
    }
}