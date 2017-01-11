import { expect } from 'chai'
import Calculator from '../src/calculator'
import * as operators from '../src/operators'
import { closeParenthesis, divideByZero } from '../src/validators'

let validators = [closeParenthesis, divideByZero]

describe('A Calculator', function() {

  describe('Initialization', function() {
    it('Should store an object with given operators', function() {
      let calculator = new Calculator(operators)
      expect(calculator._operators).to.have.all.keys(['add', 'divide', 'multiply', 'subtract', 'number', 'operator', 'percent'])
    })

    it('Should throw an error if no given operators', function() {
      let createCalculator = () => new Calculator()
      expect(createCalculator).to.throw(/It needs to have at least one operator in the calculator/)
    })
  })

  describe('Add operations', function() {
    let calculator = null

    beforeEach(function() {
      calculator = new Calculator(operators)
    })

    it('Should add an operation in operations arrays', function() {
      calculator.add('number', '0')
      expect(calculator.operations).to.deep.equal([{
        type: 'number',
        payload: '0'
      }])
    })

    it('Should add multiple operations in operations array', function() {
      calculator.add('operator', '.')
      expect(calculator.operations).to.deep.equal([
        {
          type: 'number',
          payload: '0'
        },
        {
          type: 'operator',
          payload: '.'
        }
      ])
    })

  })

  describe('Remove operations', function() {

    let calculator = null

    beforeEach(function() {
      calculator = new Calculator(operators)
      calculator.add('number', '0')
      calculator.add('operator', '.')
    })

    it('Should remove the last operation in the stack and return it', () => {
      expect(calculator.remove()).to.deep.equal({
        type: 'operator',
        payload: '.'
      })
      expect(calculator.operations).to.have.lengthOf(1)
    })

    it('Should remove all operations in the stack and return the removed operators', () => {
      expect(calculator.removeAll()).to.have.lengthOf(2)
      expect(calculator.operations).to.be.empty
    })
  })

  describe('Retrieve Operations', function() {
    let calculator = null

    beforeEach(function() {
      calculator = new Calculator(operators)
      calculator.add('number', '0')
    })

    it('Should retrieve all operations', () => {
      calculator.add('multiply')
      expect(calculator.operations).to.deep.equal([
        {
          type: 'number',
          payload: '0'
        },
        {
          type: 'operation',
          payload: '*'
        }
      ])
    })

    it('Should retrieve last operation', () => {
      calculator.add('multiply')
      expect(calculator.lastOperation).to.deep.equal(
        {
          type: 'operation',
          payload: '*'
        }
      )
    })
  })

  describe('Compilation', function() {
    it('Should compile an operations array into a string', () => {
      let calculator = new Calculator(operators)
      calculator.add('number', '0')
      calculator.add('operator', '.')
      expect(calculator._compileOperations()).to.equal('0.')
    })

    it.skip('Should throw an error if there\'s nothing in the operations stack', function() {
      let calculator = new Calculator(operators)
      expect(calculator._compileOperations()).to.throw(/There's nothing to be compiled/)
    })
  })

  describe('Validate compiled operations', function() {
    let calculator = null

    beforeEach(function() {
      calculator = new Calculator(operators, validators)
    })
    it('Should return an errors array if there\'s an error in the compiled operations', () => {
      calculator.add('number', 3)
      calculator.add('divide')
      calculator.add('number', 0)
      expect(calculator.validate()).to.be.lengthOf(1)
    })
    it('Shoule return an empty array if there\' no error in the compiled operations', () => {
      calculator.add('number', 3)
      calculator.add('multiply')
      calculator.add('number', 4)
      expect(calculator.validate()).to.be.empty
    })
  })

  // let str = '4*4+(9(8-9)+(7*4))'

  describe('Make calculations', function() {
    it('Should calculate the operations stored in calculator', () => {
      let calculator = new Calculator(operators, validators)
      calculator.add('number', '5')
      calculator.add('multiply')
      calculator.add('number', '4')
      expect(calculator.calculate().result).to.equal('20')
      // Vale a pena usar uma promise pra saber se o calculo deu certo ou não?
    })
    it('Should return an object with errors if there\'s some validation error in the calculator', () => {
      let calculator = new Calculator(operators, validators)
      calculator.add('number', 3)
      calculator.add('divide')
      calculator.add('number', 0)
      expect(calculator.calculate()).to.have.any.keys('errors')
    })
  })

})
