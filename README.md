# ghpulls

**A Node.js library to interact with the GitHub pull requests API**

[![NPM](https://nodei.co/npm/ghpulls.svg?style=flat&data=n,v&color=blue)](https://nodei.co/npm/ghpulls/)

## Requirements

- Node.js >= 20

## Example usage

```js
import * as ghpulls from 'ghpulls'

const auth = { token: 'your-github-token' }

// list all pull requests in a repo
const pulls = await ghpulls.list(auth, 'rvagg', 'jsonist')
console.log(pulls)

// list review comments on a pull request
const comments = await ghpulls.listComments(auth, 'rvagg', 'jsonist', 42)
console.log(comments)

// list reviews on a pull request
const reviews = await ghpulls.listReviews(auth, 'rvagg', 'jsonist', 42)
console.log(reviews)
```

The auth data is compatible with [ghauth](https://github.com/rvagg/ghauth) so you can connect them together:

```js
import ghauth from 'ghauth'
import * as ghpulls from 'ghpulls'

const auth = await ghauth({
  configName: 'pulls-lister',
  scopes: ['user']
})

const pulls = await ghpulls.list(auth, 'rvagg', 'node-levelup')
console.log('Pull requests in rvagg/node-levelup:')
pulls.forEach((p) => {
  console.log('#%s: %s', p.number, p.title)
})
```

## API

All methods return Promises.

### ghpulls.list(auth, org, repo, options)

List pull requests for an org/user and repo combination.

### ghpulls.listComments(auth, org, repo, num, options)

List review comments for a given pull request number.

### ghpulls.listReviews(auth, org, repo, num, options)

List reviews for a given pull request number.

## Authentication

See [ghauth](https://github.com/rvagg/ghauth) for an easy way to obtain and cache GitHub authentication tokens. The `auth` object returned by ghauth is directly compatible with all ghpulls methods.

## See also

* [ghissues](https://github.com/rvagg/ghissues) - interact with the GitHub issues API
* [ghusers](https://github.com/rvagg/ghusers) - interact with the GitHub users API
* [ghteams](https://github.com/rvagg/ghteams) - interact with the GitHub teams API
* [ghrepos](https://github.com/rvagg/ghrepos) - interact with the GitHub repos API
* [ghauth](https://github.com/rvagg/ghauth) - GitHub authentication

## License

**ghpulls** is Copyright (c) 2015-2025 Rod Vagg [@rvagg](https://github.com/rvagg) and licensed under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
