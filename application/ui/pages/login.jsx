/** @jsx React.DOM */
'use strict';

var React           = require('react');
var Fluxxor         = require('fluxxor');
var FluxMixin       = Fluxxor.FluxMixin(React);
var Link            = require('react-router').Link;
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var config = require('../../config');
var Input  = require('../components/form/input');

module.exports = React.createClass({

    displayName : 'LoginPage',

    mixins : [FluxMixin, StoreWatchMixin('TokenStore')],

    loginWithGithubUrl : config.loginWithGithubUrl,

    getInitialState : function()
    {
        return {
            email        : '',
            password     : ''
        };
    },

    componentWillMount : function()
    {
        if (this.state.loggedIn) {
            this.getFlux().actions.navigate('home');
        }
    },

    handleSubmit : function(event)
    {
        // Don't let the browser submit the form
        event.preventDefault();

        this.getFlux().actions.auth.login(
            this.state.email,
            this.state.password
        );
    },

    getStateFromFlux : function()
    {
        var store = this.getFlux().store('TokenStore');

        return {
            loading  : store.loading,
            loggedIn : store.loggedIn,
            hasError : store.error
        };
    },

    updateStateValue : function(key, value)
    {
        var stateChanges = {};

        stateChanges[key] = value;

        this.setState(stateChanges);
    },

    renderErrorMessage : function()
    {
        if (this.state.hasError) {
            return <p>Authentication Failed</p>;
        }

        return null;
    },

    render : function()
    {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        Login:
                    </p>
                    <label htmlFor="email">Email:</label>
                    <Input
                        type     = "text"
                        name     = "email"
                        onChange = {this.updateStateValue.bind(this, 'email')}
                        value    = {this.state.email}
                    />
                    <label htmlFor="password">Password:</label>
                    <Input
                        type     = "password"
                        name     = "password"
                        onChange = {this.updateStateValue.bind(this, 'password')}
                        value    = {this.state.password}
                    />
                    <input type="submit" value="Log in" />
                    {this.renderErrorMessage()}
                </form>
                <Link to='home'>Home</Link>
            </div>
        );
    }

});
