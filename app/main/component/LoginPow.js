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
    TextInput
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import Pixel from '../../utils/PixelUtil';

import * as fontAndColor from '../../constant/fontAndColor';

export default class LoginPow extends PureComponent {

    constructor(props) {
        super(props);
        this.name = '';
        this.state = {
            w: 0, width: 0,
            height: 0, h: 0
        };
    }

    changeShow = (show) => {
        if (show) {
            this.setState({
                w: width - Pixel.getPixel(100), width: width,
                height: height, h: Pixel.getPixel(260)
            });
        } else {
            this.setState({
                w: 0, width: 0,
                height: 0, h: 0
            });
        }

    }

    render() {
        return (
            <View style={{
                width: this.state.width, height: this.state.height,
                backgroundColor: 'rgba(0, 0, 0,0.3)', position: 'absolute', top: 0, left: 0
            }}>
                <View style={{
                    width: this.state.w,
                    backgroundColor: '#fff', position: 'absolute', overflow: 'hidden',
                    top: height / 2 - Pixel.getPixel(160) / 2, left: Pixel.getPixel(50),
                    borderWidth: 1, height: this.state.h, alignItems: 'center',
                    borderRadius: 5, borderColor: '#336699'
                }}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        color: '#000', marginTop: Pixel.getPixel(10)
                    }}>请输入姓名</Text>

                    <TextInput
                        onChangeText={(text) => {
                            this.name = text;
                        }}
                        style={{
                            //backgroundColor: 'transparent',
                            textAlign: 'center',
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            color: '#000',
                            padding: 0,
                            borderWidth: 1, borderRadius: 20,
                            height: Pixel.getPixel(35),
                            width: width - Pixel.getPixel(150),
                            borderColor: fontAndColor.COLORA4,
                            marginTop: Pixel.getPixel(35)
                        }}
                        placeholder='姓名'
                        underlineColorAndroid="transparent"
                    />

                    <TouchableOpacity onPress={() => {
                        this.props.callBack(this.name);
                    }} style={{
                        width: Pixel.getPixel(120), height: Pixel.getPixel(33),
                        borderRadius: 20, marginTop: Pixel.getPixel(30),
                        alignItems: 'center', justifyContent: 'center',
                        backgroundColor: '#336699'
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