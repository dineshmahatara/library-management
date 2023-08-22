
const userController = require('../controllers/userControllers')

const User = require('../models/userModel'); // Import your User model
// const sendRegistrationEmail = require('../middleWare/emailMiddleware');
// const { generateRandomToken } = require('../utils/tokenUtils'); // Import your token generation function


exports.createUser = async (userData) => {
        console.log('Received userData:', userData);

    try {
        return await userController.createUser(userData);
    } catch (error) {
        throw error;
    }
}

exports.getUserWithTotalBorrowedBooks = async (userId) => {
    try {
        const user = await User.findById(userId)
            .populate('borrowed_books', 'title') // Populate only with book title
            .exec();

        const totalBorrowedBooks = user.borrowed_books.length;

        return {
            user: user,
            totalBorrowedBooks: totalBorrowedBooks
        };
    } catch (error) {
        throw error;
    }
};
// exports.login = async (phone, password) => {
//     try {
//         const data = await User.findOne({ phone });
//         if (data) {
//             const isMatched = await bcrypt.compare(password, data.password);
//             if (isMatched) {
//                 return {
//                     success: true,
//                     role: data.role,
//                     id: data._id,
//                     name: data.name
//                 };
//             } else {
//                 return { success: false, message: 'Login Failed' };
//             }
//         } else {
//             return { success: false, message: 'User does not exist' };
//         }
//     } catch (error) {
//         throw error;
//     }
// };
exports.login = async(req, res) => {
    //find if the user exists
   const data = await User.findOne({$or:[{email:  req.body.email}, {userName: req.body.userName }, {phone:req.body.phone}]})
   console.log({"your data is": data})
   if(data){
    
       //db password ---->compare------> 
        const isMatched =await bcrypt.compare(req.body.password, data.password); // false
        //generate a jwt token for him
        const {password, ...allOtherItem} = req.body
        const token = await jwt.sign(allOtherItem, process.env.SECRET_KEY, { expiresIn: '12h'  });
        if(isMatched && token){
            res.json({
                msg: "login success",
                isLoggedIn: true,
                token: token,
                id: data._id,
                role: data.role,
                name: data.name
            })
            
            // const {password, ...remainingDetails} = data
            // res.json({
            //     ...remainingDetails,
            //     msg: "login success",
            //     isLoggedIn: true,
            //     token: token
            // })
        }else{
            res.json({
                msg: "login failed",
                isLoggedIn: false
            })
        }
      
   }else{
    res.json({
        msg: "invalid credentials",
        isLoggedIn: false
    })
   }

}

// exports.resendActivationLink = async (phone) => {
//   try {
//     // Find the user by phone
//     const user = await User.findOne({ phone });

//     if (!user) {
//       throw new Error('User not found');
//     }

//     // Generate a new activation token and update user's details
//     user.generateActivationToken(); // Use the method you defined in userModel.js
//     await user.save();

//     // Send the new activation link using the same emailMiddleware function
//     const activationLink = `http://localhost:4000/api/activate?token=${user.activationToken}`;
//     sendRegistrationEmail(user, activationLink);

//     return 'Activation link has been resent';
//   } catch (error) {
//     throw error;
//   }
// };
