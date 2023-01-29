export default function Divisor () {
    this.body = `<div class= 'divisor'> Divisor ${this.value} </div>`
    this.value = '0001000100000000'
    
    this.shiftL = () => {
        this.value = this.value.slice(1) + '0'
    }

    this.shiftR = () => {
        const carryOut = this.value.slice(-1)
        this.value = '0' + this.value.slice(0, this.value.length-1)
        //return carryOut
    } 

    this.render = () => {
        this.body = `<div class = 'divisor'> Divisor ${this.value} </div>`
        return this.body
    }
}