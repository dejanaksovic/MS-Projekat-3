export default function ALUoptimised() {
    this.undoStack = []
    this.steps = []
    this.currStep = 0
    this.iteration = 0
    this.carryOut = '0'
    this.stepFunc = (productandmultiplier, multiplicand) => {
        
        let returnValue = []

        if(this.iteration < multiplicand.length){
            const carryOut = productandmultiplier.slice(-1)
            const product = productandmultiplier.slice(0, productandmultiplier.length/2)
            const multiplier = productandmultiplier.slice(productandmultiplier.length/2)

            if(carryOut == '1' && this.currStep == 0){
                returnValue[0] = this.steps[this.currStep](product, multiplicand)
                while(returnValue[0].length < productandmultiplier.length/2){
                    returnValue[0] = '0' + returnValue[0]
                }
                returnValue[0] = returnValue[0] + multiplier
                returnValue[1] = "Added to product", returnValue[0]
                this.undoStack.push(['productandmultiplier', productandmultiplier])
            }else if(this.currStep == 1){
                this.steps[this.currStep]()
                returnValue[1] = "Multiplier shift right"
                this.iteration++
                this.undoStack.push(['productandmultiplier', productandmultiplier])
            }else{
                returnValue[1] = "Because LSB of prod/mul is 0 addition will not happen"
            }
        }else{
            returnValue[1] = "This computation has concluded kindly sod off"
        }
        

        this.currStep++
        this.currStep %= this.steps.length

        if(returnValue !== undefined){
            return returnValue
        }
    }
    this.undo = () => {
        if (this.undoStack.length != 0) {
            if (this.currStep == 0) {
                this.iteration--
                this.currStep = 1
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

// // Order of steps for optimised multiplication
//ALUoptimisedLocal.steps.push(formaterLocal.addBin)
//ALUoptimisedLocal.steps.push(productandmultiplierLocal.shiftR)



// // paste this in app.js and rename what you must <---------------------------------------------------------
//undoButton.addEventListener("click", e => {
//const prevState = alu.undo()
//if(prevState) {
//        switch(prevState[0]) {
//            case "productandmultiplier":
//                productandmultiplier.setValue(prevState[1])
//                break;
//            default:
//                console.log("Someting went oh so terribly wrong....")
//        }
//    }
//})