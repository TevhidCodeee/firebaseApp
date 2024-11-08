import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";
import auth from '@react-native-firebase/auth';
import Login from "./pages/auth/login";
import Sign from "./pages/auth/sign";
import Messages from "./pages/Messages";
import colors from "./styles/color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const Stack = createStackNavigator();


export default function App() {

  const [userSession, setUserSession] = useState(Boolean);

  useEffect(() => {
    auth().onAuthStateChanged((user) =>{
      setUserSession(!!user);
    })
  },[])

  const AuthStack = () => {
    return(
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="LoginPage" component={Login}/>
        <Stack.Screen name="SignPage" component={Sign}/>
      </Stack.Navigator>
    )
  }

  return(
    <NavigationContainer>
        {
          !userSession ? (
            <AuthStack/>
          ):(
      <Stack.Navigator>
          <Stack.Screen name="MessagePage" component={Messages} 
          options={{title:'dertler', headerTintColor:colors.blue, 
            headerRight: () => <Icon name="logout" size={30} color={colors.blue}
            onPress={()=>auth().signOut()}
            />}}/>
      </Stack.Navigator>
        )}
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}
