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
import PostInfoOneTab from './PostInfoOneTab';
import PostInfoFourTab from './PostInfoFourTab';

export default class PostInfoFourItem extends PureComponent {

    constructor(props) {
        super(props);
        this.list = [{name: '年龄', content: this.props.data.company.age},
            {name: '英文', content: this.props.data.company.english},
            {name: '算数', content: this.props.data.company.math},
            {name: '身高', content: this.props.data.company.height},
            {name: '材料', content: this.props.data.company.doc},
            {name: '体检', content: this.props.data.company.examination},];
        this.state = {
            show: 'row'
        };
    }

    render() {
        let itemList = [];
        for (let i = 0; i < this.list.length; i++) {
            let show = false;
            if (i == 0) {
                show = true;
            }
            itemList.push(<PostInfoFourTab key={i + 'kkk'} show={show} data={{
                number: (i + 1), name: this.list[i].name,
                content: this.list[i].content
            }}/>);
        }
        return (
            <View style={{
                width: width - Pixel.getPixel(30),
                marginLeft: Pixel.getPixel(15), marginTop: Pixel.getPixel(20),
            }}>
                <View style={{
                    width: Pixel.getPixel(110), height: Pixel.getPixel(28),
                    backgroundColor: fontAndColor.COLORB0, borderRadius: 10,
                    marginBottom: Pixel.getPixel(20),
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        color: '#fff'
                    }}>录用条件</Text>
                </View>
                {itemList}
            </View>
        );
    }

}