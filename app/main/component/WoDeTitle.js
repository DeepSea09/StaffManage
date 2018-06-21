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

export default class WoDeTitle extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: 'row'
        };
    }

    render() {
        return (
            <View style={{
                width: width, backgroundColor: fontAndColor.COLORB0, height: Pixel.getPixel(150),
                flexDirection: 'row'
            }}>
                <TouchableOpacity onPress={() => {
                    this.props.toInfo();
                }} style={{flex: 1, marginTop: Pixel.getPixel(30), alignItems: 'flex-end'}}>
                    {this.isNull(this.props.data.avatar) ? <Image style={{
                        width: Pixel.getPixel(90), height: Pixel.getPixel(90),
                        borderRadius: 100
                    }} source={require('../../../images/minetitle.png')}></Image> : <Image style={{
                        width: Pixel.getPixel(90), height: Pixel.getPixel(90),
                        borderRadius: 100
                    }} source={{uri: this.props.data.avatar}}></Image>}

                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.toInfo();
                }} style={{flex: 1}}>
                    <View style={{flex: 1, marginTop: Pixel.getPixel(30), alignItems: 'flex-end'}}>
                        <View style={{
                            height: Pixel.getPixel(90),
                            alignItems: 'flex-start'
                        }}>
                            <Text style={{
                                fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7),
                                fontWeight: 'bold'
                            }}>
                                {this.props.data.name}
                            </Text>
                            <Text style={{
                                fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7)
                            }}>
                                {this.props.data.phone}
                            </Text>
                            <Text style={{
                                fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7)
                            }}>
                                {this.props.data.onJobStr == '否' ? '求职' : '在岗'}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, marginTop: Pixel.getPixel(30), alignItems: 'flex-end'}}>
                        <View style={{
                            height: Pixel.getPixel(90),
                            alignItems: 'flex-start', marginRight: Pixel.getPixel(15)
                        }}>
                            <Text style={{
                                fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7)
                            }}>
                                普通会员
                            </Text>
                            <TouchableOpacity onPress={() => {
                                if (!this.props.data.ifAuth) {
                                    this.props.callBack();
                                }
                            }}>
                                <Text style={{
                                    fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                    backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7)
                                }}>
                                    {this.props.data.ifAuth ? '已认证' : '未认证'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    /**
     * 非空判断
     * @param content  任意类型值
     */
    isNull = (content) => {
        try {
            if (content == undefined) {
                return true;
            }
            if (content == null) {
                return true;
            }
            if (content instanceof Array) {
                if (content.length <= 0) {
                    return true;
                }
            }
            if (content instanceof Object) {
                if (JSON.stringify(content) == '{}') {
                    return true;
                }
            }
            if (content == 'null') {
                return true;
            }
            if ((content + '').trim() == '') {
                return true;
            }
            return false;
        } catch (e) {
            return true;
        }
    }

}