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
    ListView,
    NativeModules
} from 'react-native';

import BaseComponent from '../component/BaseComponent';

let {height, width} = Dimensions.get('window');
var Platform = require('Platform');
import Pixel from '../utils/PixelUtil'

import * as fontAndColor from '../constant/fontAndColor';
import TuiJian from "./component/TuiJian";
import WoDeItem from "./component/WoDeItem";
import NavigationView from '../component/AllNavigationView';
import TrainItem from "./component/TrainItem";
import MainScene from "./NavigationScene";
import TongXunLuScene from "./TongXunLuScene";
export default class TuiJianGongYouScene extends BaseComponent {

    constructor(props) {
        super(props);
    }


    render() {
        return (<View style={{flex: 1, backgroundColor: '#fff',alignItems:'center'}}>
            <View style={{width: width, backgroundColor: fontAndColor.COLORB0,height:Pixel.getPixel(150),
                alignItems:'center',justifyContent:'center',marginTop:Pixel.getTitlePixel(64)}}>
                <Text style={{fontSize:Pixel.getPixel(20), color:'#fff'}}>占位图</Text>
            </View>
            <TuiJian data={{name:'姓         名：',content:'',left:require('../../images/leftimage.png')}}
                          callBack={()=>{}}/>
            <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
            <TuiJian data={{name:'手机号码：',content:'',left:require('../../images/leftimage.png')}}
                     callBack={()=>{}}/>
            <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
            <TouchableOpacity onPress={() => {
            }} style={{
                width: Pixel.getPixel(120), height: Pixel.getPixel(35),
                borderRadius: 5, marginTop: Pixel.getPixel(20),
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: fontAndColor.COLORB0,
            }}>
                <Text style={{
                    fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                    color: '#fff'
                }}>确认推荐</Text>
            </TouchableOpacity>
            <WoDeItem data={{name:'批量推荐',content:'',left:require('../../images/leftimage.png')}}
                          callBack={()=>{}}/>
            <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
            <TouchableOpacity onPress={() => {
                if (Platform.OS == 'android') {
                    NativeModules.VinScan.getSIMList((json) => {
                        this.toNextPage({
                            name: 'TongXunLuScene',
                            component: TongXunLuScene,
                            params: {personData:json}})
                       console.log(json);
                    });
                }
            }} style={{
                width: Pixel.getPixel(120), height: Pixel.getPixel(35),
                borderRadius: 5, marginTop: Pixel.getPixel(30),
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: fontAndColor.COLORB0,
            }}>
                <Text style={{
                    fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                    color: '#fff'
                }}>批量推荐</Text>
            </TouchableOpacity>
            <NavigationView
                title="推荐工友"
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

