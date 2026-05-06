const Listing = require("../models/listing.js");


module.exports.index = async(req,res) =>{
   const alllisting =await Listing.find({});
      res.render("listings/index", { alllisting });
};

module.exports.renderNewform = (req, res) => {
  res.render("listings/new");
}

module.exports.ShowListing = async (req, res) => {
  const { id } = req.params;
  const foundListing = await Listing.findById(id)
  .populate({
    path:"reviews",
  populate:{
    path:"author",
},
})
  .populate("owner");

  if (!foundListing) {
    req.flash("error", "Listing You Requested For Does Not Exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing: foundListing });
}

module.exports.createlisting = async (req, res,next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = {url, filename};
  await newlisting.save();
  req.flash("success","New Listing Created!");
  res.redirect("/listings");
    };

    module.exports.renderEditform = async (req, res) => {
        const { id } = req.params;
      const foundListing = await Listing.findById(id);
       if(!foundListing){
        req.flash("error","Listing You Requested For Does Not Exist!");
        res.redirect("/listings");
      }
      let originalImageUrl = foundListing.image.url;
      originalImageUrl.replace("/upload","upload/h_300,w_250");
       res.render("listings/edit",{listing :foundListing, originalImageUrl});
    
        }

    module.exports.updatelisting = async (req, res) => { 
    const { id } = req.params;
     let listing = await Listing.findByIdAndUpdate(id, req.body.listing);

     if(typeof req.file !== "undefined"){
     let url = req.file.path;
     let filename = req.file.filename;
     listing.image = {url, filename};
     await listing.save();
     }
      req.flash("success"," Listing Updated!");
     res.redirect(`/listings/${id}`);
     }

    module.exports.destroylisting = async(req,res)=>{
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
     req.flash("success"," Listing Deleted");
     res.redirect("/listings");
        
}

