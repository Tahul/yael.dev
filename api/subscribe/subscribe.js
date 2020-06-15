// Subscribe to MailChimp Netlify function
// Source: https://dev.to/skatkov/jamstack-progressive-mailchimp-sign-up-form-with-netlify-13m3
// --------------------------------------------------------------------------------------------
const { parse } = require('querystring')
const axios = require('axios')
const mailChimpAPI = process.env.MAILCHIMP_API_KEY
const mailChimpListID = process.env.MAILCHIMP_LIST_ID

exports.handler = async (event, context, callback) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Max-Age': '2592000',
    'Access-Control-Allow-Credentials': 'true',
  }
  let body = {}

  try {
    body = JSON.parse(event.body)
  } catch (e) {
    body = parse(event.body)
  }

  if (!body.email) {
    console.log('missing email')
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing email',
      }),
    })
  }

  if (!mailChimpAPI) {
    console.log('missing mailChimpAPI key')
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing mailChimpAPI key',
      }),
    })
  }

  if (!mailChimpListID) {
    console.log('missing mailChimpListID key')
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing mailChimpListID key',
      }),
    })
  }

  const data = {
    email_address: body.email,
    status: 'pending',
    merge_fields: {},
  }

  const subscriber = JSON.stringify(data)
  console.log('Sending data to mailchimp', subscriber)

  // Subscribe an email
  try {
    const response = await axios({
      method: 'post',
      url: `https://us16.api.mailchimp.com/3.0/lists/${mailChimpListID}/members/`, //change region (us19) based on last values of ListId.
      data: subscriber,
      auth: {
        username: 'apikey', // any value will work
        password: mailChimpAPI,
      },
    })

    if (
      response.headers['content-type'] === 'application/x-www-form-urlencoded'
    ) {
      // Do redirect for non JS enabled browsers
      return callback(null, {
        statusCode: 302,
        headers: {
          Location: '/',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({}),
      })
    }

    // Return data to AJAX request
    return callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify({ subscribed: body.email }),
    })
  } catch (e) {
    // Error w/ response
    if (e.response) {
      if (e.response.data.title === 'Member Exists') {
        return callback(null, {
          statusCode: 200,
          headers,
          body: JSON.stringify({ subscribed: body.email, already: true }),
        })
      }
    }

    // Error w/o response
    return callback(null, {
      statusCode: 500,
      headers,
      body: JSON.stringify({ subscribed: false }),
    })
  }
}
