import formatMiddleware from "../../middleware/formatMiddleware.js"

export default function ALUoptimisedDivision() {
    this.body = `<div class="alu"> ALU </div>`
    this.undoStack = []
    this.steps = []
    this.currStep = 0
    this.iteration = 0
    this.replaceLSB = '0'
    this.formater = new formatMiddleware()
    this.stepFunc = (remandquot, divisor) => {
        
        let returnValue = []

        if(this.iteration < divisor.length){
            if(this.currStep == 0){
                this.steps[this.currStep]()
                returnValue[1] = "Ostatak/Količnik se pomera levo."
                this.undoStack.push(['remandquot', remandquot])
            }else{
                const remainder = remandquot.slice(0, remandquot.length/2)
                const quotient = remandquot.slice(remandquot.length/2)
                let rem = this.steps[this.currStep](remainder, divisor)
                if(rem < 0){
                    this.replaceLSB = '0'
                    rem = this.formater.binToDec(remainder)
                    returnValue[1] = "Jer je razlika ostatka i delioca negativna, Ostatak/Količnik ostaje nepromenjen."
                }else{
                    this.replaceLSB = '1'
                    returnValue[1] = "Ostatak je promenjen na novu vrednost. LSB Količnika je postavljen na 1."
                }
                returnValue[0] = this.formater.decToBin(rem)
                while(returnValue[0].length < remainder.length){
                    returnValue[0] = '0' + returnValue[0]
                }
                returnValue[0] = returnValue[0] + quotient
                returnValue[0] = returnValue[0].slice(0, -1) + this.replaceLSB
                this.iteration++
                this.undoStack.push(['remandquot', remandquot])
        
                this.currStep++
                this.currStep %= this.steps.length
            }
        }else{
            console.log("This computation has concluded kindly sod off.")
        }

        return returnValue
    }
    this.undo = () => {
        if (this.undoStack.length != 0) {
            if(this.currStep == 0){
                this.iteration--
            }

            this.currStep--

            if (this.currStep < 0){
                this.currStep = 1
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

// // Order of steps for optimised division
//ALUoptimisedDivisionLocal.steps.push(remandquotLocal.shiftL)
//ALUoptimisedDivisionLocal.steps.push(formaterLocal.subBinDec)


// // paste this in app.js and rename what you must <---------------------------------------------------------
//undoButton.addEventListener("click", e => {
//const prevState = alu.undo()
//if(prevState) {
//        switch(prevState[0]) {
//            case "remandquot":
//                remandquot.setValue(prevState[1])
//                break;
//            default:
//                console.log("Someting went oh so terribly wrong....")
//        }
//    }
//})