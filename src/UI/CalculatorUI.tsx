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

    render() {

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
