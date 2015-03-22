
var icecast = require('icecast'),
    stream = require('stream'),
    Lastfm = require('simple-lastfm'),
    lastfmInstance,
    streamUrl,
    lastScrobbled = '';

var emptyStreamWritable = new stream.Writable();
emptyStreamWritable._write = function (chunk, encoding, done) {
    done();
};

module.exports = {

    init: function (user, pwd, url) {
        lastfmInstance = new Lastfm({
            api_key: '1bd854cef4af2b9d16983e1d1408ea26',
            api_secret: '8e2d900e5be2c20862f63992939789a5',
            username: user,
            password: pwd
        });

        streamUrl = url;
    },

    start: function () {
        lastfmInstance.getSessionKey(function (result) {
            console.log('- - - - -');
            if(result.success) {

                icecast.get(streamUrl, function (res) {
                    res.on('metadata', function (metadata) {
                        var parsed = icecast.parse(metadata);

                        if (parsed.StreamTitle !== lastScrobbled) {
                            var songParts = parsed.StreamTitle.split(' - ');

                            lastfmInstance.doScrobble({
                                method: 'track.scrobble',
                                artist: songParts[0],
                                track: songParts[1],
                                callback: function (result) {
                                }
                            });

                            console.log('Scrobbled: ' + parsed.StreamTitle);
                            lastScrobbled = parsed.StreamTitle;
                        }

                    });

                    res.pipe(emptyStreamWritable);
                });

            } else {
                console.log("Error: " + result.error);
            }
        });
    }
};
