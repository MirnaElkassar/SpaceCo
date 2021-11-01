import React from 'react'
import {StyleSheet,View,Text,TouchableOpacity,AsyncStorage,Alert,ImageBackground} from 'react-native'
import {Feather,MaterialCommunityIcons,SimpleLineIcons} from '@expo/vector-icons';
import {createStackNavigator} from "react-navigation-stack";
import profileScreen from './profileScreen'
import FAQsScreen from './FAQsScreen'
import contactusScreen from './contactusScreen'
import loginScreen from './loginScreen'

const optionsScreen =({navigation})=>{
   
    return(
        <View style={styles.container}>
            <ImageBackground source={ require('../../assets/bg.png')} style={styles.bgImage}>
    
        <TouchableOpacity onPress={()=>navigation.navigate('profile')}>
            <View style={styles.firstOption}>
                <Feather name='user' style={styles.icon}/>
                <Text style={styles.textStyle}>My profile</Text>
            </View>
            <Text style={styles.details}>See your profile</Text>
        </TouchableOpacity>

        <View style = {styles.lineStyle} />



        <TouchableOpacity onPress={()=>navigation.navigate('contactus')}>
            <View style={styles.option}>
                <MaterialCommunityIcons name='email-outline' style={styles.icon}/>
                <Text style={styles.textStyle}>Contact us</Text>
            </View>
        </TouchableOpacity>



        <TouchableOpacity onPress={()=>navigation.navigate('FAQs')}>
            <View style={styles.option}>
                <SimpleLineIcons name='question' style={styles.icon}/>
                <Text style={styles.textStyle}>FAQs</Text>
            </View>
        </TouchableOpacity>



        <TouchableOpacity onPress={()=>{
            
            Alert.alert('Alert', 'Are you sure you want to logout?',
            [
                { text: 'No', onPress: () => console.log('Cancelled') },
                { text: 'Yes', onPress: () =>navigation.navigate('login')
                 }
                
            ],
            { cancelable: true }
        );
            AsyncStorage.removeItem("token")
            
        }}>
            <View style={styles.option}>
                <MaterialCommunityIcons name='logout' style={styles.icon}/>
                <Text style={styles.textStyle}>Logout</Text>
            </View>
        </TouchableOpacity>

        </ImageBackground>

</View>

           
    )
} 

const styles=StyleSheet.create({
    container : {
        flex: 1,
       },
    
    icon:{       
    fontSize:25,
    color:'darkgoldenrod',
    marginLeft:15,
    marginRight:5,
    marginTop:10
       },

    textStyle:{
        fontSize:20,
        marginTop:10
    },

    firstOption:{
        flexDirection:'row',
        marginTop:10,
        textAlign:'center',    
    },
    option:{
        flexDirection:'row',
        textAlign:'center',   
    },
    bgImage: {
        flex: 1,
        width:'100%',
        height:'100%'  
      },

    details:{
        fontSize:12,
        color:'dimgrey',
        marginLeft:40
    },

    lineStyle:{
        borderWidth: 0.2,
        backgroundColor:'lightgray',
        margin:10,
   },

   lines:{
         borderWidth: 0.2,
         backgroundColor:'lightgray',
         marginHorizontal:20,
         marginVertical:15
   }

});

export default createStackNavigator({
    options: optionsScreen,
    profile:profileScreen,
    FAQs:FAQsScreen,
    contactus:contactusScreen
}, {
    initialRouteName: "options",
    defaultNavigationOptions: { headerStyle: {
        backgroundColor: 'darkmagenta' ,
        
     } ,headerTintColor:'white',

     headerTitleStyle :{
       fontSize :25,
       color:'white'
     }}
});