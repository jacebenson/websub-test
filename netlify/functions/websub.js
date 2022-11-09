import Parser from 'rss-parser'
var CryptoJS = require('crypto-js');
export const handler = async (event, context) => {
  // feed example sn dev yt https://www.reddit.com/.rss
  // feed hub https://pubsubhubbub.appspot.com/subscribe
  console.log('event.headers', event.headers)
  //console.log('event', context)
  var mode = event.queryStringParameters['hub.mode']
  var topic = event.queryStringParameters['hub.topic']
  var challenge = event.queryStringParameters['hub.challenge'];
  var leaseSeconds = event.queryStringParameters['hub.lease_seconds']
  var secret = event.queryStringParameters['hub.secret']
  var body = event.body;
  console.log({
    mode,
    topic,
    challenge,
    leaseSeconds,
    secret,
    timeNow: new Date().toLocaleTimeString('en-CA'),
    //body
  })
  try {
    if (body) {
      var checkedHash = CryptoJS.HmacSHA1(body, 'jace-secret').toString();
      console.log('checked hash', checkedHash)
      let parser = new Parser({
        requestOptions: {
          rejectUnauthorized: false,
        },
      })
      var parsedBody = await parser.parseString(body);
      //console.log('parsedBody', parsedBody)
      console.log(parsedBody.feedUrl)
      parsedBody?.items.forEach(function(item){
        console.log('item.title', item.title)
        //console.log('  item.link', item.link)
        //console.log('  item.author', item.author)
        var date = new Date(item.isoDate).toLocaleDateString();
        var time = new Date(item.isoDate).toLocaleTimeString('en-CA')
        console.log('  item.isoDate', date, time)
        console.log('  ...   ')
      })
    }
  } catch (error) {
    console.log('error', error);
  }
  var returnObj = {
    statusCode: 200,
    body: event.queryStringParameters['hub.challenge']
  }
  return returnObj;
}
//sha1=6ddae16c27e4ce86f2be5ca1af30e1c0f893c26c //oreo pulls twitter ads
//sha1=5c3146b93b5bf394c46689784ed5e75ad6480e9f //poll workers seen where maga poll station