import { default as React, Component, } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PollList from './components/PollList';
import CreatePoll from './components/CreatePoll';
import { getAllQuestions } from './components/services/Services';
import { questions } from './Actions'
import { connect } from 'react-redux'
// import { Navbar, Nav } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {
    this.getquestionList();
  }

  //get questions(poll list)
  getquestionList() {
    getAllQuestions()
      .then(response => {
        //   if (!response.ok) {
        //     throw Error(response.statusText);
        // }
        this.store.dispatch(questions(response));
        return response
      });
  }
  

  render() {

    return (
      <div>
        <Router>
          {/* <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Poll List</Nav.Link>
                <Nav.Link href="/create">Add Question</Nav.Link>

              </Nav>
            </Navbar.Collapse>
          </Navbar> */}
          <div className="container">

            <Switch>
              <Route exact path='/'> <PollList store={this.store}
                getquestionList={this.getquestionList}
              ></PollList>
              </Route>

              <Route exact path='/create'>  <CreatePoll store={this.store}
                              getquestionList={this.getquestionList}
                              ></CreatePoll>
              </Route>

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modalType: state.modalType
});

export default connect(mapStateToProps)(App);

