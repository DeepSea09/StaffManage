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

export default class PostPow extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: 'row',
            width: 0,
            height: 0,
            childWidth: 0,
            childHeight: 0,
            content: ''
        };
    }

    changeShow = (content) => {
        this.setState({
            width: width,
            height:height,
            childWidth: 280,
            childHeight: 140,
            content: content
        });
    }

    render() {
        return (
            <View style={{
                width: this.state.width, height: this.state.height,
                backgroundColor: 'rgba(0, 0, 0,0)', position: 'absolute', top: 0, left: 0,
                alignItems: 'center', justifyContent: 'center'
            }}>
                <View style={{
                    width: Pixel.getPixel(this.state.childWidth),
                    height: Pixel.getPixel(this.state.childHeight),
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: Pixel.getPixel(18),
                        color: '#000'
                    }}>{this.state.content}</Text>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            width: 0,
                            height:0,
                            childWidth: 0,
                            childHeight: 0
                        });
                    }} style={{
                        width: Pixel.getPixel(80),
                        height: Pixel.getPixel(30),
                        backgroundColor: 'red',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Pixel.getPixel(35)
                    }}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                            color: '#fff'
                        }}>确定</Text>

                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}