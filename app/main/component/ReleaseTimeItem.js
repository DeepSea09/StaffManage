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
    NativeModules
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import Pixel from '../../utils/PixelUtil';

import * as fontAndColor from '../../constant/fontAndColor';
import DateTimePicker from 'react-native-modal-datetime-picker'

export default class ReleaseSelectItem extends PureComponent {

    constructor(props) {
        super(props);
        this.py = 0;
        this.px = 0;
        this.state = {
            isDateTimePickerVisible: false,
            selectTime:this.props.data.content
        };
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
                <TouchableOpacity onPress={()=>{
                    this.setState({ isDateTimePickerVisible: true })

                }} style={{flex: 2, alignItems: 'center', flexDirection: 'row'}}
                      >
                    <View style={{
                        width: Pixel.getPixel(152), height: Pixel.getPixel(25),
                        borderWidth: 1, marginLeft: Pixel.getPixel(15),justifyContent:'center'
                    }} >
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                            color: '#000',
                            marginLeft:Pixel.getPixel(5)
                        }}>{this.state.selectTime}</Text>
                    </View>
                        <Image source={require('../../../images/timeimage.png')}
                               style={{
                                   width: Pixel.getPixel(25), height: Pixel.getPixel(25),
                                   resizeMode: 'stretch',marginLeft:Pixel.getPixel(3)
                               }}/>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    minimumDate={new Date()}
                    onCancel={this._hideDateTimePicker}
                    titleIOS="请选择日期"
                    confirmTextIOS='确定'
                    cancelTextIOS='取消'
                />
            </View>
        );
    }

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })
    //datePiker的回调
    _handleDatePicked = (date) => {
        let tempdate=this.dateFormat(date,'yyyy/MM/dd');
        this.setState({
            selectTime:tempdate
        },()=>{
            this.props.callBack(tempdate);
        });

        // let tempdate=dateFormat(Date.parse(new Date()),'yyyy-MM-dd')
        // let select = Date.parse(new Date(date));
        // let mm = Date.parse(new Date());
        // let aa = Math.ceil((select-mm)/1000/60/60/24);
        this._hideDateTimePicker();
    }

    dateFormat = (date,fmt) => {
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

}