export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    // A product could be deleted from the DB but still remain in the user cart
    if (!cartItem.product) return tally;
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
