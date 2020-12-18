import React from 'react';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';

class RegisterForm extends React.Component {
  render() {
    return (
      <div className="w-full max-w-xs m-auto bg-gray-100 rounded p-5">
        <header className="text-center pb-4">
          <i className="material-icons text-4xl text-gray-300">face</i>
          <h1 className="font-bold text-2xl tracking-wider">Register</h1>
        </header>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextInput name="username" labelText="Email" />
          <TextInput name="password" labelText="Password" />
          <TextInput name="confirm-password" labelText="Confirm Password" />
          <div><SubmitButton buttonText="Register" /></div>
        </form>
        <footer>
          <a class="text-gray-700 hover:text-pink-700 text-sm" href="/password">Forgot Password?</a>
        </footer>
      </div>
    )
  }
}

export default RegisterForm;