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

export default class PostInfoTwoItem extends PureComponent {

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
                marginLeft: Pixel.getPixel(15),
                marginTop: Pixel.getPixel(20),
            }}>
                <View style={{
                    width: Pixel.getPixel(110), height: Pixel.getPixel(28),
                    backgroundColor: fontAndColor.COLORB0, borderRadius: 10, marginBottom: Pixel.getPixel(20),
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        color: '#fff'
                    }}>基本情况</Text>
                </View>
                <View style={{width: width - Pixel.getPixel(30), height: Pixel.getPixel(30), flexDirection: 'row'}}>
                    <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        borderBottomWidth: Pixel.getPixel(1), borderColor: fontAndColor.COLORA4,
                        borderRightWidth: Pixel.getPixel(1)
                    }}>
                        <Text style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28), color: '#000'}}>
                            综合薪资
                        </Text>
                    </View>
                    <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        borderBottomWidth: Pixel.getPixel(1), borderColor: fontAndColor.COLORA4
                    }}>
                        <Text numberOfLines={1} style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28), color: '#000'}}>
                            {this.props.data.company.zhxz}
                        </Text>
                    </View>
                </View>
                <View style={{width: width - Pixel.getPixel(30), height: Pixel.getPixel(30), flexDirection: 'row'}}>
                    <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        borderBottomWidth: Pixel.getPixel(1), borderColor: fontAndColor.COLORA4,
                        borderRightWidth: Pixel.getPixel(1)
                    }}>
                        <Text style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28), color: '#000'}}>
                            发薪日
                        </Text>
                    </View>
                    <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        borderBottomWidth: Pixel.getPixel(1), borderColor: fontAndColor.COLORA4
                    }}>
                        <Text numberOfLines={1} style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28), color: '#000'}}>
                            {this.props.data.company.fxr}
                        </Text>
                    </View>
                </View>
                <View style={{width: width - Pixel.getPixel(30), height: Pixel.getPixel(30), flexDirection: 'row'}}>
                    <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        borderBottomWidth: Pixel.getPixel(1), borderColor: fontAndColor.COLORA4,
                        borderRightWidth: Pixel.getPixel(1)
                    }}>
                        <Text style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28), color: '#000'}}>
                            工作方式
                        </Text>
                    </View>
                    <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        borderBottomWidth: Pixel.getPixel(1), borderColor: fontAndColor.COLORA4
                    }}>
                        <Text numberOfLines={1} style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28), color: '#000'}}>
                            {this.props.data.company.gzfs}
                        </Text>
                    </View>
                </View>
                <View style={{width: width - Pixel.getPixel(30), height: Pixel.getPixel(30), flexDirection: 'row'}}>
                    <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        borderBottomWidth: Pixel.getPixel(1), borderColor: fontAndColor.COLORA4,
                        borderRightWidth: Pixel.getPixel(1)
                    }}>
                        <Text style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28), color: '#000'}}>
                            食宿
                        </Text>
                    </View>
                    <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        borderBottomWidth: Pixel.getPixel(1), borderColor: fontAndColor.COLORA4
                    }}>
                        <Text numberOfLines={1} style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28), color: '#000'}}>
                            {this.props.data.company.ss}
                        </Text>
                    </View>
                </View>
                <View style={{width: width - Pixel.getPixel(30), height: Pixel.getPixel(30), flexDirection: 'row'}}>
                    <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        borderColor: fontAndColor.COLORA4,
                        borderRightWidth: Pixel.getPixel(1)
                    }}>
                        <Text style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28), color: '#000'}}>
                            费用
                        </Text>
                    </View>
                    <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        borderColor: fontAndColor.COLORA4
                    }}>
                        <Text numberOfLines={1} style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28), color: '#000'}}>
                            {this.props.data.company.fy}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

}