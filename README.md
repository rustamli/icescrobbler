# icescrobbler

A Last.fm scrobbler for SHOUTcast or Icecast broadcasts

Based on **[simple-lastfm](https://github.com/atomjack/simple-lastfm)** and **[node-icecast](https://github.com/TooTallNate/node-icecast)** projects

## Installation 

```
npm install icescrobbler -g
```

## Usage

```
icescrobbler [your-lastfm-username] [your-lastfm-password] [stream-url]
```

`stream-url` - is a url of SHOUTcast or Icecast broadcasts

*example:*

```
icescrobbler johndoe123 password1234 http://mp3.nashe.ru/rock-128.mp3
```

It is also possible to run icescrobbler without parameters specified:

```
icescrobbler 
```

(in this case it will show prompts asking to specify username, password and url)

## API

* `init(username, password, url)` - This method initializes scrobbler setting last.fm username, last.fm password and stream URL 
* `start()` - starts scrobbling 

## Example

```javascript
var icescrobbler = require('icescrobbler');

icescrobbler.init('johndoe123', 'password1234', 'http://mp3.nashe.ru/rock-128.mp3');
icescrobbler.start();
```


## License

Released under ISC license (functionally equivalent to the simplified BSD and MIT/Expat licenses). 

See LICENSE for details.

