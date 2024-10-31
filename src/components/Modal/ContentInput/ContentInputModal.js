import React, { useState } from "react";
import {TextInput, View } from 'react-native';
import styles from './ContentInputModalStyle';
import Modal from 'react-native-modal';
import Button from "../../Button";



export default function ContentInputModal ({visible, onClose, onSend}){
    
    const [text, setText] = React.useState(null);

    function handleSend(){
        if(!text){//text yoksa fonksiyonu çalıştırma
            return;
        }
        onSend(text);//text componentini gönder
        setText(null)//çıkmadanda setText i boş bir Stringe çevir
        
    }

    return(
        <Modal style={styles.Modal} 
        isVisible={visible} 
        onSwipeComplete={onClose} 
        onBackdropPress={onClose} 
        onBackButtonPress={onClose}
        swipeDirection="down"//modal ı aşağı çekerek kapatmaya yarıyor
        >
            <View style={styles.container}>
                <View style={styles.input_container}>
                    <TextInput 
                    placeholder="Hadi Darla Milleti.." 
                    onChangeText={setText}
                    multiline//bu parammetre ile yazılar modal sınırı içinde alt satıra geçicek
                    />
                </View>
                <Button text="Gönder" onPress={handleSend}/>
            </View>
        </Modal>
    )
}




//onChangeText={setText} state i günceller
//modal ın açılır kapanırlığını messages ekranından kontrol ediyor olucaz
//çünkü messages sayfasındaki butona basınca açıl dediğimizde açılıcak kapan dediğimizde kapanıcak
//<Modal isVisible={visible}> visible değeri true old. modal görüntülenicek false 
//old. geri gidicek
//onBackdropPress = Arka plana basarak modalı kapatma
//onSwipeComplete = Aşağı kaydırarak kapatma
//onBackButtonPress = Android tarafında geri tuşuna basınca
// onClose methodunu ContentInputModal ı çağırdığımız zamana onun visible değerini 
// değiştirmek için kullanıcaz
//onSend de mesajı butona basınca göndereceğimiz zaman tetiklenen bir method
//onSend de property olarak text i göndersin