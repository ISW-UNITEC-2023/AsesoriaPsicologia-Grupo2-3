const { createClient } = require('redis');

// Socket required for node redis <-> docker-compose connection
const Redis = createClient({
    password: 'nok66W9r2UZ0Cefr0jjraBLFzpW4YdGt',
    socket: {
        host: 'redis-17019.c14.us-east-1-3.ec2.cloud.redislabs.com',
        port: 17019
    }
});

module.exports = Redis;
