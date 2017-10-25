import openSocket from 'socket.io-client';
const SOCKETS_URL = 'https://create-react-express-sockets.herokuapp.com/';
//const SOCKETS_URL = 'http://localhost:3001';
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