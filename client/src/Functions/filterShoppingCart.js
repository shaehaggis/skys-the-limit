export function filterShoppingCart(shoppingCart){

    return shoppingCart.map((item) => {

        const { id, information } = item;
        const added = item.added?.map(({ id }) => ({ id }));
        const removed = item.removed?.map(({ id }) => ({ id }));

        return {
            id,
            ...(added ? { added } : {}),
            ...(removed ? { removed } : {}),
            ...('MilkType' in item ? { MilkType: item.MilkType } : {}),
            info: information
        }
    })
}