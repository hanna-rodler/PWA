"use strict";

/***************************************************
 *  A Collectorclass for several useful functions
 *
 *  KWM, 2022-03-26
 ***************************************************/

export default class KWM_Utils{

    static isEmpty(variable){
        if(Array.isArray(variable))
            return (variable.length == 0);
        else if(typeof variable === "object")
            return (Object.entries(variable).length === 0 && variable.constructor === Object);
        else
            return (typeof variable === "undefined" || variable == null || variable === "");
    }

    static getOS(){
        let device = "Unknown Device";
        if(navigator.appVersion.indexOf("Win")!=-1) device = "Windows";
        if(navigator.appVersion.indexOf("Mac")!=-1) device = "MacOS"; //iPad Pro & iPhone 6 :)
        if(navigator.appVersion.indexOf("Android")!=-1) device = "Android";
        if(navigator.appVersion.indexOf("iOS")!=-1) device = "iOS";
        return device;
    }

    static clientHasCamera(){
        navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        navigator.getMedia({video: true}, function(stream) {
            stream.getTracks().forEach(function(track) {
                track.stop();
            });
            return true;
        }, function() {
            return false;
        });
    }

    static getIndexOfObjectInArrayByPropertyvalue(array, property, value){
        for(let i = 0; i < array.length; i++) {
            if(array[i][property] === value)
                return i;
        }
        return -1;
    }

    static getGetParameters() {
        let index = window.location.hash.substr(1).indexOf("?");
        if (index != -1) {
            let parameters = window.location.hash.substr(index+2);
            let result = parameters.split('&').reduce(function (result, item) {
                let parts = item.split('=');
                result[parts[0]] = parts[1];
                return result;
            }, {});
            return(result);
        } else
            return {};
    }

}