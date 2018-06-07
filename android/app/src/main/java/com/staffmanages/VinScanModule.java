package com.staffmanages;

import android.app.Activity;
import android.content.Intent;
import android.telephony.TelephonyManager;
import android.content.Context;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.text.TextUtils;
import android.net.Uri;

import android.os.Environment;
import android.util.Log;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import android.provider.ContactsContract.CommonDataKinds.Phone;
import android.provider.ContactsContract.CommonDataKinds.Photo;
import com.google.gson.Gson;
import java.util.ArrayList;
import android.database.Cursor;
import android.content.ContentResolver;

/**
 * Created by Administrator on 2017/3/2.
 */

public class VinScanModule extends ReactContextBaseJavaModule implements ActivityEventListener{

    private Promise mVLPromise;
    private Context mContext;

    public VinScanModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        mContext = reactContext;
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if(mVLPromise != null){
            if(resultCode == Activity.RESULT_CANCELED){
                mVLPromise.reject("error","Result_Canceled");
            }else if(resultCode == Activity.RESULT_OK){
                if(requestCode == 1){
                    String vl = data.getStringExtra("vl");
                    mVLPromise.resolve(vl);
                    mVLPromise = null;
                }else if(requestCode == 0){
                    String vl = data.getStringExtra("vin");
                    mVLPromise.resolve(vl);
                    mVLPromise = null;
                }
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @Override
    public String getName() {
        return "VinScan";
    }



     @ReactMethod
        public void goBack(){
        Activity currentActivity = getCurrentActivity();
                Intent intent = new Intent(Intent.ACTION_MAIN);
                intent.addCategory(Intent.CATEGORY_HOME);
                                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                                currentActivity.startActivity(intent);
        }
    @ReactMethod
    public void getIMEI(Callback callback){
        TelephonyManager mTm = (TelephonyManager)mContext.getSystemService(Context.TELEPHONY_SERVICE);
        String imei = mTm.getDeviceId();
        callback.invoke(imei);
    }
    @ReactMethod
    public void getPhoneVersion(Callback callback){
        String verison = "phoneVersion=" +android.os.Build.VERSION.RELEASE  +
                ",phoneModel=" + android.os.Build.MODEL+
                ",appVersion="+getAppVersionName(mContext);
        callback.invoke(verison);
    }
    private String getAppVersionName(Context context) {
        String versionName = "";
        try {
            PackageManager packageManager = context.getPackageManager();
            PackageInfo packageInfo = packageManager.getPackageInfo("com.fe_sass", 0);
            versionName = packageInfo.versionName;
            if (TextUtils.isEmpty(versionName)) {
                return "";
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return versionName;
    }

    @ReactMethod
    public void callPhone(String tel){
        tel = tel.replace(",", ",,");
        Intent intent = new Intent(Intent.ACTION_CALL);
        intent.setData(Uri.fromParts("tel", tel, null));//拼一个电话的Uri，拨打分机号 关键代码
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mContext.startActivity(intent);
    }

    @ReactMethod
    public void getPicture(Callback callback){
        String sdPath = getSDPath() + File.separator + "saas.png";
        try {
            InputStream its = mContext.getAssets().open("erweima.png");
            int fileLength = its.available();
            File file = new File(sdPath);
            if (!file.exists()) {
                file.createNewFile();
            }
            FileOutputStream fots = new FileOutputStream(file, true);
            byte[] buffer = new byte[fileLength];
            int readCount = 0;
            while (readCount < fileLength) {
                readCount += its.read(buffer, readCount, fileLength - readCount);
            }
            fots.write(buffer, 0, fileLength);
            its.close();
            fots.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        callback.invoke(sdPath);
    }

    public String getSDPath() {
        File sdDir = null;
        boolean sdCardExist = Environment.getExternalStorageState()
                .equals(android.os.Environment.MEDIA_MOUNTED); //判断sd卡是否存在
        if (sdCardExist) {
            sdDir = Environment.getExternalStorageDirectory();//获取跟目录
        }
        return sdDir.getPath();
    }

     /**获取库Phon表字段**/
        private static final String[] PHONES_PROJECTION = new String[] {
                Phone.DISPLAY_NAME, Phone.NUMBER, Photo.PHOTO_ID,Phone.CONTACT_ID };

        /**联系人显示名称**/
        private static final int PHONES_DISPLAY_NAME_INDEX = 0;

        /**电话号码**/
        private static final int PHONES_NUMBER_INDEX = 1;

        @ReactMethod
        public void getSIMList(Callback callback){
            ArrayList<ContactsModal> mContactsName = new ArrayList<ContactsModal>();
            getPhoneContacts(mContactsName);
            /**得到手机SIM卡联系人人信息**/
                ContentResolver resolver = mContext.getContentResolver();
                // 获取Sims卡联系人
                Uri uri = Uri.parse("content://icc/adn");
                Cursor phoneCursor = resolver.query(uri, PHONES_PROJECTION, null, null,
                        null);

                if (phoneCursor != null) {
                    while (phoneCursor.moveToNext()) {

                        // 得到手机号码
                        String phoneNumber = phoneCursor.getString(PHONES_NUMBER_INDEX);
                        // 当手机号码为空的或者为空字段 跳过当前循环
                        if (TextUtils.isEmpty(phoneNumber))
                            continue;
                        // 得到联系人名称
                        String contactName = phoneCursor
                                .getString(PHONES_DISPLAY_NAME_INDEX);

                        //Sim卡中没有联系人头像

                        mContactsName.add(new ContactsModal(contactName,phoneNumber));
                    }
                    Gson gson = new Gson();
                    callback.invoke(gson.toJson(mContactsName));
                    phoneCursor.close();
            }
        }

        /**得到手机通讯录联系人信息**/
        private void getPhoneContacts(ArrayList<ContactsModal> mContactsName) {
            ContentResolver resolver = mContext.getContentResolver();

            // 获取手机联系人
            Cursor phoneCursor = resolver.query(Phone.CONTENT_URI,PHONES_PROJECTION, null, null, null);


            if (phoneCursor != null) {
                while (phoneCursor.moveToNext()) {

                    //得到手机号码
                    String phoneNumber = phoneCursor.getString(PHONES_NUMBER_INDEX);
                    //当手机号码为空的或者为空字段 跳过当前循环
                    if (TextUtils.isEmpty(phoneNumber))
                        continue;

                    //得到联系人名称
                    String contactName = phoneCursor.getString(PHONES_DISPLAY_NAME_INDEX);

                    mContactsName.add(new ContactsModal(contactName,phoneNumber));
                }

                phoneCursor.close();
            }
        }

}
