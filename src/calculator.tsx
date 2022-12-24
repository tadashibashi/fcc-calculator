import * as React from "react";
import * as ReactDOM from "react-dom/client"

export namespace Calculator {
    const Operator = {
        Add: '+',
        Sub: '-',
        Mult: 'x',
        Div: '/'
    };
    
    interface ButtonProps {
        onClick: (button: ButtonComponent) => void;
        symbol: string;
    }
    
    class ButtonComponent extends React.Component<ButtonProps> {
        constructor(props: ButtonProps) {
            super(props);
    
            this.clickHandler = this.clickHandler.bind(this);
        }
    
        clickHandler(event: React.MouseEvent) {
            if (this.props.onClick)
                this.props.onClick(this);
        }
        render() {
            return (
                <button
                    className="btn-square" 
                    onClick={this.clickHandler}>
                        {this.props.symbol}
                </button>);
        }
    }
    
    interface CalculatorState {
        result: number,
        operator: string,
        first: string,
        second: string,
        currentInput: number,
        hasPoint: boolean
    }
    
    function defaultCalculatorState(): CalculatorState {
        return {
            result: 0,
            operator: '',
            first: '',
            second: '',
            currentInput: 0,
            hasPoint: false,
        }
    }
    
    class CalculatorComponent extends React.Component<{}, CalculatorState> {
        constructor(props) {
            super(props);

            this.state = {
                result: 0,
                operator: '',
                first: '',
                second: '',
                currentInput: 0,
                hasPoint: false
            };
    
            this.clickHandler = this.clickHandler.bind(this);
        }
    

        clickHandler(button: ButtonComponent) {
            switch(button.props.symbol) {
                case '1': case '2': case '3': case '4': case '5': case '6': case '7':
                    case '8': case '9':
                    this.setState((state) => {
                        const newState: any = {};
                        if (state.currentInput === 0) {
                            newState.first = state.first + button.props.symbol;
                        } else {
                            newState.second = state.second + button.props.symbol;
                        }
    
                        return newState;
                    });
                break;
    
                case '.':
                    if (!this.state.hasPoint) {
                        if (this.state.currentInput === 0) {
                            this.setState(state => ({
                                hasPoint: true,
                                first: state.first + '.'
                            }));
                        } else {
                            this.setState(state => ({
                                hasPoint: true,
                                second: state.second + '.'
                            }));
                        }
                    }
                break;
    
                case Operator.Add: case Operator.Div: case Operator.Mult: case Operator.Sub:
                    if (this.state.currentInput === 0) {
                        this.setState({ operator: button.props.symbol, currentInput: 1, hasPoint: false });
                    }
                break;
                
                case '=':
                    this.calculate();
                break;
    
                default:
                    console.log(`Unknown symbol: '${button.props.symbol}'`);
                break;
            }
        }
    
        clear() {
            this.setState({
                first: '',
                second: '',
                currentInput: 0,
                hasPoint: false,
                result: 0,
                operator: ''
            });
        }
    
        calculate() {
    
            if (this.state.currentInput > 0 && this.state.second !== '') {
                let result;
                const first = parseFloat(this.state.first);
                const second = parseFloat(this.state.second);
    
                switch(this.state.operator) {
                    case Operator.Add:
                        result = first + second;
                    break;
                    case Operator.Sub:
                        result = first - second;
                    break;
                    case Operator.Div:
                        result = first / second;
                    break;
                    case Operator.Mult:
                        result = first * second;
                    break;
                    default:
                        result = 0;
                        console.error("Unknown operator: \"" + this.state.operator + "\"");
                    break;
                }
    
    
                console.log(`${this.state.first} ${this.state.operator} ${this.state.second} = ${result}`);
    
                this.setState({
                    first: '',
                    second: '',
                    currentInput: 0,
                    hasPoint: false,
                    result,
                    operator: ''
                });
            }
    
        }
    
        render() {
            return (
                <div>
                    <ButtonComponent symbol="1" onClick={this.clickHandler} />
                    <ButtonComponent symbol="2" onClick={this.clickHandler} />
                    <ButtonComponent symbol="3" onClick={this.clickHandler} />
                    <ButtonComponent symbol="4" onClick={this.clickHandler} />
                    <ButtonComponent symbol="5" onClick={this.clickHandler} />
                    <ButtonComponent symbol="6" onClick={this.clickHandler} />
                    <ButtonComponent symbol="7" onClick={this.clickHandler} />
                    <ButtonComponent symbol="8" onClick={this.clickHandler} />
                    <ButtonComponent symbol="9" onClick={this.clickHandler} />
                    <ButtonComponent symbol="." onClick={this.clickHandler} />
                    <ButtonComponent symbol={Operator.Add} onClick={this.clickHandler} />
                    <ButtonComponent symbol={Operator.Sub} onClick={this.clickHandler} />
                    <ButtonComponent symbol={Operator.Mult} onClick={this.clickHandler} />
                    <ButtonComponent symbol={Operator.Div} onClick={this.clickHandler} />
                    <ButtonComponent symbol="=" onClick={this.clickHandler} />
                </div>
            );
        }
    }
    
    export function render() {
        const root = ReactDOM.createRoot(document.getElementById("calculator-container"));
        root.render(<CalculatorComponent />);
    }
}
