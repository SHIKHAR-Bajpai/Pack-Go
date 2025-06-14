import Tour from "../models/Tour.js";


export const getAllTour = async (req, res) => {
    const page = parseInt(req.query.page) || 0; 

    try {
        const tours = await Tour.find({}).populate('reviews').sort({ orderId: 1 })
        res.status(200).json({
            success: true,
            count: tours.length,
            message: "Successful",
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};


export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).populate('reviews');
        if (!tour) {
            return res.status(404).json({ success: false, message: "Tour not found." });
        }
        let fullImageURL = tour.photo;
        res.status(200).json({success: true, message: "Successfully retrieved tour", 
            data: {
                ...tour.toObject(),
                photo: fullImageURL, 
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to retrieve tour" });
    }
}

export const createTour = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image uploaded." });
        }
        const newTour = {
            title: req.body.title,
            city: req.body.city,
            country: req.body.country,
            photo: req.file.path, 
            desc: req.body.desc,
            price: req.body.price,
            maxGroupSize: req.body.maxGroupSize,
            featured: req.body.featured === 'true',
        };

        const tour = new Tour(newTour);
        await tour.save();

        res.status(201).json({
            success: true,
            message: "Tour successfully created",
            data: tour,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to create tour. Try again." });
    }
};

export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });

        if (!updatedTour) {
            return res.status(404).json({ success: false, message: "Tour not found." });
        }

        // console.log(updatedTour);
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedTour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update",
        });
    }
}

export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTour = await Tour.findByIdAndDelete(id);
        if (!deletedTour) {
            return res.status(404).json({ success: false, message: "Tour not found." });
        }

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete",
        });
    }
}

export const getTourBySearch = async (req, res) => {
    const cityQuery = req.query.city;
    if (!cityQuery) {
        return res.status(400).json({ success: false, message: "City parameter is missing" });
    }

    const city = new RegExp(cityQuery, "i"); 
    try {
        const tours = await Tour.find({ city }).populate('reviews');
        if (tours.length === 0) {
            return res.status(404).json({ success: false, message: "No tours found for this city" });
        }
        res.status(200).json({ success: true, message: "Search successful", data: tours });
    } catch (err) {
        // console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true }).populate('reviews').limit(8);
        res.status(200).json({ success: true, message: "Successful", data: tours });
    } catch (err) {
        res.status(404).json({ success: false, message: "Internal server error" });
    }
}

export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({ success: true, message: "Successful", data: tourCount });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getMaxPrice = async (req, res) => {
    try {
        const maxPrice = await Tour.aggregate([
            { $group: { _id: null, maxPrice: { $max: "$price" } } }
        ]);

        if (maxPrice.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tours found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Maximum price retrieved successfully",
            data: maxPrice[0].maxPrice
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};
export const getMinPrice = async (req, res) => {
    try {
        const minPrice = await Tour.aggregate([
            { $group: { _id: null, minPrice: { $min: "$price" } } }
        ]);

        if (minPrice.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tours found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Minimum price retrieved successfully",
            data: minPrice[0].minPrice
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};


export const updateTourOrder = async ( req , res) => {
    //   console.log("RequestBody:", req.body);
      try{
        const updatedTours = req.body;
        const response = updatedTours.map(tour => ({
            updateOne: {
                filter: { _id: tour._id },
                update: {$set: { orderId: tour.order}},
            },
        }));

        const updateResults = await Tour.bulkWrite(response);
        // console.log("Update results: ", updateResults)

        if(updateResults.modifiedCount > 0){
            return res.status(200).json({success: true, message: 'Updated successfully'});
        }else{
            return res.status(400).json({success: false, message: 'Failed to update order'});
        }

      }catch(error){
        console.error("Error updating tour order:", error);
        return res.status(500).json({success: false, message: 'Server error', error: error.message})
      }
};