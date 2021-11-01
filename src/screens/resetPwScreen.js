import React,{useState} from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity,ImageBackground} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import {useMutation} from '@apollo/react-hooks';
import {Change_Pw} from '../../queries';

const resetPwScreen =({navigation})=> { 

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [ChangePassword, ChangePasswordData] = useMutation(Change_Pw);
  const email = navigation.getParam('mail');
  const code = navigation.getParam('code');

   const submit = () => {
    ChangePassword({
           variables: { password, email, code}
       });
     }   
     if (ChangePasswordData.data && ChangePasswordData.data.changePasswordWithCode && (password == confirmPassword)) 
     {
         navigation.navigate('login');
     }

    return (
        <View style={styles.container} >
        <ImageBackground source={ require('../../assets/bg.png')} style={styles.bgImage}>

         <Text style={styles.title}>Reset your password</Text>

         <View style={styles.inputpswStyle}> 
          <AntDesign name='lock' style={{fontSize: 22 , color: 'darkgoldenrod', marginTop: 2, marginLeft: 1}}/>
          <TextInput 
               autoCapitalize="none"
               autoCorrect={false}
               placeholder= 'Enter your new password' 
               placeholderTextColor= 'dimgrey'
               style={styles.textinputStyle}
               value={password}
               onChangeText={(newPassword)=> setPassword(newPassword)}
            />
        </View> 

        <View style={styles.inputpswStyle}> 
          <AntDesign name='lock' style={{fontSize: 22 , color: 'darkgoldenrod', marginTop: 2, marginLeft: 1}}/>
          <TextInput 
               autoCapitalize="none"
               autoCorrect={false}
               placeholder= 'Confirm your new password' 
               placeholderTextColor= 'dimgrey'
               style={styles.textinputStyle}
               value={confirmPassword}
               onChangeText={(newValue) => setConfirmPassword(newValue)}
            />
        </View>  



        <View>
            <TouchableOpacity style={styles.buttonStyle} onPress={submit}>
                 <Text style= {styles.textStyle}>Confirm</Text>
            </TouchableOpacity> 
        </View> 
           {(ChangePasswordData.error && ChangePasswordData.error.message) || (password != confirmPassword) ? <Text style={{color:'red',alignSelf:"center",marginTop:20}}>Passwords don't match</Text>  : null}
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

    inputpswStyle: 
    {
        marginTop: 50,
        marginLeft : 15 ,
        marginRight: 20,
        borderRadius: 7,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },

    buttonStyle: 
    {
        backgroundColor: 'darkmagenta',
        marginTop: 40,
        alignSelf: 'center',
        width: 350,
        height: 40,
        borderRadius:5
    },
    textStyle: 
    {
        color: 'white',
        paddingTop: 7,
        textAlign: 'center',
        fontSize: 20,
    },
    textinputStyle : { 
        fontSize: 18,
        paddingBottom: 5,
        marginLeft: 7
     },
     bgImage: {
        flex: 1,
        resizeMode: "cover",
        
      },
}) 

export default resetPwScreen;