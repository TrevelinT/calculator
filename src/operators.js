export const add = (lastOperation) => {
  if(!lastOperation) throw new Error('The first calculator operation can\'t be an operator')
  return {
    type: 'operation',
    payload: '+'
  }
}

export const subtract = (lastOperation) => {
  if(!lastOperation) throw new Error('The first calculator operation can\'t be an operator')
  return {
    type: 'operation',
    payload: '-'
  }
}

export const divide = (lastOperation) => {
  if(!lastOperation) throw new Error('The first calculator operation can\'t be an operator')
  return {
    type: 'operation',
    payload: '/'
  }
}

export const multiply = (lastOperation) => {
  if(!lastOperation) throw new Error('The first calculator operation can\'t be an operator')
  return {
    type: 'operation',
    payload: '*'
  }
}

export const percent = (lastOperation) => {
  if(!lastOperation) throw new Error('The first calculator operation can\'t be an operator')
  return [
    {
      type: 'operation',
      payload: '/'
    },
    {
      type: 'number',
      payload: '1'
    },
    {
      type: 'number',
      payload: '0'
    },
    {
      type: 'number',
      payload: '0'
    }
  ]
}

export const number = (lastOperation, payload) => ({
  type: 'number',
  payload: payload
})

export const operator = (lastOperation, payload) => {
  let operator = {
    type: 'operator',
    payload: payload
  }

  if((!lastOperation || lastOperation.type === 'operation') && payload.trim() === '.') {
    return [
      {
        type: 'number',
        payload: '0'
      },
      operator
    ]
  } else {
    return operator
  }
}
