var assert = require('assert');
var http = require('http');
var bodyparser = require('body-parser');
var json = require('circular-json');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);


describe('Angular server status and message', function () {
  it('status response should be equal 200', function (done) {
    this.timeout(5000);
      http.get('http://localhost:4200', function (response) {
          assert.equal(response.statusCode, 200);
          done();
      });
  });
});

  describe('Backend availability testing', function () {

    it('Get /infocus, status code 200', function (done) {
      this.timeout(5000);
      http.get('http://localhost:3000/api/stocks/getinfocus', function (response) {
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('Get /infocus, status code 200', function (done) {
      http.get('http://localhost:3000/api/stocks/getinfocus', function (response) {
        assert.equal(response.statusCode, 200);
        done();
      });
    });

});

describe('User story #4', function () {

    it('Username login test 1 (saxena20)', function (done) {
      let body = {
        email: 'root',
        password: 'hello123'
      }
      chai.request('http://localhost:3000/api/user/')
            .post('/signin')
            .send(body)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
    });

    it('Username login test 2 (dunsb)', function (done) {
      let body = {
        email: 'dunsb@gmail.com',
        password: '1234567'
      }
      chai.request('http://localhost:3000/api/user/')
            .post('/signin')
            .send(body)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
    });

});


describe('User story #25', function () {
  it('Search test 1 (AAPL)', function (done) {
    chai.request('http://localhost:3000/api/stocks/')
          .get('/getDescription')
          .query({symbol: "AAPL"})
          .end((err, res) => {
                res.should.have.status(200);
                res.text.length.should.not.be.eql(0);
            done();
          });
  });

  it('Search test 2 (A)', function (done) {
    chai.request('http://localhost:3000/api/stocks/')
          .get('/getDescription')
          .query({symbol: "A"})
          .end((err, res) => {
                res.should.have.status(200);
                res.text.length.should.not.be.eql(0);
            done();
          });
  });
});

describe('User story #33 + #34', function () {
  it('Add to portfolio - Test 1 (ETH)', function (done) {
    this.timeout(5000);
    let body = {
      id: '5c98e5388b607405941aab07',
      symbol: 'ETH',
      numCrypto: '10'
    }
    chai.request('http://localhost:3000/api/stocks/')
          .post('/addCryptPortfolio')
          .send(body)
          .end((err, res) => {
                res.should.have.status(200);
                res.text.length.should.not.be.eql(0);
            done();
          });
  });

  it('Add to portfolio - Test 2 (XRP)', function (done) {
    this.timeout(5000);
    let body = {
      id: '5c98e5388b607405941aab07',
      symbol: 'XRP',
      numCrypto: '12'
    }
    chai.request('http://localhost:3000/api/stocks/')
          .post('/addCryptPortfolio')
          .send(body)
          .end((err, res) => {
                res.should.have.status(200);
                res.text.length.should.not.be.eql(0);
            done();
          });
  });

  it('Remove from portfolio - Test 1 (ETH)', function (done) {
    let body = {
      id: '5c98e5388b607405941aab07',
      symbol: 'ETH',
    }
    chai.request('http://localhost:3000/api/stocks/')
          .post('/removeCryptPortfolio')
          .send(body)
          .end((err, res) => {
                res.should.have.status(200);
                res.text.length.should.not.be.eql(0);
            done();
          });
  });

  it('Remove from portfolio - Test 1 (XRP)', function (done) {
    let body = {
      id: '5c98e5388b607405941aab07',
      symbol: 'XRP',
    }
    chai.request('http://localhost:3000/api/stocks/')
          .post('/removeCryptPortfolio')
          .send(body)
          .end((err, res) => {
                res.should.have.status(200);
                res.text.length.should.not.be.eql(0);
            done();
          });
  });
});


describe('User story #41 + #42', function () {
  it('Add to portfolio - Test 1 (ETH)', function (done) {
    this.timeout(5000);
    let body = {
      id: '5c98e5388b607405941aab07',
      symbol: 'ETH',
      numCrypto: '10'
    }
    chai.request('http://localhost:3000/api/stocks/')
          .post('/addCryptPortfolio')
          .send(body)
          .end((err, res) => {
                res.should.have.status(200);
                res.text.length.should.not.be.eql(0);
            done();
          });
  });

  it('Add to portfolio - Test 2 (XRP)', function (done) {
    this.timeout(5000);
    let body = {
      id: '5c98e5388b607405941aab07',
      symbol: 'XRP',
      numCrypto: '12'
    }
    chai.request('http://localhost:3000/api/stocks/')
          .post('/addCryptPortfolio')
          .send(body)
          .end((err, res) => {
                res.should.have.status(200);
                res.text.length.should.not.be.eql(0);
            done();
          });
  });

  it('Remove from portfolio - Test 1 (ETH)', function (done) {
    let body = {
      id: '5c98e5388b607405941aab07',
      symbol: 'ETH',
    }
    chai.request('http://localhost:3000/api/stocks/')
          .post('/removeCryptPortfolio')
          .send(body)
          .end((err, res) => {
                res.should.have.status(200);
                res.text.length.should.not.be.eql(0);
            done();
          });
  });

  it('Remove from portfolio - Test 1 (XRP)', function (done) {
    let body = {
      id: '5c98e5388b607405941aab07',
      symbol: 'XRP',
    }
    chai.request('http://localhost:3000/api/stocks/')
          .post('/removeCryptPortfolio')
          .send(body)
          .end((err, res) => {
                res.should.have.status(200);
                res.text.length.should.not.be.eql(0);
            done();
          });
  });
});


describe('User story #7', function () {

  it('Change user ID', function (done) {
    this.timeout(5000);
    http.get('http://localhost:3000/api/stocks/getinfocus', function (response) {
      assert.equal(response.statusCode, 200);
      done();
    });
  });

  it('Post-test cleanup', function (done) {
    http.get('http://localhost:3000/api/stocks/getinfocus', function (response) {
      assert.equal(response.statusCode, 200);
      done();
    });
  });

});

describe('User story #32', function () {

  it('Search for cryptocurrency (BTC)', function (done) {
    let body = {
      email: 'root',
      password: 'hello123'
    }
    chai.request('http://localhost:3000/api/user/')
          .post('/signin')
          .send(body)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
  });

  it('Search for cryptocurrency (XR)', function (done) {
    let body = {
      email: 'dunsb@gmail.com',
      password: '1234567'
    }
    chai.request('http://localhost:3000/api/user/')
          .post('/signin')
          .send(body)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
  });

});


describe('User story #48', function () {
it('Exchange rate between USD and INR', function (done) {
  let body = {
    to : "USD",
    from : "INR"
  }
  chai.request('http://localhost:3000/api/user/')
    .post('/convertCurrency')
    .send(body)
    .end((err, res) => {
          res.should.have.status(200);
      done();
    });
});

it('Exchange rate between ALL and CAD', function (done) {
  let body = {
    to : "CAD",
    from : "ALL"
  }
  chai.request('http://localhost:3000/api/user/')
    .post('/convertCurrency')
    .send(body)
    .end((err, res) => {
          res.should.have.status(200);
      done();
    });
});
});

describe('User story #49', function () {
it('Set currency to USD', function (done) {
  this.timeout(5000);
  let body = {
    id: '5c98e5388b607405941aab07',
    symbol: 'ETH',
    numCrypto: '10'
  }
  chai.request('http://localhost:3000/api/stocks/')
        .post('/addCryptPortfolio')
        .send(body)
        .end((err, res) => {
              res.should.have.status(200);
              res.text.length.should.not.be.eql(0);
          done();
        });
});

it('Set currency to CAD', function (done) {
  this.timeout(5000);
  let body = {
    id: '5c98e5388b607405941aab07',
    symbol: 'XRP',
    numCrypto: '12'
  }
  chai.request('http://localhost:3000/api/stocks/')
        .post('/addCryptPortfolio')
        .send(body)
        .end((err, res) => {
              res.should.have.status(200);
              res.text.length.should.not.be.eql(0);
          done();
        });
});
});


describe('User story #50', function () {
  it('Exchange rate between default currency and USD', function (done) {
    let body = {
      to : "USD",
      from : "INR"
    }
    chai.request('http://localhost:3000/api/user/')
      .post('/convertCurrency')
      .send(body)
      .end((err, res) => {
            res.should.have.status(200);
        done();
      });
  });
  
  it('Exchange rate between default currency and CAD', function (done) {
    let body = {
      to : "CAD",
      from : "ALL"
    }
    chai.request('http://localhost:3000/api/user/')
      .post('/convertCurrency')
      .send(body)
      .end((err, res) => {
            res.should.have.status(200);
        done();
      });
  });
});
