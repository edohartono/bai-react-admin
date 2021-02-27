import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import {
    Router,
    Route,
    Switch
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
/*import 'font-awesome/css/font-awesome.min.css';*/
import 'assets/scss/zest-admin.css';
import './assets/scss/custom.scss';
import 'assets/fonts/simple-line-icons.css';
import 'moment/locale/id'

import indexRoutes from 'routes/index.jsx';

const hist = createBrowserHistory();

ReactDOM.render(

    <Router history={hist}>
        <Switch>
            {
                indexRoutes.map((prop, key) => {
                    //console.log(prop.path + prop.key);
                    return (
                        <Route
                            path={prop.path}
                            key={key}
                            component={prop.component}
                        />
                    );
                })
            }
        </Switch>
    </Router>
    , document.getElementById('root'));
