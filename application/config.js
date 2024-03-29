'use strict';
/* global __ENVIRONMENT__ */

// __ENVIRONMENT__ is replaced in build or set by Jest
switch(__ENVIRONMENT__)
{
    case 'development':
        module.exports = require('./config/development');
        break;
    case 'qa':
        module.exports = require('./config/qa');
        break;
    case 'production':
        module.exports = require('./config/production');
        break;
    default:
        throw new Error('Invalid ENVIRONMENT value: ' + __ENVIRONMENT__);
}
