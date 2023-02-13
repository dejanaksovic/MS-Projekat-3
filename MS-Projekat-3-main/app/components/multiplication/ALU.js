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
                returnVal[1] = "Added multiplicand to product", this.undoStack[this.undoStack.length - 1][1]
            } else if (this.currStep == 1 && this.carryOut == '0') {
                returnVal[1] = "Multiplicand and product addition failed because of the multiplier carryout bit being 1"
            } else if (this.currStep == 0) {
                this.iteration++
                returnVal[1] = "Shitfed multiplier to the right", this.undoStack[this.undoStack.length - 1][1]
            } else {
                returnVal[1] = "Shifted multiplicand to the left", this.undoStack[this.undoStack.length - 1][1]
            }

            this.currStep++
            this.currStep %= this.steps.length

            if (returnVal !== undefined) {
                return returnVal
            }
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