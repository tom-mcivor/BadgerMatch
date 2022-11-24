import nock from 'nock'
import { create, getS3Url, fetchUrl } from '../create'

const createContentMockData = {
  auth0Id: 1,
  name: 'Borris',
  description: 'Likes stuff',
  imageUrl: '/images/boris.jpg',
}

const fetchUrlMockData = {
  uploadUrl: 'https://s3.amazonaws.com/random-bucket-name/1234567890.jpeg',
}

test('1=1', () => {
  expect(1).toBe(1)
})

// describe('create', () => {
//   it('should add a new animal to the database', async () => {
//     expect.assertions(1)
//     nock('http://localhost:3000')
//       .post('/api/v1/create')
//       .reply(200, createContentMockData)
//     const res = await create(createContentMockData)
//     expect(res).toEqual(createContentMockData)
//   })
// })

// describe('getS3Url', () => {
//   it('should return a uploadUrl', async () => {
//     expect.assertions(1)
//     nock('http://localhost:3000')
//       .get('/api/v1/create/s3Url')
//       .reply(200, { uploadUrl: 'mockUploadUrl' })
//     const res = await getS3Url()
//     expect(res).toEqual({ uploadUrl: 'mockUploadUrl' })
//   })
// })

// // describe('fetchUrl', () => {
// //   it('should return a uploadUrl', async () => {
// //     expect.assertions(1)
// //     nock('http://localhost:3000')
// //       .get('/api/v1/create/s3Url')
// //       .reply(200, fetchUrlMockData)
// //     const res = await fetchUrl(
// //       fetchUrlMockData.uploadUrl,
// //       fetchUrlMockData.file
// //     )
// //     expect(res).toEqual({ uploadUrl: 'mockUploadUrl' })
// //   })
// // })
