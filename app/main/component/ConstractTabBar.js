import React, {Component,PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image, Dimensions
} from 'react-native';
import Pixel from '../../utils/PixelUtil';
let {height, width} = Dimensions.get('window');
import ChildTabView from './ConstractChildTabView';
import * as fontAndColor from '../../constant/fontAndColor';
export default class ConstractTabBar extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            tabName: this.props.tabName
        }
    }

    goToPages = (i) => {
        this.props.goToPage(i);
    }

    render() {
        let tabChild = [];
        this.props.tabs.map((tab, i) => {
            tabChild.push(<ChildTabView key={tab} goToPages={(i) => {
                this.goToPages(i);
                this.props.callBack(this.props.tabName);
            }} tab={tab} i={i} tabName={this.props.tabName} activeTab={this.props.activeTab}/>);
        })
        return <View style={{height:Pixel.getPixel(140),justifyContent:'center',alignItems:'center',
        backgroundColor:fontAndColor.COLORB0}}>
            <Image style={{width:width,height:Pixel.getPixel(100),
                resizeMode: 'stretch',}} source={require('../../../images/newgwlb.jpg')}></Image>
            <ScrollView  showsHorizontalScrollIndicator={false} horizontal={true}
                         contentContainerStyle={[styles.tabs]}>
                {tabChild}
            </ScrollView>
            </View>;
    }
}

const styles = StyleSheet.create({
    tab: {
        height:Pixel.getPixel(50),
        backgroundColor: '#ffffff',
        width:width
    },
    tabs: {
        height: Pixel.getPixel(40),
        borderBottomColor: fontAndColor.COLORB0,
        backgroundColor:fontAndColor.COLORB0
    },
});

