export default function Divisor (viewPort, initialValue) {
    this.view = viewPort
        
    this.value = ""

    this.setValue = (value) => {
        this.value = value
        this.render()
    }

    this.shiftL = () => {
        this.setValue(this.value.slice(1) + '0')
    }

    this.shiftR = () => {
        const carryOut = this.value.slice(-1)
        this.setValue('0' + this.value.slice(0, this.value.length-1))
        return carryOut
    } 

    this.render = () => {
        this.view.textContent = this.value
    }
    
    this.setValue(initialValue)
}