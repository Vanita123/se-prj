import React, { useRef, useEffect } from 'react';
import { useLocation,Routes } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import { Route } from 'react-router-dom';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';
import LayoutCustom from './layouts/LayoutCustom';

// Views 
import Home from './views/Home';
import Login from './views/Login';
import UserRegistration from './views/UserRegistration';
import Search from './views/Search';
import GSignIn from './views/GSignIn';
import View from './views/View';
import PetRegistration from './views/PetRegistration';
import Payment from './views/Payment';
import Reservations from './views/Reservations';
import Approval from './views/Approval';
import Complaints from './views/Complaints';

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
     
        <Routes>
          <Route path="/" element={<AppRoute exact path="/" component={Home} layout={LayoutDefault} />}  />
          <Route path="/login" element={<AppRoute exact path="/login" component={Login} layout={LayoutCustom} />}  />
          <Route path="/signin" element={<AppRoute exact path="/signin" component={UserRegistration} layout={LayoutCustom} />}  />
          <Route path="/gsignin" element={<AppRoute exact path="/gsignin" component={GSignIn} layout={LayoutCustom} />}  />
          <Route path="/search" element={<AppRoute exact path="/search" component={Search} layout={LayoutCustom} />}  />
          <Route path="/view" element={<AppRoute exact path="/view" component={View} layout={LayoutCustom} />}  />
          <Route path="/petRegistration" element={<AppRoute exact path="/petRegistration" component={PetRegistration} layout={LayoutCustom} />}  />
          <Route path="/reservations" element={<AppRoute exact path="/reservations" component={Reservations} layout={Reservations} />}  />
          <Route path="/payment" element={<AppRoute exact path="/payment" component={Payment} layout={LayoutCustom} />}  />
          <Route path="/approvals" element={<AppRoute exact path="/approvals" component={Approval} layout={LayoutCustom} />}  />
          <Route path="/complaints" element={<AppRoute exact path="/complaints" component={Complaints} layout={LayoutCustom} />}  />
          </Routes>
  
      )} />
  );
}

export default App;