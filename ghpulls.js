const ghutils = require('ghutils')

function list (auth, org, repo, options, callback) {
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


function listReviews (auth, org, repo, num, options, callback) {
  if (typeof options == 'function') {
    callback = options
    options  = {}
  }

  var url = 'https://api.github.com/repos/' + org + '/' + repo + '/pulls/' + num + '/reviews?page=1'

  if (typeof options.headers != 'object')
    options.headers = {}
  options.headers.accept = 'application/vnd.github.black-cat-preview+json'

  ghutils.lister(auth, url, options, callback)
}


module.exports.list         = list
module.exports.listComments = listComments
module.exports.listReviews  = listReviews
