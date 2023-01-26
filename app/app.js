import Multiplicand from './components/multiplicand.js'
import Multiplier from './components/multiplier.js'    
import Product from './components/product.js'

const app = document.querySelector("#main")
const button = document.querySelector("button")

const mulLocal = new Multiplicand()
const mulpLocal = new Multiplier()
const product = new Product(8)

button.addEventListener("click", e=> {
    mulLocal.shiftL()
    mulpLocal.shiftR()
    app.innerHTML = mulLocal.render() + mulpLocal.render() + product.render()
})


app.innerHTML = mulLocal.render() + mulpLocal.render() + product.render()
