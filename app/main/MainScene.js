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
import WoDeTitle from './component/WoDeTitle';
import WoDeItem from './component/WoDeItem';
import MineAuthScene from "./MineAuthScene";
import MineMoneyScene from "./MineMoneyScene";
import MineInviScene from "./MineInviScene";
import ReleaseScene from "./ReleaseScene";
import PostScene from "./PostScene";
import TrainScene from "./TrainScene";
import MineServiceScene from "./MineServiceScene";
import WelfareScene from "./WelfareScene";
import ApplyScene from "./ApplyScene";
import CarIDScene from "./CarIDScene";
import * as Urls from "../constant/appUrls";
import {request} from "../utils/RequestUtil";
import ChildMineInviScene from "./ChildMineInviScene";

export default class MainScene extends BaseComponent {

    constructor(props) {
        super(props);
        let mList = [{name: '顶部', content: '1', left: require('../../images/icons/Add.png')},
            {name: '我的客服', content: '专属客服，快速找到工作', left: require('../../images/ren.png')},
            {name: '我申请的工作', content: '历史工作申请记录', left: require('../../images/xie.png')},
            // {name: '工作经历', content: '历史工作记录', left: require('../../images/icons/Attention.png')},
            {name: '我的薪水', content: '薪水，借支清清楚楚', left: require('../../images/wdxsss.png')},
            {name: '我的推荐', content: '推荐好友获得奖励', left: require('../../images/renjia.png')},
            {name: '我的工友', content: '认识更多工友', left: require('../../images/shuangren.png')},
            {name: '会员福利', content: '吃喝玩住行一网打尽', left: require('../../images/labas.png')},
            // {name: '我的证书', content: '学历、技能证书', left: require('../../images/icons/Update.png')},
            {name: '我的培训', content: '提升技能、更高月薪', left: require('../../images/jias.png')},];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.allData = {};
        this.state = {
            source: ds.cloneWithRows(mList),
            renderPlaceholderOnly: 'loading'
        };
    }


    initFinish = () => {
        console.log("zlzlzlzlzlzlzlzlzllzz")
        let maps = {};
        request(Urls.MYINFO, 'Post', maps)
            .then((response) => {
                    this.allData = response.mjson.data;
                    let newlist = [{name: '顶部', content: '1', left: require('../../images/icons/Add.png')},
                        {name: '我的客服', content: '专属客服，快速找到工作', left: require('../../images/ren.png')},
                        {name: '我申请的工作', content: '历史工作申请记录', left: require('../../images/xie.png')},
                        // {name: '工作经历', content: '历史工作记录', left: require('../../images/icons/Attention.png')},
                        {name: '我的薪水', content: '薪水，借支清清楚楚', left: require('../../images/wdxsss.png')},
                        {name: '我的推荐', content: '推荐好友获得奖励', left: require('../../images/renjia.png')},
                        {name: '我的工友', content: '认识更多工友', left: require('../../images/shuangren.png')},
                        {name: '会员福利', content: '吃喝玩住行一网打尽', left: require('../../images/labas.png')},
                        // {name: '我的证书', content: '学历、技能证书', left: require('../../images/icons/Update.png')},
                        {name: '我的培训', content: '提升技能、更高月薪', left: require('../../images/jias.png')},];
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({source: ds.cloneWithRows(newlist), renderPlaceholderOnly: 'success'});
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
                renderSeparator={this._renderSeparator}
            />
        </View>)
    }

    _renderPlaceholderView() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
                {this.loadView()}
            </View>
        );
    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={{width: width, height: 1, backgroundColor: fontAndColor.COLORA3}} key={sectionId + rowId}>
            </View>
        )
    }

    _renderRow = (movie, sectionId, rowId) => {
        if (rowId == 0) {
            return (<WoDeTitle toInfo={() => {
                this.props.toNextPage({
                    name: 'MineAuthScene',
                    component: MineAuthScene,
                    params: {
                        data: this.allData, callBack: () => {
                            this.initFinish();
                        }
                    }
                });
            }} callBack={() => {
                this.props.toNextPage({
                    name: 'CarIDScene',
                    component: CarIDScene,
                    params: {
                        idCardFront: this.allData.idCardFront, idCardEnd:
                        this.allData.idCardEnd, callBack: () => {
                            this.initFinish();
                        }
                    }
                });
            }
            } data={this.allData}/>)
        }
        // else if(movie.name=='bottom'){
        //    return(<View style={{width:width,height:Pixel.getPixel(100), backgroundColor:'#fff'}}></View>)
        // }
        else {
            return (<WoDeItem data={movie} callBack={() => {
                if (movie.name == '我的薪水') {
                    this.props.toNextPage({
                        name: 'MineMoneyScene',
                        component: MineMoneyScene,
                        params: {}
                    });
                } else if (movie.name == '我的推荐') {
                    this.props.toNextPage({
                        name: 'ChildMineInviScene',
                        component: ChildMineInviScene,
                        params: {}
                    });
                } else if (movie.name == '我申请的工作') {
                    this.props.toNextPage({
                        name: 'ApplyScene',
                        component: ApplyScene,
                        params: {}
                    });
                } else if (movie.name == '我的培训') {
                    this.props.toNextPage({
                        name: 'TrainScene',
                        component: TrainScene,
                        params: {}
                    });
                } else if (movie.name == '我的客服') {
                    this.props.toNextPage({
                        name: 'MineServiceScene',
                        component: MineServiceScene,
                        params: {}
                    });
                } else if (movie.name == '会员福利') {
                    this.props.toNextPage({
                        name: 'WelfareScene',
                        component: WelfareScene,
                        params: {}
                    });
                }
            }}></WoDeItem>)
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

