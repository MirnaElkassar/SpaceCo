import React ,{useState}from 'react'
import {View,StyleSheet,Text,TextInput,TouchableOpacity,ImageBackground} from 'react-native'
import {Verify_PwCode} from '../../queries';
import {useMutation} from '@apollo/react-hooks'



const codeScreen =({navigation})=>{
    const [code,setCode]=useState('');
    const [codeVerified, setCodeVerified] = useState(false);
    const[VerifyPwCode,VerifyPwCodeData]=useMutation(Verify_PwCode);
    const email = navigation.getParam('mail') ;  
    

    const checkCode =async(e)=>{   
        VerifyPwCode({variables: {email, code}}); 
         if (VerifyPwCodeData.data && VerifyPwCodeData.data.verifyPasswordCode) 
          {
            setCodeVerified(true); 
            navigation.navigate('resetPw', {mail: email, code: code});
          }
    }

    return(
        <View style={styles.container} >
        <ImageBackground source={ require('../../assets/bg.png')} style={styles.bgImage}>
        <Text style={styles.titleStyle}>Verification Code</Text>
        <Text style={styles.details}>Please enter the code sent on your mail</Text>
        <View style={styles.box}>
            <TextInput 
               autoCapitalize="none"
               autoCorrect={false}
               placeholder= 'Enter your code here'
               placeholderTextColor= 'dimgrey'
               style={styles.textinputStyle}
               value={code}
               onChangeText={newValue => (setCode(newValue))}
            /> 
        </View>

        <TouchableOpacity style={styles.buttonStyle} onPress={checkCode}>
               <Text style={styles.submitTextStyle}>Submit</Text>
              </TouchableOpacity>

</ImageBackground>
    </View>
    )
}

const styles=StyleSheet.create({
    container : {
        flex: 1,
       },

       titleStyle: 
       { 
           fontFamily: 'Georgia-Italic',
           fontSize: 40,
           fontWeight: 'bold',
           textAlign: 'center',
           marginTop:160,
           color: 'darkmagenta',
           textShadowColor: 'lightgray',
           textShadowOffset: {width: 1, height: 4},
           textShadowRadius: 3,  
       
       },

       
    textinputStyle : { 
        fontSize: 15,
        alignSelf:'center',
        textAlign:'center',
        marginTop:10
     },

     details:{
         fontSize:12,
         color:'gray',
         textAlign:'center',
         marginTop:20,
         marginBottom:40
     },

     box:{
        alignItems:'center',
        alignSelf:'center',
        width: 160,
        height:40,
        backgroundColor:'#d3d3d3',
        borderRadius:2
     },

     buttonStyle: 
     {
         backgroundColor: 'darkmagenta',
         marginTop: 40,
         alignSelf: 'center',
         width: 120,
         height: 40,
         borderRadius:5
     },

     submitTextStyle: 
     {
         color: 'white',
         paddingTop: 7,
         textAlign: 'center',
         fontSize:20
     },
     bgImage: {
        flex: 1,
        resizeMode: "cover", 
      }
});

export default codeScreen;