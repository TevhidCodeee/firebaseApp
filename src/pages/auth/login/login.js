import React, { useEffect, useState } from "react";
import {Text, View} from 'react-native';
import styles from './loginStyle'
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from "../../../utils/authErrorMessageParser";

const initialFormValues ={
  useremail:'',
  password:''
}


export default function Login({navigation}) {

  

  const [loading, setLoading] = useState(false);

  function handleSignUp () {
    navigation.navigate('SignPage')
  }

  async function handleFormSubmit(formValues){
    try {
      setLoading(true),
      await auth().signInWithEmailAndPassword(
        formValues.useremail, 
        formValues.password,
      )
      setLoading(false)
      navigation.navigate("MessagePage")
      console.log("Giriş Başarılı")
    } catch (error) {
      console.log(error);
      showMessage({
        message:authErrorMessageParser(error.code),
        type: "error",
      }); 
      setLoading(false);
    }
  } 

  return(
    <View style={styles.container}>
      <Text style={styles.header}>Bana ne?</Text>
      <Formik initialValues={initialFormValues} onSubmit={ handleFormSubmit}>
        {({values, handleChange, handleSubmit})=>(
          <>
            <Input value={values.useremail} onType={handleChange("useremail")} placeholder="e posta adresinizi giriniz"/>
            <Input  value={values.password} onType={handleChange("password")} placeholder="şifrenizi giriniz"/>
            <Button text="Giriş Yap" theme="primary" onPress={handleSubmit} loading={loading}/>
          </>
        
        )}
        
      </Formik>
      <Button text="Kayıt Ol" theme="secondary" onPress={handleSignUp}/>
    </View>
  )
}
