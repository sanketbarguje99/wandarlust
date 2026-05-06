const User = require("../models/user");

module.exports.rendersignupform = (req,res) =>{
    res.render("users/signup.ejs");
};


module.exports.signup = async(req,res) =>{
    try{ 
    let {username,email,password} = req.body;
   const newUser = new User({ email, username });
   const registerUser = await User.register(newUser,password);
   req.login(registerUser, (err) => {
    if(err) {
     return next(err);
    }
    req.flash("success","welcome to wanderlust!");
   res.redirect("/listings");

   })

    }catch(e){
       req.flash("error",e.message);
        res.redirect("/signup");

    }
 }

 module.exports.renderloginform = (req,res) =>{
    res.render("users/login");
 };

 module.exports.login = async(req,res) => {
req.flash("success","welcome to wanderlust!");
res.redirect(res.locals.redirectUrl || "/listings");
}

module.exports.logout = (req,res,next) => {
  req.logout((err) =>{
    if(err) {
      next(err); 
    }
    req.flash("success","you are logged out!");
    res.redirect("/listings");
  })
};