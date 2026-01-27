import { lister } from 'ghutils'

const defaultApiUrl = 'https://api.github.com'

export async function list (auth, org, repo, options = {}) {
  const apiUrl = options._apiUrl || defaultApiUrl
  const url = `${apiUrl}/repos/${org}/${repo}/pulls`
  return lister(auth, url, options)
}

export async function listComments (auth, org, repo, num, options = {}) {
  const apiUrl = options._apiUrl || defaultApiUrl
  const url = `${apiUrl}/repos/${org}/${repo}/pulls/${num}/comments`
  return lister(auth, url, options)
}

export async function listReviews (auth, org, repo, num, options = {}) {
  const apiUrl = options._apiUrl || defaultApiUrl
  const url = `${apiUrl}/repos/${org}/${repo}/pulls/${num}/reviews`
  return lister(auth, url, options)
}
