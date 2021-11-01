import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks'
import { Reservation_details, Update_reservation, Space_profile, Time_Availability } from '../../queries'
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment';
import reservations from './reservationsScreen'
import NumericInput from 'react-native-numeric-input';




const updateReservationScreen = ({ navigation }) => {
    const id = navigation.getParam('id');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('datetime');
    const [todate, setToDate] = useState(new Date());
    const [toshow, setToShow] = useState(false);
    const [tomode, setToMode] = useState('datetime');
    const [count, setCount] = useState(0);
    const [updateReservation, updateReservationData] = useMutation(Update_reservation)
    const { loading: spaceLoading, data: spaceData } = useQuery(Space_profile);
    const [getTimeAvailability, { loading: timeLoading, data: timeData }] = useLazyQuery(Time_Availability);
    const { loading, error, data } = useQuery(Reservation_details, {
        variables: { _id: id }, onCompleted:
            (data) => {
                setDate(new Date(data.reservation.time.from));
                setToDate(new Date(data.reservation.time.to));
                setCount(data.reservation.count);
            }
    });

    useEffect(() => {
        if (spaceLoading || !spaceData || loading || data.__typename != "Room") return;
        getTimeAvailability({ variables: { _id: spaceData.space._id, unit: data.reservation.unit._id } });
    }, [spaceData, data]);
    console.log("TIME", timeData);

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

    const show_Datepicker = () => {
        show_Mode('datetime')
    };

    const showDatepicker = () => {
        showMode('datetime')
    };
    const togglefrom = () => {
        if (show == false) {
            showDatepicker();
        }
        else setShow(false)

    }

    const toggleto = () => {
        if (toshow == false) {
            show_Datepicker();
        }
        else setToShow(false)
    }

    if (loading) return <Text style={styles.textStyle}>Loading..</Text>
    if (error) return <Text style={styles.textStyle}>Error</Text>
    console.log(data)
    return (
        <View style={styles.container} >
            <ImageBackground source={require('../../assets/bg.png')} style={styles.bgImage}>
                <View style={{height:485}}>

                <View style={{ flexDirection: 'column', alignItems: 'baseline', marginHorizontal: 10 }}>
                    <Text style={styles.textStyle}>Name</Text>
                    <Text style={{ fontSize: 17, color: 'black', marginLeft: 5, marginTop: 5 }}>{data.reservation.user.name}</Text>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'baseline', marginHorizontal: 10 }}>
                    <Text style={styles.textStyle}>Phone Number</Text>
                    <Text style={{ fontSize: 17, color: 'black', marginLeft: 5, marginTop: 5 }}>{data.reservation.user.phoneNumber}</Text>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'baseline', marginHorizontal: 10 }}>
                    <Text style={styles.textStyle}>Email</Text>
                    <Text style={{ fontSize: 17, color: 'black', marginLeft: 5, marginTop: 5 }}>{data.reservation.user.email}</Text>
                </View>


                <View style={{ flexDirection: 'column', alignItems: 'baseline', marginHorizontal: 10 }}>
                    <Text style={styles.textStyle}>Number of person(s)</Text>
                    <Text style={{ fontSize: 17, color: 'black', marginLeft: 5, marginTop: 5 }}>{data.reservation.count}</Text>
                    <View style={{ alignSelf: 'center', marginTop: 35 }}>
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
                </View>

                <Text style={{ fontSize: 15, color: 'dimgrey', marginLeft: 10, marginTop: 20 }}>Time picked</Text>
                <View style={{ flexDirection: 'column', alignSelf: 'center' }}>



                    <View style={{ alignItems: "center", marginTop: 20, marginRight: 10 }}>
                        <TouchableOpacity
                            onPress={() => togglefrom()}
                            style={styles.dateButtonStyle}
                        >
                            <Text style={styles.dateTextStyle}>From</Text>
                            <Text style={styles.timeStyle}>{moment(date).format('llll')}</Text>
                        </TouchableOpacity>

                        {show && (
                            <DateTimePicker
                                style={{ width: "100%" }}
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={120}
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}

                        <TouchableOpacity
                            onPress={toggleto}
                            style={{
                                width: 200, height: 30, marginLeft: 10, height: 55, width: 210, backgroundColor: 'silver',
                                marginTop: 10,
                                borderRadius: 4,
                            }}
                        >
                            <Text style={styles.dateTextStyle}>To</Text>
                            <Text style={styles.timeStyle}>{moment(todate).format('llll')}</Text>
                        </TouchableOpacity>
                        {toshow && (
                            <DateTimePicker
                                style={{ width: "100%" }}
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
                </View>
                </View>



                <View style={styles.buttonStyle}>
                    <TouchableOpacity onPress={async (e) => {
                        const variables = { _id: id, count: parseInt(count), from: date.getTime(), to: todate.getTime() };
                        const result = await updateReservation({ variables });
                        navigation.navigate('reservations')
                    }}>
                        <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', textAlign: 'center', marginTop: 3 }}>Update</Text>
                    </TouchableOpacity>
                    {updateReservationData.error && updateReservationData.error.message ? <Text>Error..</Text> : null}
                </View>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    textStyle: {
        marginTop: 10,
        fontSize: 15,
        marginLeft: 10,
        color: 'dimgrey',
        marginLeft: 5
    },
    buttonStyle: {
        height: 40,
        width: 350,
        backgroundColor: 'darkmagenta',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 110,
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
    dateButtonStyle:
    {
        width: 200,
        height: 30,
        marginLeft: 10,
        height: 55,
        width: 210,
        backgroundColor: 'silver',
        marginTop: 10,
        borderRadius: 4
    },

    dateTextStyle:
    {
        color: 'darkmagenta',
        fontFamily: 'Avenir',
        fontSize: 15,
        marginLeft: 10,
        marginTop: 5,
        fontWeight: 'bold'
    },
    timeStyle:
    {
        fontFamily: 'Avenir',
        fontSize: 15,
        marginLeft: 10
    }

});

export default updateReservationScreen;