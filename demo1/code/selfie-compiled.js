'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _wechaty = require('wechaty');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by wangqi on 2017/5/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
/*用户发送'selfie',回复"请发一张你的头像"。
 * 用户回复消息为图片格式,则获取评分。否则,回复"发送的不是图片格式,请重新发送selfie"
 *
 * 用户发送'selfie',则开启bot.on('message',selfie)监听,并将用户存入列表中
 * 若列表为空,则移除监听。*/

var bot = _wechaty.Wechaty.instance();
var needle = require('needle');
var selfieList = [];
bot.on('scan', function (url, code) {
    var loginUrl = url.replace('qrcode', 'l');
    require('qrcode-terminal').generate(loginUrl);
    console.log(url);
}).on('login', function (user) {
    return console.log('User ' + user + ' logined');
}).on('message', function () {
    var _ref = _asyncToGenerator(_regenerator2.default.mark(function _callee2(m) {
        var contact, content, room;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        contact = m.from();
                        // console.log("人");

                        content = m.content();
                        room = m.room();

                        if (room) {
                            console.log('Room:' + room.topic() + '\u3001' + contact + '\u53D1\u6765' + content);
                        } else {
                            console.log(contact + ':' + content);
                        }

                        if (!m.self()) {
                            _context2.next = 6;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 6:
                        console.log('speak');
                        if (/^selfie$/i.test(content)) {
                            //忽略大小写
                            m.say('请发一张你的头像');
                            if (selfieList.length == 0) {
                                //如果列表为空,说明没有selfie监听。
                                selfieList.push(contact);

                                bot.on('message', function () {
                                    var _ref2 = _asyncToGenerator(_regenerator2.default.mark(function _callee(n) {
                                        var contact1, content1;
                                        return _regenerator2.default.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        // console.log('selfie监听')
                                                        contact1 = n.from();
                                                        content1 = n.content();

                                                        if (!(/^selfie$/i.test(content1) || n.self())) {
                                                            _context.next = 4;
                                                            break;
                                                        }

                                                        return _context.abrupt('return');

                                                    case 4:
                                                        //如果是selfie命令,就不继续。防止重复发送'selfie'出错。
                                                        // console.log('speak2');
                                                        selfieList.forEach(function (person, index) {
                                                            //如果在列表中且是同一个人。
                                                            if (person == contact1) {

                                                                if (n.type() == 3) {
                                                                    //发送的是图片格式
                                                                    n.say(contact1 + ',\u6211\u4EEC\u6B63\u5728\u98DE\u901F\u5206\u6790\u60A8\u7684\u7167\u7247,\u8BF7\u8010\u5FC3\u7B49\u5F85\u3002');
                                                                    saveMediaFile(n);
                                                                } else {
                                                                    n.say('发送的不是图片格式,请重新发送selfie.');
                                                                }

                                                                selfieList.splice(index, 1); //移除这个人
                                                                return; //每个人只可能出现一次,所以出现一次后,就终止。
                                                            }
                                                        });
                                                        if (!selfieList.length) bot.removeListener('message', selfie); //如果列表为空,则移除监听。

                                                    case 6:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, this);
                                    }));

                                    function selfie(_x2) {
                                        return _ref2.apply(this, arguments);
                                    }

                                    return selfie;
                                }());
                            } else if (!selfieList.includes(contact)) selfieList.push(contact); //列表中如果已有此人,就不添加。
                        }

                    case 8:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}()).init();

function saveMediaFile(message) {
    var filename = message.filename();
    console.log('IMAGE local filename: ' + filename);

    var fileStream = (0, _fs.createWriteStream)('../image/' + filename);

    console.log('start to readyStream()');
    message.readyStream().then(function (stream) {
        //下载图片到本地
        stream.pipe(fileStream).on('close', function () {
            console.log('finish readyStream()');
            var data = [{
                file: '../image/' + filename,
                content_type: 'image/png'
            }];
            needle.post('111.207.243.71:8000/Imagetest', data, { multipart: true }, function (err, res) {
                var score = res.body.data;
                console.log(score);
                if (0 <= score && score <= 40) {
                    message.say('\u4F60\u7684\u5934\u50CF\u5F97\u5206\u662F' + score + '\u5206!\u96BE\u9053\u60A8\u5C31\u662F\u4F20\u8BF4\u4E2D\u7684\u5916\u661F\u4EBA?\u4EBA\u7C7B\u65E0\u6CD5\u6B23\u8D4F\u60A8\u7684\u989C\u503C');
                } else if (40 < score && score < 60) {
                    message.say('\u4F60\u7684\u5934\u50CF\u5F97\u5206\u662F' + score + '\u5206!\u52A0\u6CB9,\u9A6C\u4E0A\u5C31\u8981\u53CA\u683C\u4E86\u54E6~');
                } else if (60 < score && score < 80) {
                    message.say('\u4F60\u7684\u5934\u50CF\u5F97\u5206\u662F' + score + '\u5206!\u771F\u7684\u597D\u60F3\u8BA4\u8BC6\u4E00\u4E0B\u50CF\u60A8\u8FD9\u6837\u597D\u770B\u7684\u4EBA\u554A!');
                } else if (90 > score && score >= 80) {
                    message.say('\u4F60\u7684\u5934\u50CF\u5F97\u5206\u662F' + score + '\u5206!\u6211\u5C31\u95EE\u4E00\u53E5,\u957F\u5F97\u597D\u770B\u662F\u4E00\u79CD\u600E\u6837\u7684\u4F53\u9A8C?');
                } else if (95 > score && score >= 90) {
                    message.say('\u4F60\u7684\u5934\u50CF\u5F97\u5206\u662F' + score + '\u5206!\u5929\u554A,\u6211\u957F\u8FD9\u4E48\u5927\u8FD8\u4ECE\u6CA1\u89C1\u8FC7\u8FD9\u4E48\u597D\u770B\u7684\u4EBA!!');
                } else if (100 >= score && score >= 95) {
                    message.say('\u4F60\u7684\u5934\u50CF\u5F97\u5206\u662F' + score + '\u5206!\u539F\u6765\u4E16\u754C\u4E0A\u771F\u7684\u6709\u60A8\u8FD9\u6837\u989C\u503C\u7206\u8868\u7684\u4EBA\u7C7B!!');
                }
            });
        }).catch(function (e) {
            return console.log('stream error:' + e);
        });
    });
}

//# sourceMappingURL=selfie-compiled.js.map