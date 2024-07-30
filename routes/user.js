const express = require("express");
const {handleGetAllUserById, handleGetUserById, handleUpdateGetUserById,handleDeleteUserById,handleCreateUser,} = require("../controllers/user")

const router = express.Router();



// app.get("/users", async(req, res) => {
//     const allDbUser = await User.find({})
//     const html = `
//         <ul>
//             ${allDbUser.map(user => `
//                 <li>
//                     ${user.firstName} - ${user.email}
//                 </li>
//             `).join('')}
//         </ul>`;
//     res.send(html);
// });



// REST API
router.route("/")
    .get(handleGetAllUserById)
    .post( handleCreateUser);

router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateGetUserById) 
    .delete(handleDeleteUserById);




module.exports = router;