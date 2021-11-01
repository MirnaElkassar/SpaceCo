import React from 'react'
import {Text,StyleSheet,View,TouchableOpacity,ImageBackground} from 'react-native'
import {useQuery} from '@apollo/react-hooks'
import {Course_details} from '../../queries'
import moment from "moment"
import {MaterialIcons,MaterialCommunityIcons,Entypo} from '@expo/vector-icons'


const courseDetailsScreen =({navigation})=>{
    const id = navigation.getParam('_id') ; 
    const { loading, error, data } = useQuery(Course_details,{
        variables:{_id:id}}) ;
    if(loading) return <Text>Loading..</Text>
    if(error) return <Text>Error</Text>
    return (
        <View style={styles.container} >
        <ImageBackground source={ require('../../assets/bg.png')} style={styles.bgImage}>
            <View style={{flexDirection:'column'}}>
            <View>
            <ImageBackground source={require('../../assets/course1.png')} style={{width:400,height:250}}>
            <View style={{flex: 1 ,backgroundColor : 'rgba(0,0,0,0.6)',alignItems: 'center'}}>
    <Text style={styles.textStyle}>{data.course.name}</Text>
    <View style={{flexDirection:'row',marginRight:20}}>
            <MaterialCommunityIcons name='teach' style={styles.icon}/>
            <Text style={{color:'darkgoldenrod',fontSize:18,marginTop:5}}>{data.course.instructor}</Text>
            </View>
    </View>
    </ImageBackground>
    <View style={{flexDirection:'row',width:160}}>
        <View style={{flexDirection:'row',marginLeft:50}}>
            <MaterialIcons name='person' style={styles.icon2}/>
            <Text style={styles.details}>{data.course.capacity}</Text>
            <Text style={{color:'black',marginTop:10}}> PERSONS</Text>
            </View>
            <View style={{flexDirection:'row',marginLeft:50}}>
            <Entypo name='time-slot' style={styles.icon2}/>
            <Text style={styles.details}>{moment(data.course.time).format('llll')}</Text>
            </View>
        </View>
        </View>

            <TouchableOpacity onPress={async(e)=>navigation.navigate('updateCourse',{id:id})}>
            <Text style={{ marginTop:40, fontSize:20, color: 'darkmagenta',alignSelf:'center'}}>Update course</Text>
            </TouchableOpacity>

            </View>

        <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={async(e)=>navigation.navigate('reserveCourse',{name:data.course.name,id:id,capacity:data.course.capacity})}>
                <Text style={{fontSize:20,color:'white',alignSelf:'center',textAlign:'center',marginTop:3}}>Reserve course</Text>
            </TouchableOpacity>
        </View>
</ImageBackground>
        </View>
        )
    
          
}


const styles=StyleSheet.create({
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
    details:{
        fontSize:15,
        color:'black',
        marginTop:10
        
    },
    icon:{
        fontSize:20,
        color:'darkgoldenrod',
        marginLeft:25,
        marginTop:10
    },
    icon2:{
        fontSize:18,
        color:'darkmagenta',
        marginTop:10
    },
    buttonStyle:{
        height:35,
        width:350,
        backgroundColor:'darkmagenta',
        textAlign:'center',
        alignItems:'center',
        borderRadius:5,
        alignSelf:'center',
        marginTop:240,
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
        }
});

export default courseDetailsScreen;