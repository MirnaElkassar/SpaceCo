import React ,{useState} from 'react'
import {Text,StyleSheet,TextInput,TouchableOpacity,View,ImageBackground} from 'react-native'
import {useMutation} from '@apollo/react-hooks'
import {Create_room} from '../../queries'
import {MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons'
import rooms from './roomsScreen'


const createRoomScreen =({navigation})=>{
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [createRoom,createRoomData]=useMutation(Create_room);
     
    
   

    return (
        <View style={styles.container} >
        <ImageBackground source={ require('../../assets/bg.png')} style={styles.bgImage}>
   
            <Text style={styles.title}>Add Room</Text>     
   
            <View style={{flexDirection:'row',alignItems:'baseline',borderBottomWidth: 1,borderColor: 'lightgray',marginHorizontal:10,marginBottom:10}}> 
             <MaterialCommunityIcons name='door'style={styles.icon}/>
             <TextInput 
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder= 'Room name' 
                  placeholderTextColor= 'dimgrey'
                  style={styles.textinputStyle}
                  value={name}
                  onChangeText={(newValue)=> setName(newValue)}
               />
           </View> 
   
           <View style={{flexDirection:'row',alignItems:'baseline',borderBottomWidth: 1,borderColor: 'lightgray',marginHorizontal:10,marginTop:20}}> 
             <MaterialIcons name='person' style={styles.icon}/>   
             <TextInput 
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder= 'Room capacity' 
                  placeholderTextColor= 'dimgrey'
                  style={styles.textinputStyle}
                  value={capacity}
                  onChangeText={(newValue) =>setCapacity(newValue)}
               />
           </View>  
   
   
   
           <View>
               <TouchableOpacity style={styles.buttonStyle} onPress={async()=>{
                   const variables={name:name,capacity:parseInt(capacity)};
                   const result=await createRoom({variables});
                   navigation.navigate('rooms')
               }}>
                    <Text style= {styles.textStyle}>Add</Text>
               </TouchableOpacity> 
           </View> 
    
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
        marginTop: 20,
        marginBottom:15,
        color: 'darkmagenta',
        textShadowColor: 'lightgray',
        textShadowOffset: {width: 1, height: 4},
        textShadowRadius: 2, 
         
    } ,
    buttonStyle:{
        height:40,
        width:350,
        backgroundColor:'darkmagenta',
        textAlign:'center',
        alignItems:'center',
        borderRadius:5,
        alignSelf:'center',
        marginTop:430,
        shadowColor:'lightgray',
        shadowOffset:{width: 1, height: 4},
        shadowRadius:3
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
     icon:{
        fontSize:25,
        color:'darkgoldenrod',
        marginLeft:10
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        
      },
     

   
}) 

export default createRoomScreen;