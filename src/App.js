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
import Signin from './views/Signin';
import Search from './views/Search';
import GSignIn from './views/GSignIn';
import View from './views/View';

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
          <Route path="/login" element={<AppRoute exact path="/" component={Login} layout={LayoutCustom} />}  />
          <Route path="/signin" element={<AppRoute exact path="/" component={Signin} layout={LayoutCustom} />}  />
          <Route path="/gsignin" element={<AppRoute exact path="/" component={GSignIn} layout={LayoutCustom} />}  />
          <Route path="/search" element={<AppRoute exact path="/" component={Search} layout={LayoutCustom} />}  />
          <Route path="/view" element={<AppRoute exact path="/" component={View} layout={LayoutCustom} />}  />
          </Routes>
  
      )} />
  );
}

export default App;