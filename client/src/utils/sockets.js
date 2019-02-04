import openSocket from 'socket.io-client';
const socket = openSocket();

const sockets = {
    listenForMessage: (callback) => {
        // us listening for any event for message
        socket.on('message', (data) => {
            callback(data);
        });
    },

    sendMessage: (data) => {
        // us sending an event of message with any data
        socket.emit('message', data);
    }
};
export { sockets };