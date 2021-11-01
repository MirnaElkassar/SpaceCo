import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground,Image } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { Room_details } from '../../queries'
import { MaterialIcons,FontAwesome, Entypo } from '@expo/vector-icons'



const roomDetailsScreen = ({ navigation }) => {


    const id = navigation.getParam('_id');

    const { loading, error, data } = useQuery(Room_details, {
        variables: { _id: id }
    });

    if (loading) return <Text>Loading..</Text>
    if (error) return <Text>Error</Text>

    return (
        <View style={styles.container} >
            <ImageBackground source={require('../../assets/bg.png')} style={styles.bgImage}>

                <View style={{ flexDirection: 'column' }}>

                    <View>
            
                    <ImageBackground source={require('../../assets/room.png')} style={{width:'100%',height:250}}>
                        <View style={{flex: 1 ,backgroundColor : 'rgba(0,0,0,0.6)',alignItems: 'center'}}>
                        <Text style={styles.textStyle}>{data.room.name}</Text>
                        
                        
                        <View style={{ flexDirection: 'row',marginRight:20 }}>
                            <MaterialIcons name='person' style={styles.icon} />
                            <Text style={styles.details}>{data.room.capacity}</Text>
                            <Text style={{color:'darkgoldenrod'}}> PERSONS</Text>
                        </View>
                        </View>
            </ImageBackground>

                        <View  style={{flexDirection: 'row', marginTop: 10,alignSelf:'center'}}>
                  <Entypo name='check' style={{fontSize: 20 , color: 'darkmagenta'}}/>
                  <Text style={{marginTop: 2}}>A/C</Text>
                   <View style={{alignSelf:'flex-end', marginLeft: 100}}>
                    <View style={{flexDirection: 'row'}}>
                      <Entypo name='check' style={{fontSize: 20 , color: 'darkmagenta'}}/>
                      <Text style={{marginTop: 2}}>Projector</Text>
                      </View>
                   </View>
                </View>
                <View  style={{flexDirection: 'row',marginRight:30, marginTop: 10,alignSelf:'center'}}>
                  <Entypo name='check' style={{fontSize: 20 , color: 'darkmagenta'}}/>
                  <Text style={{marginTop: 2}}>Wi-Fi</Text>
                </View> 
                    </View>
                    <TouchableOpacity onPress={async (e) => navigation.navigate('updateRoom', { id: id })}>
                        <Text style={{ marginTop:40, fontSize:20, color: 'darkmagenta',alignSelf:'center' }}>Update room</Text>
                    </TouchableOpacity>
                </View>





                <View style={styles.buttonStyle}>
                    <TouchableOpacity onPress={async (e) => navigation.navigate('reserveRoom', { name: data.room.name, id: id, capacity: data.room.capacity })}>
                        <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', textAlign: 'center', marginTop: 3 }}>Reserve room</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )


}

const styles = StyleSheet.create({
    textStyle: {
        marginTop: 10,
        fontSize: 45,
        marginLeft: 10,
        color: 'ghostwhite',
        alignSelf:'center',
        marginTop:100,
        textShadowColor: 'lightgray',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 3
    },
    details: {
        fontSize: 15,
        color: 'darkgoldenrod'

    },
    icon: {
        fontSize: 17,
        color: 'darkgoldenrod',
        marginLeft: 20
    },
    buttonStyle: {
        height: 35,
        width: 350,
        backgroundColor: 'darkmagenta',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        marginTop:220,
        shadowColor: 'lightgray',
        shadowOffset: { width: 1, height: 4 },
        shadowRadius: 3
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",

    },
    container: {
        flex: 1
    },
});

export default roomDetailsScreen;