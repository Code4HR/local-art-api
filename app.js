var request = require('request');
request({ method : 'POST',
          uri : 'http://localhost:3030/parseFeed',
          body : { url: 'http://cyber.law.harvard.edu/rss/examples/rss2sample.xml' },
          json : true },
          function (err, response, body){
            if (!err && response.statusCode == 200) {
              console.log('%s [%s]', body.meta.title || body.meta.xmlUrl, body.meta.link);
              body.articles.forEach(function (article) {
                console.log('%s - %s', article.pubDate, article.title || article.description.substring(0,50));
              });
            }
            else {
              console.log("Either couldn't connect to parserproxy or it failed.");
            }
          });
