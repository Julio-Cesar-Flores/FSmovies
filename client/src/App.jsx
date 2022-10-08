import './App.css'

import 'primereact/resources/themes/lara-light-indigo/theme.css' // theme
import 'primereact/resources/primereact.min.css' // core css
import 'primeicons/primeicons.css' // icons

import logo from './assets/oura.jpg'

const App = () => (
  <div className='bg'>
    <div className='App'>
      <h1>Oura Movies</h1>
      <img src={logo} alt='Logo' />;
      <div className='card'>
        <p>Películas y más</p>
      </div>
      <p className='read-the-docs'>Login</p>
    </div>
  </div>
)

export default App
