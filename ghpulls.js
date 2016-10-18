const ghutils = require('ghutils')

module.exports.list = function list (auth, org, repo, options, callback) {
  if (typeof options == 'function') {
    callback = options
    options  = {}
  }

  var url = 'https://api.github.com/repos/' + org + '/' + repo + '/pulls?page=1'
  ghutils.lister(auth, url, options, callback)
}


function listComments (auth, org, repo, num, options, callback) {
  if (typeof options == 'function') {
    callback = options
    options  = {}
  }

  var url = 'https://api.github.com/repos/' + org + '/' + repo + '/pulls/' + num + '/comments?page=1'
  ghutils.lister(auth, url, options, callback)
}

module.exports.listComments = listComments