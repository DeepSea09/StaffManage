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

export default class PostListItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: 'row'
        };
    }

    render() {
        if (this.props.data.jobTypeStr == '好工作') {
            return (

                <TouchableOpacity onPress={() => {
                    this.props.callBack();
                }} style={{
                    width: width - Pixel.getPixel(20), height: Pixel.getPixel(80),
                    flexDirection: 'row', marginLeft: Pixel.getPixel(10), backgroundColor: '#fff', borderRadius: 5
                }}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../../../images/gongchangimage.png')} style={{
                            width: Pixel.getPixel(75), height: Pixel.getPixel(65), justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>

                        </Image>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                            color: '#656565',
                            backgroundColor: '#CBCBCB', fontWeight: 'bold',
                            width: Pixel.getPixel(75), textAlign: 'center',
                            position:'absolute',left:Pixel.getPixel(6),bottom:Pixel.getPixel(10)
                        }}>{this.props.data.companyName}</Text>
                    </View>
                    <View style={{
                        width: 1, height: Pixel.getPixel(64), backgroundColor: '#CBCBCB',
                        marginTop: Pixel.getPixel(8)
                    }}></View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                            color: '#000', backgroundColor: '#00000000', fontWeight: 'bold'
                        }}>
                            {this.props.data.jobTypeStr}</Text>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                            color: '#17930E', backgroundColor: '#00000000', fontWeight: 'bold'
                        }}>
                            交{this.props.data.goodJobFee}元</Text>
                    </View>
                    <View style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingRight: Pixel.getPixel(10)
                    }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}><Text
                            style={{
                                fontSize: Pixel.getPixel(fontAndColor.NAVIGATORFONT34),
                                color: '#FF0533'
                            }}>{this.props.data.wageScope}</Text>
                            <View style={{
                                padding: Pixel.getPixel(3), backgroundColor: '#ff0',
                                borderRadius: 8
                            }}>
                                <Text style={
                                    {
                                        fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                                        color: 'red', fontWeight: 'bold'
                                    }}>我要面试</Text>
                            </View>
                        </View>

                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.MARKFONT22),
                            color: fontAndColor.COLORA1, marginTop: Pixel.getPixel(5)
                        }}>
                            {this.isNull(this.props.data.jobTag) ? '' : this.props.data.jobTag.replace('[', '').replace(']', '')}
                        </Text>

                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.props.callBack();
                }} style={{
                    width: width - Pixel.getPixel(20), height: Pixel.getPixel(80),
                    flexDirection: 'row', marginLeft: Pixel.getPixel(10), backgroundColor: '#fff', borderRadius: 5
                }}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../../../images/gongchangimage.png')} style={{
                            width: Pixel.getPixel(75), height: Pixel.getPixel(65), justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>

                        </Image>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                            color: '#656565',
                            backgroundColor: '#CBCBCB', fontWeight: 'bold',
                            width: Pixel.getPixel(75), textAlign: 'center',
                            position:'absolute',left:Pixel.getPixel(6),bottom:Pixel.getPixel(10)
                        }}>{this.props.data.companyName}</Text>
                    </View>
                    <View style={{
                        width: 1, height: Pixel.getPixel(64), backgroundColor: '#CBCBCB',
                        marginTop: Pixel.getPixel(8)
                    }}></View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                            color: '#000', backgroundColor: '#00000000', fontWeight: 'bold'
                        }}>
                            {this.props.data.jobTypeStr}</Text>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                            color: '#FF3303', backgroundColor: '#00000000', fontWeight: 'bold'
                        }}>
                            {this.props.data.wage}元</Text>
                    </View>
                    <View style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingRight: Pixel.getPixel(10)
                    }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}><Text
                            style={{
                                fontSize: Pixel.getPixel(fontAndColor.NAVIGATORFONT34),
                                color: '#FF0533'
                            }}>{this.props.data.wageScope} </Text>
                            <View style={{
                                padding: Pixel.getPixel(3), backgroundColor: '#ff0',
                                borderRadius: 8
                            }}>
                                <Text style={
                                    {
                                        fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                                        color: 'red', fontWeight: 'bold'
                                    }}>免费入场</Text>
                            </View>
                        </View>

                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.MARKFONT22),
                            color: fontAndColor.COLORA1, marginTop: Pixel.getPixel(5)
                        }}>
                            {this.isNull(this.props.data.jobTag) ? '' : this.props.data.jobTag.replace('[', '').replace(']', '')}
                        </Text>

                    </View>
                </TouchableOpacity>
            );
        }

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