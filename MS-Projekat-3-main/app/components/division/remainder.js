export default function Remainder () {
    this.body = `<div class= 'divisor'> Remainder ${this.value} </div>`
    this.value = '0000000000111100'
    
    this.set = (value) => { 
        this.value = value
    }

    this.render = () => {
        this.body = `<div class = 'divisor'> Remainder ${this.value} </div>`
        return this.body
    }
}