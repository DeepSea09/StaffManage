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
import ReleaseSelectItem from './component/ReleaseSelectItem';
import ReleaseSelectPow from './component/ReleaseSelectPow';
import ReleaseNumberItem from './component/ReleaseNumberItem';
import ReleaseTimeItem from './component/ReleaseTimeItem';
import ReleaseOneItem from './component/ReleaseOneItem';
import ReleaseAllItem from './component/ReleaseAllItem';
import ReleaseButtonItem from "./component/ReleaseButtonItem";

export default class ReleaseScene extends BaseComponent {

    constructor(props) {
        super(props);
        let myDate = new Date();
        this.mList = [{name: '企业名称', type: 'select', content: ['昆山富士康'], newContent: '昆山富士康'},
            {name: '岗位名称', type: 'select', content: ['普工', '管理'], newContent: '普工'},
            {name: '岗位数量', type: 'number', content: 1, newContent: ''},
            {name: '岗位分类', type: 'one', content: ['好工作', '高返费', '小时工'], newContent: ''},
            {name: '岗位福利', type: 'all', content: ['五險一金', '包住', '包吃', '加班补助', '年度旅游',
                    '聚会', '培训', '员工体检'], newContent: ''},
            {name: '岗位工资', type: 'number', content: 1000, newContent: ''},
            {name: '返费金额', type: 'number', content: 1000, newContent: ''},
            {name: '到岗时间', type: 'time', content: myDate.toLocaleDateString()},
            {name: '123', type: 'button', content: myDate.toLocaleDateString()},];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            source: ds.cloneWithRows(this.mList),
            renderPlaceholderOnly: 'blank'
        };
    }

    initFinish=()=>{
        this.setState({renderPlaceholderOnly: 'success'});
    }


    render() {
        if(this.state.renderPlaceholderOnly!='success'){
            return<View style={{flex:1, backgroundColor:'#fff'}}></View>
        }
        return (<View style={{flex: 1, backgroundColor: '#fff'}}>
            <ListView
                removeClippedSubviews={false}
                dataSource={this.state.source}
                style={{marginTop: Pixel.getTitlePixel(94)}}
                renderRow={this._renderRow}
                showsVerticalScrollIndicator={false}
            />

            <NavigationView
                title="岗位快速发布"
                backIconClick={this.backPage}
            />
            <ReleaseSelectPow ref='releaseselectpow' callBack={(content, id) => {
                this.mList[id].newContent = content;
                let newList = this.mList;
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    source: ds.cloneWithRows(newList),
                });
            }}/>
        </View>)
    }

    _renderRow = (movie, sectionId, rowId) => {
        if (movie.type == 'select') {
            return (<ReleaseSelectItem data={movie} callBack={(x, y) => {
                this.refs.releaseselectpow.changeShow(x, y, movie.content, rowId);
            }}/>);
        }else if(movie.type=='time'){
            return (<ReleaseTimeItem data={movie} callBack={(time) => {
                this.mList[rowId].newContent = time;
            }}/>);
        } else if(movie.type=='one'){
           return(<ReleaseOneItem data={movie} callBack={(content)=>{
               this.mList[rowId].newContent = content;
           }}/>)
        }else if(movie.type=='all'){
            return(<ReleaseAllItem data={movie} callBack={(content,is)=>{

            }}/>)
        }else if(movie.type=='button'){
            return(<ReleaseButtonItem data={movie}/>)
        }else {
            return (<ReleaseNumberItem data={movie} callBack={(number) => {
                this.mList[rowId].newContent = number;
            }}/>);
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

