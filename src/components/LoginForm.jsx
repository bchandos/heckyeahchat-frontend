import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../api/api';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  submitLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    let jwt = await login(form.elements.username.value, form.elements.password.value);
    localStorage.setItem('jwt', jwt);
    this.props.history.push('/chat');
  }
  render() {
    return (
      <div className="w-full max-w-xs m-auto bg-gray-100 rounded p-5">
        <header className="text-center pb-4">
          <i className="material-icons text-4xl">face</i>
          <h1 className="font-bold text-2xl tracking-wider">Login</h1>
        </header>
        <form onSubmit={this.submitLogin}>
          <TextInput type="text" name="username" labelText="Email" />
          <TextInput type="password" name="password" labelText="Password" />
          <div><SubmitButton buttonText="Log In" /></div>
        </form>
        <footer>
          <a class="text-gray-700 hover:text-pink-700 text-sm float-left" href="/password-recovery">Forgot Password?</a>
          <Link to='/register'>
            <span class="text-gray-700 hover:text-pink-700 text-sm float-right">Create Account</span>
          </Link>
        </footer>
      </div>
    )
  }
}

export default withRouter(LoginForm);