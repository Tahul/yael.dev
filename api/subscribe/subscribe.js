// Subscribe to MailChimp Netlify function
// Source: https://dev.to/skatkov/jamstack-progressive-mailchimp-sign-up-form-with-netlify-13m3
// --------------------------------------------------------------------------------------------
import { parse } from 'querystring'
const axios = require('axios');
const mailChimpAPI = process.env.MAILCHIMP_API_KEY;
const mailChimpListID = process.env.MAILCHIMP_LIST_ID;

exports.handler = (event, context, callback) => {
  let body = {}
  console.log(event)
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
        error: 'missing email'
      })
    })
  }

  if (!mailChimpAPI) {
    console.log('missing mailChimpAPI key')
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing mailChimpAPI key'
      })
    })
  }

  if (!mailChimpListID) {
    console.log('missing mailChimpListID key')
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing mailChimpListID key'
      })
    })
  }

  const data = {
    email_address: body.email,
    status: "pending",
    merge_fields: {}
  };

  const subscriber = JSON.stringify(data);
  console.log("Sending data to mailchimp", subscriber);

  // Subscribe an email

  axios(
    {
      method: 'post',
      url: `https://us19.api.mailchimp.com/3.0/lists/${mailChimpListID}/members/`, //change region (us19) based on last values of ListId.
      data: subscriber,
      auth: {
        username: 'apikey', // any value will work
        password: mailChimpAPI
      }
    }
  ).then(function(response){
    console.log(`status:${response.status}` )
    console.log(`data:${response.data}` )
    console.log(`headers:${response.headers}` )

    if (response.headers['content-type'] === 'application/x-www-form-urlencoded') {
      // Do redirect for non JS enabled browsers
      return callback(null, {
        statusCode: 302,
        headers: {
          Location: '/thanks.html',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({})
      });
    }

    // Return data to AJAX request
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ emailAdded: true })
    })
  }).catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
};
