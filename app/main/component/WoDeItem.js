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
        let margintop = 0;
        if(this.props.data.name=="会员福利"){
            margintop = Pixel.getPixel(15);
        }else if(this.props.data.name=="我申请的工作"){
            margintop = Pixel.getPixel(15);
        }else{
            margintop = 0;
        }
        return (
            <TouchableOpacity onPress={()=>{
                this.props.callBack();
            }} style={{width: width,height:Pixel.getPixel(50),
            flexDirection:'row', marginTop:margintop}}>
                <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
                    <Image source={this.props.data.left} style={[{
                        width:Pixel.getPixel(25),height:Pixel.getPixel(25),
                        marginLeft:Pixel.getPixel(15),resizeMode:'stretch'
                    },this.props.data.name=="我的薪水"?{width:Pixel.getPixel(25),height:Pixel.getPixel(30)}:{}]}></Image>
                    <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                    color:'#000',fontWeight:'bold',marginLeft:Pixel.getPixel(15)}}>{this.props.data.name}</Text>
                </View>
                <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT26),
                        color:'#000',marginLeft:Pixel.getPixel(15)}}>
                        {this.props.data.content}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}