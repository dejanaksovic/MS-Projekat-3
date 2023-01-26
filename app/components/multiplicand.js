export default function Multiplicand () {
    this.body = `<div class= 'multiplicant'> Multipplicand ${this.value} </div>`
    this.value = '00000001'
    this.shiftL = () => {
        this.value = this.value.slice(1) + '0'
    }

    this.render = () => {
        this.body = `<div class = 'multiplicant'> Multipplicand ${this.value} </div>`
        return this.body
    }
}