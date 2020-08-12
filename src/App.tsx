import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import RenderedPost from "./components/RenderedPost/renderedPost";
import Nav from "./components/nav";
import NewPost from "./components/NewPost/NewPost";
import EditPost from "./components/EditPost/EditPost";

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/posts' component={Posts}/>
                    <Route path='/render-post:id' component={RenderedPost}/>
                    <Route path='/new-post' component={NewPost}/>
                    <Route path='/edit-post:id' component={EditPost}/>
                </Switch>
            </div>
        </Router>
    );
}
export default App;