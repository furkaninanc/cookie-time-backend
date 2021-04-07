export const generateUsername = (username, room, socket) => {
  if (
    socket.server.rooms[room].members.some(
      member => member.username === username
    )
  ) {
    return generateUsername(`${username} (2)`, room, socket);
  }

  return username;
};

export const generateRoom = () => ({
  members: [],
  speed: 1,
  state: 0,
  video: '',
});

export const generateMember = (username, socket) => ({
  socket: socket.id,
  time: 0,
  username,
});
