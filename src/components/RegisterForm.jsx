import React from 'react';
import { registerAccount } from '../api/api';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';
import { withRouter } from 'react-router-dom';

class RegisterForm extends React.Component {
  submitRegister = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    let jwt = await registerAccount(form.elements.username.value, form.elements.password.value);
    localStorage.setItem('jwt', jwt);
    // somehow redirect here
    this.props.history.push('/');
  }
  render() {
    return (
      <div className="w-full max-w-xs m-auto bg-gray-100 rounded p-5">
        <header className="text-center pb-4">
          <i className="material-icons text-4xl text-gray-300">face</i>
          <h1 className="font-bold text-2xl tracking-wider">Register</h1>
        </header>
        <form onSubmit={this.submitRegister}>
          <TextInput name="username" type="text" labelText="Email" />
          <TextInput name="password" type="password" labelText="Password" />
          <TextInput name="confirm-password" type="password" labelText="Confirm Password" />
          <SubmitButton buttonText="Register" disabled={false} />
        </form>
        <footer>
          <a class="text-gray-700 hover:text-pink-700 text-sm" href="/password">Forgot Password?</a>
        </footer>
      </div>
    )
  }
}

export default withRouter(RegisterForm);