import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { connect } from 'react-redux'
import { createQuestion } from './services/Services';
import { hideModal, choices, question} from '../Actions'

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;

  }

  componentDidMount() {
    this.props.getquestionList();
  }

  //validate form data check whether question is empty and atleast 2 choices should be filled
  validatedata = () => {
    let flag = 0
    if ((this.store.getState().question != "") && (this.store.getState().choices.length >= 2)) {
      this.store.getState().choices.forEach(element => {
        if (element.name != "") {
          flag++
        }
      });
      if (flag >= 2)
        return true
      else
        return false
    }
    return false
  }

  handleQuestionChange = (evt) => {
    this.store.dispatch(question(evt.target.value));
  };

  handleChoiceChange = (idx, evt) => {
    const newChoices = this.store.getState().choices.map((choice, sidx) => {
      if (idx !== sidx) return choice;
      return { ...choice, name: evt.target.value };
    });
    this.store.dispatch(choices(newChoices));
  };

  handleAddChoice = () => {
    this.store.dispatch(choices(this.store.getState().choices.concat([{ name: "" }])));
  };

  handleRemoveChoice = (idx) => {
    this.store.dispatch(
      choices(this.store.getState().choices.filter((s, sidx) => idx !== sidx)));
  };

  insertQuestion = (data) => {
    createQuestion(data)
    .then(response => {
      if(response.success=='ok'){
        alert('Question inserted')
        console.log('Question inserted');
        this.props.getquestionList();
      }
      else{
       alert("some error while inserting")
      }
      this.props.getquestionList();
      this.store.dispatch(choices(([{ name: "" }])));
      this.store.dispatch(question(""));
             return response

      });
     
      }
  

  render() {
    return (
      <div>
        <div className="row">
        </div>
        <form onSubmit={() => this.insertQuestion(this.store.getState())}>
          <Link to="/"> <button type="button" className="close-open">Poll List</button>
          </Link>
          <div className="create">
            <input
              type="text"
              placeholder="Enter Question"
              value={this.store.getState().question}
              onChange={(e) => this.handleQuestionChange(e)}
            />

            <h4>Choices</h4>

            {this.store.getState().choices.map((choice, idx) => (

              <div className="choice" key={`#${idx + 1}`}>
                <input
                  type="text"
                  placeholder={`Choice #${idx + 1}`}
                  key={`Choice #${idx + 1}`}
                  value={choice.name}
                  onChange={(e) => this.handleChoiceChange(idx, e)}
                />
                <button
                  type="button"
                  onClick={() => this.handleRemoveChoice(idx)}
                  className="small"
                >
                  -
            </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => this.handleAddChoice()}
              className="small"
            >
              Add Choice
        </button>
         <button type="button" className="small" onClick={() => this.insertQuestion(this.store.getState())} disabled={!this.validatedata()} style={{ width: "100%" }}><Link to="/">Add Question</Link></button>        
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modalType: state.modalType,
  choices: state.choices,
  question: state.question
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    question: () => dispatch(question(ownProps)),
    choices: () => dispatch(choices(ownProps)),
      hideModal:()=>dispatch(hideModal())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreatePoll);





