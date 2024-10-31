export default function (data) {//bu gelen content datasını arraya çeviricez burda 
    //çünkü bize json formatında geliyor
    return Object.keys(data).map(key=>{
        return{//neyi retrun edersek onu bir arraya paketleyerek return eder
            id:key,//key i id olarak ata
            ...data[key]//data hangi key denk geliosa onu buranın içine çıkar
            //yani date text ve username burda çıkmış olur
        }
    });//bu fonks a nasıl bir obje verirsek verelim 
    //bunun keylerini bize array formatında return eder ve bizde geriye ir array formatında 
    //değer dönücez ve map fonks. da retrun olarak bir array return eder
}