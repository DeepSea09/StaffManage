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

export default class PostInfoOneItem extends PureComponent {

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
                flex:1,height:Pixel.getPixel(25)
                , alignItems: 'center', justifyContent: 'center',
                borderWidth:1,borderBottomWidth:0,
                borderColor:fontAndColor.COLORA4,
                borderLeftWidth:i==0?1:0,
                backgroundColor:this.state.select==i?'#fff':'#D8D8D8',
                borderRightColor:i==this.list.length-1?fontAndColor.COLORA4:'#979797'
            }}>
                    <Text style={{fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
                    marginLeft:Pixel.getPixel(5),color:'#000'}}>{this.list[i]}</Text>

            </TouchableOpacity>);
        }
        return (
            <View style={{height: Pixel.getPixel(35), flexDirection: 'row',alignItems:'flex-end'}}>
                {itemList}
            </View>
        );
    }

}