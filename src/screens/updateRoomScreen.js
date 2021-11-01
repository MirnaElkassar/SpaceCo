import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Room_details, Update_room } from '../../queries'
import rooms from './roomsScreen'



const updateRoomScreen = ({ navigation }) => {
    const id = navigation.getParam('id');
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [updateRoom] = useMutation(Update_room)
    const { loading, error, data } = useQuery(Room_details, {
        variables: { _id: id }, onCompleted:
            (data) => {
                setName(data.room.name);
                setCapacity(data.room.capacity)
            }
    });

    if (loading) return <Text style={styles.textStyle}>Loading..</Text>
    if (error) return <Text style={styles.textStyle}>Error</Text>
    console.log(data)
    return (
        <View style={styles.container} >
            <ImageBackground source={require('../../assets/bg.png')} style={styles.bgImage}>

                <View style={{ flexDirection: 'column', alignItems: 'baseline', borderBottomWidth: 1, borderColor: 'lightgray', marginHorizontal: 10 }}>
                    <Text style={styles.textStyle}>Name</Text>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={name}
                        onChangeText={(newValue) => setName(newValue)}
                        style={{ fontSize: 17, color: 'black', marginLeft: 5, marginTop: 5 }} />
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'baseline', borderBottomWidth: 1, borderColor: 'lightgray', marginHorizontal: 10 }}>
                    <Text style={styles.textStyle}>Capacity</Text>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={capacity.toString()}
                        onChangeText={(newValue) => (setCapacity(newValue))}
                        style={{ fontSize: 17, color: 'black', marginLeft: 5, marginTop: 5 }} />
                </View>

                <View style={styles.buttonStyle}>
                    <TouchableOpacity onPress={async (e) => {
                        const variables = { _id: id, name: name, capacity: parseInt(capacity) };
                        const result = await updateRoom({ variables });
                        navigation.navigate('rooms')
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
        marginTop: 484,
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

export default updateRoomScreen;