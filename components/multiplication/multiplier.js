export default function Multiplier(viewField, initValue) {
    this.viewBind = viewField
    this.value = '00001010'
    this.shiftR = () => {
        const carryOut = this.value.slice(-1)
        this.value = '0' + this.value.slice(0, this.value.length-1)
        this.render()
        //return carryOut
    }  
    this.render = () => {
        this.viewBind.innerText = `${this.value}`
    }

    this.setValue = (value) => {
        this.value = value
        this.render()
    }

    this.setValue(initValue)
}