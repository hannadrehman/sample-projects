import React, { Component } from 'react';
import '../App.css';

import { formBValidations, generalValidations } from '../utility/validation';

class App extends Component {
  constructor(props){
    super(props);
    this.state={ //default state
      invoiceName: '',
      issueDate: '',
      repaymentDate: '',
      invoiceAmount: '0',
      showPrevbtn:false,
      showSuccess:false,
      error:{
          name:false,
          issueDate:false,
          repaymentDate:false,
          amount:false
      }
    }
    this.submitFormB = this.submitFormB.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.goBack = this.goBack.bind(this)
    
  }
      //   get values of each textbox and sets the state
  handleChange(ev){
    const {target:{dataset:{stateName},value}} = ev;
    this.setState(prevState => (
        {
            ...prevState,
            [stateName]: value
        }
    ))
  }
  goBack(){ // will go back to step1 form
    this.props.changeForm('step1');
  }
  // validates data and sets state accordingle
  submitFormB(ev){
    ev.preventDefault()
    const invoiceNameValidation = generalValidations.onlyString(this.state.invoiceName)
    const issueDateValidations = generalValidations.noFutureDate(this.state.issueDate);
    const repaymentDateValidations = formBValidations.repaymentDate(this.state.repaymentDate,this.state.issueDate);
    const listingDateValidation = generalValidations.betweenDates(this.state.issueDate,this.state.repaymentDate,this.props.formA.listingDate)
    const invoiceAmount = generalValidations.moreThan(this.state.invoiceAmount,this.props.formA.dealAmount)
    // sets state based on the validation results
    this.setState(prevState => (
      {
        ...prevState,
        error:{
          ...prevState.error,
          name:invoiceNameValidation === false,
          issueDate:(
            issueDateValidations === false || 
            listingDateValidation ===  false          
          ),
          repaymentDate:(
            repaymentDateValidations === false || 
            listingDateValidation ===  false    
          ),
          amount:invoiceAmount === false
        },
        showPrevbtn:(
          (listingDateValidation === false) || 
          (invoiceAmount === false)
        ),
        showSuccess:(
          invoiceNameValidation && 
          issueDateValidations && 
          repaymentDateValidations && 
          listingDateValidation && 
          invoiceAmount
        )
      }
    ));
    
  }

  render() {
    return (
      <div className="from2">
        <h1>Create an Invoice</h1>
        <form onSubmit={this.submitFormB}>
            <p>Invoice Name   <i>*</i>  :  
                <input
                    data-state-name="invoiceName"
                    type="text"
                    className={(this.state.error.name) ? 'error':''}
                    placeholder="Invoice name" value={this.state.invoiceName} 
                    onChange={this.handleChange}
                />
            </p>
            <p>Issue Date  <i>*</i> :  
                <input 
                    data-state-name="issueDate"
                    type="date"
                    className={(this.state.error.issueDate) ? 'error':''} 
                    placeholder="Issue date" 
                    value={this.state.issueDate} 
                    onChange={this.handleChange}
                    
                />
            </p>
            <p>Repayment Date  <i>*</i> :  
                <input 
                    data-state-name="repaymentDate"
                    type="date"
                    className={(this.state.error.repaymentDate) ? 'error':''} 
                    placeholder="Issue date" 
                    value={this.state.repaymentDate} 
                    onChange={this.handleChange}
                />
            </p>
            <p>Amount <i>*</i> :  
                <input
                    data-state-name="invoiceAmount"
                    type="number" 
                    className={(this.state.error.amount) ? 'error':''}
                    placeholder="Listing amount" 
                    value={this.state.invoiceAmount} 
                    onChange={this.handleChange}
                />
            </p>
            {
              (this.state.showPrevbtn === true)? 
              <div onClick={this.goBack} className="prev">Previous</div>
              : ''
            }
           <button className="submit" onClick={this.submitFormB}>Submit</button>
           {
              (this.state.showSuccess === true)? 
               <div className="success">Validation Complete</div>
              : ''
            }
        </form>
        
        
      </div>
    );
  }
}

export default App;
