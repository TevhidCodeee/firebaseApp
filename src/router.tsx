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
      setUserSession(!!user);//usr nesnesi bana dolu geliosa true boş geliosa false olarak set edicek
    })
  },[])

//onAuthStateChanged() yetkilendirici method
  //harici bir stack yapısı oluşturduk
  const AuthStack = () => {//AuthStack adında bir iç fonksiyon tanımlanıyor. 
    //Bu, kimlik doğrulama ekranlarını içeriyor
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
            <AuthStack/>//Eğer kullanıcı giriş yapmamışsa (!userSession), AuthStack gösteriliyor
          // <Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown:false}}/>
          ):(
      <Stack.Navigator>
          <Stack.Screen name="MessagePage" component={Messages} 
          options={{title:'dertler', headerTintColor:colors.blue, 
            headerRight: () => <Icon name="logout" size={30} color={colors.blue}
            onPress={()=>auth().signOut()}
            />}}/>
      </Stack.Navigator>
        )}
          {/* <Stack.Screen name="SignPage" component={Sign}/> */}
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}


//screenOptions={{headerShown:false}} = başlıkları kapatma

// const checkDb=()=>{
//   const referance = database().ref('books/')
//  .. referance.once('value').then(snaphot =>{
//     const response = snaphot.val();
//     console.log(response)
//   })
// }

// const setDb = ()=> {
//   const reference = database().ref('car/rentable');
//   reference.set({
//     brand:'Audi',
//     model:'A8',
//     price:128
//   })
// }

// const updateDb= ()=> {
//   const reference = database().ref('car/rentable');
//   reference.set({
//     model:'A3'
//   })
// }

// const pushDb = () => {
//   const reference =database().ref('car/rentable');
//   reference.push({
//     brand:'Passat',
//     model:'81',
//     price:128
//   })
// }