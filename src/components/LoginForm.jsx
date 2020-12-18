import React from 'react';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';


class LoginForm extends React.Component {
  render() {
    return (
      <div className="w-full max-w-xs m-auto bg-gray-100 rounded p-5">
        <header className="text-center pb-4">
          <i className="material-icons text-4xl">face</i>
          <h1 className="font-bold text-2xl tracking-wider">Login</h1>
        </header>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextInput name="username" labelText="Email" />
          <TextInput name="password" labelText="Password" />
          <div><SubmitButton buttonText="Log In" /></div>
        </form>
        <footer>
          <a class="text-gray-700 hover:text-pink-700 text-sm float-left" href="/password-recovery">Forgot Password?</a>
          <a class="text-gray-700 hover:text-pink-700 text-sm float-right" href="/register">Create Account</a>
        </footer>
      </div>
    )
  }
}

export default LoginForm;