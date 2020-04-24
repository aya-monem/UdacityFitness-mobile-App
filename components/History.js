import React from 'react'
import {View , Text, TouchableOpacity , StyleSheet , Platform } from 'react-native'
import { AppLoading } from 'expo'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import {connect} from 'react-redux'
import {fetchCalendarResults} from '../utils/Api'
import {timeToString , getDailyReminder} from '../utils/helpers'
import {addEntry , receiveEntries } from '../actions'
import {white} from '../utils/colors'
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'

class History extends React.Component {
    state = {
        ready : false,
    }
    componentDidMount(){
        const {dispatch} = this.props;

        fetchCalendarResults()
        .then(entries => dispatch(receiveEntries(entries)))
        .then(({entries}) => {
            
           if(!entries[timeToString()]){
              dispatch(addEntry({
                  [timeToString()] : getDailyReminder(),
              }));
           }
        })
        .then(() => this.setState({
            ready : true,
        }))
        
    }
    renderItem = ({today , ...metrics} , formattedDate , key) => {
        return(
            <View style={styles.item}>
                {today
                ? <View>
                    <DateHeader date={formattedDate}/>
                    <Text style={styles.noDataText}>
                        {today}
                    </Text>
                 </View>
                : 
                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    'Entry Details' , {entryId : key , formattedDate : formattedDate }
                    )}>
                     <MetricCard metrics={metrics} date={formattedDate} />
                </TouchableOpacity>
                }
            </View>
        )
    }
    renderEmptyDate(formattedDate){
        return(
            <View  style={styles.item}>
                <DateHeader date={formattedDate}/>
                <Text style={styles.noDataText}>
                    No Data for this day
                </Text>
            </View>
        )
    }
render(){
    const { entries } = this.props;
    const {ready} = this.state

    if(ready === false ){
        return(
            <AppLoading />
        )
    }
    return(
        <UdaciFitnessCalendar 
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        />        
    )
}    
}

const styles = StyleSheet.create({
    item : {
        backgroundColor : white,
        borderRadius: Platform.OS === 'ios' ? 16 : 10,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 10,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: {
        width: 0,
        height: 3
    },
    },
    noDataText : {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
})
function mapStateToProps(entries){
    return {
        entries
    }
}

export default connect(mapStateToProps)(History)