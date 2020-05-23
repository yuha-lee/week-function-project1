// 간단한 서버 제작
const express = require("express");

// 다른 사이트 서버를 연결하여 데이터 읽기
const request = require("request");

// 서버 생성
const app = express();

// 포트 번호 (0 ~ 65535인데 0 ~ 1023은 이미 사용 중)
const port = 3355;

// 포트 충돌을 방지함
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// 서버 대기 중
app.listen(port, () => {
    console.log('Server Start...', 'http://localhost:3355');
});

app.get('/', (request, response) => {
    response.send('Hello Node Server!');
});

// mongo DB 연결
const Client = require("mongodb").MongoClient;

/*
    mongoDB = NoSQL
    find({})       =>  SELECT * FROM movie
    find({mno:1})  =>  SELECT * FROM movie WHERE mno = 1
 */
app.get('/movie', (request, response) => {
    // url
    var url = 'mongodb://211.238.142.181:27017';
    Client.connect(url, (err, client) => {
       var db = client.db('mydb');
       db.collection('movie').find({cateno: 1}).toArray(function (err, docs) {
           response.json(docs);
           client.close();
       });
    });
});

// /movie_home?no=1
app.get('/movie_home', (req, res) => {
    var no = req.query.no;
    var site = '';

    if (no == 1) {
        site = 'searchMainDailyBoxOffice.do'
    } else if (no == 2) {
        site = 'searchMainRealTicket.do'
    } else if (no == 3) {
        site = 'searchMainDailySeatTicket.do'
    } else if (no == 4) {
        site = 'searchMainOnlineDailyBoxOffice.do'
    }

    var url = 'http://www.kobis.or.kr/kobis/business/main/' + site;

    request({url: url}, function(err, request, json) {
        console.log(json);
        res.json(JSON.parse(json));
    });
});

app.get('/movie_news', (request, response) => {
    var url = 'mongodb://211.238.142.181:27017';
    Client.connect(url, (err, client) => {
        var db = client.db('mydb');
        db.collection('news').find({}).toArray(function (err, docs) {
            response.json(docs);
            client.close();
        });
    });
});

app.get('/movie_pop', (request, response) => {
    var url = 'mongodb://211.238.142.181:27017';
    Client.connect(url, (err, client) => {
        var db = client.db('mydb');
        db.collection('news_pop').find({}).toArray(function (err, docs) {
            response.json(docs);
            client.close();
        });
    });
});