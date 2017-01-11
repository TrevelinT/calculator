<template lang="html">
  <div>
    <app-header @toggle="onToggleMenu"></app-header>
    <main class="app-main">
      <app-sidebar :is-menu-opened="isMenuOpened"></app-sidebar>
      <div class="overlay" @click="onToggleMenu"></div>
      <section class='app-content calculator'>
        <header class="calculator-header">
          <h2 class="calc-visor" :class="{ 'has-result': calculated }">
            {{ visor }}
          </h2>
        </header>
        <div class="calculator-content">
          <h3 class="calc-error" v-if="error">{{ error | errorMessage }}</h3>
          <div class="result-options">
            <button type="button" name="button" @click="del()" class="icon-delete">Delete</button>
          </div>
          <div class="button-row">
            <button type="button" name="button" class="operations btn-wide" @click="clear()">C</button>
            <button type="button" name="button" class="operations" @click="addToCalculator('percent')">%</button>
            <button type="button" name="button" class="operations" @click="addToCalculator('divide')">&#247;</button>
          </div>
          <div class="button-row">
            <button type="button" name="button" @click="addToCalculator('number', '7')">7</button>
            <button type="button" name="button" @click="addToCalculator('number', '8')">8</button>
            <button type="button" name="button" @click="addToCalculator('number', '9')">9</button>
            <button type="button" name="button" class="operations" @click="addToCalculator('multiply')">x</button>
          </div>
          <div class="button-row">
            <button type="button" name="button" @click="addToCalculator('number', '4')">4</button>
            <button type="button" name="button" @click="addToCalculator('number', '5')">5</button>
            <button type="button" name="button" @click="addToCalculator('number', '6')">6</button>
            <button type="button" name="button"  class="operations" @click="addToCalculator('subtract')">-</button>
          </div>
          <div class="button-row">
            <button type="button" name="button" @click="addToCalculator('number', '1')">1</button>
            <button type="button" name="button" @click="addToCalculator('number', '2')">2</button>
            <button type="button" name="button" @click="addToCalculator('number', '3')">3</button>
            <button type="button" name="button" class="operations" @click="addToCalculator('add')">+</button>
          </div>
          <div class="button-row">
            <button type="button" name="button" @click="addToCalculator('number', '0')" class="btn-wide">0</button>
            <button type="button" name="button" @click="addToCalculator('operator', '.')">.</button>
            <button type="button" name="button" class="calculate" @click="calculate()">=</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
//TODO: Separar o App.vue em componentes reutilizáveis
//TODO: Separar os estilos juntos
//TODO: Subir versão no github
//TODO: Colocar ícones no menu lateral
//TODO: Colocar links do github e talz
//FIX: App em telas grandes (monitor full HD)
import { calculator as calculatorDictionary, error as errorDictionary } from './dictionary'
import Calculator from './calculator'
import * as operators from './operators'
import { closeParenthesis, divideByZero, operationNotCompleted } from './validators'
import AppHeader from './components/AppHeader'
import AppSidebar from './components/AppSidebar'

var calculator = new Calculator(operators, [closeParenthesis, divideByZero, operationNotCompleted])

export default {
  components: {
    AppHeader,
    AppSidebar
  },
  data() {
    return {
      message: 'Simple Calculator',
      fields: '',
      error: '',
      isMenuOpened: false,
      calculated: false
    }
  },
  computed: {
    visor: function() {
      return Object
        .keys(calculatorDictionary)
        .reduce((acc, next) =>
          acc = acc.replace(
            new RegExp(next, 'g'),
            calculatorDictionary[next]
          ),
        this.fields)
    }
  },
  filters: {
    errorMessage: function(value) {
      if(!value) return

      return errorDictionary[value] || errorDictionary['default']
    }
  },
  methods: {
    onToggleMenu() { this.isMenuOpened = !this.isMenuOpened },
    addToCalculator(operation, value = '') {
      if(this.calculated) {
        if(['add', 'subtract', 'multiply', 'divide'].indexOf(operation) > -1) {
          this.fields.split('').forEach((item) => {
            if(item === '.') {
              calculator.add('operator', '.')
            } else {
              calculator.add('number', item)
            }
          })
        }
        this.calculated = !this.calculated
      }

      calculator.add(operation, value)
      this.error = ''
      this.fields = calculator._compileOperations()
    },
    calculate() {
      if(!this.fields) return
      let errors = calculator.validate()
      console.log(errors)
      if(errors.length) {
        this.error = errors[0]
      } else if(!this.calculated) {
        this.fields = calculator.calculate().result
        this.calculated = true
        calculator.removeAll()
      }
    },
    clear() {
      if(this.fields) {
        calculator.removeAll()
        this.fields = ''
      }
    },
    del() {
      if(this.calculated) {
        this.fields.split('').forEach((item) => {
          if(item === '.') {
            calculator.add('operator', '.')
          } else {
            calculator.add('number', item)
          }
        })
        this.calculated = false
      }
      if(this.fields) {
        calculator.remove()
        this.fields = calculator.operations.length
          ? calculator._compileOperations()
          : ''
      }
    }
  }
}
</script>

<style lang="css">
body {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  margin: 0;
  padding: 0;
}

h1, h2 { margin: 0 0 1em 0; }

.calculator,
.calc-visor {
  font-weight: 300;
}

.calculator {
  x-width: 20em;
  border: 2px solid #000;
  box-sizing: border-box;
  moz-box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  height: 88vh;
  justify-content: flex-end;
}

.calculator-header,
.calculator-content {
  width: 100%;
}

.calc-visor {
  text-align: right;
  padding-right: 1em;
  min-height: 1.2em;
}

@keyframes error {
  0% {
    opacity: 0;
    left: 50%;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    left: 50%;
  }
}

.calc-error {
  opacity: 0;
  border-radius: 0.5em;
  background-color: rgba(0,0,0,0.7);
  color: #fff;
  font-size: 0.75em;
  padding: 0.5em;
  position: absolute;
  top: 80%;
  left: -500%;
  transform: translateX(-50%);
  font-weight: normal;
  white-space: nowrap;
  animation-name: error;
  animation-duration: 5s;
  animation-timing-function: ease-in-out;
}

.button-row {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  /*-webkit-justify-content: center;
  justify-content: center;*/
}
button {
  flex-basis: 25%;
  height: 3em;
  background-color: #fafafa;
  border: 0 none;
  cursor: pointer;
  font-size: 1.5em;
  border: 1px solid #e0e0e0;
  border-top-width: 0;
  border-left-width: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}

.btn-wide {
  flex-basis: 50%;
}

.button-row button:last-child {
  border-right-width: 0;
}

.button-row:last-child > button {
  border-bottom-width: 0;
}

button.calculate {
  background-color: #4bae50;
  color: #fff;
}

button.operations {
  background-color: #f2f4f4;
  color: #009bcc;
  x-font-weight: bold;
}

.has-result {
  color: #4bae50;
}

.icon-delete {
  background-color: #009bcc;
  width: 0;
  position: relative;
  height: 0;
  padding: 0.75em 1em;
  border-radius: 0 10% 10% 0;
  margin-left: 100px;
  text-indent: -500em;
  font-size: 0.825rem;
}

.icon-delete:before {
  position: absolute;
  content: " ";
  border: 0.825em solid transparent;
  border-right-color: #009bcc;
  right: 100%;
  top: 0;
}
.icon-delete:after {
  position: absolute;
  content: "x";
  top: 0;
  left: 0;
  transform: translate(0.6em, 0.1em);
  color: #fff;
  z-index: 2;
  text-indent: 0;
}

.result-options {
  position: relative;
  padding: 0.5em;
}

.result-options:after,
.result-options:before {
  content: " ";
  display: table;
}

.result-options:after {
  clear: both;
}

.result-options .icon-delete {
  float: right;
  margin-right: 0.5em;
}

/* ~400px */
@media all and (min-width: 25em) {
  body {
    font-size: 1.125em;
  }
}

@media all and (min-width: 37.5em) {
  body {
    font-size: 1em;
  }
  .app-content {
    max-width: 22em;
    margin: 0 auto;
  }
  .calculator {
    height: 88vh;
    padding: 4vh 0;
    box-sizing: border-box;
  }
}

@media all and (min-width: 45em) {
  .app-main {
    display: flex;
  }
  .app-content {
    width: 22em;
  }
}
</style>
