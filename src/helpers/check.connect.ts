import mongoose from "mongoose";

export const countConnect = () => {
  const numberConnection = mongoose.connections.length;

  console.log("Number of connections:: ", numberConnection);

  return numberConnection;
};
