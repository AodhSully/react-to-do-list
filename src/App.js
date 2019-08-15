import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import ToDos from './components/ToDos';
import './App.css';
import Header from './components/Layout/Header'
import AddToDo from './components/addTodo'
// import uuid from 'uuid';
import About from './components/Pages/About'
import axios from 'axios'



class App extends Component {
  state ={
    todos: [

      // {
      //   id: uuid.v4(),
      //   title: 'clean kitchen',
      //   completed: false
      // },
      // {
      //   id: uuid.v4(),
      //   title: 'dinner',
      //   completed: true
      // },
      // {
      //   id: uuid.v4(),
      //   title: 'wash up',
      //   completed: false
      // }
    ]
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({ todos: res.data}))
  }

  //toggle complete
  markComplete = (id) => {
    this.setState({
    todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
    console.log(id)
  }

  //Delete ToDoItem
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }))

  };

  //Add ToDo:
  addToDo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
    title,
    completed: false
  })
  .then(res => this.setState({ todos: [...this.state.todos, res.data]}));

  }



  render() {
    return (
      <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <AddToDo addToDo={this.addToDo} />
              <ToDos todos={this.state.todos}
                markComplete={this.markComplete}
                delTodo={this.delTodo}
                />

            </React.Fragment>

            )}  />
          <Route path="/about" component={About} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
