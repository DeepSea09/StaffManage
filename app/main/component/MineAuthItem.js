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
            <View style={{width: width,height:Pixel.getPixel(50),
            flexDirection:'row'}}>
                <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
                    <Image source={this.props.data.left} style={{
                        width:Pixel.getPixel(25),height:Pixel.getPixel(25),
                        marginLeft:Pixel.getPixel(15)
                    }}></Image>
                    <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),fontWeight:'bold',
                    color:'#000',marginLeft:Pixel.getPixel(15)}}>{this.props.data.name}</Text>
                    {this.props.data.name=='我的薪水'?<Image source={require('../../../images/hotimage.png')}
                                                         style={{
                        width:Pixel.getPixel(40),height:Pixel.getPixel(20),
                        marginLeft:Pixel.getPixel(5)
                    }}></Image>:<View></View>}
                </View>
                <TouchableOpacity onPress={()=>{
                    this.props.callBack();
                }} style={{flex:1, flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                    <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT26),
                        color:'#000',marginRight:Pixel.getPixel(30)}}>
                        {this.props.data.content}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}