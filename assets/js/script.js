//step 2 (put at top of js document)
//Store all info in calculator class
class Calculator {
    //constructor will take all inputs for this class as well as all functions for calculator
     //we need to know where to display the current/previous text elements for calc so they go here
    constructor (previousOperandTextElement, currentOperandTextElement) {
        //setting variables for this class
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    //after updating the clear function below, we want to add it here to set the clear the inputs when create new calculator
    this.clear()
    }

    // step 3: think about all calculations calculator can perfrom: clear function, delete function, adding of a number, adding of operation, equals function
    //start defining the functions
    
    clear() {
        //step 5: need to remove all values
        //default it to an empty string
        this.currentOperand = ' '
        this.previousOperand = ' '
        //then change operation to be undefined 
        this.operation = undefined

    }
//deleting a single number
//step 19-delete button
//slice method 
//from index 0 all the way to second to last # (-1)
//this will take all characters inside of currentOperand string from very first number to second to last number and will chop off last number
//click delete and slowly remove 1 character from end with each click
    delete () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    //this will happen every single time a user clicks on a number to add to screen
    //number goes in () bc we need to specify the number that the user selected
    //step 9: update the appendNumber function
    //step 10: when user clicks on the period, it keeps adding periods but we only want 1 period to be able to be added, to check for this do if statement
    //this.currentOperand in the if statement about period is checking the current operand for a . 
    //if it includes a period then it will not add another (return)--> this stops function from executing any further and will not append to that number
    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString() //convert to a string bc JS will try to add as actual numbers. We want the numbers to be appended and not added
    }
//happens anytime a user clicks on an operation item (+, *, -, /)
//needs to take particular operation that the user selects, so that is why we put operation in the ()
//step 12: first set operation (this.operation) and = to operation passed in so that calc knows what to use when it computes the value 
//then, set previous operand = to current operand (this means we are done typing the current number)
//next clear out current operand so set it equal to empty string (this just clears out that value)
//step 14: we need to add a check in for the fact that after the previous operand is implemented, if user clicks an operand, the previous number disappears
//add if statement; the return will not let us execute further into code
//step 15: another check in: if we already have something in the previous section and something in the current, we want to do the computation 
//so call compute function and then do everything else in the code
//the compute function will update all the variables as we need
    chooseOperation (operation) {
        if (this.currentOperand === ' ')return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ' '
    }
//this will take the value inside the calculator and compute a single for what we need to display on calc
//step 17: work on compute function
//create new variable called computation. This is going to be result of compute function
//create 2 more variables 
//const prev: the actual number version of previous operand. parseFloat: converting string to a number. Repeat for current. 
//next. We dont want code to run if user doesnt enter anything and then they press = 
//if (isNan(prev) || isNan(current)) return --> cancels function completely
//switch statement (it is like a bunch of if statements chained after each other but allow to do if statements on 1 object)
//define statement by keyword "case" then out what this.operation should equal
    compute() {
        let computation 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':  //all the code below will execute when this.Operation = a "+"
                computation = prev + current
                    break //this means to not follow any of the other case statements and to just leave from switch statement completely
            case '-': 
                computation = prev - current
                    break
            case '*': 
                computation = prev * current
                    break
            case '÷': 
                computation = prev / current
                    break
            //else statement defined as a default. Any time none of those values get executed then the default gets executed
            default: 
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString() //split string to decimal number inside it 
        const integerDigits = parseFloat(stringNumber.split('.')[0]) //get integer numbers; this will take our string and turn it into an array. first in array is before ., the next is after . ; 0 bc we want integer value before that
        const decimalDigits = stringNumber.split('.')[1] //using 1 to get numbers after decimal place
        //get integers to display separately
        let integerDisplay 
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

//function that allows us to update the values inside of our output
//step 13: adding previous operand text
//step 21- add if statement 
//step 22- commas as number gets larger; create a helper function 

    updateDisplay () {
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber (this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` //make concatenation of both previous operand and operation. Not this is a string that has operation appended to end of it
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

//step 4- think of all the values our calc needs to store: need previous operand user entered, current operand, and operation they selected (if any)

//step 1 
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allClear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


//step 6: Now we know all different things calc can do (defined by the functions) 
//and all diff variables it can hold, hook up all the different variables from query selector section to make them operate on our calc object 
//first thing need to do is create a calculator

//step 7: create a calculator 

//set equal to new calc (which is how to define classes. You put "new" and then the new class name). Pass everything from constructor into it
//in this case, pass previous and current operand in the ()
//now that previous and current are passed in, calc object can be used
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//step 8:
//to first use the calc, select numberButtons 
//forEach: go over all buttons. For each, add event listener that is listening for clicks on the buttons
//take calculator and add number so use appendNumber and whatever is inside that button (example: 1,2,3,4 etc.)
//then, call calc update display so the display values will be constantly updated everytime we click on a button

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

//step 11: copy the numberButtons and do exact same for operation buttons 
//instead of appendNumber, use chooseOperation
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

//step 16: already finished with how everything needs to display, so now need to work on computing 
//start with equals button and add event listener
//call compute function to try to get computed value
//then it will update to the display

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
}
)

//step 18: clear all

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
}
)

//step 20: delete button. Copy All clear

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
}
)

//step 21- add UI: go to display and update how you'd like for things to be displayed 