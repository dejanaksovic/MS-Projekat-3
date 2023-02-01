export default function Multiplier() {
    this.body = `<div class='multiplier'>Multiplier ${this.value}</div>`
    this.value = '00001010'
    this.shiftR = () => {
        const carryOut = this.value.slice(-1)
        this.value = '0' + this.value.slice(0, this.value.length-1)
        return carryOut
    }  
    this.render = () => {
        this.body = `<div class='multiplier'>Multiplier ${this.value}</div>`
        return this.body
    }
}