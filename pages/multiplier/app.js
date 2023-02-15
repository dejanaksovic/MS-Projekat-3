import Multiplier from "../../components/multiplication/multiplier.js"
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
const multiplier = new Multiplier(document.querySelector("#multiplier-view-port"), baseValues.multiplier)
const multiplicant = new Multiplicant(document.querySelector("#multiplicant-view-port"), baseValues.multiplicant)
const alu = new ALU()
const product = new Product(document.querySelector("#product-view-port"), BaseExtender("000", multiplicant.value.length))

const components = [multiplier, multiplicant, alu, product]

alu.steps.push(multiplier.shiftR)
alu.steps.push(formater.addBin)
alu.steps.push(multiplicant.shiftL)

//buttons
const buttonStep = document.querySelector("#do")
const buttonUndo = document.querySelector("#undo")

let historyLog = []

buttonStep.addEventListener("click", e  => {
    const possibleProduct = alu.stepFunc(product.value, multiplicant.value, multiplier.value)
    if(possibleProduct[0] != undefined) {
        product.setValue(BaseExtender(possibleProduct[0], multiplicant.value.length))
    }
    historyLog.push(possibleProduct[1])

    setActive()

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

    setActive()
})

const setActive = () => {
    //Get the name of the current active component
    const currComponentName = alu.undoStack[alu.undoStack.length-1][0]

    //Get the current active component
    const currentComponent = document.querySelector(`.${currComponentName}`)

    //reset all actives
    //God help us all 
    //TODO: Pull out of your ass the way to activate control and alu when needed
    for ( const className of ["multiplier", "multiplicand", "product", "alu", "control"] ) {
        document.querySelector(`.${className}`).classList.remove("active")
    }

    //Set current component to active
    currentComponent.classList.add("active")

    //Activation for ALU
    const test = ["product", "multiplcand"]

    //set control active if needed (multiplier is shifting)
    currComponentName === "multiplier" ? document.querySelector(".control").classList.add("active") : ""

    //set alu if needed 
    test.includes(currComponentName) ? document.querySelector(".alu").classList.add("active") : ""
}
