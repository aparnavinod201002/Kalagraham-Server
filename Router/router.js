const express = require('express')
const router = express.Router()
const RegisterController  = require('../Controller/RegisterController')
const DistrictController  = require('../Controller/DistrictController')
const LocationController  = require('../Controller/LocationController')
const CategoryController = require('../Controller/CategoryController')
const SubCategoryController = require('../Controller/SubCategoryController')
const CarnivalController = require('../Controller/CarnivalController')
const requestController = require('../Controller/requestController')
const ImageGallaryController = require('../Controller/ImageGallaryController')
const multerConfig = require('../MiddleWare/multerMiddleware')
const VideoGallaryController = require('../Controller/VideoGallaryController')
const BookingController = require('../Controller/BookingController')
const PaymentController = require('../Controller/PaymentController')
const TestimonyController = require('../Controller/TestimonyController')

//register

router.post('/register',RegisterController.users)
router.post('/login',RegisterController.login)
router.post('/DistrictReg',DistrictController.DistrictReg)
router.get('/districts',DistrictController.getdistricts)
router.post('/LocationReg',LocationController.LocationReg)
router.get('/locations',LocationController.getlocations)
router.post('/CategoryReg',CategoryController.CategoryReg)
 router.get('/category',CategoryController.getcategory)
 router.post('/subcategory',SubCategoryController.SubCategoryreg)
 router.get('/subcategory',SubCategoryController.getsubcategory)
 router.get('/locations/:district',LocationController.getLocationsByDistrict);
 router.post('/carnival',multerConfig.single('carnivalImage'),CarnivalController.CarnivalReg);
 router.get('/carnivalget',CarnivalController.getcarnival)
 router.get('/carnivals/:location',CarnivalController.CarnivalData);
 router.get('/subcategory/:category',SubCategoryController.getSubcategoryByCategory);
 router.post('/request',requestController.requestReg);
 router.get('/request/:userId',requestController.getRequestById);
 router.post('/imagegallary',multerConfig.single('image'),ImageGallaryController.ImageGallaryReg);
 router.get('/imagegallaryget/:userId',ImageGallaryController.getImageGallaryById)
 router.post('/videogallary',multerConfig.single('coverimage'),VideoGallaryController.VideoGallaryReg);
 router.get('/videogallaryget/:userId',VideoGallaryController.getVideoGallaryById)
 router.get('/carnivalid/:carnivalid',CarnivalController.getCarnivalById);
 router.post('/booking',BookingController.BookingReg)
 router.post('/payment',PaymentController.handlePayment)
 router.get('/user',RegisterController.getUsers);
 router.get('/Booking/:userId',BookingController.getBookingById);
 router.get('/carnival/:id',CarnivalController.getCarnivalDetails);
 router.get('/artist',RegisterController.getArtists);
 router.get('/payment/:userId',PaymentController.getPaymentById);
 router.post('/reply',requestController.postReply)
 router.get('/PaymentByBooking/:id',PaymentController.getPaymentByByookingId);
 router.get('/MyProfile/:userId',RegisterController.getuser);
 router.delete('/booking/DeleteBooking/:bookingId',BookingController.deleteBooking);
 router.delete('/carnival/DeleteBooking/:carnivalId',CarnivalController.deleteCarnival);
 router.delete('/category/DeleteCategory/:categoryId',CategoryController.deleteCategory);
 router.delete('/district/DeleteDistrict/:districtId',DistrictController.deleteDistrict);
 router.delete('/location/DeleteLocation/:locationId',LocationController.deleteLocation);
 router.delete('/subcategory/DeleteSubCategory/:subcategoryId',SubCategoryController.deleteSubCategory);
 router.delete('/imageGallary/DeleteImageGallary/:imagegallaryId',ImageGallaryController.deleteImageGallary);
 router.delete('/videoGallary/DeleteVideoGallary/:videogallaryId',VideoGallaryController.deleteVideoGallary);
 router.delete('/request/DeleteRequest/:requestId',requestController.deleteRequest);
 router.post('/forgotpassword',RegisterController.forgotpassword)
 router.put('/editimage',multerConfig.single('image'),ImageGallaryController.editImage)
 
 router.get('/loginemail/:email',RegisterController.getuserByEmail);
 router.get('/totalIncome',PaymentController.getTotalIncome);
 router.get('/morecarnival',BookingController.getMoreCarnival);
 
 router.get('/mostparticipation',requestController.getMostRequested);
 router.post('/testimony',TestimonyController.TestimonyReg)
 router.get('/gettestimony',TestimonyController.TestimonyGet)

 
module.exports = router