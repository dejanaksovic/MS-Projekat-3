export default function Product(viewField, initValue) {
    this.viewBind = viewField
    this.value = "0000000000000000"
    this.setValue = (value) => {
        this.value = value
        this.render()
    }
    this.render = () => {
        this.viewBind.innerText = this.value
    }
    this.setValue(initValue)
}