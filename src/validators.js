export const closeParenthesis = ({
  test: (compiledCode) => {
    let regEx = /(\([^()]*\))/

    function getEverything(str) {
      let test = regEx.exec(str)
      if (test && test.length) {
        let newStr = ''
        newStr += str.split('').slice(0, test.index).join('')
        newStr += str.split('').slice(test.index + test[0].length).join('')
        return getEverything(newStr)
      } else if (!test && /\(/.test(str)) {
        return true //'missing parenthesis'
      } else {
        return false //'all ocurrences got'
      }
    }

    return getEverything(compiledCode)
  },
  errorType: 'missingCloseParenthesis'
})

export const divideByZero = ({
  test: compiledCode => /\/0/.test(compiledCode),
  errorType: 'divideByZero'
})

export const operationNotCompleted = ({
  test: compiledCode => /[\.\*+-]$/.test(compiledCode),
  errorType: 'operationNotCompleted'
})
