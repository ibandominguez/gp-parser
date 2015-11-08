# gp-parser

> Gp-parser allow us to parse .gp* files

## Documentation help

* http://dguitar.sourceforge.net/GP4format.html

## Other References

* https://github.com/CoderLine/alphaTab
* https://github.com/pablot/GuitarProParser
* https://github.com/supersheep/guitar-pro

## Requirements

* node *
* npm *
* jasmine-node (if running unit tests)

## Contributing

### Getting Started

* clone the repo
* install deps 'npm install'

### TDD

> Tests are run using jasmine-node, please note that in order to run tests you need to have it installed

```sh
# on the repo root folder
jasmine-node tests
```

## Use example

In your application:

```js
// deps
var fs = require('fs');
var GPParser = require('gp-parser');

// get the file you wish to read
var fileBuff = fs.readFileSync('path/to/your/gp*/file');
var parsed = new GPParser().parse(fileBuff); // outputs { headers: {} ... }
```

## Contributors

Ibán Domínguez

## License

MIT © Ibán Domínguez
