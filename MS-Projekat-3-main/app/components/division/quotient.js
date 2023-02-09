export default function Quotient (viewPort, initialValue) {
    this.view = viewPort

    this.value = ""

    this.setValue = (value) => {
        this.value = value
        this.render()
    }
    
    this.shiftL = (carryIn) => {
        this.setValue(this.value.slice(1) + carryIn)
    }

    this.render = () => {
        this.view.textContent = this.value
    }

    this.setValue(initialValue)
}