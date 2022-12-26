
import { Copiable } from "./Interfaces";
import { CalculatorNumber } from "./CalculatorNumber";
import { cloneArray, isOperator, isDigit, SymbolKey } from "./Common";

// Mutates the calculator number's operator.
// Then returns a new number to append, whether positive or negative based on input string.
function interpretInput(current: CalculatorNumber, input: string): CalculatorNumber | null {
    const ops = input.match(/[*+\-\/]/g);
    if (!ops) {
        console.error("interpretInput: internal error: there were no operators in the input string!");
        return null;
    }

    if (ops.length > 1 && ops[ops.length-1] === '-') {
        current.setOperator(ops[ops.length-2]);
        return new CalculatorNumber("", "", true);
    } else {
        current.setOperator(ops[ops.length-1]);
        return new CalculatorNumber("", "", false);
    }
}

export class Calculator implements Copiable {

    private m_result: CalculatorNumber = CalculatorNumber.fromNumber(0);
    private m_numbers: Array<CalculatorNumber> = [];
    private m_tempInput: string;

    constructor() {
        this.reset(true);
        this.m_result = CalculatorNumber.Zero;
    }

    get result() { return this.m_result; }
    
    /**
     * Adds a char to the end of the latest number
     * @param char any op symbol or number in Common.ts
     */
    appendChar(char: string) {
        if (!isDigit(char) && !isOperator(char) && !'.') {
            console.warn("Calculator.appendChar: received an unknown symbol: \"" + char + "\"");
            return;
        }

        this.m_tempInput += char;

        // Brings in the last result of calculate, if user enters an operator to begin with 
        if (this.m_numbers.length === 1 && !this.currentNumber().isValid() && isOperator(char)) {
            this.m_numbers[0] = this.m_result.copy();
            this.m_numbers[0].clearOperator();
        }

        // Checks if last number is complete, then will append a new one if user begins entering another number  
        if (this.currentNumber().hasOperator() && this.currentNumber().isValid() && isDigit(char)) {
            const newNumber = interpretInput(this.currentNumber(), this.m_tempInput);
            this.appendNumber(newNumber);
            this.m_tempInput = "";
        }
            
        


        this.currentNumber().append(char);
    }

    /**
     * Add a new CalculatorNumber to the end of the internal array. Limitless size.
     */
    appendNumber(number: CalculatorNumber = null): CalculatorNumber {
        if (!number)
            number = new CalculatorNumber;

        this.m_numbers.push(number);
        return number;
    }

    /**
     * Deep copies the Calculator
     */
    copy(): Calculator {
        const ret = new Calculator();
        ret.m_numbers = cloneArray(this.m_numbers);
        ret.m_result = this.m_result.copy();

        return ret;
    }

    /**
     * Clears the internal equation numbers, 
     * (and cached result if clearResult is set true).
     * @param clearResult whether to clear the cached result as well
     */
    reset(clearResult = false) {
        this.m_numbers = [new CalculatorNumber];

        if (clearResult)
            this.m_result.clear();
    }


    /**
     * Calculate the result and return the value. 
     * Result is cached in calculator and internals are reset.
     * @returns result
     */
    calculate(): number {
        let result: any;
        try {
            let equation = this.equationStr();

            // Empty equation from no input? Return the previous result, or zero if undefined
            if (equation.length === 0) 
                return this.m_result.asNumber() || 0;

            result = eval(this.equationStr()); // eval is evil... TODO: make our own evaluator
        } 
        catch(e) { // something probably went wrong in eval

            console.warn("Error during calculation!");
            console.log("Problem with: \"" + this.equationStr() + "\""); // show problematic calculation
            this.reset();
            return this.m_result.asNumber() || 0;
        }

        // Check for weird results (Inifnity, NaN, non-number, etc.)
        if (typeof result !== "number" || isNaN(result) || !isFinite(result))
            this.m_result = CalculatorNumber.fromNumber(0);
        else
            this.m_result = CalculatorNumber.fromNumber(result);

        this.reset(); // reset the equation nums        
        return result;
    }

    /**
     * Gets the current CalculatorNumber object
     */
    private currentNumber() {
        return this.m_numbers[this.m_numbers.length-1];
    }

    /**
     * Gets the string as an equation
     * @param withLastSymbol when set to true, includes the last symbol entered.
     * This is for calculator display. Set to false will remove any last symbol for the sake of calculation via eval. 
     * (A dangling symbol would produce an error)
     */
    equationStr(withLastSymbol: boolean = false) {
        return this.m_numbers.reduce((accum, num, i) => {
            
            if (i < this.m_numbers.length - 1 || withLastSymbol)
                return (num.isValid() ? accum + num.asString(true) : accum) + " ";
            else
                return (num.isValid() ? accum + num.asString(false) : accum);
        }, "");
    }
}





