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
    ListView, Platform
} from 'react-native';

import BaseComponent from '../component/BaseComponent';

let {height, width} = Dimensions.get('window');

import Pixel from '../utils/PixelUtil'
import * as fontAndColor from '../constant/fontAndColor';
import NavigationView from '../component/AllNavigationView';
import MineAuthItem from './component/MineAuthItem';
import CarIDScene from "./CarIDScene";
import MinePow from "./component/MinePow";
import * as Urls from "../constant/appUrls";
import * as StorageKeyNames from "../constant/storageKeyNames";
import {request} from "../utils/RequestUtil";
import StorageUtil from "../utils/StorageUtil";
import ImagePickerManager from "react-native-image-picker";
import * as ImageUpload from '../utils/ImageUpload';

const IS_ANDROID = Platform.OS === 'android';
export default class MineAuthScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.allData = {};
        this.state = {
            renderPlaceholderOnly: 'loading'
        };
    }

    initFinish = () => {
        let maps = {};
        request(Urls.MYINFO, 'Post', maps)
            .then((response) => {
                    this.allData = response.mjson.data;
                    this.setState({renderPlaceholderOnly: 'success'});
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return this._renderPlaceholderView();
        }
        return (<View style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{
                width: width, height: Pixel.getPixel(150), justifyContent: 'center',
                alignItems: 'center', marginTop: Pixel.getTitlePixel(64)
            }}>
                {this.isNull(this.allData.avatar) ? <Image style={{
                    width: Pixel.getPixel(65), height: Pixel.getPixel(65),
                    borderRadius: 100,
                }} source={require('../../images/minetitle.png')}>
                </Image> : <Image style={{
                    width: Pixel.getPixel(65), height: Pixel.getPixel(65),
                    borderRadius: 100,
                }} source={{uri: this.allData.avatar}}>
                </Image>}

                <Text onPress={() => {
                    this.selectPhotoTapped();
                }} style={{
                    fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30), color: '#000',
                    fontWeight: 'bold', marginTop: Pixel.getPixel(10)
                }}>修改</Text>
            </View>
            <MineAuthItem data={{
                name: this.allData.name,
                content: '修改',
                left: require('../../images/ren.png')
            }}
                          callBack={() => {
                              this.refs.MinePow.changeShow(true, "姓名", "请输入姓名");
                          }}/>
            <View style={{width: width, height: 1, backgroundColor: fontAndColor.COLORA3}}></View>
            <MineAuthItem data={{
                name: this.allData.phone,
                content: '',
                left: require('../../images/dianhua.png')
            }}
                          callBack={() => {

                          }}/>
            <View style={{width: width, height: 1, backgroundColor: fontAndColor.COLORA3}}></View>
            <MineAuthItem data={{
                name: '身份证',
                content: this.allData.ifAuth ? '已认证' : '未认证',
                left: require('../../images/shu.png')
            }}
                          callBack={() => {
                              if (!this.allData.ifAuth) {
                                  this.toNextPage({
                                      name: 'CarIDScene',
                                      component: CarIDScene,
                                      params: {
                                          idCardFront: this.allData.idCardFront, idCardEnd:
                                          this.allData.idCardEnd, callBack: () => {
                                              this.props.navigation.state.params.callBack();
                                              this.initFinish();
                                          }
                                      }
                                  })
                              }
                          }}/>
            <View style={{width: width, height: 1, backgroundColor: fontAndColor.COLORA3}}></View>
            <MineAuthItem data={{name: '微信', content: '', left: require('../../images/liao.png')}}
                          callBack={() => {
                          }}/>
            <View style={{width: width, height: 1, backgroundColor: fontAndColor.COLORA3}}></View>
            <NavigationView
                title="个人认证信息"
                backIconClick={this.backPage}
            />
            <MinePow ref="MinePow" callBack={(name, type) => {
                this.toReset(name, type);
            }}/>
        </View>)
    }

    selectPhotoTapped = () => {
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
                this._uploadPicture(response);
                // console.log('aaaaaaaaaaaaaaaaaaaaa'+response.data);
            }
        });
        // }
    }

    _renderPlaceholderView() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
                {this.loadView()}
                <NavigationView
                    title="个人认证信息"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    toReset = (name, type) => {
        this.props.screenProps.showModal(true);
        let maps = {};
        if (type == "姓名") {
            maps.name = name;
        } else if (type == "头像") {
            maps.avatar = name;
        }
        request(Urls.EMPLOYEE_SAVE, 'Post', maps)
            .then((response) => {
                    this.refs.MinePow.changeShow(false);
                    this.props.screenProps.showToast("修改成功");
                    this.props.navigation.state.params.callBack();
                    this.initFinish();
                },
                (error) => {
                    this.refs.MinePow.changeShow(false);
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.screenProps.showToast("网络连接失败");
                    } else {
                        this.props.screenProps.showToast(error.mjson.msg);
                    }

                });
    }


    _uploadPicture = (responses) => {
        this.props.screenProps.showModal(true);
        let params = {
            data: 'data:image/jpeg;base64,' + encodeURI(responses.data).replace(/\+/g, '%2B')
        };
        ImageUpload.request(Urls.OPEN_UPLOAD, 'Post', params).then(
            (response) => {
                if (response.mycode === 1) {
                    this.toReset(response.mjson.data.downloadUrl, "头像");
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

