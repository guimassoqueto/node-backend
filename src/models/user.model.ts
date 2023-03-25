import { Schema, Document, model } from "mongoose";


export interface IUser extends Document {
  name: string; 
  email: string; 
};


const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true}); // insere uma data sempre que um novo usuário é adicionado


const User = model<IUser>('User', userSchema);
export default User;