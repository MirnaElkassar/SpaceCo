import React from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {ApolloProvider} from '@apollo/react-hooks'
import client from './client'
import loginScreen from './src/screens/loginScreen'
import codeScreen from './src/screens/codeScreen'
import forgotPwScreen from './src/screens/forgotPwScreen'
import resetPwScreen from './src/screens/resetPwScreen'
import tabNavigator from './src/Components/tabNavigator'

console.disableYellowBox = true;

const navigator= createStackNavigator({
  login:loginScreen,
  forgotPw:forgotPwScreen,
  code:codeScreen,
  resetPw:resetPwScreen,
  tabNavigator:tabNavigator ,
},
{
  initialRouteName : 'login' ,
  defaultNavigationOptions :{
    headerShown:false
  }
}
);

const RootComponent =createAppContainer(navigator);

const App =()=>(
  <ApolloProvider client={client}>
    <RootComponent/>
  </ApolloProvider>
);

export default App;

