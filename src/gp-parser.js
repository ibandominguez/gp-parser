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
  var GPParser = function() {
    this.parseCount = 0;
  };

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
    this.byteCounter = 0;
    this.parseCount++;

    return {
      headers: parseHeaders.call(this, dataBuff)
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
    var self = this, headers = {};

    // first byte off [0], since we know the version length
    // get the next 24 bytes for title [1, 25]
    // http://dguitar.sourceforge.net/GP4format.html#Version
    self.byteCounter = self.byteCounter + 1;
    headers.version = dataBuff.toString('utf8', self.byteCounter, self.byteCounter + 24);
    self.byteCounter = self.byteCounter + 24;

    // skip 10 http://dguitar.sourceforge.net/GP4format.html#Information_About_the_Piece
    // Loop through all titles
    self.byteCounter = self.byteCounter + 10;
    headerKeys.map(function(key) {
      var l = dataBuff.readUIntLE(self.byteCounter);
      headers[key] = dataBuff.toString('utf8', self.byteCounter + 1, self.byteCounter + 1 + l);
      self.byteCounter = self.byteCounter + 1 + l + WL;
    });

    return headers;
  };

  return GPParser;

})();
