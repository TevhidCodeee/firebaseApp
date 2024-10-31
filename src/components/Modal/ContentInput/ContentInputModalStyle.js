import { Dimensions, StyleSheet } from "react-native";

const deviceSize= Dimensions.get('window')

export default StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:15,
        marginHorizontal:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        height:deviceSize.height/3,
    },
    input_container:{//Modal daki gönder butonunu aşağı indirdi
        flex:1
    },
    Modal:{
        justifyContent:"flex-end",
        margin:0,
    }
})