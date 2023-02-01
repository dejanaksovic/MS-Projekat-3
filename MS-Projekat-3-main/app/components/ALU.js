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
            }
            
            if(this.currStep == 0){
                this.iteration++
            }
            this.currStep++
            this.currStep %= this.steps.length

            if(returnVal !== undefined) {
                return returnVal
            }
        }else{
            console.log("This computation has concluded kindly sod off")
        }
    }
    this.render = () => {
        this.body = `<div class='alu'>ALU</div>`
        return this.body
    }
}