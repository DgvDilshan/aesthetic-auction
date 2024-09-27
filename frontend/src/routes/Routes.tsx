import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import ProtectedRoute from './ProtectedRoute';
import AddArt from '../pages/AddArt/AddArt';
import HowtoSell from '../pages/HowtoSell/HowtoSell';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'how-to-sell', element: <HowtoSell /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      {
        path: 'add-art',
        element: (
          <ProtectedRoute>
            <AddArt />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
