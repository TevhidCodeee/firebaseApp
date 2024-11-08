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

      const parsedData = parseContentData(contentData || {});
      setContentList(parsedData);
    })
  },[])

  function handleInputToogle(){
    setInputModalVisible(!inputModalVisible)
  }
  

  function handleSendContent(content){
    handleInputToogle();
    sendContent(content);
  }
  
  function sendContent(content){

    const userMail = auth().currentUser.email; 

    const contentObject={
      text: content,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
      dislike:0,
    }
    database().ref("messages/").push(contentObject); 
  }
  
  function handleBanane(item) {
    database().ref(`messages/${item.id}/`).update({dislike: item.dislike + 1})
  }

  const renderContent = ({item}) => <MessageCard message={item} onBanane={()=>handleBanane(item)}/>

  return(
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
