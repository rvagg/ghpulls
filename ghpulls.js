const ghutil = require('ghutils')


const ghget  = ghutil.ghget
    , ghpost = ghutil.ghpost
    , ghlist = ghutil.issuesList


module.exports.list = ghlist('pulls')
