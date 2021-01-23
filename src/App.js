import React from "react";
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Pizza from './components/Pizza';

const App = () => {
  return (

    <div>
        <div>
            <h1>Lambda Eats</h1>    
            <div>
                <Link to="/">Home</Link>
                <Link to="/pizza">Pizza</Link>
            </div>
        </div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/pizza" component={Pizza} />
        </Switch>
    </div>
   
    
      

  );
};
export default App;
