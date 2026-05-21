const initSockets = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);
    socket.on("board:join",  (boardId) => socket.join(`board:${boardId}`));
    socket.on("board:leave", (boardId) => socket.leave(`board:${boardId}`));
    ["card:moved","card:updated","card:created","card:deleted","list:updated"].forEach((event) => {
      socket.on(event, (data) => socket.to(`board:${data.boardId}`).emit(event, data));
    });
    socket.on("disconnect", () => console.log(`🔌 Disconnected: ${socket.id}`));
  });
};
module.exports = { initSockets };
