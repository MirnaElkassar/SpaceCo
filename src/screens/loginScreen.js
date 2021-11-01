import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, AsyncStorage,ImageBackground,Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { space_login, get_tokens } from '../../queries'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'



const LoginScreen = ({ navigation }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [logInUser, loginUserData] = useMutation(space_login);
  const [getToken, { loading, error, called, data }] = useLazyQuery(get_tokens);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      getToken({ variables: { token } });
    }
    checkToken();
  }, []);

  useEffect(() => {
    if (data) {
      navigation.navigate('Reservations', { email: loginEmail });
    }
  }, [data]);

  const submit = async (e) => {
    const data = await logInUser({
      variables: { email: loginEmail, password: loginPw }
    });
    if (data) {
      const token = data.data.logIn.token;
      await AsyncStorage.setItem("token", token);
      setLoginEmail("");
      setLoginPw("");
      navigation.navigate('Reservations', { email: loginEmail });
    }}

  

  return (
    <View style={styles.container} >
<ImageBackground source={ require('../../assets/bg.png')} style={styles.bgImage}>

  <Image source={require('../../assets/logob.png')} style={{height:250,width:200,alignSelf:'center'}}/>

      

      <View style={{ marginTop: 5 }}>
        <View style={styles.inputmailStyle}>
          <AntDesign name='mail' style={{ fontSize: 17, color: 'darkmagenta', marginTop: 4, marginLeft: 5 }} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder='Email'
            placeholderTextColor='dimgrey'
            style={styles.textinputStyle}
            value={loginEmail}
            onChangeText={newValue => (setLoginEmail(newValue))}

          />
        </View>
        <View style={styles.inputpswStyle}>
          <AntDesign name='lock' style={{ fontSize: 21, color: 'darkmagenta', marginTop: 2, marginLeft: 1 }} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder='Password'
            placeholderTextColor='dimgrey'
            style={styles.textinputStyle}
            value={loginPw}
            onChangeText={newValue => (setLoginPw(newValue))}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('forgotPw')}>
          <Text style={{ fontSize: 15, color: 'dimgrey', alignSelf: 'flex-end', marginRight: 25, marginTop: 15 }}>Forgot Password ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle} onPress={submit}>
          <Text style={styles.logintextStyle}>Login</Text>
          {loginUserData.error && loginUserData.error.message ? <Text style={{color:'red',alignSelf:"center",marginTop:20}}>Email/Password is incorrect</Text> : null}
        </TouchableOpacity>
        </View>
        </ImageBackground>
      </View>
    
  );
};

const styles = StyleSheet.create({

  container: {
    flex:1
    },
  textinputStyle: {
    fontSize: 20,
    paddingBottom: 5,
    marginLeft: 7
  },

  inputmailStyle:
  {
    marginTop:1,
    marginLeft: 15,
    marginRight: 20,
    borderRadius: 7,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  inputpswStyle:
  {
    marginTop: 50,
    marginLeft: 15,
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
    height: 46,
    borderRadius: 10
  },
  logintextStyle:
  {
    color: 'white',
    paddingTop: 7,
    textAlign: 'center',
    fontSize: 22,
  },

  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
})

export default LoginScreen;

