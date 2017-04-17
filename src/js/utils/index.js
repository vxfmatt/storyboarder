let { acceleratorAsHtml } = require('./accelerator.js')

let msToTime = (s)=> {
  if(!s) s = 0
  s = Math.max(0, s)
  function addZ(n) {
    return (n<10? '0':'') + n
  }
  var ms = (s % 1000)
  //s = (s - ms) / 1000.0

  s = Math.round(s / 1000)

  var secs = s % 60
  s = (s - secs) / 60
  var mins = s % 60
  var hrs = (s - mins) / 60
  if (hrs) {
    return hrs + ':' + addZ(mins) + ':' + addZ(secs)
  } else {
    return mins + ':' + addZ(secs)
  }
}

let uidGen = (chars)=> {
  return ("00000" + (Math.random()*Math.pow(36,chars) << 0).toString(36)).slice(-chars).toUpperCase()
}

let wordCount = (text)=>  {
  if (!text) return 0
  return text.trim().replace(/ +(?= )/g,'').split(' ').length
}

let durationOfWords = (text, durationPerWord) => {
  if (!text) return 0
  return wordCount(text)*durationPerWord
}

let range = (begin, end, step = 1) => {
  let a = [begin], b = begin
  while (b < end) {
    b += step
    a.push(b)
  }
  return a
}

let norm = (val, min, max) => (val - min) / (max - min)

let clamp = (val, min, max) => val < min? min : (val > max? max : val)

// Caveats (via https://github.com/ahmadnassri/stringify-clone)
// - cannot clone RegExp (returns {})
// - NaN values will be converted to null
// - Date objects will be converted to ISO strings (equivalent of running Date.toISOString())
//    you can reconstruct the Date by calling new Date(string)
let stringifyClone = (object) => JSON.parse(JSON.stringify(object))

// via https://github.com/skellock/ramdasauce/blob/master/lib/isUndefined.js
let isUndefined = (x) => typeof x === 'undefined'

// return a copy of an array with elements swapped
let swap = (arr, x, y) => {
  let a = arr.slice(0)
  let b = a[x]
  a[x] = a[y]
  a[y] = b
  return a
}

let shuffle = (arr) => {
  let a = arr.slice(0) // make a copy
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = a[i]
    a[i] = a[j]
    a[j] = temp
  }
  return a
}

let compareNumbers = (a, b) => a - b

const sample = list => list[(Math.random() * list.length)|0]

module.exports = {
  msToTime,
  uidGen,
  durationOfWords,
  range,
  norm,
  clamp,
  stringifyClone,
  isUndefined,
  swap,
  acceleratorAsHtml,
  shuffle,
  compareNumbers,
  sample
}
