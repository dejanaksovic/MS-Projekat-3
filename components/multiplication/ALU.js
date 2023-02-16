export default function ALU() {
    this.steps = []
    this.undoStack = []
    this.currStep = 0
    this.iteration = 0
    this.carryOut = '0'

    this.stepFunc = (product, multiplicand, multiplier) => {
        let returnVal = []

        if (this.iteration < multiplier.length) {
            if (this.currStep != 1) {
                if (this.currStep == 0) {
                    returnVal[1] = this.iteration + ":" + this.currStep + " Multiplier pomeren u desno."
                    this.undoStack.push(['multiplier', multiplier])
                } else {
                    returnVal[1] = this.iteration + ":" + this.currStep + " Multiplicand pomeren u levo."
                    this.iteration++
                    this.undoStack.push(['multiplicand', multiplicand])
                }
                this.steps[this.currStep]()
                if (this.currStep == 0) {
                    this.carryOut = multiplier.slice(-1)
                }
            } else {
                this.undoStack.push(['product', product])
            }

            if (this.currStep == 1 && this.carryOut == '1') {
                returnVal[0] = this.steps[this.currStep](product, multiplicand)
                while(returnVal[0].length != multiplicand.length){
                    returnVal[0] = '0' + returnVal[0]
                }
                returnVal[1] = this.iteration + ":" + this.currStep + " Multiplicand je dodat na Product."
            } else if (this.currStep == 1 && this.carryOut == '0') {
                returnVal[1] = this.iteration + ":" + this.currStep + " Sabiranje Multiplicand i Product komponenti nije omogućeno jer je izneti bit Multiplier komponente '0'."
            }

            this.currStep++
            this.currStep %= this.steps.length
            
        } else {
            console.log("This computation has concluded kindly sod off")
        }

        return returnVal
    }
    this.undo = () => {
        if (this.undoStack.length != 0) {
            if(this.currStep == 0){
                this.iteration--
            }

            this.currStep--

            if (this.currStep < 0){
                this.currStep = 2
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