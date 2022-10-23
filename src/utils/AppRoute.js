import React from 'react';
import { Route } from 'react-router-dom';

const AppRoute = ({
  component: Component,
  layout: Layout,
  props
}) => {

  Layout = (Layout === undefined) ? props => (<>{props.children}</>) : Layout;

  return (
   
        <Layout>
          <Component {...props} />
        </Layout>
     
  );
}

export default AppRoute;