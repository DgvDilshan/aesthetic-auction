import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/shared/Navbar/Navbar';

import 'react-toastify/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './providers/UserProvider';

const App = () => {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);
  return (
    <>
      <UserProvider>
        {showNavbar && <Navbar />}
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  );
};

export default App;
