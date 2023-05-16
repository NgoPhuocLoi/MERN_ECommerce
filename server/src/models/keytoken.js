const { Schema, model } = require("mongoose");

const keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    privateKey: String,
    publicKey: String,
    refreshToken: String,
  },
  {
    timestamps: true,
    collection: "keytokens",
  }
);

module.exports = model("KeyToken", keyTokenSchema);
