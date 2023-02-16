import Divisor from "../../components/division/divisorOptimised.js"
import RemainderAndQuotient from "../../components/division/remainder-quotient.js"
import ALU from "../../components/division/ALUoptimisedDivison.js"
import Router from "../../config/router.js"
import Extender from "../../middleware/bitBaseExtentionMiddleware.js"
import Formater from "../../middleware/formatMiddleware.js"

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
const remandquot = new RemainderAndQuotient(document.querySelector("#remainder-view-port"), `${Extender("0", initialValues.divisor.length)}${initialValues.divident}`)
const alu = new ALU()


ALUoptimisedDivisionLocal.steps.push(remandquot.shiftL)
ALUoptimisedDivisionLocal.steps.push(formater.subBinDec)

//buttons
const doButton = document.querySelector("#do")
const undoButton = document.querySelector("#undo")

let historyLog = []

doButton.addEventListener("click", e => {
    const testDiv = alu.stepFunc(remandquot.value, divisor.value)
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
        case "remandquot":
            remandquot.setValue(prevState[1])
            break;
        default:
            console.log("Someting went oh so terribly wrong....")
        }
    }
})


// // paste this in app.js and rename what you must <---------------------------------------------------------
//undoButton.addEventListener("click", e => {
//const prevState = alu.undo()
//if(prevState) {
//        switch(prevState[0]) {
//            case "remandquot":
//                remandquot.setValue(prevState[1])
//                break;
//            default:
//                console.log("Someting went oh so terribly wrong....")
//        }
//    }
//})

// Please i beg you 
// When you do this 
// Make sure you use optimised components, not regular ones
// If you do otherwise you will give cancer to an orphaned child
// Every time you do