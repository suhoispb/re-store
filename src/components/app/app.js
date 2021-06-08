import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from '../pages/home-page';
import CartPage from '../pages/cart-page';
const App = () => {
    return(
        <Switch>
            <Route 
                path="/"
                component ={HomePage}
                exact/>
            <Route 
                path="/1"
                component ={CartPage}
                />
        </Switch>
    )
}

export default App;