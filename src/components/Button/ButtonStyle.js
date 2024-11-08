import { StyleSheet } from "react-native";
import colors from "../../styles/color";

const base_style= StyleSheet.create({
    container:{
        margin:10,
        padding:15,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:7
    },
})

export default {
primary :StyleSheet.create({
    ...base_style,
    container:{
        ...base_style.container,
        backgroundColor:colors.blue,
    },
    button:{
        color:"white"
    }
}),
secondary:StyleSheet.create({
    ...base_style,
    container:{
        ...base_style.container,
        backgroundColor:"white",
        borderWidth:2.5,
        borderColor:colors.blue,
    },
    button:{
        color:colors.blue,
        fontWeight:"bold"
    }
}),
}
