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
import MineAuthItem from "./component/MineAuthItem";
import NavigationView from '../component/AllNavigationView';
import TrainItem from "./component/TrainItem";
import * as Urls from "../constant/appUrls";
import {request} from "../utils/RequestUtil";

export default class MainScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.allCount = 0;
        this.successCount = 0;
        this.failCount = 0;
        this.state = {
            source: [],
            renderPlaceholderOnly: 'blank'
        };
    }

    initFinish = () => {
        let maps = {};
        request(Urls.MYAPPLY, 'Post', maps)
            .then((response) => {
                    console.log(response);
                    this.allCount = response.mjson.data.length;
                    for (let i = 0; i < response.mjson.data.length; i++) {
                        if (response.mjson.data[i].job.auditStatusStr == '审核通过') {
                            this.successCount++;
                        } else if (response.mjson.data[i].job.auditStatusStr == '审核不通过') {
                            this.failCount++;
                        }
                    }
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        renderPlaceholderOnly: 'success',
                        source: ds.cloneWithRows(response.mjson.data)
                    });
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
                width: width, backgroundColor: fontAndColor.COLORB0, height: Pixel.getPixel(150),
                flexDirection: 'row', marginTop: Pixel.getTitlePixel(64)
            }}>
                <View style={{flex: 1, justifyContent: 'center'}}></View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                        backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7),
                    }}>
                        已申请总数
                    </Text>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                        backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7)
                    }}>
                        成功申请
                    </Text>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                        backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7)
                    }}>
                        失败申请
                    </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                        backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7),
                    }}>
                        {this.allCount}
                    </Text>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                        backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7)
                    }}>
                        {this.successCount}
                    </Text>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                        backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7)
                    }}>
                        {this.failCount}
                    </Text>
                </View>
            </View>
            <MineAuthItem data={{name: '岗位列表', content: '', left: require('../../images/leftimage.png')}}
                          callBack={() => {
                          }}/>
            <View style={{width: width, height: 1, backgroundColor: fontAndColor.COLORA3}}></View>
            <ListView
                removeClippedSubviews={false}
                dataSource={this.state.source}
                renderRow={this._renderRow}
                style={{marginTop: Pixel.getPixel(20)}}
                showsVerticalScrollIndicator={false}
                renderSeparator={this._renderSeparator}
            />
            <NavigationView
                title="我申请的工作"
                backIconClick={this.backPage}
            />
        </View>)
    }

    _renderPlaceholderView() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
                {this.loadView()}
                <NavigationView
                    title={"我申请的工作"}
                    backIconClick={this.backPage}
                />
            </View>
        );
    }


    _renderRow = (movie, sectionId, rowId) => {
        if (rowId == 0) {
            return (<View>
                <TrainItem number={'序号'} data={{
                    companyName: '工厂名称', name: '岗位名称',
                    jobTypeStr: '岗位分类', auditStatusStr: '是否成功'
                }} show={true}></TrainItem>
                <TrainItem number={parseInt(rowId) + 1} data={movie.job} show={false}></TrainItem>
            </View>);
        } else {
            return (<TrainItem number={parseInt(rowId) + 1} data={movie.job} show={false}></TrainItem>)
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

