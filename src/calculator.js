// App de Calculadora
// Regras do App
// - Calculo é feito após apertar igual
// - Calculo deve ser validado para ver se não infringe as regras da aritmética (dividir por 0...)
// - Resultado deve ser utilizado como primeiro parâmetro caso o usuário aperte algum botão de operação, caso contrário apaga o resultado e começa novamente

// Botões
// C => Limpa todos os campos digitados(field/input)
// () => Coloca parênteses para o campo. Caso não exista, coloca o primeiro parênteses. Caso exista, fecha o parênteses. Caso nenhuma operação anterior exista, coloca multiplicação implicitamente

class Calculator {
  constructor(operators = null, validators = []) {
    if(!operators) {
      throw new Error('It needs to have at least one operator in the calculator')
    }
    this._operations = []
    this._operators = operators
    this._validators = validators
  }
  get operations() {
    return [].concat(this._operations)
  }
  get lastOperation() {
    return this.operations[this.operations.length - 1]
  }
  _compileOperations() {
    if(!this.operations.length) throw new Error('There\'s nothing to be compiled')
    return this.operations.reduce((acc, next) => acc += next.payload, '')
  }
  calculate() {
    // Calculadora precisa validar automaticamente o que é recebido? SIM
    let errors = this.validate()
    if(errors.length) {
      return { errors }
    } else {
      return {
        result: new Function('return ' + this._compileOperations())().toString()
      }
    }
  }
  validate(validators = this._validators) {
    return validators.reduce((acc, next) => {
      if(next.test(this._compileOperations())) acc.push(next.errorType)
      return acc
    }, [])
  }
  add(operator, payload = '') {
    if(!this._operators.hasOwnProperty(operator)) {
      throw new Error('Operator ' + operator + ' doesn\'t exist')
    } else {
      this._operations = this._operations.concat(
        this._operators[operator](this.lastOperation, payload)
      )
    }
  }
  remove() {
    return this._operations.pop()
  }
  removeAll() {
    return this._operations.splice(0)
  }

}

export default Calculator
