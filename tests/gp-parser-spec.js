'use strict';

var fs       = require('fs');
var GPParser = require('../src/gp-parser');
var gp3File  = fs.readFileSync(__dirname + '/assets/thecure-boysdontcry.gp3');

describe('GPParser test suite', function() {

  it('Should be an instance of GPParser', function() {
    expect(new GPParser instanceof GPParser).toBe(true);
  });

  it('Should retrieve the header version from a gp3 file', function() {
    var expectedHeaderVersion = 'FICHIER GUITAR PRO v3.00';
    var parsed = new GPParser().parse(gp3File);
    expect(parsed.headers.version).toEqual(expectedHeaderVersion);
  });

  it('Should retrieve the header title from a gp3 file', function() {
    var expectedHeaderTitle = 'Boys Don\'t Cry';
    var parsed = new GPParser().parse(gp3File);
    expect(parsed.headers.title).toEqual(expectedHeaderTitle);
  });

});
