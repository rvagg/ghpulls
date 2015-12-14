const http           = require('http')
    , ghutils        = require('ghutils/test-util')
    , test           = require('tape')
    , xtend          = require('xtend')
    , bl             = require('bl')
    , ghpulls       = require('./')


test('test list pulls', function (t) {
  t.plan(10)

  var auth     = { user: 'authuser', token: 'authtoken' }
    , org      = 'testorg'
    , repo     = 'testrepo'
    , testData = [
          {
              response : [ { test1: 'data1' }, { test2: 'data2' } ]
            , headers  : { link: '<https://api.github.com/repos/testorg/testrepo/pulls?page=2>; rel="next"' }
          }
        , { response: [] }
      ]
    , server

  server = ghutils.makeServer(testData)
    .on('ready', function () {
      ghpulls.list(xtend(auth), org, repo, ghutils.verifyData(t, testData[0].response))
    })
    .on('request', ghutils.verifyRequest(t, auth))
    .on('get', ghutils.verifyUrl(t, [
        'https://api.github.com/repos/testorg/testrepo/pulls?page=1'
      , 'https://api.github.com/repos/testorg/testrepo/pulls?page=2'
    ]))
    .on('close'  , ghutils.verifyClose(t))
})


test('test list multi-page pulls', function (t) {
  t.plan(13)

  var auth     = { user: 'authuser', token: 'authtoken' }
    , org      = 'testorg'
    , repo     = 'testrepo'
    , testData = [
          {
              response : [ { test1: 'data1' }, { test2: 'data2' } ]
            , headers  : { link: '<https://api.github.com/repos/testorg/testrepo/pulls?page=2>; rel="next"' }
          }
        , {
              response : [ { test1: 'data3' }, { test2: 'data4' } ]
            , headers  : { link: '<https://api.github.com/repos/testorg/testrepo/pulls?page=3>; rel="next"' }
          }
        , { response: [] }
      ]
    , server

  server = ghutils.makeServer(testData)
    .on('ready', function () {
      ghpulls.list(xtend(auth), org, repo, ghutils.verifyData(t, testData[0].response.concat(testData[1].response)))
    })
    .on('request', ghutils.verifyRequest(t, auth))
    .on('get', ghutils.verifyUrl(t, [
        'https://api.github.com/repos/testorg/testrepo/pulls?page=1'
      , 'https://api.github.com/repos/testorg/testrepo/pulls?page=2'
      , 'https://api.github.com/repos/testorg/testrepo/pulls?page=3'
    ]))
    .on('close'  , ghutils.verifyClose(t))
})


test('test list no pulls', function (t) {
  t.plan(7)

  var auth     = { user: 'authuser', token: 'authtoken' }
    , org      = 'testorg'
    , repo     = 'testrepo'
    , testData = [ [] ]
    , server

  server = ghutils.makeServer(testData)
    .on('ready', function () {
      ghpulls.list(xtend(auth), org, repo, ghutils.verifyData(t, []))
    })
    .on('request', ghutils.verifyRequest(t, auth))
    .on('get', ghutils.verifyUrl(t, [
        'https://api.github.com/repos/testorg/testrepo/pulls?page=1'
    ]))
    .on('close'  , ghutils.verifyClose(t))
})
