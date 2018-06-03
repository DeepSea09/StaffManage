import React from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    BackAndroid,
    InteractionManager,
    Text,
    AppState,
    ListView
} from 'react-native';

import BaseComponent from '../component/BaseComponent';
let {height, width} = Dimensions.get('window');

import  Pixel from '../utils/PixelUtil'
import * as fontAndColor from '../constant/fontAndColor';
import NavigationView from '../component/AllNavigationView';
export default class CarIDScene extends BaseComponent {

    constructor(props) {
        super(props);
    }


    render() {
        return (<View style={{flex:1, backgroundColor:'#fff',alignItems:'center'}}>
            <Image source={require('../../images/caridimage.png')}
                   style={{width:width-Pixel.getPixel(60),height:Pixel.getPixel(180),
                marginTop:Pixel.getTitlePixel(94), resizeMode:'stretch'}}>

            </Image>
            <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28), color:'#000',
            fontWeight:'bold', marginTop:Pixel.getPixel(15)}}>
                身份证正面上传
            </Text>
            <Image source={require('../../images/caridimage.png')}
                   style={{width:width-Pixel.getPixel(60),height:Pixel.getPixel(180),
                       marginTop:Pixel.getPixel(15), resizeMode:'stretch'}}>

            </Image>
            <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28), color:'#000',
                fontWeight:'bold', marginTop:Pixel.getPixel(15)}}>
                身份证反面上传
            </Text>
            <View style={{width:Pixel.getPixel(100),height:Pixel.getPixel(30),
                backgroundColor:fontAndColor.COLORB0,borderRadius:5,justifyContent:'center',
            alignItems:'center',marginTop:Pixel.getPixel(15)}}>
                <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28), color:'#fff'
            ,}}>提交</Text></View>
            <NavigationView
                title="身份证上传"
                backIconClick={this.backPage}
            />
        </View>)
    }
}

const styles = StyleSheet.create({
    parentStyle: {
        flex: 1
    },
    childStyle: {
        width: width,
        height: height
    },
});

