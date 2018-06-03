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
    ListView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import Pixel from '../../utils/PixelUtil';

import * as fontAndColor from '../../constant/fontAndColor';
import PostInfoOneTab from './PostInfoOneTab';

export default class PostInfoSixItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: 'row'
        };
    }

    render() {
        return (
            <View style={{
                width: width - Pixel.getPixel(30),
                marginLeft: Pixel.getPixel(15),marginTop:Pixel.getPixel(20),
            }}>
                <View style={{
                    width: Pixel.getPixel(110), height: Pixel.getPixel(28),
                    backgroundColor: fontAndColor.COLORB0, borderRadius: 10,
                    marginBottom:Pixel.getPixel(20),
                    alignItems:'center', justifyContent:'center'
                }}>
                    <Text style={{fontSize:Pixel.getPixel(fontAndColor.BUTTONFONT30),
                    color:'#fff'}}>企业简介</Text>
                </View>
                <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                    color:'#000'}}>{this.props.data.company.introduction}</Text>
            </View>
        );
    }

}