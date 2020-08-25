import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { getChoicesService, sendVoteService, changeStatusService } from './services/Services';
import { showModal, hideModal, questionAndOptions, closeButton, questions } from '../Actions'


class PollList extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
    }

    componentDidMount() {
        this.props.getquestionList();
    }
    openmodal = (modalType) => {
        this.store.dispatch(showModal(modalType));
    }

    closemodal = () => {
        this.store.dispatch(hideModal());
        this.props.getquestionList();
    }

    //calculate percentage while displaying vote count
    calculate_percentage = (vote_count, choices) => {
        let total_count = 0;
        choices.forEach(element => {
            total_count = total_count + element.vote_count;
        });

        let percentage = 0;
        percentage = (vote_count / total_count) * 100;
        return {
            width: (percentage).toFixed(2) + '%'
        }
    }

    getChoices = (item, showpopup, status) => {
        getChoicesService(item.question_id)
            .then(response => {
                //   if (!response.ok) {
                //     throw Error(response.statusText);
                // }
                var mydata = { question: item, questionChoices: response }
                this.store.dispatch(questionAndOptions(mydata));
                console.log(this.store.getState().questionAndOptions, "questionsans")
                if (showpopup == 'show_poll')
                    this.openmodal(showpopup)
                if (showpopup == 'poll_count')
                    this.openmodal(showpopup)
                if (status == 'close')
                    this.store.dispatch(closeButton('Close Poll'));
                else
                    this.store.dispatch(closeButton('Close'));
            });

    }

    //close question(change status of question)
    closeQuestion = (item) => {
        if (this.store.getState().closeButton == 'Close Poll') {
            item.status = 'close'
            changeStatusService(item)
                .then(response => {
                    // if (!response.ok) {
                    //   throw Error(response.statusText);
                    // }
                    this.store.dispatch(hideModal());
                    this.props.getquestionList();
                    return response;
                });
        }
        else
            this.props.getquestionList();

        this.store.dispatch(hideModal());

    }

    //when choice is selected increase vote count.
    sendVote = (question, choice_id) => {
        var data = { choice_id: choice_id }
        sendVoteService(data)
            .then(response => {
                //   if (!response.ok) {
                //     throw Error(response.statusText);
                // }
                console.log(response, "data")
                this.getChoices(question, 'poll_count', 'open')
                this.closemodal()
                //return response;        
            });
    }


    render() {
        const QuestionAndOptionList = this.store.getState().questionAndOptions;
        const myArr = this.store.getState().questions;
        console.log(QuestionAndOptionList)

        const myArrCreatedFromMap = myArr.map((item, i) => (
            <div className="row col-md-12">
                <div className="show-data col-xs-12 col-sm-8 col-md-7" key={i}>{item.question}</div>
                <button type="button" disabled={item.status == 'close'} onClick={() => this.getChoices(item, 'show_poll', 'open')} className="close-open">Open
        </button> <button type="button" disabled={item.status == 'close'} onClick={() => this.getChoices(item, 'poll_count', 'close')} className="close-open">Close
        </button>
            </div>));//`.map()` creates/returns a new array from calling a function on every element in the array it's called on

        let PopUp = "";
        let PopUpVote = "";
        if (this.store.getState().modalType == 'show_poll') {
            PopUp = <Modal visible={this.store.getState().open} width="50%" min-height="30%" effect="fadeInUp" onClickAway={() => this.closemodal()}>
                <div className="Popup-box">
                    <h4>{QuestionAndOptionList.question.question}</h4>
                    <p>Select your option</p>

                    {this.store.getState().questionAndOptions.questionChoices.map((choice, idx) => (
                        <div onClick={(e) => this.sendVote(QuestionAndOptionList.question, choice.choice_id)} className="choice col-md-12" key={`#${idx + 1}`}>
                            <div className="show-data hover-data" onClick={() => this.closemodal()}>{choice.choice}</div>
                        </div>

                    ))}
                </div>
            </Modal>
        }
        if (this.store.getState().modalType == 'poll_count') {
            PopUpVote = <Modal className="Popup-box" visible={this.store.getState().open} width="50%" min-height="30%" effect="fadeInUp" onClickAway={() => this.closemodal()}>
                <div className="Popup-box">

                    <h4>{this.store.getState().questionAndOptions.question.question}</h4>

                    {this.store.getState().questionAndOptions.questionChoices.map((choice, idx) => (
                        <div className="choice-item">
                            <div className="choice col-md-12" key={`#${idx + 1}`}>
                                <div className="choice col-md-11">{choice.choice}({this.calculate_percentage(choice.vote_count, QuestionAndOptionList.questionChoices).width})</div>
                                <div className="choice col-md-1">{choice.vote_count}</div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={this.calculate_percentage(choice.vote_count, QuestionAndOptionList.questionChoices)}>
                                    <span className="sr-only"></span>
                                </div>
                            </div>

                        </div>

                    ))}
                    <button type="button" onClick={() => this.closeQuestion(QuestionAndOptionList.question)} className="small">
                        {this.store.getState().closeButton}
                    </button>
                </div>
            </Modal>
        }
        return (
            <div className="choices">
                <Link to="/create"> <button type="button" className="close-open">Add Question</button>
                </Link>

                <h2>Questions</h2>
                <div>
                    {myArrCreatedFromMap}
                    {PopUp}
                    {PopUpVote}
                </div>


            </div>
        )
    }
}

const mapStateToProps = state => ({
    modalType: state.modalType,
    questionAndOptions: state.questionAndOptions,
    questions: state.questions,
    closeButton: state.closeButton
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        questionAndOptions: () => dispatch(questionAndOptions(ownProps)),
        showModal: () => dispatch(showModal(ownProps)),
        hideModal: () => dispatch(hideModal()),
        questions: () => dispatch(questions(ownProps))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PollList);

