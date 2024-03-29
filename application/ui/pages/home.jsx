/** @jsx React.DOM */
'use strict';

var React           = require('react');
var Fluxxor         = require('fluxxor');
var FluxMixin       = Fluxxor.FluxMixin(React);
var Link            = require('react-router').Link;
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var config = require('../../config');

module.exports = React.createClass({

    displayName : 'HomeModule',

    mixins : [FluxMixin, StoreWatchMixin('TokenStore')],

    getStateFromFlux : function()
    {
        var store = this.getFlux().store('TokenStore');

        return {
            loading  : store.loading,
            loggedIn : store.loggedIn
        };
    },

    render : function()
    {
        if (this.state.loggedIn) {
            return (
                <div>
                    <p>
                        <a href={'http://' + config.api.hostname + '/social-login/github/link'}>
                            Link GitHub account
                        </a>
                        <br />
                        <a href={'http://' + config.api.hostname + '/social-login/facebook/link'}>
                            Link Facebook account
                        </a>
                        <br />
                        {/* Google only allows 'localhost" as a non-public domain for callback URLs. */}
                        <a href='http://localhost/social-login/google/link'>
                            Link Google account
                        </a>
                        <br />
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <p>
                        <Link to='login'>Log in with credentials</Link>
                    </p>
                    <p>
                        <Link to='register'>Register</Link>
                    </p>
                    <p>
                        Or&nbsp;
                        <a href={'http://' + config.api.hostname + '/social-login/github'}>
                            log in with GitHub
                        </a>.
                    </p>
                    <p>
                        Or&nbsp;
                        <a href={'http://' + config.api.hostname + '/social-login/facebook'}>
                            log in with Facebook
                        </a>.
                    </p>
                    <p>
                        {/* Google only allows "localhost" as a non-public domain for callback URLs. */}
                        Or&nbsp;
                        <a href={'http://localhost/social-login/google'}>
                            log in with Google
                        </a>.
                    </p>
                </div>
            );
        }
    }

});
