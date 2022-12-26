import { SymbolKey, NumKey, isOperator } from "./Common";
import { Copiable } from "./Interfaces";

const Sym = SymbolKey;
const Num = NumKey;

export class CalculatorNumber implements Copiable {
    
    private m_numStr: string = "";
    private m_operator: string = "";
    private m_negative: boolean = false;

    get negative(): boolean { return this.m_negative; }
    set negative(neg: boolean) { this.m_negative = neg; }

    constructor(nums: string = "", operator: string = "", negative: boolean = false) {
        this.m_numStr = nums;
        this.m_operator = operator;
        this.m_negative = negative;
    }

    /**
     * Creates a CalculatorNumber object from a number. Static.
     * @param num number to set
     * @returns new CalculatorNumber
     */
    static fromNumber(num: number) {
        if (isNaN(num))
            throw {name: "Conversion Error", message: "Cannot convert to CalculatorNumber from NaN!" };
        let newNum = new CalculatorNumber(Math.abs(num).toString(), "", num < 0);

        console.log("new number: ", newNum);

        return newNum;
    }

    /**
     * @returns the number in number form (not string)
     */
    asNumber(): number {
        let num = parseFloat( this.m_numStr );
        if (this.m_negative)
            num = -num;
        return num;
    }

    /**
     * Removes an operator if there is one attached
     */
    clearOperator() {
        this.m_operator = "";
    }

    /**
     * Gets the operator, or an empty string if none
     */
    get operator(): string {
        return this.m_operator;
    }

    /**
     * Gets the number string. Please check if the number if valid first with isValid()
     * @param withOp whether or not to include the operator appended at the end, 
     * if there is one (it will be space separated). default: (false)
     */
    asString(withOp: boolean = false): string {
        let numStr = this.m_numStr;

        if (withOp && this.hasOperator()) 
            numStr += (" " + this.m_operator);

        if (this.m_negative) 
            numStr = "-" + numStr;

        return numStr;
    }

    /**
     * @returns a deep clone of the number
     */
    copy(): CalculatorNumber {
        return new CalculatorNumber(this.m_numStr, this.m_operator, this.m_negative);
    }

    /**
     * @returns whether the number has a floating point in it
     */
    hasPoint(): boolean {
        for (let i = 0; i < this.m_numStr.length; ++i) {
            if (this.m_numStr[i] === Sym.Dot.Js)
                return true;
        }

        return false;
    }

    /**
     * Appends a character to the number. Will set it to negative if '-' is passed as the first char.
     * Otherwise, if an operator is passed with a valid internal number, it will be set as its operator
     * @param char 
     */
    append(char: string) {

        switch(char) {
            case Sym.Add.Js: case Sym.Div.Js: case Sym.Mult.Js:
                if (this.isValid())
                    this.m_operator = char;
            break;

            case Sym.Sub.Js: // special case, since it can also make a number negative
                if (this.m_numStr.length === 0) {
                    if (!this.m_negative) {
                        this.m_negative = true;
                    }
                } else if (this.isValid()) {
                    this.m_operator = char;
                }
        
            break;

            case Num[0].Js: case Num[1].Js: case Num[2].Js: case Num[3].Js: 
            case Num[4].Js: case Num[5].Js: case Num[6].Js: case Num[7].Js:
            case Num[8].Js: case Num[9].Js:
                if (this.m_numStr.length === 1) {
                    if (this.m_numStr[0] === Num[0].Js)
                        this.m_numStr = char;
                    else
                        this.m_numStr += char;
                } else {
                    this.m_numStr += char;
                }
                
            break;

            case Sym.Dot.Js:
                if (!this.hasPoint()) {
                    if (this.m_numStr.length === 0)
                        this.m_numStr += Num[0].Js + Sym.Dot.Js;
                    else
                        this.m_numStr += Sym.Dot.Js;
                }
            break;

            default:
                console.warn(`CalculatorNumber.append: attempted to append character '${char}', but it was not recognized`);
            break;
        }
    }

    /**
     * @returns whether the internal string is a valid number
     */
    isValid(): boolean {
        return /^[0-9][0-9\.e\-+]*$|^[\.0-9][0-9e\-+]+$/.test(this.m_numStr);
    }

    /**
     * @returns whether the object has an operator appended at the end
     */
    hasOperator(): boolean {
        return this.m_operator !== "";
    }

    /**
     * Sets the internal operator directly. 
     * If its not a recognized operator, an error will log, 
     * without affecting the internal operator.
     * @param op operator string
     */
    setOperator(op: string) {
        if (isOperator(op)) {
            this.m_operator = op;
        } else {
            console.error("CalculatorNumber.setOperator: passed string \"" + op + 
                "\" was not an operator!");
        }  
    }

    /**
     * Resets the number to have no value
     */
    clear() {
        this.m_operator = "";
        this.m_negative = false;
        this.m_numStr = "";
    }
}
