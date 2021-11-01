import React, { useState } from 'react'
import { Text, StyleSheet, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { Create_course } from '../../queries'
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import moment from "moment"
import DateTimePicker from "@react-native-community/datetimepicker";
import courses from './coursesScreen'



const createCourseScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [instructor, setInstructor] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [createCourse, createCourseData] = useMutation(Create_course);

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

    return (

        <View style={styles.container} >
            <ImageBackground source={require('../../assets/bg.png')} style={styles.bgImage}>

                <Text style={styles.title}>Add course</Text>
                <View style={{ height: 500 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', borderBottomWidth: 1, marginBottom: 10, borderColor: 'lightgray', marginHorizontal: 10 }}>
                        <Entypo name='book' style={styles.icon} />
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder='Course name'
                            placeholderTextColor='dimgrey'
                            style={styles.textinputStyle}
                            value={name}
                            onChangeText={(newValue) => setName(newValue)}
                        />
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'baseline', borderBottomWidth: 1, marginBottom: 10, borderColor: 'lightgray', marginHorizontal: 10, marginTop: 20 }}>
                        <MaterialIcons name='person' style={styles.icon} />
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder='Course capacity'
                            placeholderTextColor='dimgrey'
                            style={styles.textinputStyle}
                            value={capacity}
                            onChangeText={(newValue) => setCapacity(newValue)}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'baseline', borderBottomWidth: 1, borderColor: 'lightgray', marginHorizontal: 10, marginTop: 20 }}>
                        <MaterialCommunityIcons name='teach' style={styles.icon} />
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder='Course instructor'
                            placeholderTextColor='dimgrey'
                            style={styles.textinputStyle}
                            value={instructor}
                            onChangeText={(newValue) => setInstructor(newValue)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
                        <Entypo name='time-slot' style={{ color: 'darkgoldenrod', fontSize: 23, marginTop: 30, marginLeft: 20 }} />
                        <View style={{ alignSelf: 'center' }}>
                            <TouchableOpacity
                                onPress={togglefrom}
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

                </View>

                <View>
                    <TouchableOpacity style={styles.buttonStyle} onPress={async () => {
                        const variables = { name: name, capacity: parseInt(capacity), instructor: instructor, time: date.getTime() };
                        const result = await createCourse({ variables });
                        navigation.navigate('courses')
                    }}>
                        <Text style={styles.textStyle}>Add</Text>
                    </TouchableOpacity>
                </View>

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
        marginBottom: 30,
        color: 'darkmagenta',
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
        marginTop: 5,
        shadowColor: 'lightgray',
        shadowOffset: { width: 1, height: 4 },
        shadowRadius: 3
    },
    textStyle:
    {
        color: 'white',
        paddingTop: 7,
        textAlign: 'center',
        fontSize: 20,
    },
    textinputStyle: {
        fontSize: 18,
        paddingBottom: 5,
        marginLeft: 7
    },
    icon: {
        fontSize: 25,
        color: 'darkgoldenrod',
        marginLeft: 10
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",

    },
    dateButtonStyle:
    {
        width: 200,
        height: 45,
        width: 210,
        backgroundColor: 'transparent',
        marginTop: 20,
        borderRadius: 4

    },
    timeStyle:
    {

        fontSize: 18,
        marginLeft: 10,
        color: 'dimgrey',
        marginTop: 12
    }

})

export default createCourseScreen;