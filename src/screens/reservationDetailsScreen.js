import React from 'react'
import {Text,StyleSheet,View,TouchableOpacity,ImageBackground} from 'react-native'
import {useQuery} from '@apollo/react-hooks'
import {Reservation_details} from '../../queries'
import {MaterialIcons,Entypo} from '@expo/vector-icons'
import moment from 'moment';



const reservationDetailsScreen =({navigation})=>{
    const id = navigation.getParam('_id') ;  

    const { loading, error, data } = useQuery(Reservation_details,{
        variables:{_id:id}}) ;

    if(loading) return <Text style={styles.textStyle}>Loading..</Text>
    if(error) return <Text style={styles.textStyle}>Error</Text>

    return (
        <View style={styles.container} >
        <ImageBackground source={ require('../../assets/bg.png')} style={styles.bgImage}>

        <Text style={styles.textStyle}>{data.reservation.unit.name}</Text>

        

        <View style={{flexDirection:'row'}}>
            <Entypo name='user' style={styles.icon}/>
            <Text style={styles.details}>{data.reservation.user.name}</Text>
        </View>

        <View style={{flexDirection:'row'}}>
            <Entypo name='phone' style={styles.icon}/>
            <Text  style={styles.details}>{data.reservation.user.phoneNumber}</Text>
        </View>

        <View style={{flexDirection:'row'}}>
            <Entypo name='email' style={styles.icon}/>
            <Text style={styles.details}>{data.reservation.user.email}</Text>
        </View> 

        <View style={{flexDirection:'row'}}>
            <MaterialIcons name='person' style={styles.icon}/>
            <Text style={styles.details}>{data.reservation.count.toString()}</Text>
        </View>

        <View style={{flexDirection:'row',marginBottom:5}}>
                        <Entypo name='time-slot' style={styles.icon}/>
                        <View style={{flexDirection:'column',marginBottom:5}}>
                        <Text style={styles.details}>from:{moment(data.reservation.time.from).format('MMMM Do YYYY, h:mm:ss a').toString()}</Text>
                        <Text style={styles.details}>to:{moment(data.reservation.time.to).format('MMMM Do YYYY, h:mm:ss a').toString()}</Text>
                        </View>
        </View>
      

        <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={async(e)=>navigation.navigate('updateReservation',{id:id})}>
                <Text style={{fontSize:20,color:'white',alignSelf:'center',textAlign:'center',marginTop:3}}>Update reservation</Text>
            </TouchableOpacity>
        </View>
</ImageBackground>
        </View>
        )
    
          
}

const styles=StyleSheet.create({
    textStyle:{
        marginTop:10,
        fontSize:20,
        marginLeft:10,
        color:'black',
        textShadowColor: 'lightgray',
        textShadowOffset: {width:1, height:2},
        textShadowRadius: 3
    },
    details:{
        fontSize:15,
        color:'dimgrey',
        
    },
    icon:{
        fontSize:17,
        color:'steelblue',
        marginLeft:10
    },
    buttonStyle:{
        height:35,
        width:350,
        backgroundColor:'steelblue',
        textAlign:'center',
        alignItems:'center',
        borderRadius:10,
        alignSelf:'center',
        marginTop:10,
        shadowColor:'lightgray',
        shadowOffset:{width: 1, height: 4},
        shadowRadius:3
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        
      },
      container: {
        flex:1
        },
});

export default reservationDetailsScreen;