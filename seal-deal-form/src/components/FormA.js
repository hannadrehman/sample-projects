import React, { Component } from 'react';
import '../App.css';

import { generalValidations } from '../utility/validation';

class App extends Component {
  constructor(props){
    super(props);
    // defautl states
    this.state={ 
        dealName: '',
        listingDate: '',
        dealAmount: '0',
        error:{
            name:false,
            date:false,
            amount:false
        }
    }
    this.submitFormA=this.submitFormA.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }
    //   get values of each textbox and sets it to the state
  handleChange(ev){
      const {target:{dataset:{stateName},value}} = ev;
      this.setState(prevState => (
          {
              ...prevState,
              [stateName]: value
          }
      ))
  }
//   submit form. but validate it first.
  submitFormA(ev){
    //   stop defautl action /postback
    ev.preventDefault();
    // perform validation all three fields
    const displayNameValidation = generalValidations.onlyString(this.state.dealName);
    const listingDateValidation = generalValidations.noFutureDate(this.state.listingDate);
    const dealAmountValidation = generalValidations.onlyNumbers(this.state.dealAmount);
    // set error classes for each data input
    this.setState(prevState => (
        {
            ...prevState,
            error:{
                ...prevState.error,
                name:displayNameValidation === false,
                date:listingDateValidation === false,
                amount:dealAmountValidation === false,
            }
        }
    ));
    // all fields are valid. perform navigation
    if(displayNameValidation && listingDateValidation && dealAmountValidation ){
        this.props.updateState('formA', this.state);
        this.props.changeForm('step2');
    }
   
  }
  render() {
    return (
      <div className="from1">
        <h1>Create a Deal</h1>
        <form onSubmit={this.submitFormA}>
            <p>Name   <i>*</i>  :  
                <input
                    data-state-name="dealName"
                    type="text"
                    className={(this.state.error.name) ? 'error':''}
                    placeholder="Deal name" value={this.state.dealName} 
                    onChange={this.handleChange}
                />
            </p>
            <p>Date  <i>*</i> :  
                <input 
                    data-state-name="listingDate"
                    type="date"
                    className={(this.state.error.date) ? 'error':''} 
                    placeholder="Listing date" 
                    value={this.state.listingDate} 
                    onChange={this.handleChange}
                    
                />
            </p>
            <p>Amount <i>*</i> :  
                <input
                    data-state-name="dealAmount"
                    type="number" 
                    className={(this.state.error.amount) ? 'error':''}
                    placeholder="Listing amount" 
                    value={this.state.dealAmount} 
                    onChange={this.handleChange}
                />
            </p>
            <button type="submit" className="next" onClick={this.submitFormA} >Next</button>
        </form>
      </div>
    );
  }
}

export default App;
