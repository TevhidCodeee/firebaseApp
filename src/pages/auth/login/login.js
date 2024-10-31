import React, { useEffect, useState } from "react";
import {Text, View} from 'react-native';
import styles from './loginStyle'
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
import authErrorMessageParser from "../../../utils/authErrorMessageParser";
// Örneğin, Firebase SDK 'auth/user-not-found' hata kodunu döndürürse, 
// authErrorMessageParser işlevi bunu "Girdiğiniz e-posta adresi kayıtlı değil" gibi 
// bir mesaja çevirir. Bu, kullanıcıya hatanın ne olduğuna dair açık bir açıklama sağlar, 
// ham hata kodunu göstermek yerine.

const initialFormValues ={//initialFormValues nesnesi formun başlangıç durumunu tanımlar,
  //Bu nesne Formik form durumunu başlatmak için kullanılır.
  useremail:'',
  password:''
}


export default function Login({navigation}) {

  

  const [loading, setLoading] = useState(false);
  //Bileşen, giriş işlemi devam ederken gösterilecek yükleme göstergesini 
  //temsil eden loading durumunu yönetmek için useState hook'unu kullanır.

  function handleSignUp () {//Bu fonksiyon, kullanıcı kayıt olma sayfasına gitmek istediğinde çağrılır.
    navigation.navigate('SignPage')
  }

  async function handleFormSubmit(formValues){//useremail ve password formValuesden gelicek
    //handleFormSubmit Fonksiyonu: Bu, giriş formunun gönderilmesini işleyen ana işlevdir.
    //Kullanıcı tarafından girilen useremail ve password değerlerini içeren formValues nesnesini alır.
    try {
      setLoading(true),
      await auth().signInWithEmailAndPassword(
        formValues.useremail, 
        formValues.password,
//Firebase SDK'dan auth().signInWithEmailAndPassword() yöntemi, 
//useremail ve password değerleriyle çağrılır.
      )
      setLoading(false)
      navigation.navigate("MessagePage")//Gİriş başarılıysa meesage Page sayfasına git
      console.log("Giriş Başarılı")
    } catch (error) {
//Giriş sırasında bir hata oluşursa, hata konsola kaydedilir ve 
//showMessage() işlevi kullanılarak bir mesaj gösterilir.
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
{/* //Bileşen, form durumunu yönetmek ve form gönderimini işlemek için Formik kütüphanesini kullanır. */}
{/* onSubmit özelliği, form gönderildiğinde çağrılacak handleFormSubmit işlevine ayarlanır.*/}
        {({values, handleChange, handleSubmit})=>(//calback function döndü ve formik value ları bana getirdi
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
//Formik geri arama işlevinin içinde, bileşen şunları oluşturur:

// Formik values ve handleChange işlevlerini kullanarak useremail ve password alanları için Input bileşenleri.
// Form gönderimini tetikleyen "Giriş Yap" metinli bir Button bileşeni.
// "Kayıt Ol" metinli başka bir Button bileşeni, bu handleSignUp işlevini çağırır.
}

//fragment herhangi bir şeyi single olarak paylaşmak istersek kullanırız
//kısa gösterimi şu şekilde 
// <>
//  ....
// </>

//onType ile takip durumunu gerçekleştiriyoruz handleChange ile çalışır
//ama ınput.js de onChangeText içinde tanımlaman lazım burda kullanabilmen için yoksa hata verir


//-----------error mesajı için kod parçası incele-----------\\

// async function handleFormSubmit(formValues){//useremail ve password formValuesden gelicek
//   try {
//     setLoading(true),
//     await auth().signInWithEmailAndPassword(
//       formValues.useremail, 
//       formValues.password,
//     )
//     setLoading(false)
//     console.log("Giriş Başarılı")
//   } catch (error) {
//     console.log(error);
//     showMessage({
//       message:authErrorMessageParser(error.code),
//       type: "error",
//     }); 
//     setLoading(false);
//   }
// } 