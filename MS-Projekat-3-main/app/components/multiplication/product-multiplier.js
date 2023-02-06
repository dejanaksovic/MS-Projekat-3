export default function ProductandMultiplier () {
    this.body = `<div class= 'prod-mplier'> Product/Multiplier ${this.value} </div>`
    this.value = '0000000000001010'
    
    this.shiftL = () => {
        this.value = this.value.slice(1) + '0'
    }

    this.shiftR = () => {
        const carryOut = this.value.slice(-1)
        this.value = '0' + this.value.slice(0, this.value.length-1)
        //return carryOut
    } 

    this.set = (value) => {
        this.value = value
    }

    this.render = () => {
        this.body = `<div class = 'prod-mplier'> Product/Multiplier ${this.value} </div>`
        return this.body
    }
}