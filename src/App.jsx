import BaseNav from './components/BaseNav';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Chat from './components/Chat';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-gray-700">
        <BaseNav />
        <Switch>
          <Route path='/register'>
            <RegisterForm />
            <Footer />
          </Route>
          <Route path='/chat'>
            <Chat />
          </Route>
          <Route path='/'>
            <LoginForm />
            <Footer />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
