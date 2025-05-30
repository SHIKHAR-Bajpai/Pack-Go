import express from "express";
import { createTour, getAllTour, updateTour, deleteTour, getSingleTour, getTourBySearch, getFeaturedTour, getTourCount , getMaxPrice , getMinPrice , updateTourOrder } from "../controllers/tourController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getAllTour);
router.get("/:id", getSingleTour);
router.post("/", verifyAdmin, upload.single('photo'), async (req, res) => {
    await createTour(req, res);
});
router.put("/:id", verifyAdmin, updateTour);
router.delete("/:id", verifyAdmin, deleteTour);


router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);
router.get("/search/getMinPrice", getMinPrice);
router.get("/search/getMaxPrice", getMaxPrice);
router.post("/updateOrder" , verifyAdmin , updateTourOrder );

export default router;

