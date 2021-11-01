import React from 'react'
import {StyleSheet,View,Text,FlatList,ImageBackground} from 'react-native'
import {FAQs}from '../../queries'
import {useQuery} from '@apollo/react-hooks'



const FAQsScreen =({navigation})=>{
    const { loading, error, data } = useQuery(FAQs); 

    if (loading) return <Text style={styles.textStyle}>Loading...</Text>;
    if (error) return <Text style={styles.textStyle}>Error</Text>;
    return(
        <View style={styles.container} >
        <ImageBackground source={ require('../../assets/bg.png')} style={styles.bgImage}>
        
                <Text style={{fontSize:35,color:'dimgrey',textAlign:'center',textShadowOffset:{width:1,height:4},textShadowColor:'silver',textShadowRadius:3}}>Got questions?We've got answers</Text>
                <Text style={{fontSize:20,textAlign:'left',marginTop:40,color:'dimgrey',marginLeft:10}}>GENERAL QUESTIONS</Text>
                
                <FlatList
        data={data.faqs}
        keyExtractor={Faq=>Faq._id.toString()}
        renderItem={({item})=>{
            return(
                
    
                <View style={{flexDirection:'column',marginVertical:5}}>

                    <Text style={{fontSize:15,fontWeight:'bold',marginLeft:15,marginTop:10}}>{item.question}</Text>
                    <Text style={{fontSize:15,marginLeft:20,color:'dimgrey'}}>{item.answer}</Text>

                   
                   
                </View>   
        )}} 
        />
               
               </ImageBackground>
            </View>
     )

    
}

const styles=StyleSheet.create({
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        
      },
      container: {
        flex:1
        },
});

export default FAQsScreen;

