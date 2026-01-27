import { test } from 'node:test'
import assert from 'node:assert'
import { createMockServer, createMockServerWithHandler } from 'ghutils/test-util'
import * as ghpulls from './ghpulls.js'

test('list pulls', async () => {
  const auth = { token: 'test-token' }
  const testData = [{ id: 1, title: 'PR 1' }, { id: 2, title: 'PR 2' }]

  const server = await createMockServer({ response: testData })
  try {
    const results = await ghpulls.list(auth, 'testorg', 'testrepo', {
      _apiUrl: server.baseUrl
    })
    assert.deepStrictEqual(results, testData)
    assert.ok(server.requests[0].url.includes('/repos/testorg/testrepo/pulls'))
    assert.strictEqual(server.requests[0].headers.authorization, 'Bearer test-token')
  } finally {
    await server.close()
  }
})

test('list pulls with pagination', async () => {
  const auth = { token: 'test-token' }
  const page1 = [{ id: 1 }, { id: 2 }]
  const page2 = [{ id: 3 }, { id: 4 }]

  let requestCount = 0
  const mock = await createMockServerWithHandler((req, res) => {
    requestCount++
    const port = mock.address().port
    if (requestCount === 1) {
      res.setHeader('link', `<http://127.0.0.1:${port}/page2>; rel="next"`)
      res.end(JSON.stringify(page1))
    } else {
      res.end(JSON.stringify(page2))
    }
  })

  try {
    const results = await ghpulls.list(auth, 'testorg', 'testrepo', {
      _apiUrl: mock.baseUrl
    })
    assert.deepStrictEqual(results, [...page1, ...page2])
    assert.strictEqual(requestCount, 2)
  } finally {
    await mock.close()
  }
})

test('list pulls returns empty array', async () => {
  const auth = { token: 'test-token' }

  const server = await createMockServer({ response: [] })
  try {
    const results = await ghpulls.list(auth, 'testorg', 'testrepo', {
      _apiUrl: server.baseUrl
    })
    assert.deepStrictEqual(results, [])
  } finally {
    await server.close()
  }
})

test('list pull comments', async () => {
  const auth = { token: 'test-token' }
  const comments = [{ id: 1, body: 'Comment 1' }]

  const server = await createMockServer({ response: comments })
  try {
    const results = await ghpulls.listComments(auth, 'testorg', 'testrepo', 42, {
      _apiUrl: server.baseUrl
    })
    assert.deepStrictEqual(results, comments)
    assert.ok(server.requests[0].url.includes('/repos/testorg/testrepo/pulls/42/comments'))
  } finally {
    await server.close()
  }
})

test('list pull reviews', async () => {
  const auth = { token: 'test-token' }
  const reviews = [{ id: 1, state: 'APPROVED' }]

  const server = await createMockServer({ response: reviews })
  try {
    const results = await ghpulls.listReviews(auth, 'testorg', 'testrepo', 42, {
      _apiUrl: server.baseUrl
    })
    assert.deepStrictEqual(results, reviews)
    assert.ok(server.requests[0].url.includes('/repos/testorg/testrepo/pulls/42/reviews'))
  } finally {
    await server.close()
  }
})

test('list pulls with afterDate', async () => {
  const auth = { token: 'test-token' }
  const page1 = [
    { id: 1, created_at: '2024-01-15T00:00:00Z' },
    { id: 2, created_at: '2024-01-14T00:00:00Z' }
  ]
  const page2 = [
    { id: 3, created_at: '2024-01-13T00:00:00Z' },
    { id: 4, created_at: '2024-01-10T00:00:00Z' }
  ]

  let requestCount = 0
  const mock = await createMockServerWithHandler((req, res) => {
    requestCount++
    const port = mock.address().port
    if (requestCount === 1) {
      res.setHeader('link', `<http://127.0.0.1:${port}/page2>; rel="next"`)
      res.end(JSON.stringify(page1))
    } else {
      res.end(JSON.stringify(page2))
    }
  })

  try {
    const afterDate = new Date('2024-01-12T00:00:00Z')
    const results = await ghpulls.list(auth, 'testorg', 'testrepo', {
      _apiUrl: mock.baseUrl,
      afterDate
    })
    assert.strictEqual(results.length, 3)
    assert.deepStrictEqual(results.map(r => r.id), [1, 2, 3])
  } finally {
    await mock.close()
  }
})
