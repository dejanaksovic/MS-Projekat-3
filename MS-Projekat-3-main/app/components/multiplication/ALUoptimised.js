export default function ALUoptimised() {
    this.body = `<div class="alu"> ALU </div>`
    this.steps = []
    this.currStep = 0
    this.iteration = 0
    this.carryOut = '0'
    this.stepFunc = (productandmultiplier, multiplicand) => {
        
        let returnValue = undefined

        if(this.iteration < multiplicand.length){
            const carryOut = productandmultiplier.slice(-1)
            const product = productandmultiplier.slice(0, productandmultiplier.length/2)
            const multiplier = productandmultiplier.slice(productandmultiplier.length/2)

            if(carryOut == '1' && this.currStep == 0){
                returnValue = this.steps[this.currStep](product, multiplicand)
                while(returnValue.length < 8){
                    returnValue = '0' + returnValue
                }
                returnValue = returnValue + multiplier
                //console.log("Added to product", returnValue)
            }else if(this.currStep == 1){
                this.steps[this.currStep]()
                //console.log("Multiplier shift right")
                this.iteration++
            }else{
                //console.log("Because LSB of prod/mul is 0 addition will not happen")
            }
        }else{
            //console.log("This computation has concluded kindly sod off")
        }
        

        this.currStep++
        this.currStep %= this.steps.length

        if(returnValue !== undefined){
            return returnValue
        }
    }
}