import Parser from 'rss-parser'
export const handler = async (event, context) => {
  // feed example sn dev yt https://www.reddit.com/.rss
  // feed hub https://pubsubhubbub.appspot.com/subscribe
  console.log('event', event)
  console.log('event', context)
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
    timeNow: new Date().toLocaleTimeString('en-CA')
    //body
  })
  try {
    if (body) {
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
        console.log('  item.link', item.link)
        console.log('  item.author', item.author)
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