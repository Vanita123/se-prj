import React, { useRef, useEffect } from 'react';
import { useLocation,Routes } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import { Route } from 'react-router-dom';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';
import LayoutCustom from './layouts/LayoutCustom';
import LayoutUser from './layouts/LayoutUser';

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
import ForgotPassword from './views/ForgotPassword';
import { Recommendation } from './views/Recommendation';
import Rating from './views/Rating';
import Refund from './views/Refund';
import Chat from './views/Chat';

import NewPassword from './views/NewPassword';
import ResetPassword from './views/ResetPassword';

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
          <Route path="/search" element={<AppRoute exact path="/search" component={Search} layout={LayoutUser} />}  />
          <Route path="/view" element={<AppRoute exact path="/view" component={View} layout={LayoutCustom} />}  />
          <Route path="/petRegistration" element={<AppRoute exact path="/petRegistration" component={PetRegistration} layout={LayoutUser} />}  />
          <Route path="/reservations" element={<AppRoute exact path="/reservations" component={Reservations} layout={LayoutUser} />}  />
          <Route path="/payment" element={<AppRoute exact path="/payment" component={Payment} layout={LayoutUser} />}  />
          <Route path="/approvals" element={<AppRoute exact path="/approvals" component={Approval} layout={LayoutUser} />}  />
          <Route path="/complaints" element={<AppRoute exact path="/complaints" component={Complaints} layout={LayoutUser} />}  />
          <Route path="/forgotpassword" element={<AppRoute exact path="/forgotpassword" component={ForgotPassword} layout={LayoutUser} />}  />
          <Route path="/recommendation" element={<AppRoute exact path="/recommendation" component={Recommendation} layout={LayoutUser} />}  />
          <Route path="/ratings" element={<AppRoute exact path="/rating" component={Rating} layout={LayoutUser} />}  />
          <Route path="/refund" element={<AppRoute exact path="/refund" component={Refund} layout={LayoutUser} />}  />
          <Route path="/chat" element={<AppRoute exact path="/chat" component={Chat} layout={LayoutUser} />}  />
          <Route path="/reset" element={<AppRoute exact path="/reset" component={ResetPassword} layout={LayoutCustom} />}  />
          <Route path="/newpassword" element={<AppRoute exact path="/newpassword" component={NewPassword} layout={LayoutCustom} />}  />

          </Routes>
  
      )} />
  );
}

export default App;