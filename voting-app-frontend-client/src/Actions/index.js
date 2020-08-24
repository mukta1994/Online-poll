
export const question = (payload) =>  {
  return{
    type: 'Question',
    payload
    
  }
}

export const choices = (payload) =>  {
  return{
    type: 'Choices',
    payload
  }
}

export const status = (payload) =>  {
  return{
    type: 'Status',
    payload
  }
}

export const closeButton = (payload) =>  {
  return{
    type: 'CloseButton',
    payload
  }
}

  export const questionAndOptions = (payload) => {
    return {
      type: 'QuestionAndOptions',
      payload
    }
  }

  export const questions = (payload) => {
    return {
      type: 'Questions',
      payload
    }
  }

  export const showModal = (modalType) =>  {
    return{
      type: 'OpenModal',
      modalType
    }
  }
  
  export const hideModal = () =>  {
    return{
      type: 'HideModal'
    }
  }

