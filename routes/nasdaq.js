var express = require('express');
var router = express.Router();
var request = require('request');
var parseString = require('xml2js').parseString;

var baseUrl = 'http://ws.nasdaqdod.com/v1/NASDAQAnalytics.asmx/GetEndOfDayData';

router.get('/', function(req, res, next) {
  var query = {
    '_Token' : 'BC2B181CF93B441D8C6342120EB0C971',
    'Symbols' : 'AAPL,FB',
    'StartDate' : '02/11/2015',
    'EndDate' : '02/14/2015',
    'MarketCenters' : ''
  };

  var getTradeQuery = function(options) {
    return Object.keys(options)
      .reduce(function (prev, curr) {
        return prev + curr + '=' + options[curr] + '&';
    }, '?').slice(0, -1);
  };

  var tradeQuery = getTradeQuery(query);

  request(baseUrl + tradeQuery, function (error, response, body) {
    if (error) {
      throw error;
    }

    parseString(body, function (err, result) {
      if (err) {
        throw err;
      }

      var obj = result.ArrayOfEndOfDayPriceCollection.EndOfDayPriceCollection;

      var data = Object.keys(obj).map(function(stock) {
        var ticker = obj[stock].Symbol[0];
        var prices = obj[stock].Prices;

        return Object.keys(prices).map(function (price) {
          return Object.assign({ ticker: ticker, data: prices[price]});
        });
      });

      res.json(data);
    });
  });
});

module.exports = router;
