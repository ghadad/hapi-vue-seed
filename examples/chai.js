var chai = require("chai");
var assert = chai.assert;
var foo = "bar"
assert.typeOf(foo, 'string');
assert.lengthOf(foo, 3)
assert.equal(foo, 'aaa');
