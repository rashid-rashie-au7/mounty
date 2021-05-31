const User = require('../model/userModel')
const geocoder = require('../config/geocoder');
const userRouter = require('../routes/userRouter');


//*********Get User Data */
exports.getUserData = async(req,res) =>{
    try {
        const userData = await User.find();
        res.render('home',{userdata:userData})       
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error'})
    } 
}

//****Get User Creation Form */
exports.getUserCreation = async(req,res) =>{
    res.render('form',{message: req.flash('message')})
}

//********Post User Data */
exports.addUserData = async(req,res) =>{
        let address = req.body.street+" "+req.body.locality+" "+req.body.city+" "+req.body.state+" "+req.body.pincode;
        const loc = await geocoder.geocode(address);
        const data = new User({
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            address: {
                street: req.body.street,
                locality: req.body.locality,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
                cordinate_type: "Point",
                coordinates: [loc[0].longitude,loc[0].latitude]
            }
        })
        try {
            const save = await data.save()
            req.flash('message', 'User Created Successfully');
            res.redirect('/newuser');
        } catch (err) {
            if(err.code === 11000){
                req.flash('message', 'Mobile Already Exist');
                res.redirect('/newuser');
            }
            req.flash('message', `Doesn't Save Data! Server Error`);
            res.redirect('/newuser');
        }
}

exports.getSortedData = async(req,res) =>{
    try {
        const userData = await User.find().sort({createdAt: -1})
        res.render('home',{userdata:userData})       
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error'})
    } 
}