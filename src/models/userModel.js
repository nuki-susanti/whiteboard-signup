const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const slugify = require('slugify');
const findOrCreate = require('mongoose-findorcreate');

//name, email, password, role, industry, company name, picture

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: String,
    email: {
        type: String,
        required: true,
        unique: true, //this is not a validator
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false //included or excluded from query results by default
    },
    user_status: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: {
            values: ['Designer', 'Developer', 'QA Engineer', 'Student']
        }
    },
    company_name: String,
    industry: {
        type: String,
        enum: {
            values: ['IT', 'Education', 'Management']
        }
    },
    __v: {
        type: Number, 
        select: false
    },
    reset_password: Date,
    reset_password_token: String,
    reset_password_expires: Date,
    active: {
        type: Boolean,
        default: true, //user default is active 
        select: false
    }
});

//DOCUMENT MIDDLEWARES -> runs before save() or create()
userSchema.pre('save',function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

userSchema.pre('save', async function (next) { //Arrow function doesnt work, 'this' scope is changed
    //Only run this function if password was modified
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre('save', function (next) { 
    if (!this.isModified('password') || this.isNew) return next();

    //To compensate if saving to DB takes longer, ensuring token is always generated after password has been changed
    this.reset_password = Date.now() - 1000;
    next();
});

userSchema.plugin(findOrCreate);

// userSchema.pre(/^find/, async function (next) {
//     //this points to the current query
//     await this.find({ active: { $ne: false } }); //ne -> not equal
//     next();
// })


const User = mongoose.model('User', userSchema); //model

module.exports = User;