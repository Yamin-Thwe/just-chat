const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 50,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    title: { type: String },
    aboutMe: { type: String },
    dob: { type: Date },
    phone: { type: Number },
    address: { type: String },
    verified: { type: Boolean, required: true },
    friendList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    receivedFriendRequest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    sentFriendRequest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(passportLocalMongoose);

const chatAppDB = mongoose.connection.useDb('chat_app_db');

const User = chatAppDB.model('User', userSchema);

module.exports = User;
