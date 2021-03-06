﻿/* tslint:disable:variable-name */

const { Config,Wechaty,log,Room,MediaMessage } = require('wechaty')
const { HashMap} = require('hashmap')
const MongoClient = require('mongodb').MongoClient
const timestamp = require('time-stamp')
const phantom = require('phantom')



let flag = true
let membermessages = new HashMap() 
const welcome = `
=============== Powered by Wechaty ===============
-------- https://github.com/wechaty/wechaty --------
Hello`
console.log(welcome)
const bot = Wechaty.instance({ profile: Config.DEFAULT_PROFILE })

bot
.on('scan', (url, code)=>{
    let loginUrl = url.replace('qrcode', 'l')
    require('qrcode-terminal').generate(loginUrl)
    console.log(url)
})
.on('login', user=>{
    console.log(`welcome ${user} login!`)
})
.on('logout',user=>{
    console.log(`${user} logout!`)
})
.on('error'   , e => log.info('Bot', 'error: %s', e))



.on('message', message=> {
  const sender  = message.from()
  const room = message.room()
  const content = message.content()
  console.log((room ? '[' + room.topic() + ']' : '')
              + '<' + sender.name() + '>'
              + ':' + message.toStringDigest())

	 console.log(timestamp('YYYYMMDDHHmmssms'))
	if(flag)
	{
	const memberlist = room.memberList()
	for(x in memberlist)
	
		membermessages.set(memberlist[x].name(),0)
		
	
	flag = false;
	}
	
	membermessages.set(sender.name(),membermessages.get(sender.name()) + 1);
	
	
	let membergender = new HashMap()
	let memberprovince = new HashMap() 
	
	
  if((/^群成员分析$/i).test(content))
  {
  Room.find({topic: room.topic()})
	.then(hroom => {

		if(hroom)
		{
			
			console.log('[' + hroom.topic() + ']')
			const members = hroom.memberList()
			membergender.set('男',0)
			membergender.set('女',0)
			membergender.set('未设置',0)
			let x
			
			for(x in members)
			{
				/*hroom.say(members[x].name() + ' from ' + 
				members[x].city() + ' ' + members[x].province() + 
				' gender ' + (members[x].gender() == 1? 'Male' : 'Female'),sender)*/
				
				if(memberprovince.has(members[x].province()))
				{			
					memberprovince.set(members[x].province(),memberprovince.get(members[x].province())+1)
				}
				else
				{				
					memberprovince.set(members[x].province(),1)				
				}
				switch(members[x].gender())
				{
					case 0 : membergender.set('未设置',membergender.get('未设置') + 1);  break
					case 1 : membergender.set('男',membergender.get('男') + 1);  break
					case 2 : membergender.set('女',membergender.get('女') + 1); break
				}					
			}
			let mprovince = ''
			let mgender = ''
			
			hroom.say('省份分布:',sender)
			memberprovince.forEach(function (item, key) {			
				mprovince = mprovince + key + ' : ' + item + '人\n'		
			})
			hroom.say(mprovince)
			
			setTimeout(function() {
                     hroom.say('性别分布:',sender)
					 membergender.forEach(function (item, key) {
				
				mgender += key + ' : ' + item + '人\n'
			})       
			hroom.say(mgender)
			hroom.say('http://192.168.1.118:3000/')
                   }, 1000);				
				 
		}
	})
  }
else{
	console.log('no')
}
if((/^群消息分析$/i).test(content))
  {
  Room.find({topic: room.topic()})
	.then(croom => {
		
		var express = require('express');
		var app = express();
		app.use(express.static('public'));
		app.get('/', function (req, res) {
		 res.sendFile( __dirname + "/" + "index.html" );
		  res.render('/', { title: 'error' });
		});
        app.get('/pic',function(req,res){
            var data={
                datum:membermessages
            };
            res.send(data);
        });
		

		var server = app.listen(3000, function () {
		var host = server.address().address;
		var port = server.address().port;

		console.log('Example app listening at http://%s:%s', host, port);
		});
		
		
		let mmessage = ''
           croom.say('群消息统计:',sender)
			/*membermessages.forEach(function (item, key) {
				
				mmessage += key + ' : ' + item + '条\n'
			})       
			croom.say(mmessage)*/
        setTimeout(function() {
            
			croom.say("http://192.168.1.102:3000")
                   }, 1000);


		setTimeout(function() {
            
			(async function() {
		const instance = await phantom.create();
		const page = await instance.createPage();

		await page.property('viewportSize', {width: 400, height: 480});
		const status = await page.open('http://192.168.1.102:3000');
		console.log(`Page opened with status [${status}].`);

		await page.render('chat.jpg');
		console.log(`File created at [./stackoverflow.jpg]`);
		croom.say(new MediaMessage('chat.jpg'))
		await instance.exit();
	}());
			
			
                   }, 2000);				   
		})
		
		
		
  }
else{
	console.log('no')
}
	
})
bot.init()