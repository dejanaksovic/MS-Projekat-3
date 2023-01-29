import Multiplicand from './components/multiplication/multiplicand.js'
import Multiplier from './components/multiplication/multiplier.js'    
import Product from './components/multiplication/product.js'
import Control from './components/multiplication/control.js'
import ALU from './components/multiplication/ALU.js'
import formater from './middleware/formatMiddleware.js'
import ALUoptimised from './components/multiplication/ALUoptimised.js'
import ProductandMultiplier from './components/multiplication/product-multiplier.js'
import MultiplicandOptimised from './components/multiplication/multiplicandOptimised.js'
import Quotient from './components/division/quotient.js'
import Divisor from './components/division/divisor.js'
import Remainder from './components/division/remainder.js'
import ALUdivision from './components/division/ALUdivision.js'
import DivisorOptimised from './components/division/divisorOptimised.js'
import RemainderandQuotient from './components/division/remainder-quotient.js'
import ALUoptimisedDivision from './components/division/ALUoptimisedDivison.js'

const app = document.querySelector("#main")
const button = document.querySelector("button")

// Multiplication
const mulLocal = new Multiplicand()
const mulpLocal = new Multiplier()
const product = new Product(16)
const controlLocal = new Control()
const formaterLocal = new formater()
const ALULocal = new ALU()

ALULocal.steps.push(mulpLocal.shiftR)
ALULocal.steps.push(formaterLocal.addBin)
ALULocal.steps.push(mulLocal.shiftL)

// Optimised Multiplication
const ALUoptimisedLocal = new ALUoptimised()
const multiplicandOptimisedLocal = new MultiplicandOptimised()
const productandmultiplierLocal = new ProductandMultiplier() 

ALUoptimisedLocal.steps.push(formaterLocal.addBin)
ALUoptimisedLocal.steps.push(productandmultiplierLocal.shiftR)

// Division
const divisorLocal = new Divisor()
const quotientLocal = new Quotient()
const remainderLocal = new Remainder()
const ALUdivisionLocal = new ALUdivision()

ALUdivisionLocal.steps.push(formaterLocal.subBinDec)
ALUdivisionLocal.steps.push(quotientLocal.shiftL)
ALUdivisionLocal.steps.push(divisorLocal.shiftR)

// Optimised Division 
const divisorOptimisedLocal = new DivisorOptimised()
const remandquotLocal = new RemainderandQuotient()
const ALUoptimisedDivisionLocal = new ALUoptimisedDivision()

ALUoptimisedDivisionLocal.steps.push(remandquotLocal.shiftL)
ALUoptimisedDivisionLocal.steps.push(formaterLocal.subBinDec)


app.innerHTML = mulLocal.render() + mulpLocal.render() + product.render() + controlLocal.body + "<br><br>" + multiplicandOptimisedLocal.render() + productandmultiplierLocal.render() + "<br><br>" +
    divisorLocal.render() + quotientLocal.render() + remainderLocal.render() + "<br><br>" +
    divisorOptimisedLocal.render() + remandquotLocal.render() + "<br><br>"

button.addEventListener("click", e=> {
    // Multiplication
    const test = ALULocal.stepFunc(product.value, mulLocal.value, mulpLocal.value.slice(-1))
    
    if(test) {
        product.set(test)
    }

    // Optimised Multiplication
    const testOp = ALUoptimisedLocal.stepFunc(productandmultiplierLocal.value, multiplicandOptimisedLocal.value)
    
    if(testOp) {
        productandmultiplierLocal.set(testOp)
    }

    // Division
    const testDiv = ALUdivisionLocal.stepFunc(remainderLocal.value, divisorLocal.value, quotientLocal.value)
    if(testDiv){
        remainderLocal.set(testDiv)
    }

    // Optimised Division
    const testDivOp = ALUoptimisedDivisionLocal.stepFunc(remandquotLocal.value, divisorOptimisedLocal.value)
    if(testDivOp){
        remandquotLocal.set(testDivOp)
    }

    app.innerHTML = mulLocal.render() + mulpLocal.render() + product.render() + controlLocal.body + "<br><br>" + multiplicandOptimisedLocal.render() + productandmultiplierLocal.render() + "<br><br>" +
        divisorLocal.render() + quotientLocal.render() + remainderLocal.render() + "<br><br>" +
        divisorOptimisedLocal.render() + remandquotLocal.render() + "<br><br>"
})