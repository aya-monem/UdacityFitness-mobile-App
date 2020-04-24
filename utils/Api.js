import {AsyncStorage } from 'react-native'
import {CALENDAR_STORAGE_KEY , formatCalendarResults} from './_calendar'

export function fetchCalendarResults(){
    return(
        AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(formatCalendarResults)
    ) 

}

export function SubmitEntry({ entry , key }){
    return(
        AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY , JSON.stringify(
            {[key] : entry}
        ))
    )
}

export function RemoveEntry({key}){
    return(
        AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(data => {
            // console.log(data)
            const parseData = JSON.parse(data);
            delete parseData[key]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY , JSON.stringify(parseData));
            
        })
    )
}