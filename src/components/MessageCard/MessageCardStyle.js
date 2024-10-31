import { StyleSheet } from "react-native";
import colors from "../../styles/color";

export default StyleSheet.create({
    container:{
        backgroundColor:colors.blue,
        padding:10,
        margin:10,
        borderRadius:10,
        shadowColor:"black",
        shadowOpacity: 0.25,
        color:"white"

    },
   
    inner_container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"center"
    },
    title:{
        color:"white"
    },
    user:{
        color:"white"
    },
    date:{
        color:"white"
    },
    dislike_container:{
        flexDirection:"row",
        backgroundColor:colors.white,
        alignSelf:"flex-start",
        paddingRight:7,
        paddingLeft:7,
        paddingBottom:3,
        paddingTop:2,
        borderRadius:12,
        justifyContent:"flex-end"
    },
    dislike_title:{
        color:colors.blue,
        fontSize:14,
        fontWeight:"bold"
    },
    footer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-end"
    }
    
})