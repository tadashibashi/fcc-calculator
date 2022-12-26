import * as React from "react";
import { KeyDisplay } from "../Common";

export interface ButtonProps {
    onClick: (button: ButtonUI) => void;
    symbol: KeyDisplay;
    id?: string;
}

export class ButtonUI extends React.Component<ButtonProps> {
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
                id={this.props.id ? this.props.id : "btn-calc-" + this.props.symbol.Js}
                className="btn-square" 
                onClick={this.clickHandler}>
                    {this.props.symbol.Display}
            </button>);
    }
}