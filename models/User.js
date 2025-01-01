const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    idNumber: { type: String, required: true, unique: true }, 
    fullName: { type: String, required: true }, 
    address: { type: String, required: true },
    role: {
      type: String,
      enum: ["Student", "Staff"], 
      required: true,
    },
    username: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
    yearOfStudy: { type: Number, min: 1, max: 4 }, 
    registeredCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }], 
    creditPoints: { type: Number, default: 0 }, 
  },
  { collection: "users" }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
});

const User = model("User", userSchema);

module.exports = User;
