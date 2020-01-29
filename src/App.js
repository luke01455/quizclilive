import React,  { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth'
import './App.scss'
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Spinner from './components/spinner/spinner.component'
import Header from './components/header/header.component'
import Login from './pages/login'
import Register from './pages/register'

const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const QuizPage = lazy(() => import('./pages/quiz-page/quiz-page.component'))
const AccountPage = lazy(() => import('./pages/account/account-page.component'))

const App = () => {
  
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
        <Header />
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route path="/quiz" component={QuizPage} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/account" component={AccountPage} />
          </Suspense>
        </Switch>
        </BrowserRouter>
        </AuthProvider>
    </div>
  );
};

export default App;
