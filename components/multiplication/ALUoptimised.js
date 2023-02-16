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
                returnValue[1] = this.iteration + ":" + this.currStep + " Multiplicand dodat na prvu polovinu Product/Multiplier komponente", returnValue[0]
                this.undoStack.push(['productandmultiplier', productandmultiplier])
            }else if(this.currStep == 1){
                this.steps[this.currStep]()
                returnValue[1] = this.iteration + ":" + this.currStep + " Product/Multiplier komponenta se pomera desno"
                this.iteration++
                this.undoStack.push(['productandmultiplier', productandmultiplier])
            }else{
                returnValue[1] = this.iteration + ":" + this.currStep + " Jer je LSB Product/Multiplier komponente '0' sabiranje se neće izvršiti."
                this.undoStack.push(['productandmultiplier', productandmultiplier])
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