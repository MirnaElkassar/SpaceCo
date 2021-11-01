import React ,{useState} from 'react'
import {Text,StyleSheet,TextInput,TouchableOpacity,View,ImageBackground,Button, FlatList} from 'react-native'
import {useMutation,useQuery} from '@apollo/react-hooks'
import {contact_us,Show_responses} from '../../queries'
import Dialog, {  DialogContent,DialogTitle } from 'react-native-popup-dialog';
import options from './optionsScreen'

const contactusScreen =({navigation})=>{
    const [message, setMessage] = useState('');
    const [dialog, setDialog] = useState(false);
    const [contactus,contactusData]=useMutation(contact_us);
    const { loading, error, data,refetch } = useQuery(Show_responses);
    console.log(data);

    if (loading) return <Text style={styles.textStyle}>Loading..</Text>
    if (error) return <Text style={styles.textStyle}>Error</Text>

    return(
    <View  style={styles.container}>
        <ImageBackground source={ require('../../assets/bg.png')} style={styles.bgImage}>
   
            <Text style={styles.title}>Contact us</Text>
            <Text style={{color:'dimgrey',marginBottom:7,marginLeft:5,fontSize:15}}>Message:</Text>
         <View style={styles.message}>  
            <TextInput 
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder= 'Type your message here..' 
                  placeholderTextColor= 'lightgray'
                  style={styles.textinputStyle}
                  value={message}
                  onChangeText={(newValue)=> setMessage(newValue)}
               />
            </View> 
            <View>
               <TouchableOpacity style={styles.buttonStyle} onPress={async()=>{
                   const variables={message:message};
                   const result=await contactus({variables});
                   navigation.navigate('options')
               }}>
                    <Text style= {styles.textStyle}>Submit</Text>
               </TouchableOpacity> 
           </View> 


           <View style={{marginTop: 20}} >
       <Button
         title="Show responses"
         color=  '#daa520'
        onPress={() => {
           setDialog(true)
        }}
        />
       <Dialog
         visible={dialog}
      
         onTouchOutside={() => {
           setDialog(false)
        }}
           dialogTitle={<DialogTitle title="Responses" textStyle={{color: '#daa520' , fontFamily: 'Avenir', fontWeight: 'bold', fontSize: 20}} />}
           dialogStyle={{height: 300 , width: 350 }}
        >
        <DialogContent>
            <FlatList
                data={data.adminRequests}
                key
                renderItem = {({item}) => (
                    <View>
                        <Text style={{ fontFamily: 'Avenir', fontWeight: 'bold',marginLeft:5}}>{item.message}</Text>
                        <Text style={{ fontFamily: 'Avenir',marginLeft:8}}>{item.response}</Text>
                    </View>
                )}
            />
        </DialogContent>
     </Dialog>
     </View>
    

           
           </ImageBackground>       
        
    </View>
    )}

const styles=StyleSheet.create({
    container : {
        flex: 1,
      
    },

    title :{
    
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom:30,
        color: 'darkmagenta',
        textShadowColor: 'lightgray',
        textShadowOffset: {width: 1, height: 4},
        textShadowRadius: 2, 
         
    },
    textinputStyle : { 
        fontSize: 15,
        paddingBottom: 5,
        marginLeft: 7,
        marginTop:5
     },
     buttonStyle:{
        height:40,
        width:90,
        backgroundColor:'darkmagenta',
        textAlign:'center',
        alignItems:'center',
        borderRadius:5,
        alignSelf:'flex-end',
        marginTop:10,
        shadowColor:'lightgray',
        shadowOffset:{width: 1, height: 4},
        shadowRadius:3,
        marginRight:5
    },
    textStyle: 
    {
        color: 'white',
        paddingTop: 7,
        textAlign: 'center',
        fontSize: 20,
    },
    message:{
        marginHorizontal:20,
        width:350,
        height:200,
        borderColor:'dimgrey',
        borderWidth:1,
        borderRadius:3,
        backgroundColor:'white',
        alignSelf:'center'

    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        
      }
})

export default contactusScreen;