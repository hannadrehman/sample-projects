import React from 'react'

const Rules = ({type})=>(
    <ul className="rule-set">
        {
            (type === 'step1') ?
                [
                <li key="0"><b>1. Deal Name</b> Should not allow numerics and special characters</li>,
                <li key="1"><b>2. Listing date</b> cannot be future date</li>,
                <li key="2"><b>3. Deal Amount</b> Should be a Valid number > 0</li>,
                ]
            :
            [
                <li key="0"><b>1. Invoice Name</b> Should not allow numerics and special characters</li>,
                <li key="1"><b>2. Issued Date</b> cIssued date cannot be future date</li>,
                <li key="2"><b>3. Repayment Date</b> cannot be past date</li>,
                <li key="3"><b>4. Repayment Date</b> cannot be before or on Issued Date</li>,
                <li key="4"> <b>5. </b>If Listing Date in Step 1 is not between
                Issued Date and Repayment Date, User
                should have option to go back to Step 1 and
                change Listing date. Once user clicks on
                submit of Step 1, entered values of Issued
                Date and Repayment Date before going to
                Step 1 should still be present</li>,
                <li key="5"><b>4. Invoice Amount</b> Should be more than Deal Amount mentioned in Step 1</li>,
                <li key="6"><b>5. </b> In case where Invoice Amount needs to be
                less, User should have option to go back and
                change Deal Amount. Once Deal amount is
                changed in Step 1 and user clicks on Submit
                of Step 1, Step 2 should show previously
                entered amount in Invoice Amount Field.</li>
            ]    
        }   
    </ul>
)

export default Rules;