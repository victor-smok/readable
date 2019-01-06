import clone from 'clone'
const db = {}

const LoremIpsum = `

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis convallis sem at pellentesque. Morbi fringilla sed ipsum vel aliquam. Duis ultrices odio turpis, non venenatis libero commodo in. Fusce ultrices mollis sapien. Donec quis luctus lorem. Nulla volutpat mi vel odio commodo rutrum sed eget velit. Etiam efficitur facilisis est sed dignissim. Ut volutpat in metus ac vehicula. In efficitur, sapien vitae blandit pretium, justo sem tincidunt elit, non rutrum orci sem eget elit. Nam sit amet facilisis diam. Etiam ac urna convallis turpis blandit bibendum a in tortor. Suspendisse volutpat leo a enim sollicitudin malesuada. Integer sed nibh quis tellus consectetur placerat placerat sed metus. Phasellus id dui nunc.

  Integer nisi mauris, hendrerit vel arcu eu, egestas sagittis ligula. Pellentesque a venenatis odio. Maecenas semper aliquet mattis. Nunc dictum nisi risus, et hendrerit nulla pulvinar a. Nam malesuada magna quis nulla varius suscipit. Vivamus arcu risus, porta et volutpat a, efficitur at justo. Donec lorem diam, posuere eu faucibus a, dictum non erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia dolor ut sem elementum, ac ullamcorper lectus pharetra. Duis a fringilla magna.

  Nullam non efficitur ligula. Phasellus lobortis in tellus a fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras feugiat, nisl eu tincidunt interdum, odio leo tempor libero, eget aliquam odio massa sed ipsum. Morbi pretium vestibulum blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut convallis finibus est, et facilisis ligula imperdiet vehicula. Aliquam erat volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam vel tellus et enim mollis tempor quis at ex. Suspendisse efficitur aliquam massa in condimentum. Aenean faucibus elit eros, ac varius lacus dignissim vitae. Donec tempor vehicula fringilla. In molestie id lacus nec consectetur. Maecenas elit sapien, eleifend vel arcu sed, lacinia tincidunt eros.
`

const defaultData = {
  'e2a5df36-c7e7-4809-baf1-be3bf6137286': {
    id: 'e2a5df36-c7e7-4809-baf1-be3bf6137286',
    timestamp: 1504318576708,
    title: 'Udacity is the best place to learn React',
    body: `Everyone says so after all. ${LoremIpsum}`,
    author: 'Mose Jast',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  'b0e725f0-7577-493c-a894-245484aec401': {
    id: 'b0e725f0-7577-493c-a894-245484aec401',
    timestamp: 1493448152768,
    title: 'Non officia praesentium inventore at odit rem.',
    body: `Dolores quas dolores. ${LoremIpsum}`,
    author: 'Erik Veum',
    category: 'react',
    voteScore: 1,
    deleted: false
  },
  '51c67a97-68c6-45b6-a36a-f5107d6ff1b8': {
    id: '51c67a97-68c6-45b6-a36a-f5107d6ff1b8',
    timestamp: 1494849801573,
    title: 'Et eveniet sed mollitia.',
    body: `Omnis quos sed vel commodi libero optio. ${LoremIpsum}`,
    author: 'Iva Kohler',
    category: 'react',
    voteScore: 2,
    deleted: false
  },
  'ee4a09fd-fd87-4585-9b67-3481172d5d73': {
    id: 'ee4a09fd-fd87-4585-9b67-3481172d5d73',
    timestamp: 1486964116626,
    title: 'Learn Redux in 10 minutes!',
    body: `Just kidding. It takes more than 10 minutes to learn technology. ${LoremIpsum}`,
    author: 'Felicita Blick',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
  'a0bbcaa4-2362-4556-9a69-652e1d3c72f1': {
    id: 'a0bbcaa4-2362-4556-9a69-652e1d3c72f1',
    timestamp: 1487832081761,
    title: 'Learn Redux in 10 minutes!',
    body: `Quam atque quos voluptatem eaque. ${LoremIpsum}`,
    author: 'Maudie Koelpin',
    category: 'redux',
    voteScore: 12,
    deleted: false
  },
  '417b76a2-bb08-457b-b775-44c156a74acb': {
    id: '417b76a2-bb08-457b-b775-44c156a74acb',
    timestamp: 1495952325645,
    title: 'Expedita voluptatum aliquid esse sed voluptatem est.',
    body: `Consequatur dolorem explicabo dolore vel eum saepe. ${LoremIpsum}`,
    author: 'Adolph Borer',
    category: 'redux',
    voteScore: -13,
    deleted: false
  },
  '3473a296-2c7a-40a3-bdbe-f8d1d058128b': {
    id: '3473a296-2c7a-40a3-bdbe-f8d1d058128b',
    timestamp: 1488705085230,
    title: 'Possimus qui eum ea deserunt optio nihil dolores rerum.',
    body: `Eos ut odio ex eaque cumque et odio totam sed. ${LoremIpsum}`,
    author: 'Donny Frami',
    category: 'udacity',
    voteScore: -8,
    deleted: false
  },
  '1a4676f0-e7b5-4c0e-82d2-ac82a918c260': {
    id: '1a4676f0-e7b5-4c0e-82d2-ac82a918c260',
    timestamp: 1495441069710,
    title: 'Et numquam placeat et atque pariatur totam.',
    body: `Porro voluptate eaque nihil ex minus sapiente corrupti. ${LoremIpsum}`,
    author: 'Ashleigh Harber',
    category: 'udacity',
    voteScore: 4,
    deleted: false
  },
  'a31b0cf2-2358-4d7a-bd0d-57868d3ae36d': {
    id: 'a31b0cf2-2358-4d7a-bd0d-57868d3ae36d',
    timestamp: 1494124701462,
    title: 'Id sit dolores modi ab vero et quis.',
    body: `Omnis tempore voluptatibus sequi facere rem sed voluptatem autem. ${LoremIpsum}`,
    author: 'Aisha Kiehn',
    category: 'udacity',
    voteScore: -13,
    deleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise(resolve => {
    const posts = getData(token)
    const keys = Object.keys(posts)
    const filteredKeys = keys.filter(
      key => posts[key].category === category && !posts[key].deleted
    )
    resolve(filteredKeys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise(resolve => {
    const posts = getData(token)
    resolve(posts[id].deleted ? {} : posts[id])
  })
}

function getAll (token) {
  return new Promise(resolve => {
    const posts = getData(token)
    const keys = Object.keys(posts)
    const filteredKeys = keys.filter(key => !posts[key].deleted)
    resolve(filteredKeys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise(resolve => {
    const posts = getData(token)
    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    }
    resolve(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise(resolve => {
    const posts = getData(token)
    const post = posts[id]
    switch (option) {
      case 'upVote':
        post.voteScore = post.voteScore + 1
        break
      case 'downVote':
        post.voteScore = post.voteScore - 1
        break
      default:
        console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    resolve(post)
  })
}

function disable (token, id) {
  return new Promise(resolve => {
    let posts = getData(token)
    posts[id].deleted = true
    resolve(posts[id])
  })
}

function edit (token, id, post) {
  return new Promise(resolve => {
    let posts = getData(token)
    for (let prop in post) {
      posts[id][prop] = post[prop]
    }
    resolve(posts[id])
  })
}

export default {get, getAll, getByCategory, add, vote, disable, edit}
