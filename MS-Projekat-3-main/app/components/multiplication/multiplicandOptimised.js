export default function MultiplicandOptimised () {
    this.body = `<div class= 'multiplicant'> Multipplicand ${this.value} </div>`
    this.value = '00110010'
    
    this.shiftL = () => {
        this.value = this.value.slice(1) + '0'
    }

    this.render = () => {
        this.body = `<div class = 'multiplicant'> Multiplicand ${this.value} </div>`
        return this.body
    }
}