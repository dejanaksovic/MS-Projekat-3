import Divisor from "../../components/division/divisor.js"
import Quotient from "../../components/division/quotient.js"
import ALU from "../../components/division/ALUdivision.js"
import Remainder from "../../components/division/remainder.js"
import Router from "../../config/router.js"
import Extender from "../../middleware/bitBaseExtentionMiddleware.js"
import Formater from "../../middleware/formatMiddleware.js"

console.log("After import");

const initialValues = {
    divident: sessionStorage.getItem("firstOperand"),
    divisor: sessionStorage.getItem("secondOperand")
}

if(!initialValues.divident  || !initialValues.divisor) {
    alert("initial values have not been set, returning to set form")
    Router.home()
}

const formater = new Formater()

const divisor = new Divisor(document.querySelector("#divisor-view-port"), `${initialValues.divisor}${Extender("0", initialValues.divisor.length)}`)
const quotient = new Quotient(document.querySelector("#quotient-view-port"), Extender("0", initialValues.divisor.length))
const remainder = new Remainder(document.querySelector("#remainder-view-port"), `${initialValues.divident}`)
const alu = new ALU()

console.log(initialValues.divident)

alu.steps.push(formater.subBinDec)
alu.steps.push(quotient.shiftL)
alu.steps.push(divisor.shiftR)

//buttons
const doButton = document.querySelector("#do")
const undoButton = document.querySelector("#undo")

let historyLog = []

doButton.addEventListener("click", e => {
    const testDiv = alu.stepFunc(remainder.value, divisor.value, quotient.value)
    if(testDiv[0]) {
        remainder.setValue(testDiv[0])
    }
    if(testDiv[1] != undefined){
        historyLog.push(testDiv[1])
        renderHistory()
    }
})

let renderHistory = () => {

    const history = document.getElementById("history");
    history.innerHTML = "";

    historyLog.forEach((log) => {

        const liElement = document.createElement("li");
        liElement.classList.add("historyItem");
        liElement.innerText = log;
        history.appendChild(liElement);
    })
}

undoButton.addEventListener("click", e => {
        const prevState = alu.undo()
        if(historyLog.length > 0){
            historyLog.pop()
            renderHistory()
        }
        if(prevState) {
            switch(prevState[0]) {
                case "quotient":
                    quotient.setValue(prevState[1])
                    break;
                case "remainder":
                    remainder.setValue(prevState[1])
                    break;
                case "divisor":
                    divisor.setValue(prevState[1])
                    break;
                default:
                    console.log("Someting went oh so terribly wrong....")
            }
        }
})

