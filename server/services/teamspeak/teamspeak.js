var ts = require('node-ts');

function handleResponse(response) {
    return response.response;
}

function stripQueryClients(clients) {
    return clients.filter(function (client) {
        return !client.client_type && client.client_unique_identifier !== 'ServerQuery';
    });
}

var TeamSpeak = function (url, onError) {
    this.client = new ts.TeamSpeakClient(url);
    this.client.on('error', function (error) {
        if (onError && typeof onError === 'function') {
            onError(error);
        }
    });
};

TeamSpeak.prototype.login = function (username, password) {
    ths = this;
    return ths.client.send('login', {
        client_login_name: username,
        client_login_password: password
    })
    .then(function () {
        return ths.client.send('use', { sid: 1 });
    });
};

TeamSpeak.prototype.getClients = function () {
    return this.client.send('clientdblist')
        .then(handleResponse)
        .then(stripQueryClients);
};

TeamSpeak.prototype.getOnlineClients = function () {
    return this.client.send('clientlist', {}, ['away'])
        .then(handleResponse)
        .then(stripQueryClients);
};

TeamSpeak.prototype.getChannel = function (id) {
    return this.client.send('channelinfo', { cid: id })
        .then(handleResponse);
};

TeamSpeak.prototype.getChannels = function () {
    return this.client.send('channellist')
        .then(handleResponse);
};

TeamSpeak.prototype.close = function () {
    return this.client.send('quit');
};

module.exports = TeamSpeak;
