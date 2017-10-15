'use strict'

// include the libraries we need
var request = require('request');
var cheerio = require('cheerio');

// set some defaults
var req = request.defaults({
	jar: true,                 // save cookies to jar
	rejectUnauthorized: false,
	followAllRedirects: true   // allow redirections
});

// scrape the page
req.get({
    url: "https://mobile.bet365.com/V6/sport/coupon/coupon.aspx?zone=3&isocode=CD&tzi=27&key=1-1-13-122-16-0-0-0-1-0-0-4380-0-0-1-0-0-0-0-0-0&ip=0&gn=0&cid=1&lng=1&ctg=1&ct=53&clt=9996&ot=2",
    headers: {
        'User-Agent': 'Super Cool Browser' // optional headers
     }
  }, function(err, resp, body) {

	// load the html into cheerio
	var $ = cheerio.load(body);
    $('.qb-JsonData').each(function(i, element){
      var a = $(this).children().html();
      var json = JSON.stringify(eval('('+a+')'));
      console.log(json);
    });

});
