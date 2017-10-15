'use strict'
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var router = express.Router();

const BET365_URL = 'https://mobile.bet365.com/V6/sport/coupon/coupon.aspx?zone=3&isocode=CD&tzi=27&key=1-1-13-122-16-0-0-0-1-0-0-4380-0-0-1-0-0-0-0-0-0&ip=0&gn=0&cid=1&lng=1&ctg=1&ct=53&clt=9996&ot=2'

var req = request.defaults({
	jar: true,                 // save cookies to jar
	rejectUnauthorized: false,
	followAllRedirects: true   // allow redirections
});

router.get('/', function(req, res, next) {
      /*req.get(BET365_URL,null,function(req,res,next){
            var $ = cheerio.load(body);
            $('.qb-JsonData').each(function(i, element){
              var a = $(this).children().html();
              var json = JSON.stringify(eval('('+a+')'));
              console.log(json);
              res.render('index', { title: 'Demo bet365 scrapper',data:json});
            });
      });*/

      /*request(BET365_URL,{header:'a scrapper'}, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the HTML for the Google homepage.
          res.render('index', { title: 'Demo bet365 scrapper',data:[]});
      });*/

    var options = {
        url: BET365_URL,
        headers: {
            'User-Agent': 'request'
        }
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('.qb-JsonData').each(function(i, element){
              var a = $(this).children().html();
              var json = JSON.parse(a);
              console.log(json);
              res.render('index', { title: 'Demo bet365 scrapper',data:json['F']});
        });
      }
    }

    request(options, callback);



});

module.exports = router;
