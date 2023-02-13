import Formater from "../../middleware/formatMiddleware.js"
import Extender from "../../middleware/bitBaseExtentionMiddleware.js"

const formater = new Formater()


export default function ALUdivision() {
    this.body = `<div class="alu"> ALU </div>`
    this.undoStack = []
    this.steps = []
    this.currStep = 0
    this.iteration = 0
    this.carryIn = '0'
    this.stepFunc = (remainder, divisor, quotient) => {
        
        let returnValue = []

        if(this.iteration < quotient.length + 1){
            if(this.currStep == 0){
                let rem = this.steps[this.currStep](remainder, divisor)
                if(rem < 0){
                    this.carryIn = '0'
                    rem = formater.binToDec(remainder)
                    returnValue[1] = "Because the difference between Remainder and Divisor is negative, Remainder stays the same."
                }else{
                    this.carryIn = '1'
                    returnValue[1] = "The Remainder has changed."
                }
                returnValue[0] = Extender(formater.decToBin(rem), remainder.length)
                while(returnValue[0].length < remainder.length){
                    returnValue[0] = '0' + returnValue[0]
                }
                this.undoStack.push(['remainder', remainder])
            }else if(this.currStep == 1){
                this.steps[this.currStep](this.carryIn)
                if(this.carryIn == '1'){
                    returnValue[1] = "Quotinet shifts to the left, the new bit is '1' because the difference between Remainder and Divisor is a non-negative number."
                }else{
                    returnValue[1] = "Quotinet shifts to the left, the new bit is '0' because the difference between Remainder and Divisor is a negative number."
                }
                console.log('old quotient', quotient)
                this.undoStack.push(['quotient', quotient])
            }else if(this.currStep == 2){
                this.steps[this.currStep]()
                this.iteration++
                returnValue[1] = "Divisor shifts to the right."
                this.undoStack.push(['divisor', divisor])
            }
            
        }else{
            console.log("This computation has concluded kindly sod off")
        }
        
        this.currStep++
        this.currStep %= this.steps.length

        return returnValue
    }
    this.undo = () => {
        if (this.undoStack.length != 0) {
            if (this.currStep == 0) {
                this.iteration--
                this.currStep = 2
            } else {
                this.currStep--
            }
            return this.undoStack.pop()
        } else {
            console.log("You have undone all your vile work")
        }
    }
    this.render = () => {
        return this.body
    }
}