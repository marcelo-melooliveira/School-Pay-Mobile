import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Login from './pages/login';
import Payment from './pages/payment';
import My_Payments from './pages/my_payments'
import Data_User from './pages/data_user'
import Home from './pages/home'


export default (isSigned = false) => createAppContainer(
  createSwitchNavigator({
    Sign : createSwitchNavigator({
      Login,
      Home
    }),

    App: createBottomTabNavigator({
      Data_User,
      Payment,
      My_Payments      
    },{
      initialRouteName:'Payment',
      tabBarOptions: {
        keyboardHidesTabBar: true,
        activeTintColor: '#FFF',
        inactiveTintColor: 'rgba(255, 255, 255, 0.4)',
        style:{ backgroundColor: '#0E0B28' }
      }
    })
  },
  {
    initialRouteName: isSigned ? 'App' : 'Sign'
  })
);

