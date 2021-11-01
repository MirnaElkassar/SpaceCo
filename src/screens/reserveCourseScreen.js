import React, { useState } from 'react'
import { Text, StyleSheet, TextInput, TouchableOpacity, View, Alert, ImageBackground } from 'react-native'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Create_reservation, Space_profile } from '../../queries'
import NumericInput from 'react-native-numeric-input';

const reserveCourseScreen = ({ navigation }) => {
    const name = navigation.getParam('name');
    const _id = navigation.getParam('id');
    const [createReservation, createReservationData] = useMutation(Create_reservation);
    const { loading, error, data } = useQuery(Space_profile);
    const [count, setCount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [todate, setToDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [toshow, setToShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [tomode, setToMode] = useState('date');


    const submit = async () => {
        const variables = { _id: _id, from: date, to: todate, count: parseInt(count) };
        const result = await createReservation({ variables });
        navigation.navigate('reservations');
    };


    if (loading) return <Text style={styles.textStyle}>Loading..</Text>
    if (error) return <Text style={styles.textStyle}>Error</Text>

    return (
        <View style={styles.container} >
            <ImageBackground source={require('../../assets/bg.png')} style={styles.bgImage}>

                <Text style={{ fontSize: 17, color: 'dimgrey', marginTop: 210, marginLeft: 10 }}>Number of persons</Text>
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
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



                <View style={styles.buttonStyle}>
                    
                    <TouchableOpacity onPress={submit}>
                        <Text style={{ fontSize: 20, color: 'white', marginTop: 7, textAlign: 'center' }}> Reserve </Text>
                    </TouchableOpacity>
                    {createReservationData.data && createReservationData.data.createReservation ? <Text></Text> : null}
                    {createReservationData.error && createReservationData.error.message ? 
                     Alert.alert(
                        "Warning",
                        createReservationData.error.message,
                        [
                            {
                                text:'Ok',
                                onPress:()=>console.log("Ok pressed"),
                            }
                        ]
                    )
                        :null}
                </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    buttonStyle: {
        height: 40,
        width: 350,
        backgroundColor: 'darkmagenta',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 290,
        shadowColor: 'lightgray',
        shadowOffset: { width: 1, height: 4 },
        shadowRadius: 3
    },


    bgImage: {
        flex: 1,
        resizeMode: "cover",

    },

})

export default reserveCourseScreen;