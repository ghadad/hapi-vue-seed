/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const dot = require('dot-object');
const Hoek = require("hoek");

function toObject(arrayIni, keyfield, valfield) {
    var dotObect = {}

    arrayIni.forEach(iniEntry => {
        dotObect[iniEntry[keyfield]] = iniEntry[valfield];
    });

    try {
        let retArr;
        eval(retObject = dot.object(dotObect));
        return retObject;
    } catch (e) {
        console.log("ERRORO", e.message);
        return [];
    }
}

function internalLowerkeys(obj) {
    var lowerKeysObject = {};
    var keys = Object.keys(Object(obj));

    for (var i = 0; i < keys.length; i++) {

        lowerKeysObject[keys[i].toLowerCase()] = obj[keys[i]];
    }

    return lowerKeysObject;
}

let lowerkeys = function (input) {
    let ret = [];

    if (input instanceof Array) {

        for (var i = 0; i < input.length; i++) {
            //console.log(internalLowerkeys(input[i]))
            ret.push(internalLowerkeys(input[i]));
        }
    } else {
        ret = internalLowerkeys(input)
    }
    return ret;
}

module.exports = {
    toObject: toObject,
    lowerkeys: lowerkeys,
    hoek: Hoek
};