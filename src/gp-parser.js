'use strict';

module.exports = (function() {

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
   * according to
   *
   * @private
   * @param Buffer
   * @return object
   */
  function parseHeaders(dataBuff) {
    return {
      version: dataBuff.toString('utf8', 1, 25),
      title: dataBuff.toString('utf8', 36, 50)
    };
  };

  return GPParser;

})();
