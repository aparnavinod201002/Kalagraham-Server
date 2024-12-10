const category = require('../Model/CategoryRegSchema')

exports.CategoryReg = async(req,res)=>{

    const {name}= req.body
    try{
        const existingCategory = await category.findOne({name})

    if(existingCategory){
        res.status(406).json("Category already Registered")
    }else{
        const newCategory = new category({
            name
        })
        await newCategory.save()
        res.status(200).json(newCategory)
    }
    
    
        }
        catch(err){
            res.status(401).json(err)
        }
    
        
    }

   // get
    exports.getcategory=async(req,res)=>{
        try{
            const getCategory = await category.find()
            res.status(200).json(getCategory)
        }catch(err)
        {
            res.status(401).json(err)
        }
    }
    
     //delete

exports.deleteCategory = async(req,res)=>{
    const {categoryId} = req.params
  
    try{
        const deleteData = await category.findByIdAndDelete(categoryId)
        res.status(200).json(deleteData)
    }catch(err){
        res.status(401).json(err)
    }
  }
    
    