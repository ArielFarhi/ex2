const User = require('../models/User');

// module.exports = {
//     getUsers,
// }

// async function getUsers(req, res) {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

exports.usersController = {
    async getUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}   // end of usersController object    


