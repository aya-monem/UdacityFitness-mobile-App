import React from 'react'
import {View , Text , TouchableOpacity, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default function ResetBtn(props){
    const {onPress , children} = props
    return(
        <View>
            <TouchableOpacity onPress={onPress} >
                <Text style={styles.reset}> {children}</Text> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    reset: {
        padding:15 ,
        color: purple,
        fontSize : 20,
    }
})