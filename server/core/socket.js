const socketIo = require('socket.io');

module.exports = function(server) {

  let io = socketIo(server);

  io.on('connection', function(socket) {

  });

}
