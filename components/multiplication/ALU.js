export default function ALU() {
    this.steps = []
    this.undoStack = []
    this.currStep = 0
    this.iteration = 0
    this.carryOut = '0'

    this.stepFunc = (product, multiplicand, multiplier) => {
        if (this.iteration < multiplicand.length / 2) {
            let returnVal = []

            if (this.currStep != 1) {
                if (this.currStep == 0) {
                    this.undoStack.push(['multiplier', multiplier])
                } else {
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
                returnVal[1] = "Množenik je dodat na Proizvod", this.undoStack[this.undoStack.length - 1][1]
            } else if (this.currStep == 1 && this.carryOut == '0') {
                returnVal[1] = "Sabiranje Množenika i Proizvoda nije omogućeno jer je izneti bit Množitelja '0'."
            } else if (this.currStep == 0) {
                this.iteration++
                returnVal[1] = "Množitelj je pomeren u desno.", this.undoStack[this.undoStack.length - 1][1]
            } else {
                returnVal[1] = "Shifted multiplicand to the left", this.undoStack[this.undoStack.length - 1][1]
            }

            this.currStep++
            this.currStep %= this.steps.length

            return returnVal
        } else {
            console.log("This computation has concluded kindly sod off")
        }
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