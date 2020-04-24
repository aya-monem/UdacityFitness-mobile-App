import React from 'react'
import {View , Text , StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import MetricCard from './MetricCard'
import ResetBtn from './ResetBtn'
import { white } from '../utils/colors'
import {addEntry} from '../actions'
import {timeToString , getDailyReminder} from '../utils/helpers'
import {RemoveEntry} from '../utils/Api'


class EntryDetails extends React.Component{
    setTitle(entryId){
        if(!entryId){
            return null
        };
        const year = entryId.slice(0,4)
        const month = entryId.slice(5,7)
        const day = entryId.slice(8)

         this.props.navigation.setOptions({
            title : `${month}/${day}/${year}`
        })
    }
    reset = () =>{
          const {remove , goBack , entryId} = this.props
          remove()
          goBack()
          RemoveEntry(entryId)
    }
    shouldComponentUpdate (nextProps , nextState, nextContext ) {
        return nextProps.metrics && !nextProps.metrics.today
      }
    render(){
        const {entryId , formattedDate , metrics} = this.props
        this.setTitle(entryId);
        return(
            <View style={styles.container}>
                <MetricCard date={formattedDate} metrics={metrics} />
                <ResetBtn onPress={this.reset} style={{margin:20}}>Reset</ResetBtn>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex :1 ,
        backgroundColor: white,
        padding : 15,
    }
})

function mapStateToProps(state , { route}){
    const {entryId , formattedDate } = route.params
    return{
         entryId,
         formattedDate,
         metrics : state[entryId]
    }
}

function mapDispatchToProps(dispatch , {route , navigation}){
        const {entryId} = route.params
       
        return{
            remove : () => dispatch(addEntry({
                [entryId]: timeToString() === entryId ? getDailyReminder() : null,
            })),
            goBack : () => navigation.goBack()
        }
}

export default connect(mapStateToProps , mapDispatchToProps)(EntryDetails);