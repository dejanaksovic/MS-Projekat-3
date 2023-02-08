import Multiplier from "../../components/multiplication/multiplier.js"
import Multiplicant from "../../components/multiplication/multiplicand.js"
import ALU from "../../components/multiplication/ALU.js"
import Product from "../../components/multiplication/product.js"
import { routeBase } from "../../config/router.js"
import Formater from "../../middleware/formatMiddleware.js"
import BaseExtender from "../../middleware/bitBaseExtentionMiddleware.js"


const formater = new Formater()

const baseValues = { 
    multiplicant: sessionStorage.getItem("firstOperand"),
    multiplier: sessionStorage.getItem("secondOperand")
}

//Provera inicijalnih vrednost sesije, direktni pristupi
if (!baseValues.multiplicant || !baseValues.multiplier) {
    alert("initial values haven't been set, please go back and set them")
    routeBase()
}


//COMPONENTS
const multiplier = new Multiplier(document.querySelector("#multiplier-view-port"), baseValues.multiplier)
const multiplicant = new Multiplicant(document.querySelector("#multiplicant-view-port"), baseValues.multiplicant)
const alu = new ALU()
const product = new Product(document.querySelector("#product-view-port"), BaseExtender("000", multiplicant.value.length))

alu.steps.push(multiplier.shiftR)
alu.steps.push(formater.addBin)
alu.steps.push(multiplicant.shiftL)

//buttons
const buttonStep = document.querySelector("#do")
const buttonUndo = document.querySelector("#undo")

console.log("after formater");

buttonStep.addEventListener("click", e  => {
    const possibleProduct = alu.stepFunc(product.value, multiplicant.value, multiplier.value)
    console.log(multiplicant.value.length)
    console.log(multiplier.value.length)
    console.log(possibleProduct);
    if(possibleProduct) {
        product.setValue(BaseExtender(possibleProduct, multiplicant.value.length))
    }
})

buttonUndo.addEventListener("click", e => {
    const prevState = alu.undo()
    if(prevState) {
        switch(prevState[0]) {
            case "multiplicand":
                multiplicant.setValue(prevState[1])
                break;
            case "multiplier":
                multiplier.setValue(prevState[1])
                break;
            case "product":
                product.setValue(prevState[1])
                break;
            default:
                console.log("Someting went oh so terribly wrong....")
        }
    }
})


