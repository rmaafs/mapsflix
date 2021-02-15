import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'

import TabOneScreen from './screens/TabOneScreen'
import ViewCapitulos from './screens/ViewCapitulos'
import ViewVideo from './screens/ViewVideo'

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'TabOneScreen'}
            >
                <Stack.Screen name="TabOneScreen" component={TabOneScreen} />
                <Stack.Screen name="ViewCapitulos" component={ViewCapitulos} />
                <Stack.Screen name="ViewVideo" component={ViewVideo} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;