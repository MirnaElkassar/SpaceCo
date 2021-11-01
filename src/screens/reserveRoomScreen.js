import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity, View,ImageBackground,Alert,FlatList,Button} from 'react-native'
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks'
import { Create_reservation, Space_profile,Time_Availability,Show_rooms } from '../../queries'
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment"
import NumericInput from 'react-native-numeric-input';
import {Entypo} from '@expo/vector-icons';
import Dialog, {  DialogContent,DialogTitle } from 'react-native-popup-dialog';

const reserveRoomScreen = ({ navigation }) => {
    const name = navigation.getParam('name');
    const _id = navigation.getParam('id');
    const {loading: spaceLoading, data: spaceData} = useQuery(Space_profile);
    const {loading: roomLoading, data: roomData} = useQuery(Space_profile);
    const [createReservation, createReservationData] = useMutation(Create_reservation);
    const [getTimeAvailability, {loading, error, data}] = useLazyQuery(Time_Availability);
    const [count, setCount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [todate, setToDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [toshow, setToShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [tomode, setToMode] = useState('date');
    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        if (spaceLoading || !spaceData) return;
        getTimeAvailability({variables: {_id: spaceData.space._id, unit: _id}});
    }, [spaceData]);



    const submit = async () => {
        console.log(date.getTime(), todate.getTime());
        const variables = { _id: _id, from: date.getTime() , to: todate.getTime(), count: parseInt(count) };
        createReservation({ variables });
        navigation.navigate('reservations');
        
    };

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        setDate(selectedDate);

    };

    const on_Change = (event, selectedDate) => {
        setToShow(Platform.OS === 'ios');
        setToDate(selectedDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const show_Mode = (currentMode) => {
        setToShow(true);
        setToMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('datetime')
    };

    const show_Datepicker = () => {
        show_Mode('datetime')
    };
    const togglefrom = () => {
        if(show == false)
        {
            showDatepicker();
        }
        else setShow(false)
    }

    const toggleto = () => {
        if(toshow == false)
        {
            show_Datepicker();
        
        }
        else setToShow(false)
    }



    if (loading) return <Text>Loading..</Text>
    if (error) return <Text>Error</Text>
    

    return (
        <View style={styles.container} >
        <ImageBackground source={ require('../../assets/bg.png')} style={styles.bgImage}>
            <View style={{height:340}}>

        <Text style={{fontSize:17,color:'dimgrey',marginTop:10,marginLeft:10}}>Number of person(s)</Text>
        
       <View style={{alignSelf: 'center' , marginTop : 35}}>
          <NumericInput
            value={count}
            onChange={(newcount) => setCount(newcount)}
            totalWidth={240} 
            totalHeight={50} 
            iconSize={25}
            step={1}
            valueType='real'
            rounded 
            textColor='#daa520' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='darkmagenta' 
            leftButtonBackgroundColor='dimgrey' 
            minValue={1}
            maxValue={20}
             /> 
         </View>


        <Text style={{fontSize:17,color:'dimgrey',marginTop:10,marginLeft:10}}>Time Picked</Text>
        <View style={{alignSelf:'center'}}>
            <TouchableOpacity 
           onPress={togglefrom}
            style={styles.dateButtonStyle}
            >
             <Text style={styles.dateTextStyle}>From</Text>
             <Text style={styles.timeStyle}>{moment(date).format('llll')}</Text>
         </TouchableOpacity> 
        
        { show && (  
                 <DateTimePicker
                 testID="dateTimePicker"
                 timeZoneOffsetInMinutes={120}
                 value={date}
                 mode={mode}
                 is24Hour={true}
                 display="default"
                 onChange={onChange}
            />
     )} 
     </View>
<View style={{alignSelf:'center'}}>
<TouchableOpacity 
           
           onPress={toggleto} 
            style={{width:200,height:30, marginLeft: 10, height: 55, width: 210,backgroundColor: 'silver',
                marginTop: 20, 
                borderRadius: 4
              }}
            >
             <Text style={styles.dateTextStyle}>To</Text>
             <Text style={styles.timeStyle}>{moment(todate).format('llll')}</Text>
         </TouchableOpacity> 
        { toshow && (  
                 <DateTimePicker
                 testID="dateTimePicker"
                 timeZoneOffsetInMinutes={120}
                 value={todate}
                 mode={tomode}
                 is24Hour={true}
                 display="default"
                 onChange={on_Change}

            />
       )}  
       </View>

       <View style={{marginTop: 20}} >
       <Button
         title="Show Reservations"
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
           dialogTitle={<DialogTitle title="Reservations" textStyle={{color: '#daa520' , fontFamily: 'Avenir', fontWeight: 'bold', fontSize: 20}} />}
           dialogStyle={{height: 300 , width: 350 }}
        >
        <DialogContent>
            {data? 
              <FlatList
                  data={data.roomReservationTimes}
                  renderItem={({item}) => {
                     return (
                       <View style={{flexDirection: 'row', marginLeft: 12, marginTop: 10}}>
                            <Text style={{ fontFamily: 'Avenir', fontWeight: 'bold'}}>{moment(item.from).format('MMM do, dd h:mm a')}</Text>
                            <Entypo name={'arrow-long-right'} style={{fontSize: 20, marginLeft: 5, marginRight: 5, color: 'darkmagenta'}}/>
                             <Text style={{ fontFamily: 'Avenir', fontWeight: 'bold'}}>{moment(item.to).format('MMM do, dd h:mm a')}</Text>
                       </View>
                     )
                  }}
              />
            :null}
        </DialogContent>
     </Dialog>
     </View>
     </View>
    


            <View style={styles.buttonStyle}>
                <TouchableOpacity onPress={submit}>
                    <Text style={{ fontSize: 20, color: 'white', marginTop: 7, textAlign: 'center' }}> Reserve </Text>
                </TouchableOpacity>
                </View>
                {error? <Text>Error..</Text>:null}
                {loading? <Text>Loading..</Text> :null}
                {createReservationData.error && createReservationData.error.message?
                Alert.alert(
                    "Warning",
                    "The time of reservation overlaps with one of the spaces reservatios",
                    [
                        {
                            text:'Ok',
                            onPress:()=>console.log("Ok pressed"),
                        }
                    ]
                )
                    :null}
                
            

</ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 15,
        color: 'steelblue',
        textShadowColor: 'lightgray',
        textShadowOffset: { width: 1, height: 4 },
        textShadowRadius: 2,

    },

    buttonStyle: {
        height: 40,
        width: 350,
        backgroundColor: 'darkmagenta',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        marginTop:250,
        shadowColor: 'lightgray',
        shadowOffset: { width: 1, height: 4 },
        shadowRadius: 3
    },

    textStyle: {
        marginTop: 10,
        fontSize: 15,
        marginLeft: 10,
        color: 'lightgray',
        marginLeft: 5
    },
    textinputStyle: {
        fontSize: 18,
        paddingBottom: 5,
        marginLeft: 7
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",   
      },
      viewcountStyle: 
  {
     marginTop:5,
     marginLeft : 15,
     flexDirection: 'row',
     borderBottomWidth: 1,
     borderColor: 'lightgray',
     marginBottom:15
 },
      
    dateButtonStyle:
   {
    width:200, 
    height:30,
    marginLeft: 10,
    height: 55,
    width: 210,
    backgroundColor: 'silver',
    marginTop: 10, 
    borderRadius: 4
   },
   
   dateTextStyle: 
    { 
     color : 'darkmagenta',
     fontFamily: 'Avenir' ,
     fontSize:15,
     marginLeft: 10,
     marginTop: 5 ,
     fontWeight: 'bold'
    },
  timeStyle: 
  {
    fontFamily: 'Avenir' ,
     fontSize: 15,
      marginLeft: 10
  }

})

export default reserveRoomScreen;