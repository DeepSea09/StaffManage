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
        return <View style={{height:Pixel.getPixel(120),justifyContent:'center',alignItems:'center',
        backgroundColor:fontAndColor.COLORB0}}>
            <TouchableOpacity onPress={()=>{
                this.props.findBack();
            }} style={{marginTop:Pixel.getPixel(10),width:width-Pixel.getPixel(60),
                height:Pixel.getPixel(35),backgroundColor:'#fff',borderWidth:1,
            borderColor:fontAndColor.COLORA4,borderRadius:3,flexDirection:'row'}}>
                <View style={{flex:1,justifyContent:'center',paddingLeft:Pixel.getPixel(5)}}>
                        <Text style={{fontSize:Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        color:'#000'}}>查找你感兴趣的岗位</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',paddingRight:Pixel.getPixel(5),alignItems:'flex-end'}}>
                    <Image style={{width: Pixel.getPixel(25), height: Pixel.getPixel(25)}}
                           source={require('../../../images/findIcon.png')}/>
                </View>
            </TouchableOpacity>
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
        marginTop:Pixel.getPixel(10),
        backgroundColor:fontAndColor.COLORB0
    },
});

