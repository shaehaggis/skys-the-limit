export function calculateCartItemPrice(data) {
    let price = 0;
    
    if (data.hasOwnProperty("added")){
      data.added.forEach(ingredient => {
        price += parseFloat(ingredient.price);
      })
    }

    if (data.hasOwnProperty("removed")){
      data.removed.forEach(ingredient => {
        price -= parseFloat(ingredient.price);
      })
    }

    price += parseFloat(data.item_price);
    return String(price.toFixed(2));
  }