export default function RemainderandQuotient () {
    this.body = `<div class= 'rem-quot'> Remainder/Quotient ${this.value} </div>`
    this.value = '0000000000111100'
    
    this.shiftL = () => {
        this.value = this.value.slice(1) + '0'
    }

    this.set = (value) => {
        this.value = value
    }

    this.render = () => {
        this.body = `<div class = 'rem-quot'> Remainder/Quotient ${this.value} </div>`
        return this.body
    }
}