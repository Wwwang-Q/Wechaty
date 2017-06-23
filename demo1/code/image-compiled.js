'use strict';

/**
 * Created by wangqi on 2017/6/5.
 */
var needle = require('needle');

var data = [{
    file: '/Users/wangqi/Downloads/FrontEnd/FullStack/wechaty/demo1/image/filters.png',
    content_type: 'image/png'
}];

needle.post('111.207.243.71:8000/Imagetest', data, { multipart: true }, function (err, res) {
    console.log(res.body.data);
});

//# sourceMappingURL=image-compiled.js.map