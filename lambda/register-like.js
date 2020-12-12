const fauna = require('faunadb');

exports.handler = async (event) => {
  const q = fauna.query;

  const client = new fauna.Client({
    secret: process.env.FAUNA_SECRET_KEY,
  });
  const { slug } = event.queryStringParameters;
  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Article slug not provided',
      }),
    };
  }

  // Check and see if the doc exists.
  console.log('slug', slug)
  const doesDocExist = await client.query(
    q.Exists(q.Match(q.Index('likes_by_slug'), slug))
  );
  if (!doesDocExist) {
    await client.query(
      q.Create(q.Collection('likes'), {
        data: { slug: slug, likes: 0 },
      })
    );
  }
  // Fetch the document for-real
  const document = await client.query(
    q.Get(q.Match(q.Index('likes_by_slug'), slug))
  );
  await client.query(
    q.Update(document.ref, {
      data: {
        likes: document.data.likes + 1,
      },
    })
  );
  return {
    statusCode: 200,
    body: JSON.stringify({
      likes: document.data.likes,
    }),
  };
};