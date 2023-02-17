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

//COMPONENTS DOM
const multiplierC = document.querySelector(".multiplier")
const multiplicandC = document.querySelector(".multiplicand")
const controlC = document.querySelector(".control")
const ALUC = document.querySelector(".alu")
const productC = document.querySelector(".product")

const components = [multiplierC, multiplicandC, ALUC, productC]

//COMPONENTS LOGIC
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

let historyLog = []

buttonStep.addEventListener("click", e  => {
    const possibleProduct = alu.stepFunc(product.value, multiplicant.value, multiplier.value)
    if(possibleProduct[0] != undefined) {
        product.setValue(possibleProduct[0])
    }
    if(possibleProduct[1]){
        historyLog.push(possibleProduct[1])
        renderHistory()
    }

    animate()
})


let renderHistory = () => {

    const history = document.getElementById("history");
    history.innerHTML = "";

    historyLog.forEach((log) => {

        const liElement = document.createElement("li");
        liElement.classList.add("historyItem");
        liElement.innerText = log;
        console.log(log)
        history.appendChild(liElement);

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
        animate()
    }
})

const animate = () => {
    //RESET ALL COMPONENTS 
    for(const component of components) {
        component.classList.remove("active")
    }
    ALUC.classList.remove("active");

    //POSLEDNJA KOMPONENTA NA KOJOJ JE IZVRSENA KOMPUTACIJA IZ ALU STACKA SE UZIMA I STAVLJA SE DA JE ACTIVE
    const componentName = alu.undoStack[alu.undoStack.length-1][0]
    document.querySelector(`.${componentName}`).classList.add("active")
    console.log(componentName, document.querySelector(`.${componentName}`));

    //CPROVERA ZA CONTROL, UKOLIKO JE POSLEDNJA KOMPONENTA MULTIPLIER, PROMENA CARRY OUT-A
    if (componentName === "multiplier") {
        document.querySelector("#control-view-port").textContent = `1 = ${alu.carryOut}`
        //AKO JE SABIRANJE DOZVOLJENO ZELENI GLOW, A AKO NIJE CRVENI
        alu.carryOut === "0" ? controlC.style.setProperty("--animation-primary", "red") : controlC.style.setProperty("--animation-primary", "green")
    }

    //PROVERA ZA ALU, UKOLIKO JE CARRY OUT 1 I UKOLIKO JE NA RED PRODUCT
    if (alu.carryOut === "1" && componentName === "multiplicand") {
        console.log("ALU ACTIVATED");
        ALUC.classList.add("active");
    }
}