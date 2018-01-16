const Twitter = require('twitter');

class ImageTweeter {
    /**
     * 
     * @param {Twitter} client 
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Tweets base64 encoded media data.
     * 
     * @param {string} media_data 
     * @param {string} status 
     */
    tweet(media_data, status) {
        return new Promise((resolve, reject) => {
            this.client
                .post('media/upload', { media_data })
                .then((media, response) => {
                    const message = {
                        status: status,
                        media_ids: media.media_id_string
                    };
                    this.client
                        .post('statuses/update', message)
                        .then((tweet, response) => {
                            resolve(tweet);
                        });
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }
}

module.exports = ImageTweeter;