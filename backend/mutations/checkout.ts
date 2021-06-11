/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { KeystoneContext } from '@keystone-next/types';
import {
  CartItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';
import { CartItem } from '../schemas/CartItem';
import { User } from '../schemas/User'; // used below in context.lists.User.findOne

const graphql = String.raw;

interface Arguments {
  token: string;
}

export default async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  const userId = context.session.itemId;

  if (!userId) {
    throw new Error('Sorry, you must be signed in to create an order!');
  }

  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id,
      name,
      email,
      cart {
        id
        quantity
        product {
          id
          name
          price
          description
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
      `,
  });

  const cartItems = user.cart.filter((CartItem) => CartItem.product);

  const amount = cartItems.reduce(
    (tally: number, cartItem: CartItemCreateInput) =>
      tally + cartItem.quantity * cartItem.product.price,
    0
  );

  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
}
