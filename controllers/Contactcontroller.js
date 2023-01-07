const contactModel=require('../models/contact.js')

class Contactcontroller{


static contactall=async(req,res)=>{
    
    const getall=await contactModel.find()
    res.status(200).json({
        success:true,
        getall
    })
}



 static contactinsert = async(req,res)=>{
    console.log(req.body);
    try{
        
    res.setHeader("Access-Control-Allow-Origin","*");
    const contact=await contactModel.create(req.body);
    
    res.status(201).json({
        success:true,
        contact
    })
    }catch(err){
        console.log(err)
    }
    
        
    }

    



}

module.exports=Contactcontroller

