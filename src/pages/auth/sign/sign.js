import React,{useState} from "react";
import {Text, View} from 'react-native';
import { Formik } from 'formik';
import styles from './signStyle';
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';
import authErrorMessageParser from "../../../utils/authErrorMessageParser";

const initialFormValues = {
  useremail :"",
  password :"",
  repassword :"",
}

export default function Login({navigation}) {

  const [loading,setLoading]=useState(true)

  function handleLogin (){
    navigation.goBack()
  }


  async function handleFormSubmit(formValues){

    if(formValues.password!==formValues.repassword){
      showMessage({
        message:"Şifreler uyuşmuyor",
        type:"danger"
      });
      return;
    }
    else {
    try {
      setLoading(true)
      await auth().createUserWithEmailAndPassword(
        formValues.useremail, 
        formValues.password,
      )
      setLoading(false)
      console.log("Kayıt başarılı")
      navigation.goBack()
    } catch (error) {
      console.log(error);
      showMessage({
        message:authErrorMessageParser(error.code),
        type: "error",
      }); 
      setLoading(false);
    }
  }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.header}>Bana ne?</Text>
      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit} >
        {({values, handleSubmit, handleChange})=>(
          <>
            <Input value={values.useremail} onType={handleChange('useremail')} placeholder="e posta adresinizi giriniz"/>
            <Input value={values.password} onType={handleChange('password')} placeholder="şifrenizi giriniz"/>
            <Input value={values.repassword} onType={handleChange('repassword')} placeholder="şifrenizi giriniz"/>
            <Button text="Kayıt Ol" theme="primary" onPress={handleSubmit}/>
          </>
        )}
        
      </Formik>
      <Button text="Geri" theme="secondary" onPress={handleLogin}/>
    </View>
  )
}
