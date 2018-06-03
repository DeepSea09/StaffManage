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

export default class NewPostInfoOneTab extends PureComponent {

    constructor(props) {
        super(props);
        this.list = ['厂区', '工作', '宿舍', '食堂', '工资条'];
        this.state = {
            select: 0
        };
    }

    render() {
        let itemList = [];
        for (let i = 0; i < this.list.length; i++) {
            itemList.push(<TouchableOpacity onPress={() => {
                this.setState({select: i},()=>{
                    this.props.callBack(i);
                });
            }} key={i + '123'} style={{
                width: Pixel.getPixel(55), height: Pixel.getPixel(27)
                , alignItems: 'center', justifyContent: 'center'
            }}>
                <Image source={this.state.select==i?require('../../../images/baiseimage.png'):
                require('../../../images/huiseimage.png')}
                       style={{width: Pixel.getPixel(55), height: Pixel.getPixel(27), resizeMode: 'stretch',
                       justifyContent:'center'}}>
                    <Text style={{fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
                    marginLeft:Pixel.getPixel(5),color:'#000'}}>{this.list[i]}</Text>
                </Image>

            </TouchableOpacity>);
        }
        return (
            <View style={{height: Pixel.getPixel(25), flexDirection: 'row',alignItems:'flex-end'}}>
                {itemList}
                <View style={{width:width-Pixel.getPixel(32+55*5),height:Pixel.getPixel(1),
                backgroundColor:fontAndColor.COLORA4}}></View>
            </View>
        );
    }

}