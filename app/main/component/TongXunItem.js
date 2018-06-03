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

export default class TongXunItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            select: this.props.data.select
        };
    }

    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.setState({
                    select: !this.state.select
                }, () => {
                    this.props.callBack(this.state.select);
                });
            }} style={[{
                width: width - Pixel.getPixel(30), height: Pixel.getPixel(50),
                flexDirection: 'row'
            }]}>
                <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}]}>
                    <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}]}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                            color: '#000'
                        }}>{this.props.rowId}</Text>
                    </View>
                    <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}]}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                            color: '#000'
                        }}>{this.props.data.name}</Text>
                    </View>
                </View>
                <View style={[{
                    flex: 1,
                    alignItems: 'center', justifyContent: 'center', flexDirection: 'row'
                }]}>
                    <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}]}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                            color: '#000'
                        }}>{this.props.data.number}</Text>
                    </View>
                    <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}]}>
                        <View style={{
                            borderRadius: 100, width: Pixel.getPixel(15),
                            height: Pixel.getPixel(15), borderWidth: this.state.select ? 0 : 1,
                            backgroundColor: this.state.select ? fontAndColor.COLORB0 : '#fff',
                            marginLeft: Pixel.getPixel(20)
                        }}></View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

}