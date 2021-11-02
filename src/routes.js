import React from 'react';
import Loadable from 'react-loadable';



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

const NodeRED = Loadable({
  loader: () => import('./views/Pages/NodeRED'),
  loading: Loading,
});
/*
const RunNodered = Loadable({
  loader: () => import('./views/Pages/RunNodered'),
  loading: Loading,
});
*/
const MQTT = Loadable({
  loader: () => import('./views/Pages/MQTT'),
  loading: Loading,
});

const Datastore = Loadable({
  loader: () => import('./views/Pages/Datastore'),
  loading: Loading,
});
/*
const Createdatabase = Loadable({
  loader: () => import('./views/Pages/Createdatabase'),
  loading: Loading,
});
*/
const SparkContainer = Loadable({
  loader: () => import('./views/Pages/SparkContainer'),
  loading: Loading,
});


const Main = Loadable({
  loader: () => import('./views/Pages/Login_first'),
  loading: Loading,
});

const Files_Manage = Loadable({
  loader: () => import('./views/Pages/Files_Manage'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/pages/login', exact: true,  name: 'Login', component: Loginpage },
  { path: '/pages/register', exact: true,  name: 'Register', component: Registerpage },
  { path: '/pages/NodeRED',  name: 'NodeRED', component: NodeRED },
  //{ path: '/pages/RunNodered', name: 'RunNodered', component: RunNodered},
  { path: '/pages/MQTT', name: 'MQTT', component: MQTT },
  { path: '/pages/Datastore', name: 'Datastore', component: Datastore },
  { path: '/pages/Files_Manage', name: 'Files_Manage', component: Files_Manage },
  { path: '/pages/SparkContainer', name: 'SparkContainer', component: SparkContainer },
  { path: '/Login_first', name: 'Main', component: Main },

  
];

export default routes;
