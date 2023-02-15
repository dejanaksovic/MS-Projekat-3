export default function MultiplicandOptimised (viewField, initValue) {
    this.viewBind = viewField
    this.value = '00110010'
    
    this.shiftL = () => {
        this.value = this.value.slice(1) + '0'
        this.render()
    }

    this.render = () => {
        this.viewBind.textContent = this.value
    }

    this.setValue = (value) => {
        this.value = value
        this.render()
    }

    this.setValue(initValue)
}