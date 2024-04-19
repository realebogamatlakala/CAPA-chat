const router = require ("express").Router();
const { catchErrors } = require ("../Handlers/errorHandler");
const chatroomController = require('../controllers/chatroomController');



const auth = require("../middleware/auth");

router.post("/room", auth ,catchErrors(chatroomController.createChatroom));


module.exports = router;