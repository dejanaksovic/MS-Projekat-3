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
                    returnValue[1] = this.iteration + ":" + this.currStep + " Jer je razlika Remainder i Divisor komponente negativna, Remainder ostaje isti."
                }else{
                    this.carryIn = '1'
                    returnValue[1] = this.iteration + ":" + this.currStep + " Remainder se promenio na novu vrednost."
                }
                returnValue[0] = Extender(formater.decToBin(rem), remainder.length)
                while(returnValue[0].length < remainder.length){
                    returnValue[0] = '0' + returnValue[0]
                }
                this.undoStack.push(['remainder', remainder])
            }else if(this.currStep == 1){
                this.steps[this.currStep](this.carryIn)
                if(this.carryIn == '1'){
                    returnValue[1] = this.iteration + ":" + this.currStep + " Quotient se pomera levo, uneseni bit je '1' jer je razlika Remainder i Divisor nenegativan broj."
                }else{
                    returnValue[1] = this.iteration + ":" + this.currStep + " Quotient se pomera levo, uneseni bit je '0' jer je razlika Remainder i Divisor negativan broj."
                }
                this.undoStack.push(['quotient', quotient])
            }else if(this.currStep == 2){
                returnValue[1] = this.iteration + ":" + this.currStep + " Divisor se pomera desno."
                this.steps[this.currStep]()
                this.iteration++
                
                this.undoStack.push(['divisor', divisor])
            }
            
            this.currStep++
            this.currStep %= this.steps.length

        }else{
            console.log("This computation has concluded kindly sod off")
        }
        
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