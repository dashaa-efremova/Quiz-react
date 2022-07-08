import React, {Component} from "react";
import './Auth.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

function validateEmail(email)
{
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email:{
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Уведіть правильний email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Уведіть правильний пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {

    }

    registerHandler = () => {

    }

    submitHandler = event => {
        event.preventDefault() // сабміт не відправляє форму
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() != "" && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls ={...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        console.log(formControls)

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type ={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className="Auth">
                <div>
                    <h1>Авторизація</h1>

                    <form onSubmit={this.submitHandler} className='AuthForm'>

                        {this.renderInputs()}

                        <Button type = 'primary' onClick = {this.loginHandler} disabled={!this.state.isFormValid}>Увійти</Button>
                        <Button type = 'success' onClick = {this.registerHandler}disabled={!this.state.isFormValid}>Зареєструватись</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth