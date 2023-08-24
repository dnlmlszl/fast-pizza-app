// React stuff
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Components, pages
import { Home } from './ui/Home';
import { Menu, loader as menuLoader } from './features/menu/Menu';
import { Cart } from './features/cart/Cart';
import { Order, loader as orderLoader } from './features/order/Order';
import {
  CreateOrder,
  action as createOrderAction,
} from './features/order/CreateOrder';
import { action as updateOrderAction } from './features/order/UpdateOrder'
import { NotFound } from './ui/Error';
import { AppLayout } from './ui/AppLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <NotFound />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
        errorElement: <NotFound />,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <NotFound />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
