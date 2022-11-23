exports.seed = async (knex) => {
  await knex('animals').insert([
    {
      id: 1,
      auth0_id: '1',
      name: 'Bag Cat',
      description: 'Likes bags',
      image_url: '/images/bag-cat.jpg',
    },
    {
      id: 2,
      auth0_id: '1',
      name: 'Mug Pup',
      description: 'Lives in mugs',
      image_url: '/images/mug-pup.jpg',
    },
    {
      id: 3,
      auth0_id: '2',
      name: 'Elephant',
      description: 'Just happy to exist',
      image_url:
        'https://www.top5.com/wp-content/uploads/2018/08/cute-baby-animals-baby-elements.jpeg',
    },
    {
      id: 4,
      auth0_id: '3',
      name: 'Snow Fox',
      description: 'Wants a blanket',
      image_url:
        'https://www.top5.com/wp-content/uploads/2018/08/cute-baby-photos-fox-in-the-snow.png',
    },
    {
      id: 5,
      auth0_id: '3',
      name: 'grommit',
      description: 'I like cheese',
      image_url:
        'https://static.wikia.nocookie.net/universalstudios/images/1/1a/The-Curse-of-the-Were-Rabbit-wallace-and-gromit-118082_1508_1820.jpg/revision/latest?cb=20201117170912',
    },
    {
      id: 6,
      auth0_id: '3',
      name: 'wallace',
      description: 'I like cheese',
      image_url:
        'https://static.wikia.nocookie.net/universalstudios/images/a/a9/Wallace_thumb_up.png/revision/latest?cb=20180227050041',
    },
  ])
}
