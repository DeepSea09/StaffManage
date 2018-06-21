import StorageUtil from "./StorageUtil";

var Platform = require('Platform');
import * as StorageKeyNames from "../constant/storageKeyNames";

const request = (url, method, params) => {

    let isOk;
    let body = '{\"data\":\"';
    // for (let key of Object.keys(params)) {
    //     body += '\"' + key + '\"';
    //     body += ':';
    //     body += '\"' + params[key] + '\"';
    //     body += ',';
    // }
    body += params["data"];
    // if (body.length > 0) {
    //     body = body.substring(0, body.length - 1);
    // }
    body += '\"}';
    console.log(body)
    return new Promise((resolve, reject) => {
        StorageUtil.mGetItem(StorageKeyNames.TOKEN, (data) => {
            let token = '';
            if (data.code === 1) {
                token = data.result;
            }
            // console.log('token===' + token);
            let device_code = '';

            if (Platform.OS === 'android') {
                device_code = 'dycd_dms_manage_android';
            } else {
                device_code = 'dycd_dms_manage_android';
            }
            fetch(url + '?token=' + global.token, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json;dataType:json"
                },
                body: body
            })
                .then((response) => {
                    if (response.ok) {
                        isOk = true;
                    } else {
                        isOk = false;
                    }
                    console.log(response);
                    return response.json();
                })
                .then((responseData) => {
                    if (isOk) {
                        console.log("11111111111111111111111");
                        console.log(responseData);
                        if (responseData.success == true) {
                            console.log("33333333333333333333333333333");
                            resolve({mjson: responseData, mycode: 1});
                        } else {
                            console.log("4444444444444444444444444444444");
                            reject({mycode: responseData.code, mjson: responseData});
                        }
                        // } else {
                        // console.log("error----------" + JSON.stringify(responseData));
                    }
                })
                .catch((error) => {
                    console.log("22222222222222222222222222222222222");
                    // console.log("error----------error" + error);
                    reject({mycode: -500, error: error});
                });
        })
    });
}

export {request};