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
    WebView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import Pixel from '../../utils/PixelUtil';
export default class PostInfoNiveItem extends PureComponent {

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
                justifyContent: 'center', alignItems: 'center',
                marginLeft: Pixel.getPixel(15),height:Pixel.getPixel(200),
            }}>
                <WebView
                    ref="www"
                    style={{ width: width - Pixel.getPixel(30),height:Pixel.getPixel(200),}}
                    source={{uri:'http://baishi.baidu.com/watch/8001213153987601498.html?frm=FuzzySearch&page=videoMultiNeed',method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                />
            </View>
        );
    }

}