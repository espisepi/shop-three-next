import create from 'zustand'

const useStoreCart = create(set => ({

    items: [],
    setItems: (items) => set(state => ({ items: items })),
    addItem: (item) => set(state => {
        const finder = state.items.filter( i => i.id === item.id);
        if(finder.length != 0){
            finder[0].quantity++;
        } else {
            state.items.push(item);
        }
        return({ items: state.items })
}),
}))

export default useStoreCart;