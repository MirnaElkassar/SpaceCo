import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Course_details, Update_course } from '../../queries'
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment';
import courses from './coursesScreen'




const updateRoomScreen = ({ navigation }) => {
    const id = navigation.getParam('id');
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [instructor, setInstructor] = useState("");
    const [updateCourse] = useMutation(Update_course)
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('datetime');
    const { loading, error, data } = useQuery(Course_details, {
        variables: { _id: id }, onCompleted:
            (data) => {
                setName(data.course.name)
                setCapacity(data.course.capacity)
                setInstructor(data.course.instructor)
                setDate(new Date(data.course.time));
            }
    });

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        setDate(selectedDate);

    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
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

    if (loading) return <Text style={styles.textStyle}>Loading..</Text>
    if (error) return <Text style={styles.textStyle}>Error</Text>
    console.log(data)
    return (
        <View style={styles.container} >
            <ImageBackground source={require('../../assets/bg.png')} style={styles.bgImage}>
                <View style={{ height: 200 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'baseline', borderBottomWidth: 1, borderColor: 'lightgray', marginHorizontal: 10 }}>
                        <Text style={styles.textStyle}>Name</Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={name}
                            onChangeText={(newValue) => setName(newValue)}
                            style={{ marginLeft: 100, fontSize: 18, color: 'black', marginLeft: 5, marginTop: 5 }} />
                    </View>

                    <View style={{ flexDirection: 'column', alignItems: 'baseline', borderBottomWidth: 1, borderColor: 'lightgray', marginHorizontal: 10 }}>
                        <Text style={styles.textStyle}>Capacity</Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={capacity.toString()}
                            onChangeText={(newValue) => setCapacity(newValue)}
                            style={{ marginLeft: 100, fontSize: 18, color: 'black', marginLeft: 5, marginTop: 5 }} />
                    </View>

                    <View style={{ flexDirection: 'column', alignItems: 'baseline', borderBottomWidth: 1, borderColor: 'lightgray', marginHorizontal: 10 }}>
                        <Text style={styles.textStyle}>Instructor</Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={instructor}
                            onChangeText={(newValue) => setInstructor(newValue)}
                            style={{ marginLeft: 100, fontSize: 18, color: 'black', marginLeft: 5, marginTop: 5 }} />
                    </View >
                    <Text style={{ fontSize: 15, color: 'dimgrey', marginTop: 10, marginLeft: 15 }}>Course time</Text>
                    <View style={{ alignSelf: 'center' }}>
                        <TouchableOpacity
                            onPress={() => togglefrom()}
                            style={styles.dateButtonStyle}
                        >

                            <Text style={styles.timeStyle}>{moment(date).format('llll')}</Text>
                        </TouchableOpacity>

                        {show && (
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
                </View>

                <View style={styles.buttonStyle}>
                    <TouchableOpacity onPress={async (e) => {
                        const variables = { _id: id, name: name, capacity: parseInt(capacity), instructor: instructor, time: date.getTime() };
                        const result = await updateCourse({ variables });
                        navigation.navigate('courses')
                    }}>
                        <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', textAlign: 'center', marginTop: 3 }}>Update</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    textStyle: {
        marginTop: 10,
        fontSize: 15,
        marginLeft: 5,
        color: 'dimgrey'
    },
    buttonStyle: {
        height: 40,
        width: 350,
        backgroundColor: 'darkmagenta',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 390,
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
    timeStyle:
    {
        fontFamily: 'Avenir',
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 20

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


});

export default updateRoomScreen;