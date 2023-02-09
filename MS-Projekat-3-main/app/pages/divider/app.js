import Divisor from "../../components/division/divisor.js"
import Quotient from "../../components/division/quotient.js"
import ALU from "../../components/division/ALUdivision.js"
import Remainder from "../../components/division/remainder.js"
import {routeBase} from "../../config/router.js"
import Extender from "../../middleware/bitBaseExtentionMiddleware.js"
import Formater from "../../middleware/formatMiddleware.js"

console.log("After import");

const initialValues = {
    divident: sessionStorage.getItem("firstOperand"),
    divisor: sessionStorage.getItem("secondOperand")
}

if(!initialValues.divident  || !initialValues.divisor) {
    alert("initial values have not been set, returning to set form")
    routeBase()
}

const formater = new Formater()

const divisor = new Divisor(document.querySelector("#divisor-view-port"), `${initialValues.divisor}${Extender("0", initialValues.divisor.length)}`)
const quotient = new Quotient(document.querySelector("#quotient-view-port"), Extender("0", initialValues.divisor.length))
const remainder = new Remainder(document.querySelector("#remainder-view-port"), `${Extender("0", initialValues.divisor.length)}${initialValues.divident}`)
const alu = new ALU()

alu.steps.push(formater.subBinDec)
alu.steps.push(quotient.shiftL)
alu.steps.push(divisor.shiftR)

//buttons
const doButton = document.querySelector(".do")
const undoButton = document.querySelector(".undo")

doButton.addEventListener("click", e => {
    const testDiv = alu.stepFunc(remainder.value, divisor.value, quotient.value)
    console.log(testDiv);
    if(testDiv) {
        remainder.setValue(testDiv)
    }
})

undoButton.addEventListener("click", e => {
    alu.undo()
})

