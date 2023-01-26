export default function ALU() {
    this.body = `<div class="alu"> ALU </div>`
    this.steps = []
    this.currStep = 0
    this.stepFunc = (product, multiplicand) => {
        const returnVal = this.steps[this.currStep++](product, multiplicand)
        this.currStep%= this.steps.length

        if(returnVal !== undefined) {
            return returnVal
        }
    }
}