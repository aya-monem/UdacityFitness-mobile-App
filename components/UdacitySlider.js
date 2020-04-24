import React from 'react'
import { View , Slider, Text , StyleSheet} from 'react-native'
import {gray} from '../utils/colors'

export default function UdacitySlider(props){
    const {value ,unit, max , step , onChange} = props
    return(
        <View style={styles.row} >
           <Slider 
                style={{flex:1}}
                value={value}
                onValueChange={onChange}
                minimumValue={0}
                maximumValue={max}
                step={step} />
           <View style={styles.metricCounter}>
                <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
                <Text style={{fontSize: 18, color: gray}}>{unit} </Text>
           </View>
        </View>
    )
}
const styles = StyleSheet.create({
    row :{
        flex : 1,
        flexDirection : 'row',
        alignItems:'center',
    },
    metricCounter:{
        width: 85,
        justifyContent : 'center',
        alignItems : 'center',
    },
})