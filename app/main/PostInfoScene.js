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
    Linking
} from 'react-native';

import BaseComponent from '../component/BaseComponent';

let {height, width} = Dimensions.get('window');

import Pixel from '../utils/PixelUtil'

import * as fontAndColor from '../constant/fontAndColor';
import NavigationView from '../component/AllNavigationView';
import PostInfoOneItem from './component/PostInfoOneItem';
import PostInfoTwoItem from './component/PostInfoTwoItem';
import PostInfoThreeItem from './component/PostInfoThreeItem';
import PostInfoFourItem from './component/PostInfoFourItem';
import PostInfoFiveItem from './component/PostInfoFiveItem';
import PostInfoSixItem from './component/PostInfoSixItem';
import PostInfoSevenItem from './component/PostInfoSevenItem';
import * as Urls from "../constant/appUrls";
import {request} from "../utils/RequestUtil";
import PostPow from './component/PostPow';
import LoginScene from '../login/LoginScene';
import PostInfoEightItem from "./component/PostInfoEightItem";
import PostInfoNiveItem from "./component/PostInfoNiveItem";
export default class PostInfoScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.allData = {};
        let mList = [1, 2, 3, 4, 5, 6, 7,8,9];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            source: ds.cloneWithRows(mList),
            renderPlaceholderOnly: 'loading'
        };
    }


    initFinish = () => {
        let maps = {
            id: this.props.navigation.state.params.id
        };
        request(Urls.DETAIL, 'Post', maps)
            .then((response) => {
                    console.log(response);
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
            <ListView
                removeClippedSubviews={false}
                dataSource={this.state.source}
                renderRow={this._renderRow}
                showsVerticalScrollIndicator={false}
                style={{marginTop: Pixel.getTitlePixel(64)}}
            />
            <NavigationView
                title={"企业岗位详情--" + this.allData.jobTypeStr}
                backIconClick={this.backPage}
            />
            <PostPow ref='postpow'/>
        </View>)
    }

    _renderPlaceholderView() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
                {this.loadView()}
                <NavigationView
                    title={"企业岗位详情--" + this.props.navigation.state.params.name}
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    sendPost = () => {
        if(this.isNull(global.token)){
            this.toNextPage({  name: 'LoginScene',
                component: LoginScene,
                params: {}});
        }else{
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
        if (rowId == 0) {
            return (<PostInfoOneItem data={this.allData}/>)
        } else if (rowId == 2) {
            return (<PostInfoThreeItem data={this.allData}/>);
        } else if (rowId == 3) {
            return (<PostInfoFourItem data={this.allData}/>);
        } else if (rowId == 4) {
            return (<PostInfoFiveItem data={this.allData}/>);
        } else if (rowId == 5) {
            return (<PostInfoSixItem data={this.allData}/>);
        } else if (rowId == 6) {
            return (<PostInfoEightItem data={this.allData}/>);

        } else if (rowId == 7) {
            return (<PostInfoNiveItem data={this.allData}/>);

        }else if (rowId == 8) {
            return (<PostInfoSevenItem callBack={() => {
                this.sendPost();
            }} telBack={()=>{
                Linking.openURL('tel:' + '0512-57256116');
            }} data={this.allData}/>);
        }else {
            return (<PostInfoTwoItem data={this.allData}/>);
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

