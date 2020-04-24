import React from 'react'
import { View,Text , TouchableOpacity , Platform , StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import {CommonActions} from '@react-navigation/native'
import { getMetricMetaInfo,
         timeToString,
         getDailyReminder,
         clearLocalNotification,
         setLocalNotification
        } from '../utils/helpers'
import { SubmitEntry , RemoveEntry } from'../utils/Api'
import UdaictyStepper from './UdcityStepper'
import UdacitySlider from './UdacitySlider'
import DateHeader from './DateHeader'
import ResetBtn from './ResetBtn'
import { addEntry } from '../actions'
import { white, purple } from '../utils/colors'

 class AddEntry extends React.Component {
    state = {
        run : 0,
        bike : 0,
        swim : 0,
        sleep : 0,
        eat : 0, 
    }
              
    increment = (metric) =>{
        const { max , step } = getMetricMetaInfo(metric);
        const counter = this.state[metric] + step;
        this.setState({
            [metric] : counter >= max ? max : counter,
        })
    }
          
    decrement = (metric) =>{
        const { step } = getMetricMetaInfo(metric);
        this.setState((state) => {
            const counter = state[metric] - step;
            return {
                ...state,
                [metric] : counter <= 0 ? 0 : counter,
            }
        })
    }
    slide = (metric , value ) => {
        this.setState({
            [metric] : value ,
        })
    }

    submit = () => {
        const key = timeToString();
        const entry = this.state;
        
        this.setState({
            run : 0,
            bike : 0,
            swim : 0,
            sleep : 0,
            eat : 0,  
        });

        // updating redux state 
        this.props.dispatch(addEntry({
            [key]: entry,
        }));
        // go to home 
        this.toHome()
        // updating data base
        SubmitEntry(entry,key);
        // clear notfication
        clearLocalNotification().then(setLocalNotification)
    }


    reset =() => {
        const key = timeToString();
            // updating data base
        RemoveEntry(key);
           // updating redux state
        this.props.dispatch(addEntry({
            [key] : getDailyReminder()
        }));
        // go to home 
        this.toHome()

    }

    toHome = () => {
        this.props.navigation.dispatch(
            CommonActions.goBack({
                key: 'AddEntry',
            }))
    }
    render(){
        const infoObject = getMetricMetaInfo();
        const keys = Object.keys(infoObject);
        if(this.props.loggedin){
            return(
                <View style={styles.center}>
                    <Ionicons name={Platform.OS==='android' ? 'md-happy' : 'ios-happy'} size={100}/>
                    <Text>You already logged your information for today.</Text>
                    <ResetBtn onPress={this.reset} >
                        Reset
                    </ResetBtn>
                </View>
            )
        }
        return(
            <View style={styles.container} >
                <DateHeader date={(new Date()).toLocaleDateString()}/>
               {
                keys.map(key => {
                    const {getIcon , type , ...rest} = infoObject[key];
                    const value = this.state[key];
                    return (
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            {type === 'stepper' && 
                                <UdaictyStepper value={value}
                                onIncrement={() => this.increment(key)} 
                                onDecrement={() => this.decrement(key)}
                                {...rest} />
                            }
                            {type === 'slider' && 
                                <UdacitySlider value={value}
                                onChange={value => this.slide(key,value)}
                                {...rest} />
                            }   
                        </View>
                    )
                })
              }
              <TouchableOpacity style={Platform.OS === 'ios'? styles.iosSubmitBtn : styles.androidSubmitBtn }
                onPress={this.submit}>
                  <Text style={styles.submitBtnText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex :1 ,
        backgroundColor: white,
        padding : 20,
    },
    row: {
        flex: 1,
        flexDirection :'row',
        alignItems : 'center',
    },
     androidSubmitBtn:{
         backgroundColor : purple,
         padding : 10,
         paddingRight : 30,
         paddingLeft : 30,
         height: 45,
         borderRadius : 2,
         alignSelf: 'flex-end',
         justifyContent : 'center',
        alignItems : 'center',
     },
     iosSubmitBtn:{
        backgroundColor : purple,
        padding : 10,
        height: 45,
        borderRadius : 7,
        marginLeft : 40,
        marginRight:40,
    },
     submitBtnText : {
        color : white,
        fontSize:22,
        textAlign :'center',
     },
     center : {
        flex:1,
        justifyContent : 'center',
        alignItems : 'center',
        marginRight : 30,
        marginLeft : 30,
     },
});

function mapStateToProps(state){
    const key = timeToString();
    return{
        loggedin : ( state[key] ) && (typeof state[key].today === 'undefined') 
    }
}

export default connect(mapStateToProps)(AddEntry)