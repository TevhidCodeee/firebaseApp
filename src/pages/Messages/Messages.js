import React, { useState } from "react";
import { View, Text, FlatList } from 'react-native';
import FloatingButton from "../../components/FloatingButton/FloatingButton.js";
import ContentInputModal from "../../components/Modal/ContentInput/ContentInputModal.js";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContentData from "../../utils/parseContentData.js";
import MessageCard from "../../components/MessageCard/MessageCard.js";

export default function Messages(){

  const [inputModalVisible, setInputModalVisible] = React.useState(false);
  const [contentList, setContentList] = React.useState([]);
  React.useEffect(()=>{
    database()
    .ref('messages/')
    .on('value', snapshot => {
      const contentData = snapshot.val();
      // console.log(contentData)

      const parsedData = parseContentData(contentData || {});
      //database doluysa direk içindeki değeri alıcak ama boşsa null almayacak ve 
      //böylece hata da almayacağız boş obje göndericek
      setContentList(parsedData);//parsedDatayı setContentList in içine gönderdik
    })
  },[])
  //once diyerek tek seferde veri çekiyorduk on diyerekde sürekli abone oluyorduk

  function handleInputToogle(){
    setInputModalVisible(!inputModalVisible)
  }
  

  function handleSendContent(content){
    handleInputToogle();
    sendContent(content);
  }
  
  function sendContent(content){

    const userMail = auth().currentUser.email; //emiale bu şekilde ulaşabiliriz

    const contentObject={//db ye kaydediceğimiz obj yi db ye göndermeden oluşturduk
      text: content,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
      dislike:0,
    }
    database().ref("messages/").push(contentObject); //içeriği mesages a gönder
  }
  
  function handleBanane(item) {
    database().ref(`messages/${item.id}/`).update({dislike: item.dislike + 1})
  }

  const renderContent = ({item}) => <MessageCard message={item} onBanane={()=>handleBanane(item)}/>
//onBanane={()=>handleBanane(item.id)} handleBanane tetiklendiği anda itemın id sini handleBAnaneye gönder
  return(//fatliste data göndericez bu data content olucak
    <View style={{flex:1}} >
      <FlatList
      data={contentList}
      renderItem={renderContent}
      />
      <FloatingButton icon="plus" onPress={handleInputToogle}/>
      <ContentInputModal 
      visible={inputModalVisible} 
      onClose={handleInputToogle}
      onSend={handleSendContent}
      />
    </View>
  )
}

//realDb ile context değerini gönderme işlemlerini yapıcaz
//bilgi olarak contentin kendisini mail adresini ve zamanı yollayacağız

//açılan pencerelere modal denir ve bu konuda community nin geliştirdiği daha iyi
//react native modal yazıp gitgublı olan siteye gir
//normal bir component tasarlayıp modalla sararız

//----DATABASE E VERİ GÖNDERME İŞLEMLERİ-------\\

// function handleSendContent(content){
//   handleInputToogle();
//   sendContent(content);
// }

// function sendContent(content){

//   const userMail = auth().currentUser.email; //emiale bu şekilde ulaşabiliriz

//   const contentObject={//db ye kaydediceğimiz obj yi db ye göndermeden oluşturduk
//     text: content,
//     username: userMail.split('@')[0],
//     date: new Date().toISOString(),
//   }
//   database().ref("messages/").push(contentObject); //içeriği mesages a gönder
// }