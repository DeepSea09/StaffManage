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

export default class PostInfoOneItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: 'row',
            image: this.props.data.company.cqPic
        };
    }

    render() {
        return (
            <View style={{
                width: width - Pixel.getPixel(30),
                marginLeft: Pixel.getPixel(15), marginTop: Pixel.getPixel(20),
            }}>
                <View style={{
                    flex: 1, height: Pixel.getPixel(28),
                    marginBottom: Pixel.getPixel(20),
                    flexDirection: 'row'
                }}>
                    <View style={{flex: 1}}>
                        <View style={{
                            width: Pixel.getPixel(110), height: Pixel.getPixel(28),
                            backgroundColor: fontAndColor.COLORB0, borderRadius: 10,
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                                color: '#fff'
                            }}>工厂环境</Text>
                        </View>
                    </View>
                    <View  style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            this.props.callBack();
                        }} style={{
                            width: Pixel.getPixel(110), height: Pixel.getPixel(28),
                            backgroundColor: 'red', borderRadius: 10,
                            alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Text style={{
                                fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                                color: '#fff'
                            }}>我要进厂</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <PostInfoOneTab callBack={(index) => {
                    if (index == 0) {
                        this.setState({image: this.props.data.company.cqPic});
                    } else if (index == 1) {
                        this.setState({image: this.props.data.company.workPic});
                    } else if (index == 2) {
                        this.setState({image: this.props.data.company.dormPic});
                    } else if (index == 3) {
                        this.setState({image: this.props.data.company.eatPic});
                    } else {
                        this.setState({image: this.props.data.company.salaryPic});
                    }
                }}/>
                <View style={{
                    width: width - Pixel.getPixel(30), height: Pixel.getPixel(150),
                    borderWidth: Pixel.getPixel(1), borderColor: fontAndColor.COLORA4,
                    borderTopWidth: 0, padding: Pixel.getPixel(10), alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image source={{uri: this.state.image}}
                           style={{
                               width: width - Pixel.getPixel(50), height: Pixel.getPixel(130)
                               , resizeMode: 'stretch'
                           }}>
                    </Image>
                </View>
            </View>
        );
    }

}