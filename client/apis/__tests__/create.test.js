import nock from 'nock'
import { create, getS3Url, fetchUrl } from '../create'

const createContentMockData = {
  name: 'Borris',
  description: 'Likes stuff',
  imageUrl: '/images/boris.jpg',
}

const fakeToken = 'anything'

const fetchUrlMockData = {
  uploadUrl: 'https://s3.amazonaws.com/random-bucket-name/1234567890.jpeg',
}

test('1=1', () => {
  expect(1).toBe(1)
})

describe('create', () => {
  it('should add a new animal to the database', async () => {
    expect.assertions(2)
    const scope = nock('http://localhost')
      .post('/api/v1/create')
      .reply(200, { ...createContentMockData, token: fakeToken })
    const res = await create(createContentMockData)
    expect(res).toEqual({ ...createContentMockData, token: fakeToken })
    expect(scope.isDone()).toBeTruthy()
  })
})

// // TODO: Fix this test
// describe('getS3Url', () => {
//   it('should return a uploadUrl', async () => {
//     expect.assertions(2)
//     const scope = nock('http://localhost')
//       .get('/api/v1/create/s3Url')
//       .reply(200, { uploadUrl: 'mockUploadUrl', token: fakeToken })
//     const res = await getS3Url()
//     expect(res).toEqual({ uploadUrl: 'mockUploadUrl', token: fakeToken })
//     expect(scope.isDone()).toBeTruthy()
//   })

//   it('should post to the s3Url', async () => {
//     expect.assertions(2)
//     const scope = nock('http://localhost')
//       .post('/api/v1/create/s3Url')
//       .reply(200, { uploadUrl: 'mockUploadUrl', token: fakeToken })
//     const res = await getS3Url()
//     expect(res).toEqual({ uploadUrl: 'mockUploadUrl', token: fakeToken })
//     expect(scope.isDone()).toBeTruthy()
//   })
// })
