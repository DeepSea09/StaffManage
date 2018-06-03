import StorageUtil from "./StorageUtil";

var Platform = require('Platform');
import * as StorageKeyNames from "../constant/storageKeyNames";
import {all} from '../constant/AllBackLogin';
import LoginScene from '../login/LoginScene';
const request = (url, method, params, backToLogin) => {
    let loginSuccess = {
        name: 'LoginScene',
        component: LoginScene,
        params: {from:'request'}
    }
    let isOk;
    let body = '{';
    for (let key of Object.keys(params)) {
        body += '\"' + key + '\"';
        body += ':';
        body += '\"' + params[key] + '\"';
        body += ',';
    }
    if (body.length > 0) {
        body = body.substring(0, body.length - 1);
    }
    body += '}';
    console.log(body);

    return new Promise((resolve, reject) => {
        StorageUtil.mGetItem(StorageKeyNames.TOKEN, (data) => {
            let token = '';
            if (data.code === 1) {
                token = data.result;
            }
            // console.log('token===' + token);
            let device_code = '';

            if (Platform.OS === 'android') {
                device_code = 'dycd_platform_android';
            } else {
                device_code = 'dycd_platform_ios';
            }

            console.log(url + '?' + body);
            // token='c14147e5cbcab32f9a7fa449ddfad746';
            fetch(url + '?token=' + global.token, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json;dataType:json"
                },
                body: body
            })
                .then((response) => {
                    console.log(response);
                    if (response.ok) {
                        isOk = true;
                    } else {
                        isOk = false;
                    }

                    return response.json();
                })
                .then((responseData) => {
                    console.log(responseData);
                    if (isOk) {
                        for (let key of Object.keys(params)) {
                            console.log(key + "===" + params[key]);
                        }
                        console.log("success----------" + JSON.stringify(responseData));
                        if (responseData.success) {
                            resolve({mjson: responseData, mycode: 1});
                        } else {
                            if (responseData.msg == 'token已过期') {
                                global.token='';
                                StorageUtil.mSetItem(StorageKeyNames.TOKEN, '');
                                if (all) {
                                    all.immediatelyResetRouteStack([{
                                        ...loginSuccess
                                    }])
                                }
                            } else {
                                reject({mycode: responseData.code, mjson: responseData});
                            }

                        }
                    } else {
                        console.log("error----------" + JSON.stringify(responseData));
                        reject({mycode: -300});
                    }
                })
                .catch((error) => {
                    console.log(error);
                    console.log("error----------error" + error);
                    reject({mycode: -500, error: error});
                });
        })
    });
}

export {request};