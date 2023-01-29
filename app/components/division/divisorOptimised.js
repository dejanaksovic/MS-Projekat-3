export default function DivisorOptimised () {
    this.body = `<div class= 'divisor'> Divisor ${this.value} </div>`
    this.value = '00010001'

    this.render = () => {
        this.body = `<div class = 'divisor'> Divisor ${this.value} </div>`
        return this.body
    }
}