import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { ButtonUI } from "./ButtonUI";
import { Calculator } from "../Calculator"

import { KeyDisplay, NumKey as Num, SymbolKey as Sym, getButtonId, getOS, OS } from "../Common";

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

    // Choose font size for display. Longer text = smaller size
    const length = props.display.length;
    let fontSizeRem = 2.0;

   if (length > 30)
        fontSizeRem = 1.0;
    else if (length > 20)
        fontSizeRem = 1.5;
    
    const style = {
        fontSize: fontSizeRem.toString() + "rem"
    };

    return (
        <div id="display-wrapper">
            <p id="display" style={style}>{props.display}</p>
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

    // ===== Input Handling ===================================================

    keydownHandler(ev: KeyboardEvent) {
        let cmdKey = getOS() === OS.MacOS ? ev.metaKey : ev.ctrlKey;

        if (ev.key === 'c' && cmdKey)
            window.navigator.clipboard.writeText(this.getDisplayText().trim());

        const id = getButtonId(ev.key);
        if (id !== null) {
            document.getElementById(id).click();
            document.getElementById(id).classList.add("active-state");
        }     
    }

    keyupHandler(ev: KeyboardEvent) {
        const id = getButtonId(ev.key);
        if (id !== null) {
            document.getElementById(id).classList.remove("active-state");
        }
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

    override componentDidMount() {
        document.addEventListener("keydown", this.keydownHandler);
        document.addEventListener("keyup", this.keyupHandler);
    }

    override componentWillUnmount() {
        document.removeEventListener("keydown", this.keydownHandler);
        document.removeEventListener("keyup", this.keyupHandler);
    }

    // ===== Calculator Actions ===============================================

    appendChar(symbol: KeyDisplay) {
        this.calc.appendChar(symbol.Js);

        this.setState({
                display: this.calc.equationStr(true)
        });
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

    private getDisplayText() {
        // Set the numbers to display
        let display: string;
        if (this.state.display.length > 0) {
            display = this.state.display;
        } else {
            display = isNaN(this.state.result) ? "NaN" : this.state.result.toString();
        }

        return display;
    }

    override render() {

        return (
            <div id="calculator-border">
                <DisplayUI display={this.getDisplayText()} />
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

export function renderApp() {
    const root = ReactDOM.createRoot(document.getElementById("calculator-container"));
    root.render(<CalculatorUI />);
}
