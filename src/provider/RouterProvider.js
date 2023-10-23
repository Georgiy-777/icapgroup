import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


import authSelectors, {getIsLoggedIn} from '../store/auth/auth.selectors'

const allowRoute = ['/sign-in'];

const RouterProvider = ({ children }) => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn());
  console.log('isLoggedIn', isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      if (!allowRoute?.includes(router.pathname)) {
        router.push('/sign-in');
        return;
      }
    } else {
      if (allowRoute?.includes(router.pathname) ) {
        router.push('/');
        return;
      }
    }
    setAllowed(true);
  }, [router.pathname, isLoggedIn]);

  return allowed ? <>{children}</> : null;
};

export default RouterProvider;



