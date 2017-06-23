'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by wangqi on 2017/5/19.
 */
var request = require('request'),
    fs = require('fs');

var reqUrl = 'https://www.baidu.com';

request({ uri: reqUrl }, function () {
    var _ref = _asyncToGenerator(_regenerator2.default.mark(function _callee(err, response, body) {
        var filePath;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        //console.log(response.statusCode);
                        //console.log(response);

                        //如果数据量比较大，就需要对返回的数据根据日期、酒店ID进行存储，如果获取数据进行对比的时候直接读文件
                        filePath = __dirname + '/data.js';


                        if (fs.exists(filePath)) {
                            fs.unlinkSync(filePath);

                            console.log('Del file ' + filePath);
                        }

                        _context.next = 4;
                        return fs.writeFile(filePath, body, 'utf8', function (err) {
                            if (err) {
                                throw err;
                            }

                            console.log('Save ' + filePath + ' ok~');
                        });

                    case 4:

                        console.log('Fetch ' + reqUrl + ' ok~');

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}());

//# sourceMappingURL=http-compiled.js.map