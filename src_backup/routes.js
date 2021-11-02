import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Loginpage = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading: Loading,
});

const Registerpage = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading: Loading,
});

const FlowDesign = Loadable({
  loader: () => import('./views/Pages/FlowDesign'),
  loading: Loading,
});

const Analytic = Loadable({
  loader: () => import('./views/Pages/Analytic'),
  loading: Loading,
});

const Storage = Loadable({
  loader: () => import('./views/Pages/Storage'),
  loading: Loading,
});

const ListBroker = Loadable({
  loader: () => import('./views/Pages/ListBroker/ListBrokers'),
  loading: Loading,
});


const ConfigBroker = Loadable({
  loader: () => import('./views/Pages/ListBroker/ConfigBroker'),
  loading: Loading,
});

const Main = Loadable({
  loader: () => import('./views/Pages/Main'),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/pages/login', exact: true,  name: 'Login', component: Loginpage },
  { path: '/pages/register', exact: true,  name: 'Register', component: Registerpage },
  { path: '/pages/FlowDesign',  name: 'FlowDesign', component: FlowDesign },
  { path: '/pages/Analytic',  name: 'Analytic', component: Analytic },
  { path: '/pages/Storage',  name: 'Storage', component: Storage },
  { path: '/pages/ListBroker', exact: true, name: 'ListBroker', component: ListBroker },
  { path: '/pages/ListBroker/:brokername', exact: true, name: 'ConfigBroker', component: ConfigBroker },
  { path: '/pages/Main', name: 'Main', component: Main },
];

export default routes;
