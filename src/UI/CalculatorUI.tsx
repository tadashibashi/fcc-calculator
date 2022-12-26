import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { ButtonUI } from "./ButtonUI";
import { Calculator } from "../Calculator"

import { KeyDisplay, NumKey as Num, SymbolKey as Sym } from "../Common";

interface CalculatorState {
    result: number;
    display: string;
}


function defaultCalculatorState(): CalculatorState {
    return {
        result: 0,
        display: ""
    }
}

function DisplayUI(props) {
    return (
        <div id="display-wrapper">
            <p id="display">{props.display.length > 0 ? props.display : props.result}</p>
        </div>
    );
}

class CalculatorUI extends React.Component<{}, CalculatorState> {
    calc: Calculator;

    constructor(props) {
        super(props);

        this.state = defaultCalculatorState();
        this.calc = new Calculator;

        this.clickHandler = this.clickHandler.bind(this);
        this.keydownHandler = this.keydownHandler.bind(this);
    }

    keydownHandler(ev: KeyboardEvent) {
        switch(ev.key) {
            case '0': case '1': case '2': case '3': case '4':
                case '5': case '6': case '7': case '8': case '9':
                this.appendChar(Num[ev.key.charCodeAt(0) - '0'.charCodeAt(0)]);
            break;

            case '.':
                this.appendChar(Sym.Dot);
            break;

            case '/':
                this.appendChar(Sym.Div);
            break;

            case '*':
                this.appendChar(Sym.Mult);
            break;

            case '+':
                this.appendChar(Sym.Add);
            break;

            case '-':
                this.appendChar(Sym.Sub);
            break;

            case '=': case "Enter":
                this.calculate();
            break;

            case "Clear":
                this.clear();
            break;
        }
    }

    override componentDidMount() {
        document.addEventListener("keydown", this.keydownHandler);
    }

    override componentWillUnmount() {
        document.removeEventListener("keydown", this.keydownHandler);
    }

    appendChar(symbol: KeyDisplay) {
        this.calc.appendChar(symbol.Js);

        this.setState({
                display: this.calc.equationStr(true)
        });
    }


    clickHandler(button: ButtonUI) {
        const char = button.props.symbol;
        switch(char.Js) {
            case Sym.Equal.Js:
                this.calculate();
            break;
            case Sym.Clear.Js:
                this.clear();
            break;
            default:
                this.appendChar(char);
        }
    }

    clear() {
        this.calc.reset(true);
        this.setState({
            result: 0,
            display: ""
        });
    }


    calculate() {
        const result = this.calc.calculate();
        this.calc.reset();
        this.setState({
            display: "",
            result
        });
    }

    override render() {

        return (
            <div id="calculator-border">
                <DisplayUI display={this.state.display} result={isNaN(this.state.result) ? "NaN" : this.state.result}/>
                <ButtonUI id="clear" symbol={Sym.Clear} onClick={this.clickHandler} />
                <ButtonUI id="divide" symbol={Sym.Div} onClick={this.clickHandler} />
                <ButtonUI id="multiply" symbol={Sym.Mult} onClick={this.clickHandler} />
                <ButtonUI id="seven" symbol={Num[7]} onClick={this.clickHandler} />
                <ButtonUI id="eight" symbol={Num[8]} onClick={this.clickHandler} />
                <ButtonUI id="nine" symbol={Num[9]} onClick={this.clickHandler} />
                <ButtonUI id="subtract" symbol={Sym.Sub} onClick={this.clickHandler} />
                <ButtonUI id="four" symbol={Num[4]} onClick={this.clickHandler} />
                <ButtonUI id="five" symbol={Num[5]} onClick={this.clickHandler} />
                <ButtonUI id="six" symbol={Num[6]} onClick={this.clickHandler} />
                <ButtonUI id="add" symbol={Sym.Add} onClick={this.clickHandler} />
                
                <ButtonUI id="one" symbol={Num[1]} onClick={this.clickHandler} />
                <ButtonUI id="two" symbol={Num[2]} onClick={this.clickHandler} />
                <ButtonUI id="three" symbol={Num[3]} onClick={this.clickHandler} />

                <ButtonUI id="equals" symbol={Sym.Equal} onClick={this.clickHandler} />

                <ButtonUI id="zero" symbol={Num[0]} onClick={this.clickHandler} />
                <ButtonUI id="decimal" symbol={Sym.Dot} onClick={this.clickHandler} />

            </div>
        );
    }
}

export function render() {
    const root = ReactDOM.createRoot(document.getElementById("calculator-container"));
    root.render(<CalculatorUI />);
}
