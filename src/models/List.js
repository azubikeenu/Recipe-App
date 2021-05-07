import uniqid from 'uniqid'
export default class List {
    constructor() {
        this.items = []
    }
    addItem ( count, unit, ingredient ) {
        const item = { id: uniqid(), count, unit, ingredient }
        this.items.push( item );
    }
    removeItem ( id ) {
        // get the index of the
        const itemIndex = this.items.findIndex( item => item.id === id )
        // remove the item from the array
        this.items.splice( itemIndex, 1 )
    }
    updateCount ( id, newCount ) {
        const item = this.items.find( item => item.id === id );
        item.count = newCount;

    }





}
