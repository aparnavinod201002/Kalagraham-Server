const subcategory = require('../Model/SubCategorySchema')


exports.SubCategoryreg = async(req,res)=>{

    const {categoryname,name}= req.body
    try{
        const existingSubCategory = await subcategory.findOne({categoryname,name})

    if(existingSubCategory){
        res.status(406).json("Sub Category already Registered")
    }else{
        const newSubCategory = new subcategory({
            categoryname,name
        })
        await newSubCategory.save()
        res.status(200).json(newSubCategory)
    }
    
    
        }
        catch(err){
            res.status(401).json(err)
        }
    
        
    }

    //get
    exports.getsubcategory=async(req,res)=>{
        try{
            const getsubcategory = await subcategory.find()
            res.status(200).json(getsubcategory)



        }catch(err)
        {
            res.status(401).json(err)
        }
    }
    //
    exports.getSubcategoryByCategory = async (req, res) => {
        const { category } = req.params;
    
        try {
            const subcategories = await subcategory.find({ categoryname: category }).sort({ name: 1 }); // Alphabetical sorting
            if (subcategories.length === 0) {
                return res.status(404).json({ message: "No subcategories found for this category" });
            }
            res.status(200).json(subcategories);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while fetching subcategories" });
        }
    };



    exports.deleteSubCategory = async(req,res)=>{
        const {subcategoryId} = req.params
      
        try{
            const deleteData = await subcategory.findByIdAndDelete(subcategoryId)
            res.status(200).json(deleteData)
        }catch(err){
            res.status(401).json(err)
        }
      }
    
    