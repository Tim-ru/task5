import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Main } from '@pages/main_home';
import { More } from '@pages/main_more';

function Routes() {
    return (
                <Switch >
                    <Route path="/main/more" component={More} />
                    <Route path="/main/home" component={Main} />
                </Switch>

    );
}

export default Routes;