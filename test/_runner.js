var TESTS = []

exports.test = function test (runTest) {
  TESTS.push(runTest)
}

exports.run = function run () {
  Promise.all(
    TESTS.map(test => test())
  )
    .then(function () {
      console.log('All tests pass!')
    })
    .catch(function (error) {
      console.error(error)
      process.exit(1)
    })
}
