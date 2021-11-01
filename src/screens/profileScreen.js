import React,{useState} from 'react'
import {StyleSheet,View,Text,ImageBackground,Image,TouchableOpacity,FlatList} from 'react-native'
import {Space_profile}from '../../queries'
import {useQuery} from '@apollo/react-hooks'
import StarRating from 'react-native-star-rating'; 
import { Entypo,MaterialIcons,AntDesign} from '@expo/vector-icons';
import Dialog, {  DialogContent,DialogTitle } from 'react-native-popup-dialog';



const profileScreen =({navigation})=>{
    const { loading, error, data } = useQuery(Space_profile); 
    const [dialog, setDialog] = useState(false);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error</Text>;
    return(

        <View style={styles.container}>
            <ImageBackground source={ require('../../assets/bg.png')} style={styles.bgImage}>
            <View style={{flexDirection:'column'}}>

                <View style={{marginLeft:10,flexDirection:'row',marginTop:5}}>
                    <Image source={require('../../assets/spacelogo.png')} style={{height:60,width:60}}/>
                    <Text style={{fontSize:30 ,color:'dimgrey',fontWeight:'bold',textShadowColor: 'lightgray',textShadowOffset: {width: 1, height: 4},textShadowRadius: 3,alignSelf:'center' }}>{data.space.name}</Text>
                </View>
                <View style = {styles.lineStyle}/>
                <Text style={styles.details}>Phone Number</Text>
                <View style={{marginLeft:10,flexDirection:'row',marginTop:5}}>
                    <Entypo name='phone' style={{fontSize:17, color:'darkgoldenrod',marginRight:3}}/>
                    <Text style={{fontSize:20,color:'black',marginBottom:10}}>{data.space.phoneNumber}</Text>
                </View>
                <Text style={styles.details}>Location</Text>
                <View style={{marginLeft:10,flexDirection:'row',marginTop:5}}>
                    <MaterialIcons name='location-on' style={{fontSize:20, color:'darkgoldenrod',marginRight:3}}/>
                    <Text style={{fontSize:20,color:'black',marginBottom:10}}>{data.space.location}</Text>
                </View>
                <Text style={styles.details}>Rating</Text>
                <View style={{flexDirection:'row'}}>
                <View style={{marginLeft:10,flexDirection:'row',marginTop:5}}>
                    
                    <StarRating disabled ={true}
                    maxStars={5} 
                    rating={data.space.rating}
                    starSize={15}
                    fullStarColor ='darkgoldenrod'   
                    emptyStarColor = 'darkgoldenrod' 
                    
                /> 
                </View>
                
    <Text style={{marginTop:3}}>({data.space.rating.toFixed(2)})</Text>
    </View>

<TouchableOpacity onPress={() => {
           setDialog(true)}} >
 <Text style={{color:"darkgoldenrod",alignSelf:'center',marginBottom:20,marginTop:10,fontSize:17}}>Show reviews</Text>
 </TouchableOpacity>

 <Dialog
         visible={dialog}
      
         onTouchOutside={() => {
           setDialog(false)
        }}
           dialogTitle={<DialogTitle title="Reviews" textStyle={{color: '#daa520' , fontFamily: 'Avenir', fontWeight: 'bold', fontSize: 20}} />}
           dialogStyle={{height: 300 , width: 350 }}
        >

<DialogContent>
            {data? 
              <FlatList
                  data={data.space.reviews}
                  renderItem={({item}) => {
                     return (
                       <View style={{flexDirection: 'row', marginLeft:5, marginTop: 10}}>
                            <Text style={{ fontFamily: 'Avenir', fontWeight: 'bold'}}>{item.user.email}:</Text>
                            <Text style={{ fontFamily: 'Avenir'}}>{item.text}</Text>
                       </View>
                     )
                  }}
              />
            :null}
        </DialogContent>
     </Dialog>


               
            </View>
            </ImageBackground>
            </View>
     )

    
}

const styles=StyleSheet.create({
    lineStyle:{
        borderWidth: 0.2,
        backgroundColor:'lightgray',
        margin:10,
   },
   details:{
       color:'dimgrey',
       fontSize:17,
       marginLeft:5,
       marginTop:10
   },
   bgImage: {
    flex: 1,
    resizeMode: "cover",
    
  },
  container: {
    flex:1
    },
});

export default profileScreen;