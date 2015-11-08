'use strict';

module.exports = (function() {

  /**
   * Word byte length
   *
   * @private
   * @var int
   */
  var WL = 4;

  /**
   * @private
   * @var array
   */
  var headerKeys = ['title', 'subtitle', 'artist', 'album', 'author', 'copyrights', 'tabAuthor'];

  /**
   * Constructor
   *
   * @void
   */
  var GPParser = function() {};

  /**
   * Handles the main buffers and
   * distributes the parsing responsability
   * to privates methods
   *
   * @public
   * @param Buffer
   * @return object
   */
  GPParser.prototype.parse = function(dataBuff) {
    return {
      headers: parseHeaders(dataBuff)
    };
  };

  /**
   * Parses the headers out of a buffer
   * according to http://dguitar.sourceforge.net/GP4format.html
   *
   * @private
   * @param Buffer
   * @return object
   */
  function parseHeaders(dataBuff) {
    var iPoint = 0, headers = {};

    // first byte off [0], since we know the version length
    // get the next 24 bytes for title [1, 25]
    // http://dguitar.sourceforge.net/GP4format.html#Version
    iPoint = iPoint + 1;
    headers.version = dataBuff.toString('utf8', iPoint, iPoint + 24);
    iPoint = iPoint + 24;

    // skip 10 http://dguitar.sourceforge.net/GP4format.html#Information_About_the_Piece
    // Loop through all titles
    iPoint = iPoint + 10;
    headerKeys.map(function(key) {
      var l = dataBuff.readUIntLE(iPoint);
      headers[key] = dataBuff.toString('utf8', iPoint + 1, iPoint + 1 + l);
      iPoint = iPoint + 1 + l + WL;
    });

    return headers;
  };

  return GPParser;

})();
