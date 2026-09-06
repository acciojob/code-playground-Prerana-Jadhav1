
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import './../styles/App.css';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const Playground = () => <p>Hi Welcome to Code Playground</p>;

const NotFound = () => <p>Page not Found</p>;

const Login = ({ isAuthenticated, onLogin, onLogout }) => (
  <div>
    <p>Login</p>
    {isAuthenticated ? (
      <button onClick={onLogout}>Log Out</button>
    ) : (
      <button onClick={onLogin}>Log In</button>
    )}
  </div>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="main-container">
        {/* Do not remove the main div */}
        <p>
          {isAuthenticated
            ? "Logged in, Now you can enter Playground"
            : "You are not authenticated, Please login first"}
        </p>
        <ul>
          <li>
            <Link to="/playground">PlayGround</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute
            exact
            path="/playground"
            component={Playground}
            isAuthenticated={isAuthenticated}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <Login
                isAuthenticated={isAuthenticated}
                onLogin={() => setIsAuthenticated(true)}
                onLogout={() => setIsAuthenticated(false)}
              />
            )}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
