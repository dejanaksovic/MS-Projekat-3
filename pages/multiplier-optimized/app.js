
import Multiplicant from "../../components/multiplication/multiplicand.js"
import ALU from "../../components/multiplication/ALU.js"
import Product from "../../components/multiplication/product.js"
import Router from "../../config/router.js"
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
    Router.home()
}


//COMPONENTS
const multiplicant = new Multiplicant(document.querySelector("#multiplicant-view-port"), baseValues.multiplicant)
const alu = new ALU()
const product = new Product(document.querySelector("#product-view-port"), BaseExtender("000", multiplicant.value.length))


alu.steps.push(formater.addBin)
alu.steps.push(multiplicant.shiftL)

//buttons
const buttonStep = document.querySelector("#do")
const buttonUndo = document.querySelector("#undo")

let historyLog = []

buttonStep.addEventListener("click", e  => {
    const possibleProduct = alu.stepFunc(product.value, multiplicant.value)
    if(possibleProduct[0] != undefined) {
        product.setValue(BaseExtender(possibleProduct[0], multiplicant.value.length))
    }
    historyLog.push(possibleProduct[1])
    renderHistory()
})


let renderHistory = () => {

    const history = document.getElementById("history");
    history.innerHTML = "";

    historyLog.forEach((log) => {

        const liElement = document.createElement("li");
        liElement.classList.add("historyItem");
        liElement.innerText = log;
        history.appendChild(liElement);

        // history.innerHTML += `<li class="historyItem">${log}</li> `
    })
}

buttonUndo.addEventListener("click", e => {
    const prevState = alu.undo()
    if(historyLog.length > 0){
        historyLog.pop()
        renderHistory()
    }
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