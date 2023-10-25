import bcrypt from "bcrypt"
import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/projet3WAdb', { useNewUrlParser: true });

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
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return errorCodes.bcrypt
        } else if (isMatch) {
          console.log('Password is correct');
          return user
        } else {
          console.log('Password is incorrect');
          return errorCodes.wrongPassword
        }
    });
}

// models _______________________________________________

const User = mongoose.model('User', userSchema);
const Favoris = mongoose.model('Favoris', favorisSchema);
const Article = mongoose.model('Article', articleSchema);

// functions User
export async function newUser(username, password){
    const newUser = new User({
        username: username,
        password: password,
        country:  "fr",
    });
    return await newUser.save((err, user) => {
        if (err && err.code === 11000) {
            // 11000 is the MongoDB error code for duplicate key
            console.error('Duplicate username. User with this username already exists.');
            return errorCodes.unique
        } else if (err) {console.error(err); return errorCodes.mongoose;
        } else {
            console.log('User saved successfully.');
            return true
        }
    });
}
export async function findUser(username, password){
    return await newUser.findOne({
        username: username,
    }, (err, user) => {
        if (err) { console.error(err); return errorCodes.mongoose; }
      
        if (user) {
          // User with the provided username and password exists
          console.log('User found:', user);
          return bcryptTest (password, user)
        } else {
          // No user found with the provided username and password
          console.log('User not found');
          return errorCodes.notFound;
        }
    })
}
export async function updateUserCountry( id, country ){
    const filter  = { _id: id }
    const update  = { country: country }
    const options = { new: true };
    return await newUser.findOneAndUpdate(filter, update, options, (err, updatedUser) => {
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