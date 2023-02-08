export default function ProductandMultiplier (viewField, initValue) {
    this.viewBind = viewField
    this.value = '0000000000001010'
    
    this.shiftL = () => {
        this.value = this.value.slice(1) + '0'
    }

    this.shiftR = () => {
        const carryOut = this.value.slice(-1)
        this.value = '0' + this.value.slice(0, this.value.length-1)
        //return carryOut
    } 

    this.setValue = (value) => {
        this.value = value
        this.render()
    }

    this.render = () => {
        this.viewBind.textContent = this.value
    }

    this.setValue(initValue)
}