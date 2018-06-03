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
import MineAuthItem from './component/MineAuthItem';
import CarIDScene from "./CarIDScene";
export default class MainScene extends BaseComponent {

    constructor(props) {
        super(props);
    }


    render() {
        return (<View style={{flex:1, backgroundColor:'#fff'}}>
            <View style={{width:width,height:Pixel.getPixel(150),justifyContent:'center',
            alignItems:'center',marginTop:Pixel.getTitlePixel(64)}}>
                <View style={{width:Pixel.getPixel(65),height:Pixel.getPixel(65),
                borderRadius:100,borderWidth:2,borderColor:fontAndColor.COLORA3,alignItems:'center',
                    justifyContent:'center'}}>
                    <Text>头像</Text>
                </View>
                <Text style={{fontSize:Pixel.getPixel(fontAndColor.BUTTONFONT30), color:'#000',
                fontWeight:'bold',marginTop:Pixel.getPixel(10)}}>修改</Text>
            </View>
            <MineAuthItem data={{name:'名字',content:'修改',left:require('../../images/leftimage.png')}}
                          callBack={()=>{}}/>
            <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
            <MineAuthItem data={{name:'手机',content:'修改',left:require('../../images/leftimage.png')}}
                          callBack={()=>{}}/>
            <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
            <MineAuthItem data={{name:'身份证',content:'去认证',left:require('../../images/leftimage.png')}}
                          callBack={()=>{this.toNextPage({name: 'CarIDScene',
                              component: CarIDScene,
                              params: {}})}}/>
            <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
            <MineAuthItem data={{name:'微信',content:'',left:require('../../images/leftimage.png')}}
                          callBack={()=>{}}/>
            <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
            <NavigationView
                title="个人认证信息"
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

