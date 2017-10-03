var express = require('express');
var app = express();

var rss_cache = {};

var parser = require('rss-parser');

function requestRSS(url){
    parser.parseURL(url, function(err, parsed) {
        if( parsed !== undefined && parsed !== null && parsed.feed !== null)
            rss_cache[url] = parsed.feed;
    })
}

requestRSS('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
requestRSS('http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/programmes/rss.xml');
requestRSS('http://www.guardian.co.uk/rssfeed/0,,12,00.xml');
requestRSS('http://newsrss.bbc.co.uk/rss/newsonline_world_edition/programmes/rss.xml');

app.get('/api/rss_sources', function(req, res){
    sources = [];
    keys = Object.keys(rss_cache);
    for(i = 0; i < keys.length; i++){
        console.log(rss_cache[keys[i]])
        sources.push(rss_cache[keys[i]].title);
    }
    res.send(sources);
});

app.get('/api/rss', function(req, res) {
    var index = 1;
    const source = req.query.source;
    if(source !== null && source !== undefined) index = source;
    console.log(index);
    const sources = Object.keys(rss_cache);

    res.send(rss_cache[sources[index]].entries);
});

app.post("api/rss_sources", function(req, res){
    const data = request.body;
    const source = data.url;
    if(source !== null){
        requestRSS(source);
    }
    res.send({success : true});
});

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('App started!');
});
