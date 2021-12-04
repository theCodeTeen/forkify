export default class
    {
        constructor()
        {
            this.likes=[];
        }
        addLike(id,title,publisher,imgUrl)
        {
            const like={id,title,publisher,imgUrl};
            this.likes.push(like);
            this.persistData();
            return like;
        }
        deleteLike(id){
            this.likes.splice(this.likes.findIndex(el=>el.id===id),1);
            this.persistData();
        }
        isLiked(id){
            console.log(this.likes);
            return this.likes.findIndex(el=>el.id===id)!==-1;
        }
        getNumLikes()
        {
            return this.likes.length;
        }
        persistData()
        {
            localStorage.setItem('likes',JSON.stringify(this.likes));
        }
        retriveData()
        {
            if(localStorage.getItem('likes'))
            this.likes=JSON.parse(localStorage.getItem('likes'));
        }
    }