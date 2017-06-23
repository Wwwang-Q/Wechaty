'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _wechaty = require('wechaty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by wangqi on 2017/5/17.
 */
/**
 *
 * Wechaty - Wechat for Bot
 *
 * Connecting ChatBots
 * https://github.com/wechaty/wechaty
 *
 */

/* tslint:disable:variable-name */
var QrcodeTerminal = require('qrcode-terminal');
//const finis           = require('finis')

var welcome = '\n| __        __        _           _\n| \\ \\      / /__  ___| |__   __ _| |_ _   _\n|  \\ \\ /\\ / / _ \\/ __| \'_ \\ / _` | __| | | |\n|   \\ V  V /  __/ (__| | | | (_| | |_| |_| |\n|    \\_/\\_/ \\___|\\___|_| |_|\\__,_|\\__|\\__, |\n|                                     |___/\n\n=============== Powered by Wechaty ===============\n-------- https://github.com/zixia/wechaty --------\n\nI\'m a bot, my super power is talk in Wechat.\n\nIf you send me a \'ding\', I will reply you a \'dong\'!\n__________________________________________________\n\nHope you like it, and you are very welcome to\nupgrade me for more super powers!\n\nPlease wait... I\'m trying to login in...\n\n';

console.log(welcome);
var bot = _wechaty.Wechaty.instance({ profile: _wechaty.Config.DEFAULT_PROFILE });

bot.on('logout', function (user) {
    return _wechaty.log.info('Bot', user.name() + ' logouted');
}).on('login', function (user) {
    _wechaty.log.info('Bot', user.name() + ' logined');
    bot.say('Wechaty login');
}).on('error', function (e) {
    _wechaty.log.info('Bot', 'error: %s', e);
    bot.say('Wechaty error: ' + e.message);
}).on('scan', function (url, code) {
    if (!/201|200/.test(String(code))) {
        var loginUrl = url.replace(/\/qrcode\//, '/l/');
        QrcodeTerminal.generate(loginUrl);
    }
    console.log(url + '\n[' + code + '] Scan QR Code in above url to login: ');
}).on('message', function () {
    var _ref = _asyncToGenerator(_regenerator2.default.mark(function _callee(m) {
        var room, joinWechaty;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        room = m.room();

                        console.log((room ? '[' + room.topic() + ']' : '') + '<' + m.from().name() + '>' + ':' + m.toStringDigest());

                        if (!(/^(ding|ping|bing|code)$/i.test(m.content()) && !m.self())) {
                            _context.next = 14;
                            break;
                        }

                        m.say('dong');
                        _wechaty.log.info('Bot', 'REPLY: dong');

                        joinWechaty = 'Join Wechaty Developers\' Community\n\n' + 'Wechaty is used in many ChatBot projects by hundreds of developers.\n\n' + 'If you want to talk with other developers, just scan the following QR Code in WeChat with secret code: wechaty,\n\n' + 'you can join our Wechaty Developers\' Home at once';
                        _context.next = 9;
                        return m.say(joinWechaty);

                    case 9:
                        _context.next = 11;
                        return m.say(new _wechaty.MediaMessage('../image/BotQrcode.png'));

                    case 11:
                        _context.next = 13;
                        return m.say('Scan now, because other Wechaty developers want to talk with you too!\n\n(secret code: wechaty)');

                    case 13:
                        _wechaty.log.info('Bot', 'REPLY: Image');

                    case 14:
                        _context.next = 19;
                        break;

                    case 16:
                        _context.prev = 16;
                        _context.t0 = _context['catch'](0);

                        _wechaty.log.error('Bot', 'on(message) exception: %s', _context.t0);

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 16]]);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());

bot.init().catch(function (e) {
    _wechaty.log.error('Bot', 'init() fail: %s', e);
    bot.quit();
    process.exit(-1);
});

// finis((code, signal) => {
//     const exitMsg = `Wechaty exit ${code} because of ${signal} `
//     console.log(exitMsg)
//     bot.say(exitMsg)
// })

//# sourceMappingURL=ding-dong-compiled.js.map