import  express  from "express";
import { createUser , loginUser , deleteUser, getAllUser, getSingleUser, updateUser} from "../controllers/userController.js";
const router = express.Router()
 
import { verifyAdmin,  verifyUser } from "../utils/verifyToken.js";

router.post("/signup" , createUser)
router.post("/login" , loginUser);
router.get("/", verifyAdmin , getAllUser);

router.get("/:id",verifyUser,getSingleUser);
router.put("/:id",verifyUser,updateUser);
router.delete("/:id",verifyUser,deleteUser);

export default router
