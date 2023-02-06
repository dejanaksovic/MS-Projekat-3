import formatMiddleware from "../../middleware/formatMiddleware.js"

export default function ALUoptimisedDivision() {
    this.body = `<div class="alu"> ALU </div>`
    this.steps = []
    this.currStep = 0
    this.iteration = 0
    this.replaceLSB = '0'
    this.formater = new formatMiddleware()
    this.stepFunc = (remandquot, divisor) => {
        
        let returnValue = undefined

        if(this.iteration < divisor.length){
            if(this.currStep == 0){
                this.steps[this.currStep]()
                //console.log("Remainder/Quotient shifts left.")
            }else{
                const remainder = remandquot.slice(0, remandquot.length/2)
                const quotient = remandquot.slice(remandquot.length/2)
                let rem = this.steps[this.currStep](remainder, divisor)
                if(rem < 0){
                    this.replaceLSB = '0'
                    rem = this.formater.binToDec(remainder)
                    //console.log("Because the difference between remainder and divisor is negative, Remainder/Quotient stays the same.")
                }else{
                    this.replaceLSB = '1'
                    //console.log("Remainder has changed. The least significant bit of the Quotient is turned into 1.")
                }
                returnValue = this.formater.decToBin(rem)
                while(returnValue.length < remainder.length){
                    returnValue = '0' + returnValue
                }
                returnValue = returnValue + quotient
                returnValue = returnValue.slice(0, -1) + this.replaceLSB
                this.iteration++
            }
        }else{
            //console.log("This computation has concluded kindly sod off.")
        }
        
        this.currStep++
        this.currStep %= this.steps.length

        if(returnValue !== undefined){
            return returnValue
        }
    }
}