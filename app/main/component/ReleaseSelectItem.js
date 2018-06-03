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

export default class ReleaseSelectItem extends PureComponent {

    constructor(props) {
        super(props);
        this.py = 0;
        this.px = 0;
        this.state = {
            show: 'row'
        };
    }

    render() {
        return (
            <View style={{
                width: width - Pixel.getPixel(40), height: Pixel.getPixel(40),
                flexDirection: 'row', marginHorizontal: Pixel.getPixel(20)
            }}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        color: '#000'
                    }}>{this.props.data.name}</Text>
                </View>
                <TouchableOpacity onPress={()=>{
                    this.props.callBack(this.px,this.py);
                }} style={{flex: 2, alignItems: 'center', flexDirection: 'row'}}
                      >
                    <View style={{
                        width: Pixel.getPixel(160), height: Pixel.getPixel(25),
                        borderWidth: 1, marginLeft: Pixel.getPixel(15),justifyContent:'center'
                    }} onLayout={(e) => {
                        NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                            this.px = pageX;
                            this.py = pageY;
                            console.log(pageX);
                            console.log('--------------------------');
                            console.log(pageY);
                        });
                    }}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                            color: '#000',
                            marginLeft:Pixel.getPixel(5)
                        }}>{this.props.data.newContent}</Text>
                    </View>
                    <View style={{
                        width: Pixel.getPixel(20), height: Pixel.getPixel(25),
                        borderWidth: 1, borderLeftWidth: 0, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Image source={require('../../../images/xiangxiaimage.png')}
                               style={{
                                   width: Pixel.getPixel(7), height: Pixel.getPixel(5),
                                   resizeMode: 'stretch'
                               }}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}