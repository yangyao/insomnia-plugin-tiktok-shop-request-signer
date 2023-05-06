const crypto = require('crypto');
const fs = require('fs');

const objKeySort = (obj) => {
    var newKey = Object.keys(obj).sort()
    var newObj = {}
    for (var i = 0; i < newKey.length; i++) {
        newObj[newKey[i]] = obj[newKey[i]]
    }
    return newObj
};

const createSign = ({
    timestamp,
    appSecret,
    urlPath,
    queryParam
}) => {
    const param = {timestamp};
    for (const item of queryParam) {
        param[item.name] = item.value;
    }
    delete param["sign"];
    delete param["access_token"]
    const sortedObj = objKeySort(param)
    var signstring = appSecret + urlPath
    for (var key in sortedObj) {
        signstring = signstring + key + sortedObj[key]
    }
    signstring = signstring + appSecret
    return crypto.createHmac('sha256', appSecret).update(signstring).digest('hex');
}


const getTimestamp = () => {
    return Date.parse(new Date()) / 1000
}

const encodeRequest = (context) => {
    const url = context.request.getUrl();
    const timestamp = getTimestamp();
    const queryParam = context.request.getParameters();
    const appSecret = context.request.getEnvironmentVariable('app_secret');
    const urlPath = new URL(url).pathname
    const sign = createSign({
        timestamp,
        appSecret,
        queryParam,
        urlPath
    });

    return {
        sign,
        timestamp,
    };
}

module.exports.requestHooks = [
    (context) => {
        if(context.request.hasHeader('x-tts-sign') && context.request.getHeader('x-tts-sign') == 'true')
        {
            const {sign, timestamp} = encodeRequest(context);
            context.request.addParameter('sign', sign);
            context.request.addParameter('timestamp', timestamp);
            context.request.removeHeader('x-tts-sign');
        }
    }
];
