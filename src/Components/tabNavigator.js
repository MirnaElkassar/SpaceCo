import React from 'react'
import {Image} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import coursesScreen from '../screens/coursesScreen'
import roomsScreen from '../screens/roomsScreen'
import reservationsScreen from '../screens/reservationsScreen'
import optionsScreen from '../screens/optionsScreen'



const tabNavigator = createBottomTabNavigator(
    {
      Reservations:reservationsScreen ,
      Rooms:roomsScreen,
      Courses:coursesScreen,
      Options:optionsScreen
    },

    {
      
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            if (routeName === 'Reservations') {
              return (
                
                <Image
                  source={ require('../../assets/reservation.png') }
                  style={{ width: 20, height: 20, }} />
              );
            } else if(routeName === 'Rooms') {
              return (
                <Image
                  source={ require('../../assets/rooms.png') }
                  style={{ width: 23, height:23 }} />
              );
            } else if (routeName === 'Courses'){
                return (
                    <Image
                    source={require('../../assets/course.png')}
                    style={{ width: 22.5, height:22.5 }} />
                )
            } else {
              return (
                <Image
                source={require('../../assets/drawer.png')}
                style={{width:22.5 ,height:22.5}}/>
              )
            }
          },
        }),
        tabBarOptions: {
          activeTintColor: 'darkmagenta',
          inactiveTintColor: '#263238',
        },
      } )

      export default createAppContainer (tabNavigator);