# Testing websub

This repo I used to help understand how websub works as a subscriber.

To run this clone it.

```sh
git clone https://github.com/jacebenson/websub-test.git
```

Then install depencies (just rss-parser)

```sh
npm i
```

Then run netlify's live client

```sh
netlify dev -l
```

Take the url from the terminal

`https://websub-test-29742c.netlify.live` and append `/.netlfiy/functions/websub`

Goto https://pubsubhubbub.appspot.com/subscribe and set the fields as such
Callback URL: to the url you made above
Topic URL: the rss feed you want to observe
everything else can be left alone

wait for an rss update, you should see some content come across your terminal like;

```sh

https://www.reddit.com/.rss
item.title Comedian Kathy suspended from Twitter after mocking CEO
  item.link https://www.reddit.com/r/news/comments/someusername/comedian__suspended_from_twitter/
  item.author /u/someotherusername
  item.isoDate 11/6/2022 10:27:57 p.m.
```
