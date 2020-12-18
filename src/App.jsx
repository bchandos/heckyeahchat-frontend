import BaseNav from './components/BaseNav';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-700">
      <BaseNav />
      {/* <RegisterForm /> */}
      <LoginForm />
      <Footer />
    </div>
  );
}

export default App;
