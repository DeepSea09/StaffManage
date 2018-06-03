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
export  default class WoDeItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: 'row'
        };
    }

    render() {
        return (
            <View style={[{width: width-Pixel.getPixel(30),minHeight:Pixel.getPixel(35),
            flexDirection:'row'}]}>
               <View style={[{flex:1,borderWidth:1,borderColor:fontAndColor.COLORA3,
               alignItems:'center',justifyContent:'center',borderRightWidth:0},this.props.show?{}:{borderTopWidth:0}]}>
                   <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                       color:'#000'}}>{this.props.data.number}</Text>
               </View>
                <View style={[{flex:1,borderWidth:1,borderColor:fontAndColor.COLORA3,
                    alignItems:'center',justifyContent:'center',borderRightWidth:0},this.props.show?{}:{borderTopWidth:0}]}>
                    <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                        color:'#000'}}>{this.props.data.name}</Text>
                </View>
                <View style={[{flex:4,borderWidth:1,borderColor:fontAndColor.COLORA3,
                    alignItems:'center',justifyContent:'center'},this.props.show?{}:{borderTopWidth:0}]}>
                    <Text  style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                        color:'#000'}}>{this.props.data.content}</Text>
                </View>
            </View>
        );
    }

}