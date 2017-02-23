# ghpulls

[![Build Status](https://secure.travis-ci.org/rvagg/ghpulls.png)](http://travis-ci.org/rvagg/ghpulls)

**A node library to interact with the GitHub pull requests API**

[![NPM](https://nodei.co/npm/ghpulls.png?mini=true)](https://nodei.co/npm/ghpulls/)

## Example usage

```js
const ghpulls     = require('ghpulls')
    , authOptions = { user: 'rvagg', token: '24d5dee258c64aef38a66c0c5eca459c379901c2' }

// list all pulls in a repo
ghpulls.list(authOptions, 'rvagg', 'jsonist', function (err, pullslist) {
  // Array of pulls data for 'rvagg/jsonist'
  console.log(pullslist)
})
```

The auth data is compatible with [ghauth](https://github.com/rvagg/ghauth) so you can just connect them together to make a simple command-line application:

```js
const ghauth      = require('ghauth')
    , ghpulls    = require('ghpulls')
    , authOptions = {
          configName : 'pulls-lister'
        , scopes     : [ 'user' ]
      }

ghauth(authOptions, function (err, authData) {
  ghpulls.list(authData, 'rvagg', 'node-levelup', function (err, list) {
    console.log('Pull requests in rvagg/node-levelup:')
    list.forEach(function (i) {
      console.log('#%s: %s', i.number, i.title) 
    })
  })
})
```

## API

### list(auth, org, repo[, options], callback)

List pull requests for an org/user and repo combination

### listComments(auth, org, repo, prNumber[, options], callback)

List pull request _review_ comments for a given pull request number. ***This currently doesn't seem to work as the review API is still under development.***

### listReviews(auth, org, repo, prNumber[, options], callback)

List reviews for a given pull request number. This uses the experimental GitHub reviews API and is not guaranteed to continue to work properly! It's being enabled with a special development header that opts ghpulls in to this functionality. Caveat emptor!

## License

**ghpulls** is Copyright (c) 2015 Rod Vagg [@rvagg](https://github.com/rvagg) and licensed under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
