export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike ( id, title, author, image ) {
        this.likes.push( { id, title, author, image } )
        return this.likes;
    }

    removeLike ( id ) {
        // get the index of the
        const itemIndex = this.likes.findIndex( item => item.id === id )
        // remove the item from the array
        this.likes.splice( itemIndex, 1 )
    }

    isLiked ( id ) {
        return this.likes.findIndex( like => like.id === id ) !== -1

    }
    numberOfLikes () {
        return this.likes.length;
    }



}