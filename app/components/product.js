export default function Product() {
    this.body = `<div class='product'>Product ${this.value}</div>`
    this.value = "000000"
    this.set = (value) => {
        this.value = value
    }
    this.render = () => {
        this.body = `<div class='product'>Product ${this.value}</div>`
        console.log(this.value)
        return this.body
    }
}