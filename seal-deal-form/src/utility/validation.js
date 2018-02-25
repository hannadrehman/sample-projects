// this module will have all the validation rules.

export const generalValidations = {
    onlyString(input){ //will return true if is a valid string with no numbers and special chars
        try{
            const validRegex = new RegExp(/^[a-zA-Z]+$/)
            if(!input)
                return false;
            
            if(!validRegex.test(input)) 
                return false;
    
            return true;
        }   
        catch(e){
            throw e
        } 
    },
    onlyNumbers(input){ // will return true if only is number > 0
        try{
           const val = parseFloat(input,10);
            if(val <= 0)
                return false
            return true;
        }
        catch(e){
            return false
        }
    },
    noFutureDate(input){ // will return true if date provided is past date
        try{
            if(!input)
                return false
            const date =  new Date(input);
            const now = new Date(formDateWthoutTime(new Date().toLocaleDateString()));
            
            if(date>now)
                return false

            return true 
        }
        catch(e){
            throw e;
        }
    },
    noPastDate(input){ //will return true if date provided is future date only
        try{
            if(!input)
                return false
            const date =  new Date(input);
            const now = new Date(formDateWthoutTime(new Date().toLocaleDateString()));
            
            if(date<now)
                return false

            return true 
        }
        catch(e){
            throw e;;
        }
    },
    notLessThanOrEqualDate(input,compareWith){ // will return false if date is less than or equal to given date
        try{
            if(!input)
                return false

            const date =  new Date(input);
            const compareWithDate = new Date(compareWith);
            
            if(date<=compareWithDate)
                return false

            return true 
        }
        catch(e){
            throw e;;
        }
    },
    betweenDates(date1,date2,betweenDate){ // will return true if 3rd param is between dates provided
        if(!date1 && !date2 && !betweenDate)
            return false
        
        const d1 = new Date(date1);
        const d2 = new Date(date2);   
        const d3 = new Date(betweenDate);
        
        if(d3 >= d1 && d3 <= d2 )
            return true
        return false    
           
    },
    moreThan(num1,num2){ // will return true if num1 is > num2
        try{
            const n = parseFloat(num1,10);
            const m = parseFloat(num2,10);

            if(n<m)
                return false
            return true    
            
        }
        catch(e){
            return false
        }
    }
}
export const formBValidations={
    repaymentDate(input,compareWithDate){ // validates repayment date based on given condition
        if(!input)
            return false;

        if(!generalValidations.noPastDate(input)) // should not be past date
            return false;
        
        if(!generalValidations.notLessThanOrEqualDate(input,compareWithDate)) // should not be less than or equal to compare date
            return false;

        return true;
           
    }
}

function formDateWthoutTime(input){ // format localtime string to valid time tring that can be given in Date() constructor
    const split = input.split('/');
    return `${split[2]}-${split[1]}-${split[0]}`
}