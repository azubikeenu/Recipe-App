export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike ( id, title, author, image ) {
        this.likes.push( { id, title, author, image } )
        // persist data
        this.persistData();
        return this.likes;
    }

    removeLike ( id ) {
        // get the index of the
        const itemIndex = this.likes.findIndex( item => item.id === id )
        // remove the item from the array
        this.likes.splice( itemIndex, 1 )
        // persist data
        this.persistData();
    }

    isLiked ( id ) {
        return this.likes.findIndex( like => like.id === id ) !== -1

    }
    numberOfLikes () {
        return this.likes.length;
    }

    persistData () {
        localStorage.setItem( 'likes_m', JSON.stringify( this.likes ) )
    }

    getLikes () {
        const storage = JSON.parse( localStorage.getItem( 'likes_m' ) );
        if ( storage ) this.likes = storage
    }
}