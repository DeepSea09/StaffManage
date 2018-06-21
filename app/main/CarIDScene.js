import React from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    BackAndroid,
    InteractionManager,
    Text,
    AppState,
    ListView,
    Platform
} from 'react-native';

import BaseComponent from '../component/BaseComponent';

let {height, width} = Dimensions.get('window');

import Pixel from '../utils/PixelUtil'
import * as fontAndColor from '../constant/fontAndColor';
import NavigationView from '../component/AllNavigationView';
import ImagePickerManager from "react-native-image-picker";
import * as ImageUpload from '../utils/ImageUpload';
import * as MyUrl from '../constant/appUrls';
import {request} from "../utils/RequestUtil";
import * as Urls from "../constant/appUrls";

const IS_ANDROID = Platform.OS === 'android';
export default class CarIDScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            zhengmian: this.isNull(this.props.navigation.state.params.idCardFront) ?
                require('../../images/caridimage.png') : {uri: this.props.navigation.state.params.idCardFront},
            fanmian: this.isNull(this.props.navigation.state.params.idCardEnd) ?
                require('../../images/caridimage.png') : {uri: this.props.navigation.state.params.idCardEnd},
            zhengmianid: this.isNull(this.props.navigation.state.params.idCardFront) ?
                "" : this.props.navigation.state.params.idCardFront,
            fanmianid: this.isNull(this.props.navigation.state.params.idCardEnd) ?
                "" : this.props.navigation.state.params.idCardEnd,
        }
    }


    render() {
        return (<View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => {
                this.selectPhotoTapped(1);
            }}>
                <Image source={this.state.zhengmian}
                       style={{
                           width: width - Pixel.getPixel(60), height: Pixel.getPixel(180),
                           marginTop: Pixel.getTitlePixel(94), resizeMode: 'stretch'
                       }}>

                </Image>
            </TouchableOpacity>
            <Text style={{
                fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28), color: '#000',
                fontWeight: 'bold', marginTop: Pixel.getPixel(15)
            }}>
                身份证正面上传
            </Text>
            <TouchableOpacity onPress={() => {
                this.selectPhotoTapped(2);
            }}>
                <Image source={this.state.fanmian}
                       style={{
                           width: width - Pixel.getPixel(60), height: Pixel.getPixel(180),
                           marginTop: Pixel.getPixel(15), resizeMode: 'stretch'
                       }}>

                </Image>
            </TouchableOpacity>
            <Text style={{
                fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28), color: '#000',
                fontWeight: 'bold', marginTop: Pixel.getPixel(15)
            }}>
                身份证反面上传
            </Text>
            <TouchableOpacity onPress={() => {
                this.toReset();
            }} style={{
                width: Pixel.getPixel(100), height: Pixel.getPixel(30),
                backgroundColor: fontAndColor.COLORB0, borderRadius: 5, justifyContent: 'center',
                alignItems: 'center', marginTop: Pixel.getPixel(15)
            }}>
                <Text style={{
                    fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28), color: '#fff'
                    ,
                }}>提交</Text></TouchableOpacity>
            <NavigationView
                title="身份证上传"
                backIconClick={this.backPage}
            />
        </View>)
    }

    selectPhotoTapped = (id) => {
        const options = {
            //弹出框选项
            title: '请选择',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择相册',
            allowsEditing: false,
            noData: false,
            quality: 0.7,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        };
        if (IS_ANDROID) {
            options.maxWidth = 1080;
            options.maxHeight = 1920;
            options.quality = 0.9;
        }
        // if(id=='buyer_seller_vehicle'){
        //     this.props.openModal(()=>{this.openCamera()},()=>{this.openPicker()});
        // }else{
        ImagePickerManager.showImagePicker(options, (response) => {
            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {

            } else {
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                //     let news = {...this.state.childMovie};
                //     news.list.push({url: response.uri});
                //     this.setState({
                //         childMovie: news
                //     });
                this._uploadPicture(response, id);
                // console.log('aaaaaaaaaaaaaaaaaaaaa'+response.data);
            }
        });
        // }
    }

    toReset = () => {
        if (this.isNull(this.state.zhengmianid)) {
            this.props.screenProps.showToast("请上传身份证正面");
            return;
        } else if (this.isNull(this.state.fanmianid)) {
            this.props.screenProps.showToast("请上传身份证反面");
            return;
        }
        this.props.screenProps.showModal(true);
        let maps = {idCardFront: this.state.zhengmianid, idCardEnd: this.state.fanmianid};
        request(Urls.EMPLOYEE_SAVE, 'Post', maps)
            .then((response) => {
                    this.props.screenProps.showToast("提交成功");
                    this.props.navigation.state.params.callBack();
                },
                (error) => {
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.screenProps.showToast("网络连接失败");
                    } else {
                        this.props.screenProps.showToast(error.mjson.msg);
                    }

                });
    }

    _uploadPicture = (responses, i) => {
        this.props.screenProps.showModal(true);
        let params = {
            data: 'data:image/jpeg;base64,' + encodeURI(responses.data).replace(/\+/g, '%2B')
        };
        ImageUpload.request(MyUrl.OPEN_UPLOAD, 'Post', params).then(
            (response) => {
                if (response.mycode === 1) {
                    this.props.screenProps.showToast('上传成功')
                    console.log(response.mjson.data);
                    if (i == 1) {
                        this.setState({
                            zhengmian: {uri: response.mjson.data.downloadUrl},
                            zhengmianid: response.mjson.data.downloadUrl
                        });
                    } else {
                        this.setState({
                            fanmian: {
                                uri: response.mjson.data.downloadUrl
                            },
                            fanmianid: response.mjson.data.downloadUrl
                        });
                    }
                } else {
                    this.props.screenProps.showToast('上传失败')
                }

            }, (error) => {
                // this.props.closeLoading();
                this.props.screenProps.showToast('上传失败');
                // console.log(JSON.stringify(error));
            });
    };
}

const styles = StyleSheet.create({
    parentStyle: {
        flex: 1
    },
    childStyle: {
        width: width,
        height: height
    },
});

