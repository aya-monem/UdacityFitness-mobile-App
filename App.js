import React from 'react'
import { View, Platform , StatusBar} from 'react-native'
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'   //
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' //
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs' //
import {createStackNavigator } from '@react-navigation/stack'
import {FontAwesome , Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import reducer from './reducers/index'
import AddEntry from './components/AddEntry'
import History from './components/History'
import EntryDetails from './components/EntryDetails'
import Live from './components/Live'
import {white , purple } from './utils/colors'
import {setLocalNotification} from './utils/helpers'

function UdaciStatusBar({backgroundColor , ...props}){
  return(
    <View style={{backgroundColor , height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}
const store = createStore(reducer);
    const Tabs = Platform.OS === 'android' ? createMaterialTopTabNavigator() : createBottomTabNavigator();
    const TabsNav = () => {
      return (
        <Tabs.Navigator  initialRouteName="AddEntry"  
            screenOptions={({ route }) => ({
              tabBarIcon: ({ tintColor }) => {
                if (route.name === "Add Entry") {
                  return (
                    <FontAwesome name="plus-square" size={30} color={tintColor} />
                  );
                } else if (route.name === "History") {
                  return (
                    <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
                  );
                }
                else if (route.name === "Live") {
                  return (
                    <Ionicons name="ios-speedometer" size={30} color={tintColor} />
                  );
                }
              }
            })}

            tabBarOptions={{
              activeTintColor: Platform.OS === "ios" ? purple : white,
              style: {
                height: 60,
                backgroundColor: Platform.OS === "ios" ? white : purple,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
              }
            }
          }
           >
            <Tabs.Screen name="Add Entry" component={AddEntry} />
            <Tabs.Screen name="History" component={History} />
            <Tabs.Screen name="Live" component={Live} />
          </Tabs.Navigator>
      )
};

const Stack = createStackNavigator();
const StackNav = () =>{
     return(
       <Stack.Navigator headerMode="screen">
         <Stack.Screen 
            name='Home' 
            component={TabsNav} 
            options={{headerShown: false}}/>
         <Stack.Screen 
            name='Entry Details' 
            component={EntryDetails} 
            options={{
                headerTintColor: white,
                headerStyle: {
                    backgroundColor: purple,
                }
            }}/>
       </Stack.Navigator>
     )
}


class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render(){ 
    return (
      <Provider store={store}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
        <NavigationContainer style={{flex:1}}>
           {/* <TabsNav /> */}
           <StackNav />
        </NavigationContainer>
      </Provider> 
    )
  }
}

export default App;
