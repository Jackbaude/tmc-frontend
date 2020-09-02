import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import RenderedPost from "./components/RenderedPost/RenderedPost";
import Nav from "./components/nav";
import OldNewPost from "./components/NewPost/OldNewPost";
import EditPost from "./components/EditPost/EditPost";
import Layout from "./components/layout";
import NewPost from "./components/NewPost/NewPost";
import Archive from "./components/Archive/Archive";
import About from "./components/About/About";

const App = () => {
    return (
        <Router>
            <div>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/about' component={About}/>
                        <Route path='/posts' component={Posts}/>
                        <Route path='/render-post/:id' component={RenderedPost}/>
                        <Route path='/new-post' component={NewPost}/>
                        <Route path='/edit-post/:id' component={EditPost}/>
                        <Route path='/archive' component={Archive}/>
                    </Switch>
                </Layout>
            </div>
        </Router>
    );
}
export default App;