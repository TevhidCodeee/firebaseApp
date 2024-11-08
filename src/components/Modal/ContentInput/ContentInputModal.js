import React, { useState } from "react";
import {TextInput, View } from 'react-native';
import styles from './ContentInputModalStyle';
import Modal from 'react-native-modal';
import Button from "../../Button";



export default function ContentInputModal ({visible, onClose, onSend}){
    
    const [text, setText] = React.useState(null);

    function handleSend(){
        if(!text){
            return;
        }
        onSend(text);
        setText(null)
        
    }

    return(
        <Modal style={styles.Modal} 
        isVisible={visible} 
        onSwipeComplete={onClose} 
        onBackdropPress={onClose} 
        onBackButtonPress={onClose}
        swipeDirection="down"
        >
            <View style={styles.container}>
                <View style={styles.input_container}>
                    <TextInput 
                    placeholder="Hadi Darla Milleti.." 
                    onChangeText={setText}
                    multiline
                    />
                </View>
                <Button text="Gönder" onPress={handleSend}/>
            </View>
        </Modal>
    )
}




