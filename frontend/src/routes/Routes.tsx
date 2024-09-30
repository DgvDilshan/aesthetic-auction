import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import ProtectedRoute from './ProtectedRoute';
import AddArt from '../pages/AddArt/AddArt';
import HowtoSell from '../pages/HowtoSell/HowtoSell';
import Profile from '../pages/Profile/Profile';
import CreateStore from '../pages/CreateStore/CreateStore';
import Sellers from '../pages/Sellers/Sellers';
import SellerDetails from '../pages/Sellers/SellerDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'how-to-sell', element: <HowtoSell /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'sellers', element: <Sellers /> },
      { path: 'seller-details', element: <SellerDetails /> },
      {
        path: 'add-art',
        element: (
          <ProtectedRoute>
            <AddArt />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'create-store',
        element: (
          <ProtectedRoute>
            <CreateStore />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
