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
    ListView
} from 'react-native';

import BaseComponent from '../component/BaseComponent';

let {height, width} = Dimensions.get('window');

import Pixel from '../utils/PixelUtil'
import * as fontAndColor from '../constant/fontAndColor';
import NavigationView from '../component/AllNavigationView';
import MineAuthItem from './component/MineAuthItem';
import InviItem from './component/InviItem';
import MainScene from "./NavigationScene";
import TuiJianGongYouScene from "./TuiJianGongYouScene";
import * as Urls from "../constant/appUrls";
import {request} from "../utils/RequestUtil";

export default class ChildMineInviScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            source: [],
            renderPlaceholderOnly: 'loading'
        };
    }

    initFinish = () => {
        let maps = {};
        request(Urls.RECOMMEND, 'Post', maps)
            .then((response) => {
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({renderPlaceholderOnly: 'success',
                        source: ds.cloneWithRows(response.mjson.data)});
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

            <ListView
                removeClippedSubviews={false}
                dataSource={this.state.source}
                renderRow={this._renderRow}
                showsVerticalScrollIndicator={false}
            />
            <NavigationView
                title="我的推荐"
                backIconClick={this.backPage}
            />
        </View>)
    }

    _renderPlaceholderView() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
                {this.loadView()}
                <NavigationView
                    title={"我的推荐"}
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        if (rowId == 0) {
            return (
                <View style={{alignItems: 'center'}}>
                    <View style={{
                        width: width, height: Pixel.getPixel(180), justifyContent: 'center',
                        alignItems: 'center', marginTop: Pixel.getTitlePixel(64), backgroundColor: '#0ff'
                    }}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30), color: '#000',
                            fontWeight: 'bold', marginTop: Pixel.getPixel(10)
                        }}>占位图</Text>
                    </View>
                    <MineAuthItem data={{name: '奖励说明文字', content: '', left: require('../../images/leftimage.png')}}
                                  callBack={() => {
                                  }}/>
                    <View style={{width: width, height: 1, backgroundColor: fontAndColor.COLORA3}}></View>
                    <MineAuthItem data={{name: '其他说明', content: '', left: require('../../images/leftimage.png')}}
                                  callBack={() => {
                                  }}/>
                    <View style={{width: width, height: 1, backgroundColor: fontAndColor.COLORA3}}></View>
                    <TouchableOpacity onPress={() => {
                        this.toNextPage({
                            name: 'TuiJianGongYouScene',
                            component: TuiJianGongYouScene,
                            params: {}
                        });
                    }} style={{
                        width: Pixel.getPixel(120), height: Pixel.getPixel(40),
                        backgroundColor: fontAndColor.COLORB0, borderRadius: 5, justifyContent: 'center',
                        alignItems: 'center', marginTop: Pixel.getPixel(15)
                    }}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30), color: '#fff'
                            ,
                        }}>推荐工友</Text></TouchableOpacity>
                    <MineAuthItem data={{name: '我的推荐', content: '', left: require('../../images/leftimage.png')}}
                                  callBack={() => {
                                  }}/>
                    <View style={{width: width, height: 1, backgroundColor: fontAndColor.COLORA3}}></View>
                    <InviItem number={'序号'} data={{ name: '姓名', creator: '状态'}} show={true}/>
                    <InviItem number={parseInt(rowId)+1} data={movie} show={false}/>
                </View>
            )
        }
        else {
            return (
                <View style={{alignItems: 'center'}}>
                    <InviItem number={parseInt(rowId)+1} data={movie} show={false}></InviItem>
                </View>
            )
        }
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

