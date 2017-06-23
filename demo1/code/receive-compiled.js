'use strict';

/**
 * Created by wangqi on 2017/6/5.
 */
var express = require('express');
var app = express();
app.set('port', process.env.port || 3000);
app.post('/images', function (req, res) {
    console.log(req);
    res.send('image received');
});
app.get('/', function (req, res) {
    res.send('hello');
});
app.listen(app.get('port'), function () {
    console.log('Visit http://localhost:' + app.get('port'));
});

//# sourceMappingURL=receive-compiled.js.map