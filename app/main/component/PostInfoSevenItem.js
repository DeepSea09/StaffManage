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

export default class PostInfoSevenItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: 'row'
        };
    }

    render() {
        return (
            <View style={{
                width: width - Pixel.getPixel(30), marginTop: Pixel.getPixel(20),
                justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
                marginLeft: Pixel.getPixel(15)
            }}>
                <TouchableOpacity onPress={()=>{
                    this.props.telBack();
                }} style={{
                    width: Pixel.getPixel(110), height: Pixel.getPixel(35),
                    backgroundColor: 'red', borderRadius: 10,
                    marginBottom: Pixel.getPixel(20),
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        color: '#fff'
                    }}>电话联系</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.callBack();
                }} style={{
                    width: Pixel.getPixel(110), height: Pixel.getPixel(35),
                    backgroundColor: 'red', borderRadius: 10,
                    marginBottom: Pixel.getPixel(20),
                    alignItems: 'center', justifyContent: 'center',
                    marginLeft: Pixel.getPixel(50)
                }}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        color: '#fff'
                    }}>我要面试</Text>
                </TouchableOpacity>
            </View>
        );
    }

}