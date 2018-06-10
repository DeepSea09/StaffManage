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
            <View style={[{width: width-Pixel.getPixel(40),height:Pixel.getPixel(50),
            flexDirection:'row',marginLeft:Pixel.getPixel(20)}]}>
               <View style={[{flex:5,borderWidth:1,borderColor:fontAndColor.COLORA3,
               alignItems:'center',justifyContent:'center',borderRightWidth:0},this.props.show?{}:{borderTopWidth:0}]}>
                   <Text style={{fontSize:Pixel.getPixel(fontAndColor.MARKFONT22),
                       color:'#000'}}>{this.props.number}</Text>
               </View>
                <TouchableOpacity onPress={()=>{
                    this.props.callBack();
                }} style={[{flex:25,borderWidth:1,borderColor:fontAndColor.COLORA3,
                    alignItems:'center',justifyContent:'center',borderRightWidth:0},this.props.show?{}:{borderTopWidth:0}]}>
                    <Text style={{fontSize:Pixel.getPixel(fontAndColor.MARKFONT22),
                        color:'#000'}}>{this.props.data.companyName}</Text>
                </TouchableOpacity>
                {/*<View style={[{flex:15,borderWidth:1,borderColor:fontAndColor.COLORA3,*/}
                    {/*alignItems:'center',justifyContent:'center',borderRightWidth:0},this.props.show?{}:{borderTopWidth:0}]}>*/}
                    {/*<Text style={{fontSize:Pixel.getPixel(fontAndColor.MARKFONT22),*/}
                        {/*color:'#000'}}>{this.props.data.name}</Text>*/}
                {/*</View>*/}
                <View style={[{flex:15,borderWidth:1,borderColor:fontAndColor.COLORA3,
                    alignItems:'center',justifyContent:'center',borderRightWidth:0},this.props.show?{}:{borderTopWidth:0}]}>
                    <Text style={{fontSize:Pixel.getPixel(fontAndColor.MARKFONT22),
                        color:'#000'}}>{this.props.data.jobTypeStr}</Text>
                </View>
                <View style={[{flex:10,borderWidth:1,borderColor:fontAndColor.COLORA3,
                    alignItems:'center',justifyContent:'center'},this.props.show?{}:{borderTopWidth:0}]}>
                    <Text style={{fontSize:Pixel.getPixel(fontAndColor.MARKFONT22),
                        color:'#000'}}>{this.props.data.auditStatusStr}</Text>
                </View>
            </View>
        );
    }

}