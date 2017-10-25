import openSocket from 'socket.io-client';
const SOCKETS_URL = 'http://localhost:3001';
const socket = openSocket(SOCKETS_URL);

const sockets = {
    listenForMessage: (callback) => {
        socket.on('message', (data) => {
            callback(data);
        });
    },

    sendMessage: (data) => {
        socket.emit('message', data);
    }
};
export { sockets };