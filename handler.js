'use strict';

const AWS = require('aws-sdk');
const Twitter = require('twitter');
const ImageTweeter = require('./src/image-tweeter');
const s3 = new AWS.S3();

module.exports.tweet = (event, context, callback) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  const tweeterer = new ImageTweeter(client);
  const error = (err) => {
    console.log(err, err.stack);
    callback(err);
  };

  s3.getObject({
    Bucket: event.Records[0].s3.bucket.name,
    Key:    event.Records[0].s3.object.key
  }, (err, data) => {
    if (err) {
      error(err);
    }

    tweeterer
      .tweet(data.Body.toString('base64'))
      .then((tweet) => {
        callback(null, { message: 'Image tweeted successfully!', tweet});
      })
      .catch((err) => error);
  });
};
