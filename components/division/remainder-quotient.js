export default function RemainderandQuotient (viewPort, initialValue) {
    this.view = viewPort
    this.value = ''
    
    this.shiftL = () => {
        this.value = this.value.slice(1) + '0'
    }

    this.setValue = (value) => {
        this.value = value
        this.render()
    }

    this.render = () => {
        this.view.textContent = this.value
    }

    this.setValue(initialValue)
}