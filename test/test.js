const minimumEditDistance = require('../src/med.js')
const leven = require('leven')
const assert = require('./assert.js').assert
const colors = require('colors')

const randomAscii = (asciiLow, asciiHi, numOfChars) => String.fromCharCode.apply(undefined,Array(numOfChars).fill(0).map(i => asciiLow + ~~(Math.random() * (asciiHi - asciiLow))))
const success = 0, failure = !(success)

/*
 *  TEST CASES
 */

function nTests(numOfTests, str1Lim, str2Lim=str1Lim){
  let passes = 0, fails = 0
  for(let i=0, testCases=numOfTests; i<testCases; i++){
    const str1 = randomAscii(0, 256, ~~(Math.random() * str1Lim))
    const str2 = randomAscii(0, 256, ~~(Math.random() * str2Lim))

    const difference = minimumEditDistance.diff(str1, str2), benchmark = leven(str1, str2)

    // assert.equals(difference.distance, benchmark, `test ${i}a \t`.cyan)
    const rec = minimumEditDistance.reconstruct(str2, difference.backtrace)
    const equ = (str1 === rec)

    if(difference.distance !== benchmark){
      console.log(`${difference.distance} =/= ${benchmark} ✗`.red)
      fails++
    }else{
      passes++
    }

    if(!equ){
      console.log(`${str1} =/= ${rec} ✗`.red)
      fails++
    }else{
      passes++
    }
  }
  return {passes, fails}
}

/*
 *  TRIVIAL TEST CASES
 */

console.log('trivial use cases'.yellow)
const t1 = nTests(25,0,20)
const t2 = nTests(25,20,0)
console.log(`✓ ${t1.passes + t2.passes}`.green, `✗ ${t1.fails + t2.fails}`.red)

/*
 * ASCII TEST CASES
 */

console.log('ascii test cases'.yellow)
const t3 = nTests(1500,100)
console.log(`✓ ${t3.passes}`.green, `✗ ${t3.fails}`.red)

if(t1.fails || t2.fails || t3.fails){
  process.exit(failure)
}else{
  process.exit(success)
}
