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
    ListView, NativeModules
} from 'react-native';

import BaseComponent from '../component/BaseComponent';

let {height, width} = Dimensions.get('window');

import Pixel from '../utils/PixelUtil'

import NavigationView from '../component/AllNavigationView';
import * as Urls from "../constant/appUrls";
import {request} from "../utils/RequestUtil";
import LoginScene from '../login/LoginScene';
import TongXunItem from './component/TongXunItem';
import * as fontAndColor from "../constant/fontAndColor";

export default class TongXunLuScene extends BaseComponent {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            source: ds.cloneWithRows(JSON.parse(this.props.navigation.state.params.personData)),
            renderPlaceholderOnly: 'success'
        };
    }


    initFinish = () => {
        this.setState({renderPlaceholderOnly: 'success'});
    }

    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return this._renderPlaceholderView();
        }
        return (<View style={{flex: 1, backgroundColor: '#fff'}}>
            <ListView
                removeClippedSubviews={false}
                dataSource={this.state.source}
                renderRow={this._renderRow}
                showsVerticalScrollIndicator={false}
                style={{marginTop: Pixel.getTitlePixel(64)}}
            />
            <View style={{width:width,height:Pixel.getPixel(45),paddingVertical:Pixel.getPixel(5),
            alignItems:'center'}}>
                <TouchableOpacity onPress={() => {
                    console.log(this.allData);
                }} style={{
                    width: Pixel.getPixel(120), height: Pixel.getPixel(35),
                    borderRadius: 5,
                    alignItems: 'center', justifyContent: 'center',
                    backgroundColor: fontAndColor.COLORB0,
                }}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        color: '#fff'
                    }}>推荐选中</Text>
                </TouchableOpacity>
            </View>
            <NavigationView
                title={"通讯录导入"}
                backIconClick={this.backPage}
            />
        </View>)
    }

    _renderPlaceholderView() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
                {this.loadView()}
                <NavigationView
                    title={"通讯录导入"}
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    sendPost = () => {
        if (this.isNull(global.token)) {
            this.toNextPage({
                name: 'LoginScene',
                component: LoginScene,
                params: {}
            });
        } else {
            this.props.screenProps.showModal(true);
            let maps = {
                id: this.allData.id
            };
            request(Urls.APPLY, 'Post', maps)
                .then((response) => {
                        console.log(response);
                        this.props.screenProps.showModal(false);
                        this.refs.postpow.changeShow('申请成功');
                    },
                    (error) => {
                        this.props.screenProps.showModal(false);
                        this.refs.postpow.changeShow('申请失败');
                    });
        }

    }

    _renderRow = (movie, sectionId, rowId) => {
        return (<TongXunItem rowId={parseInt(rowId) + 1} data={movie}
                             callBack={(select) => {
                                 this.allData[rowId].select = select;
                             }}/>);

    }
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

