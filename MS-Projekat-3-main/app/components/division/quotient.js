export default function Quotient () {
    this.body = `<div class= 'quotient'> Quotient ${this.value} </div>`
    this.value = '00000000'
    
    this.shiftL = (carryIn) => {
        this.value = this.value.slice(1) + carryIn
    }

    this.render = () => {
        this.body = `<div class = 'quotient'> Quotient ${this.value} </div>`
        return this.body
    }
}