/**
 * Created by wangqi on 2017/5/19.
 */
var request = require('request'),
    fs = require('fs');


var reqUrl = 'https://www.baidu.com';

request({uri:reqUrl}, async function(err, response, body) {

//console.log(response.statusCode);
//console.log(response);

//如果数据量比较大，就需要对返回的数据根据日期、酒店ID进行存储，如果获取数据进行对比的时候直接读文件
    var filePath = __dirname + '/data.js';

    if (fs.exists(filePath)) {
        fs.unlinkSync(filePath);

        console.log('Del file ' + filePath);
    }

    await fs.writeFile(filePath, body, 'utf8', function(err) {
        if (err) {
            throw err;
        }

        console.log('Save ' + filePath + ' ok~');
    });

    console.log('Fetch ' + reqUrl + ' ok~');
});