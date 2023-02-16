export default function DivisorOptimised (viewPort, initialValue) {
    this.view = viewPort
    this.value = ''

    this.setValue = (value) => {
        this.value = value
        this.render()
    }

    this.render = () => {
        this.view.textContent = this.value
    }

    this.setValue(initialValue)
}