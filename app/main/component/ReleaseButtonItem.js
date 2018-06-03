/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    NativeModules
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import Pixel from '../../utils/PixelUtil';

import * as fontAndColor from '../../constant/fontAndColor';
import ReleaseAllTabItem from './ReleaseAllTabItem';
export default class ReleaseAllItem extends PureComponent {

    constructor(props) {
        super(props);
        this.py = 0;
        this.px = 0;
        this.state = {
            select: ''
        };
    }

    render() {
        return (
            <View>
                <View style={{width:width,height:1,backgroundColor:fontAndColor.COLORA3,marginTop:Pixel.getPixel(20)}}></View>
                <View style={{width:width,height:Pixel.getPixel(40),backgroundColor:'#fff',
                    marginTop:Pixel.getPixel(20),justifyContent:'center',flexDirection:'row'}}>
                    <View style={{width:Pixel.getPixel(120),height:Pixel.getPixel(40),backgroundColor:fontAndColor.COLORB0,
                        justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:Pixel.getPixel(fontAndColor.BUTTONFONT30),
                            color:'#fff'}}>确认发布</Text>
                    </View>
                    <View style={{width:Pixel.getPixel(120),height:Pixel.getPixel(40),backgroundColor:fontAndColor.COLORB0,
                        justifyContent:'center',alignItems:'center',marginLeft:Pixel.getPixel(40)}}>
                        <Text style={{fontSize:Pixel.getPixel(fontAndColor.BUTTONFONT30),
                            color:'#fff'}}>清空修改</Text>
                    </View>
                </View>
            </View>
        );
    }

}