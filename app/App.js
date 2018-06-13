import {Platform} from 'react-native'
import {StackNavigator} from 'react-navigation'
import RootScene from './main/RootScene'
import NavigationScene from './main/NavigationScene'
import ApplyScene from './main/ApplyScene'
import CarIDScene from './main/CarIDScene'
import FindPostListScene from './main/FindPostListScene'
import MineAuthScene from './main/MineAuthScene'
import MineMoneyScene from './main/MineMoneyScene'
import MineServiceScene from './main/MineServiceScene'
import PostInfoScene from './main/PostInfoScene'
import ReleaseScene from './main/ReleaseScene'
import TongXunLuScene from './main/TongXunLuScene'
import TrainScene from './main/TrainScene'
import TuiJianGongYouScene from './main/TuiJianGongYouScene'
import WelfareScene from './main/WelfareScene'
import LoginScene from './login/LoginScene'
import ChildMineInviScene from "./main/ChildMineInviScene";
import WelcomScene from "./main/WelcomScene";

export default App = StackNavigator({
        RootScene: {screen: RootScene},
        NavigationScene: {screen: NavigationScene},
        CarIDScene: {screen: CarIDScene},
        ApplyScene: {screen: ApplyScene},
        FindPostListScene: {screen: FindPostListScene},
        MineAuthScene: {screen: MineAuthScene},
        MineMoneyScene: {screen: MineMoneyScene},
        MineServiceScene: {screen: MineServiceScene},
        PostInfoScene: {screen: PostInfoScene},
        ReleaseScene: {screen: ReleaseScene},
        TongXunLuScene: {screen: TongXunLuScene},
        TrainScene: {screen: TrainScene},
        TuiJianGongYouScene: {screen: TuiJianGongYouScene},
        WelfareScene: {screen: WelfareScene},
        LoginScene: {screen: LoginScene},
        ChildMineInviScene: {screen: ChildMineInviScene},
        WelcomScene: {screen: WelcomScene},
    },
    {
        initialRouteName: 'RootScene',
        headerMode: 'none'
    }
);