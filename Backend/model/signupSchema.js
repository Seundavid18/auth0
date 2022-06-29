const mongoose =  require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName:  {
    type:String,
    trim: true 
    },
        username:{
            type:String,
            // required:[true, "Please enter your username"],
            trim: true
        },
  email: {
      type: String,
      // required: [true, 'Please Enter Email Address'],
      unique: true,
      lowercase: true,
      trim: true
    },
  password:  {
    type: String,
    // required: [true, 'Please enter a password'],
    trim: true,
},
    
},

    {timestamps: true}

);

const User = mongoose.model('user', userSchema)

module.exports = User