import bcrypt from "bcrypt"
import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/projet3WAdb', { useNewUrlParser: true });
//                              host  port  db.name
// "Listening on","attr":{"address":"127.0.0.1"}}
// sg":"Waiting for connections","attr":{"port":27017,"ssl":"off"}}

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

export const errorCodes = {
  unique:   1,
  mongoose: 2,
  notFound: 3,
  bcrypt:   4,
  wrongPassword:   5,
}

// schemas _________________________________________

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country:  String,
});
const favorisSchema = new Schema({
    userId:     { type: Number, required: true },
    articleId:  { type: Number, required: true },
});
const articleSchema = new Schema({
    author:     String,
    content:    { type: [String, null], default: null },
    description:{ type: [String, null], default: null },
    publishedAt:String, //"2023-10-23T21:21:00Z"
    source: {
        id:   String,
        name: String,
    },
    title:  String,
    url:    String,
    urlToImage: { type: [String, null], default: null }
})

// security ______________________________________________

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) { return next();}

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err);}
    bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) { return next(err);}
        user.password = hash;
        next();
    });
  });
});
async function bcryptTest (password, user){
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        reject(errorCodes.bcrypt)
      } else if (isMatch) {
        console.log('Password is correct');
        resolve(user)
      } else {
        console.log('Password is incorrect');
        resolve(false)
      }
    });
  })
}

// models _______________________________________________

const User = mongoose.model('User', userSchema);
const Favoris = mongoose.model('Favoris', favorisSchema);
const Article = mongoose.model('Article', articleSchema);


// functions User :

export async function newUser(username, password){
  const newUser = new User({
      username: username,
      password: password,
      country:  "fr",
  });
  
  try {
    const user = await newUser.save();
    console.log('User saved successfully.');
    return true;
  } catch (err) {
    if (err.code === 11000) {
      // 11000 is the MongoDB error code for duplicate key
      console.error('Duplicate username. User with this username already exists.', errorCodes.unique);
      return errorCodes.unique;
    } else {
      console.error(err);
      return errorCodes.mongoose;
    }
  }
}

export async function findUser(username, password){
    try {
      const user = await User.findOne({ username: username });
      if (user) {
        // User with the provided username exists
        console.log('User found:', user.username, user.country, user._id);
        return await bcryptTest (password, user) // compare passwords
      } else {
        // No user found with the provided username
        console.log('User not found');
        return errorCodes.notFound;
      }
    } catch (err) { if (err) {return errorCodes.mongoose } }
}
export async function updateUserCountry( id, country ){
    const filter  = { _id: id }
    const update  = { country: country }
    const options = { new: true };
    return await User.findOneAndUpdate(filter, update, options, (err, updatedUser) => {
        if (err) { console.error(err); return errorCodes.mongoose;}
      
        if (updatedUser) {
          console.log('User updated:', updatedUser);
          return true
        } else {
          console.log('User not found or password does not match.');
          return errorCodes.notFound
        }
    })
}

// functions news
