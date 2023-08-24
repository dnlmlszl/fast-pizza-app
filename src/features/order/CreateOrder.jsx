import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { Button } from '../../ui/Button';
import { EmptyCart } from '../cart/EmptyCart'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import store from '../../store'
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

export const CreateOrder = () => {
  const [withPriority, setWithPriority] = useState(false)

  const {username, status: addressStatus, position, address, error: errorAddress} = useSelector((state) => state.user)
  const isLoadingAddress = addressStatus === 'loading'

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();


  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const dispatch = useDispatch()

  if (!cart.length) return <EmptyCart />
  return (
    <div className='px-4 py-6'>
      <h2 className='text-xl font-semibold mb-8'>Ready to order? Let's go!</h2>

      
      {/* <Form method='POST' action='/order/new'> */}
      <Form method="POST">
        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input className='input grow' type="text" name="customer" defaultValue={username} required />
        </div>

        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input w-full' type="tel" name="phone" required />
          {formErrors?.phone && <p className='text-xs mt-2 text-red-600 bg-red-100 p-2 rounded-md'>{formErrors.phone}</p>}
          </div>
        </div>

        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input className='input w-full' type="text" name="address" disabled={isLoadingAddress} defaultValue={address} required />
            {addressStatus === 'error' && <p className='text-xs mt-2 text-red-600 bg-red-100 p-2 rounded-md'>{errorAddress}</p>}
          </div>
          {!position.longitude && !position.latitude && (<span className="absolute top-[2.2rem] right-[3px] sm:right-[3px] sm:top-[3px] z-50 md:right-[5px] md:top-[5px]">
            <Button disabled={isLoadingAddress} type='small' onClick={(e) => {
                e.preventDefault()
                dispatch(fetchAddress())
              }}>Get position</Button>
          </span>)}
        </div>
 
        <div className='mb-12 flex gap-5 items-center'>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className='h-6 w-6 accent-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-offset-2'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude, position.longitude}` : ''} />
          <Button disabled={isSubmitting || isLoadingAddress} type='primary'>
            {isSubmitting ? 'Placing order...' : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Please provide a correct phone number';

  if (Object.keys(errors).length > 0) return errors;

  // console.log(order);
  const newOrder = await createOrder(order);
  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`);
}
