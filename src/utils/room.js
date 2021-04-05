export const generateRoom = () => ({
  members: [],
  speed: 1,
  state: 0,
  video: 'https://cdn.plyr.io/static/blank.mp4',
});

export const generateMember = (username, socket) => ({
  socket: socket.id,
  time: 0,
  username,
});
