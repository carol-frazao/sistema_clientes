import { Fragment, useEffect } from 'react';
import Router from './router/Router';
import { useDispatch } from 'react-redux';
import { verifyAuth } from './utils/auth/verifyAuth';
import CustomHeader from './components/CustomHeader';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    verifyAuth(dispatch);
  }, [dispatch]);


  return (
    <Fragment>
      <CustomHeader />
      <Router />
    </Fragment>
  )
}

export default App;
