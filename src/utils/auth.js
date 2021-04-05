import isLength from 'validator/lib/isLength';
import { generateMember, generateRoom } from './room';

export const authMiddleware = (socket, next) => {
  let { username, room } = socket.handshake?.query;

  if (!username || !room) {
    socket.emit('kick', { reason: 'ERROR_MISSING_CREDENTIALS' });
    return socket.disconnect();
  }

  const validUsername =
    typeof username === 'string' &&
    isLength(username.trim(), { min: 1, max: 30 });

  if (!validUsername) {
    socket.emit('kick', { reason: 'ERROR_INVALID_USERNAME' });
    return socket.disconnect();
  }

  const validRoom =
    typeof room === 'string' && isLength(room.trim(), { min: 1, max: 30 });

  if (!validRoom) {
    socket.emit('kick', { reason: 'ERROR_INVALID_ROOM' });
    return socket.disconnect();
  }

  username = username.trim();
  room = room.trim();

  if (!socket.server.rooms[room]) {
    console.log(`Generating room: '${room}'`);
    socket.server.rooms[room] = generateRoom();
  }

  socket.server.rooms[room].members.push(generateMember(username, socket));

  socket.username = username;
  socket.room = room;

  socket.join(socket.room);
  socket.to(socket.room).emit('member:join', { username: socket.username });

  socket.emit('join', {
    state: socket.server.rooms[room].state,
    time: Math.max.apply(
      Math,
      socket.server.rooms[room].members.map(member => member.time)
    ),
    video: socket.server.rooms[room].video,
  });

  next();
};
