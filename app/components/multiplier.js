export default function Multiplier() {
    this.body = `<div class='multiplier'>Multiplier ${this.value}</div>`
    this.value = '1000'
    this.shiftR = () => {
        this.value = '0' + this.value.slice(0, this.value.length-1)
    }  
    this.render = () => {
        this.body = `<div class='multiplier'>Multiplier ${this.value}</div>`
        return this.body
    }
}