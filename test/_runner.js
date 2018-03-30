const TESTS = []

exports.test = function test (runTest) {
  TESTS.push(runTest)
}

exports.run = function run () {
  Promise.all(
    TESTS.map(function (test) {
      return test()
    })
  )
    .then(function () {
      console.log('All tests pass!')
    })
    .catch(function (error) {
      console.error(error)
      process.exit(1)
    })
}
