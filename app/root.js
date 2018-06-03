import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StatusBar,
    Modal,
    Image,
    Text,
    Platform,
    Alert,
    AppState,
    NetInfo,

} from 'react-native';
import StorageUtil from "./utils/StorageUtil";
import * as StorageKeyNames from "./constant/storageKeyNames";
import MyNavigator  from './component/MyNavigator';
import * as fontAndColor from './constant/fontAndColor';
import ShowToast from "./component/toast/ShowToast";

export default class root extends Component {



    render() {
        return (
            <View style={{flex:1,backgroundColor:fontAndColor.COLORA3}}>
                <StatusBar barStyle="light-content"/>
                <MyNavigator showToast={(content)=>{
                    this.showToast(content)
                }}showModal={(value)=>{this.showModal(value)}} showLoginModal={this.showLoginModal}/>
                <ShowToast ref='toast' msg={''}></ShowToast>
            </View>
        );
    }


    componentDidMount() {
        global.token = '';
        StorageUtil.mGetItem(StorageKeyNames.TOKEN, (data) => {
            if (data.code == 1) {
                global.token=data.result;
            }
        })
        console.log(global.token);
        console.log('========================');
    }

    showToast = (content) => {
        this.refs.toast.changeType(ShowToast.TOAST, content);
    }

    showModal = (value) => {
        this.refs.toast.showModal(value);
    }

}


