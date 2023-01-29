export default function ALU() {
    this.body = `<div class="alu"> ALU </div>`
    this.steps = []
    this.currStep = 0
    this.iteration = 0
    this.carryOut = '0'
    this.stepFunc = (product, multiplicand, carryOut) => {
        if(this.iteration < multiplicand.length/2){
            let returnVal = undefined
            
            if(this.currStep != 1){
                returnVal = this.steps[this.currStep](product, multiplicand)
                if(this.currStep == 0){
                    this.carryOut = carryOut
                }
            }

            if(this.currStep == 1 && this.carryOut == '1'){
                returnVal = this.steps[this.currStep](product, multiplicand)
                //console.log("Added multiplicand to product")
            } else if(this.currStep == 1 && this.carryOut == '0'){
                //console.log("Multiplicand and product addition failed because of the multiplier carryout bit being 1")
            } else if(this.currStep == 0){
                this.iteration++
                //console.log("Shitfed multiplier to the right")
            }else {
                //console.log("Shifted multiplicand to the left")    
            }

            this.currStep++
            this.currStep %= this.steps.length

            if(returnVal !== undefined) {
                return returnVal
            }
        }else{
            //console.log("This computation has concluded kindly sod off")
        }
    }
}