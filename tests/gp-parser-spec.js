'use strict';

var fs       = require('fs');
var GPParser = require('../src/gp-parser');
var gp4File  = fs.readFileSync(__dirname + '/assets/thecure-boysdontcry.gp4');

describe('GPParser test suite', function() {

  it('Should be an instance of GPParser', function() {
    expect(new GPParser instanceof GPParser).toBe(true);
  });

  it('Should retrieve an object containing header keys from a gp4 file', function() {
    var expectedHeaderKeys = ['version', 'title', 'subtitle', 'artist', 'album', 'author', 'copyrights', 'tabAuthor'];
    var parsed = new GPParser().parse(gp4File);
    expect(Object.keys(parsed.headers)).toEqual(expectedHeaderKeys);
  });

  it('Should retrieve the header version from a gp4 file', function() {
    var expectedHeaderVersion = 'FICHIER GUITAR PRO v3.00';
    var parsed = new GPParser().parse(gp4File);
    expect(parsed.headers.version).toEqual(expectedHeaderVersion);
  });

  it('Should retrieve the header title from a gp4 file', function() {
    var expectedHeaderTitle = 'Boys Don\'t Cry';
    var parsed = new GPParser().parse(gp4File);
    expect(parsed.headers.title).toEqual(expectedHeaderTitle);
  });

});
