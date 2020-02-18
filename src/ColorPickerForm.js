import React, { Component } from 'react';
import Button from "@material-ui/core/Button";

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from "react-color";


class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = { currentColor: "teal", newColorName: "" };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );

        ValidatorForm.addValidationRule('isColorUnique', value =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
    }
    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex })
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        this.props.addNewColor(newColor);
        this.setState({ newColorName: "" });
    }
    render() {
        const { paletteIsFull } = this.props;

        return (
            <div>
                <ChromePicker color={this.state.currentColor} onChangeComplete={this.updateCurrentColor} />
                <ValidatorForm onSubmit={this.handleSubmit} ref='form'>
                    <TextValidator value={this.state.newColorName} name="newColorName" onChange={this.handleChange} validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']}
                    />
                    <Button style={{ backgroundColor: paletteIsFull ? "grey" : this.state.currentColor }} variant="contained" color="primary" type="submit" disabled={paletteIsFull}>
                        {paletteIsFull ? "Palette Full" : "Add Colors"}
                    </Button>

                </ValidatorForm>
            </div>
        )
    }
}

export default ColorPickerForm;