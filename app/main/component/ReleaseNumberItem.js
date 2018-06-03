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
    NativeModules,
    TextInput
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import Pixel from '../../utils/PixelUtil';

import * as fontAndColor from '../../constant/fontAndColor';

export default class ReleaseNumberItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state={
            value:this.props.data.content
        }
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
                <View style={{flex: 2, alignItems: 'center', flexDirection: 'row'}}
                >
                    <View style={{
                        width: Pixel.getPixel(160), height: Pixel.getPixel(25),
                        borderWidth: 1, marginLeft: Pixel.getPixel(15), justifyContent: 'center'
                    }}>
                        <TextInput
                            onChangeText={(text) => this.setState({value: parseInt(text)},()=>{
                                this.props.callBack(this.state.value);
                            })}
                            style={{
                                flex: 1,
                                //backgroundColor: 'transparent',
                                marginRight: Pixel.getPixel(5),
                                textAlign: 'right',
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                color: '#000',
                                padding: 0
                            }}
                            keyboardType={'numeric'}
                            value={this.state.value+''}
                            underlineColorAndroid="transparent"

                        />
                    </View>
                    <View style={{
                        width: Pixel.getPixel(20), height: Pixel.getPixel(25),
                        borderWidth: 1, borderLeftWidth: 0, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <TouchableOpacity style={{
                            width: Pixel.getPixel(20), height: Pixel.getPixel(8),
                            justifyContent:'center',alignItems:'center'
                        }} onPress={()=>{
                            if(this.props.data.name=='岗位工资'||this.props.data.name=='返费金额'){
                                this.setState({value:this.state.value+1000},()=>{
                                    this.props.callBack(this.state.value);
                                })
                            }else{
                                this.setState({value:this.state.value+1},()=>{
                                    this.props.callBack(this.state.value);
                                })
                            }
                        }}>
                            <Image source={require('../../../images/xiangshangimage.png')}
                                   style={{
                                       width: Pixel.getPixel(7), height: Pixel.getPixel(5),
                                       resizeMode: 'stretch'
                                   }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: Pixel.getPixel(20), height: Pixel.getPixel(8),
                            justifyContent:'center',alignItems:'center'
                        }} onPress={()=>{
                            if(this.props.data.name=='岗位工资'||this.props.data.name=='返费金额'){
                                if(this.state.value>1000){
                                    this.setState({value:this.state.value-1000},()=>{
                                        this.props.callBack(this.state.value);
                                    })
                                }
                            }else{
                                if(this.state.value>1){
                                    this.setState({value:this.state.value-1},()=>{
                                        this.props.callBack(this.state.value);
                                    })
                                }
                            }
                        }}>
                            <Image source={require('../../../images/xiangxiaimage.png')}
                                   style={{
                                       width: Pixel.getPixel(7), height: Pixel.getPixel(5),
                                       resizeMode: 'stretch'
                                   }}/>
                        </TouchableOpacity>


                    </View>
                </View>
            </View>
        );
    }

}