import CartItemStyles from './styles/CartItemStyles';
import formatMoney from '../lib/formatMoney';

export default function CartItem({ cartItem }) {
  const { product } = cartItem;
  if (!product) return null;

  return (
    <CartItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)} |
          <em>
            {' '}
            {cartItem.quantity}&times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}
