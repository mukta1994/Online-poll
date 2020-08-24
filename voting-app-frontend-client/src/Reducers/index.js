// import ActionTypes from '../Constants/ActionTypes'

const initialState = {
  question: "",
  choices: [{ name: "" }],
  vuejs: 0,
  open: false,
  modalType: 0,
  questions: [],
  questionAndOptions: {
    questionChoices: [],
    question: {}
  },
  status:'open',
  closeButton:'Close'
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'Question':
      console.log(action.payload)
      return Object.assign({}, state, {
        question: action.payload
      })
    case 'Choices':
      return Object.assign({}, state, {
        choices: action.payload
      })
      case 'Status':
        return Object.assign({}, state, {
          status: action.payload
        })
    case 'QuestionAndOptions':
      return Object.assign({}, state, {
        questionAndOptions: action.payload
      })
    case 'Questions':
      console.log("Your choice is Vue.js")
      return Object.assign({}, state, {
        questions: action.payload
      })
    case 'OpenModal':
      return Object.assign({}, state, {
        open: true,
        modalType: action.modalType
      })
      case 'CloseButton':
      console.log(action.payload)
      return Object.assign({}, state, {
        closeButton: action.payload
      })
    case 'HideModal':
      return initialState

    default:
      return state
  }
}