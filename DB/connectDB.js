const mongoose = require('mongoose')
const DB_URL="mongodb+srv://kgschool:kgschool@cluster0.q3muasm.mongodb.net/kgschool?retryWrites=true&w=majority"
const connectDB =()=>{
    return mongoose.connect(DB_URL)
    .then(()=>{
        console.log('succesfully kg shcool')
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDB



// const mongoose = require('mongoose')

// const DB_url="mongodb+srv://kgschool:kgschool@cluster0.q3muasm.mongodb.net/kgschool?retryWrites=true&w=majority"

// const connectDB =()=>{
//     return mongoose.connect(process.env.DB_url)
//     .then(()=>{
//         console.log('succesfully kg shcool')
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// }

// module.exports = connectDB