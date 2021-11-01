import React, { useState } from 'react'
import { Text, StyleSheet, FlatList, Alert, View, TouchableOpacity, ImageBackground,RefreshControl,Button } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Show_reservations } from '../../queries'
import { createStackNavigator } from 'react-navigation-stack'
import { Entypo, AntDesign } from '@expo/vector-icons'
import reservationDetailsScreen from './reservationDetailsScreen'
import updateReservationScreen from './updateReservationScreen'
import reserveRoomScreen from './reserveRoomScreen'
import reserveCourseScreen from './reserveCourseScreen'
import moment from 'moment'
import Swipeout from 'react-native-swipeout'
import { Cancel_reservation } from '../../queries'

const reservationsScreen = ({ navigation }, props) => {
    const { loading, error, data, refetch} = useQuery(Show_reservations);
    const [cancelReservation] = useMutation(Cancel_reservation)
    const [refresh, setRefresh] = useState('false');
    const [refreshing, setRefreshing] = useState(false);
    if (loading) return <Text style={styles.textStyle}>Loading..</Text>
    if (error) return <Text style={styles.textStyle}>Error</Text>


    return (

        <View style={styles.container}>
            <ImageBackground source={ require('../../assets/bg.png')} style={styles.bgImage}>

            <FlatList

                data={data.space.reservations.sort((a, b) => b.time.from - a.time.from)}
                keyExtractor={Reservation => Reservation._id.toString()}
                extraData={refresh}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={async () => {
                            setRefreshing(true);
                            await refetch();
                            setRefreshing(false);
                        }}
                    />
                }
                renderItem={({ item, index }) => {
                    return (

                        <Swipeout
                            autoClose={true}
                            backgroundColor="transparent"
                            left={[
                                {
                                    onPress: () => {
                                        Alert.alert('Alert', 'Are you sure you want to confirm this reservation?',
                                            [
                                                { text: 'No', onPress: () => console.log('Not Confirmed') },
                                                {
                                                    text: 'Yes', onPress: () => {
                                                        item.state = "CONFIRMED"

                                                        setRefresh(!refresh)
                                                    }
                                                }

                                            ],
                                            { cancelable: true }
                                        );
                                    },
                                    text: 'Confirm', type: 'default'
                                }
                            ]}
                            right={[
                                {
                                    onPress: () => {
                                        Alert.alert('Alert', 'Are you sure you want to cancel this reservation?',
                                            [
                                                { text: 'No', onPress: () => console.log('Not Cancelled') },
                                                {
                                                    text: 'Yes', onPress: () => {
                                                        item.state = "CANCELLED"
                                                        cancelReservation({ variables: { _id: item._id } })
                                                        setRefresh(!refresh)
                                                    }
                                                }

                                            ],
                                            { cancelable: true }
                                        );
                                    },
                                    text: 'Cancel', type: 'delete'
                                }]}
                            rowId={index} sectionId='1'

                        >


                            <View style={{ flexDirection: 'column', marginVertical: 5, }} >

                                <Text style={styles.textStyle}>{item.unit.name}</Text>

                                <View style={{ flexDirection: 'row' }}>

                                    <View style={{ flexDirection: 'column',width:200 }}>


                                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            <AntDesign name='infocirlceo' style={styles.icon} />
                                            <Text style={styles.details}>{item.state}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            <Entypo name='time-slot' style={styles.icon2} />
                                            <Text style={styles.details2}>{moment(item.time.from).format("dd:HH:mm").toString()} - </Text>
                                            <Text style={styles.details2}>{moment(item.time.to).format("dd:HH:mm").toString()}</Text>
                                        </View>

                                    </View>


                                    <TouchableOpacity   style={{color: 'darkmagenta', marginLeft:130, fontSize: 17}}>
                                    <Button
                                    title='Edit'
                                    color='darkmagenta'
                                    disabled={item.unit.__typename === "Course"}
                                    onPress={async (e) => navigation.navigate('updateReservation', { id: item._id })} style={{ alignSelf: 'center' }}/>
                                    

                                    </TouchableOpacity>
                                </View>


                            </View>
                        </Swipeout>

                    )
                }}
            />
</ImageBackground>
        </View>


    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    textStyle: {
        fontSize: 20,
        marginLeft: 10,
        color: 'black',
        textShadowColor: 'lightgray',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 3,
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },

    icon: {
        fontSize: 15,
        color: 'darkgoldenrod',
        marginLeft:20,
        marginTop:12,
        marginRight:2
    },
    icon2: {
        fontSize: 15,
        color: 'darkgoldenrod',
        marginLeft:20,
        marginTop:5,
        marginRight:2
    },

    details: {
        fontSize: 14,
        color: 'dimgrey',
        marginTop:10

    },
    details2: {
        fontSize: 14,
        color: 'dimgrey',
        marginTop:5

    }
    


});


export default createStackNavigator({
    reservations: reservationsScreen,
    reservationDetails: reservationDetailsScreen,
    updateReservation: updateReservationScreen,
    reserveRoom: reserveRoomScreen,
    reserveCourse: reserveCourseScreen
}, {
    initialRouteName: "reservations",
    defaultNavigationOptions: {
        headerTitle: "", headerStyle: {
            backgroundColor: 'darkmagenta',
        }, headerTintColor: 'white',

        headerTitleStyle: {
            fontSize: 25,
            color: 'white'
        }
    }
});