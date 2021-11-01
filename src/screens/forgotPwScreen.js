import React,{useState}from 'react'
import {View,StyleSheet,Text,TextInput,TouchableOpacity,ImageBackground} from 'react-native'
import {FontAwesome,AntDesign} from '@expo/vector-icons'
import {useMutation} from '@apollo/react-hooks'
import {forgotPw}from '../../queries'



const forgotPwScreen =({navigation})=> {

    const [email,setEmail]=useState('');
    const[sendPasswordCode,sendPasswordCodeData]=useMutation(forgotPw)

        const submit =async(e) => {
            sendPasswordCode({
              variables: { email:email }
            });
            if(sendPasswordCodeData.data && sendPasswordCodeData.data.sendPasswordCode)
            {
              navigation.navigate('code',
              {
                 mail : email  
              });
            }
          }


return (
    <View style={styles.container} >
        <ImageBackground source={ require('../../assets/bg.png')} style={styles.bgImage}>

        <Text style={styles.title}>Forgot your password?</Text>

        
        <View style={styles.inputmailStyle}>
            <AntDesign name='mail' style={{fontSize: 22, color: 'darkgoldenrod', marginTop: 4, marginLeft: 5}}/> 
            <TextInput 
               autoCapitalize="none"
               autoCorrect={false}
               placeholder= 'Enter your email'
               placeholderTextColor= 'dimgrey'
               style={styles.textinputStyle}
               value={email}
               onChangeText={newValue => (setEmail(newValue))}
            /> 
        </View> 

       <TouchableOpacity  onPress={submit}>
         <AntDesign name="arrowright" style={styles.arrow}/>
         {sendPasswordCodeData.error && sendPasswordCodeData.error.message ? <Text style={{alignSelf:'center',color:'red'}}>Invalid email</Text> : null}
       </TouchableOpacity>
    </ImageBackground>
    </View> 
)
}

const styles=StyleSheet.create({
    container : {
        flex: 1,
      
    },

    title :{
    
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 160,
        color: 'darkmagenta',
        textShadowColor: 'lightgray',
        textShadowOffset: {width: 1, height: 4},
        textShadowRadius: 2, 
         
    } ,

    textinputStyle : { 
        fontSize: 18,
        paddingBottom: 5,
        marginLeft: 7
     },

    

    inputmailStyle: 
    {
        marginTop: 50,
        marginLeft : 15 ,
        marginRight: 20,
        borderRadius: 7,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    
    
    arrow :{
        fontSize:50,
        color:"darkmagenta",
        paddingTop:30,
        paddingLeft:290,
        marginLeft:20
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        
      },
     
    }

); 

export default forgotPwScreen ;