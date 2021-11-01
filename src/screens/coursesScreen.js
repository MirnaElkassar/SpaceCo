import React, { useState } from 'react'
import { Text, StyleSheet, FlatList, View, TouchableOpacity, RefreshControl, Image, ImageBackground } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { Show_courses } from '../../queries'
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { createStackNavigator } from "react-navigation-stack";
import courseDetailsScreen from './courseDetailsScreen'
import createCourseScreen from './createCourseScreen'
import updateCourseScreen from './updateCourseScreen'

const coursesScreen = ({ navigation }) => {
    const { loading, error, data, refetch } = useQuery(Show_courses);
    const [refreshing, setRefreshing] = useState(false);
    if (loading) return <Text style={styles.textStyle}>Loading..</Text>
    if (error) return <Text style={styles.textStyle}>Error</Text>
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/bg.png')} style={styles.bgImage}>
                
                <FlatList
                    data={data.courses}
                    keyExtractor={course => course.name}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={async () => {
                                setRefreshing(true); -
                                    await refetch();
                                setRefreshing(false);
                            }}
                        />
                    }
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: 200 }}>
                                
                                    <View style={{ flexDirection: 'column', marginVertical: 5 }}>
                                        <TouchableOpacity onPress={async (e) => navigation.navigate('courseDetails', { _id: item._id })}>
                                        <Text style={styles.textStyle}>{item.name}</Text>
                                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            <MaterialIcons name='person' style={styles.icon} />
                                            <Text style={styles.details}>{item.capacity}</Text>
                                        </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={async (e) => navigation.navigate('courseDetails', { _id: item._id })} style={{ alignSelf: 'center' }}>
                                    <SimpleLineIcons name='arrow-right' style={{ color: 'darkmagenta', fontSize: 23, marginLeft: 147 }} />
                                </TouchableOpacity>

                            </View>


                        )
                    }}
                />

            </ImageBackground>
        </View>)
}


const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        marginLeft: 10,
        color: 'black',
        textShadowColor: 'lightgray',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 3
    },


    icon: {
        fontSize: 17,
        color: 'darkgoldenrod',
        marginLeft: 20,
        marginTop:7
    },
    details: {
        fontSize: 15,
        color: 'dimgrey',
        marginTop:7

    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },

    container: {
        flex: 1
    },

});

export default createStackNavigator({
    courses:{
    screen: coursesScreen, 
    navigationOptions: ({navigation}) => ({
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('createCourse')}>
                <MaterialIcons name='add' style={{ fontSize: 40, color: 'white' }} />
            </TouchableOpacity>
        ),
        headerStyle: {
            backgroundColor: 'darkmagenta'
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontSize: 21,
            color: 'white'
        }
    }),
},
    courseDetails:{
    screen: courseDetailsScreen,
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: 'darkmagenta'
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontSize: 21,
            color: 'white'
        }
    }),},
    createCourse:{
    screen: createCourseScreen,
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: 'darkmagenta'
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontSize: 21,
            color: 'white'
        }
    }),},
    updateCourse:{
    screen: updateCourseScreen,
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: 'darkmagenta'
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontSize: 21,
            color: 'white'
        }
    })}
}, {
    initialRouteName: "courses",
    mode:'modal',
    defaultNavigationOptions: ({ navigate, navigation }) => ({
        headerTitle: "",
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('createCourse')}>
                <MaterialIcons name='add' style={{ fontSize: 40, color: 'white' }} />
            </TouchableOpacity>
        ),
        headerStyle: {
            backgroundColor: 'darkmagenta'
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontSize: 21,
            color: 'white'
        }
    })

});