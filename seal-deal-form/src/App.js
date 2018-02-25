import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import FormA from './components/FormA';
import FormB from './components/FormB';
import Rules from './components/Rules';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      selected: 'step1', //current form selected
      formA:{}, // meta for form A in step1
      formB:{} // meta form formB in step2
    }
    this.handleFormValueChange=this.handleFormValueChange.bind(this);
    this.changeForm=this.changeForm.bind(this);
  }
  changeForm(type){
    // change form based on input
    this.setState(prevState => (
      {
        ...prevState,
        selected: type
      }
    ))
  }
// sets value of from in the state
  handleFormValueChange(type,data){
    this.setState(prevState => (
      {
        ...prevState,
        [type]: data
      }
    ))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Seal the Deal</h1>
        </header>
        <article className="app-form-container">
          {/* tabs */}
          <section className="tabs">
            <span 
              className={`step ${(this.state.selected === 'step1') ? 'active' : ''}`} 
              data-tab-type="step1" 
            >
              Step 1
            </span>
            <span 
              className={`step ${(this.state.selected === 'step2') ? 'active' : ''}`}
              data-tab-type="step2"
            >
              Step 2
            </span>
          </section>
            {/* forms */}
            <section className="forms">
              <div className={`step-from ${(this.state.selected === 'step1') ? 'active' : ''}`} >
                <FormA updateState={this.handleFormValueChange} changeForm={this.changeForm} />
              </div>
              <div className={`step-from ${(this.state.selected === 'step2') ? 'active' : ''}`} >
                <FormB updateState={this.handleFormValueChange} changeForm={this.changeForm} formA={this.state.formA} />
              </div>
            </section>
            {/* validation rules */}
            <section>
              <Rules type={this.state.selected} />
             </section>

        </article>
        
      </div>
    );
  }
}

export default App;
