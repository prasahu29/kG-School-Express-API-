const imagemodel = require('../models/image.js')
const cloudinary = require('cloudinary').v2

class Imagecontroller {

    static imageinsert = async (req, res) => {
        try {

            const file = req.files.images;
            // console.log(file)
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'KG SCHOOL',
                width: 200,
            })
            const doc = new imagemodel({

                images: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url

                }

            })
            await doc.save()

            res
                .status(201)
                .send({ status: "success", message: "image Successfully 😃🍻" });

        } catch (error) {
            console.log(error)
        }
    }


    static imageupdate = async (req, res) => {
        try {
            //console.log(req.body)
            const user = await imagemodel.findById(req.params.id);//params
             
            //console.log(user)
            const image_id = user.images.public_id  
            await cloudinary.uploader.destroy(image_id)

            const file = req.files.images;
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'KG SCHOOL',
                width: 200
            })

            const updateImage = await imagemodel.findByIdAndUpdate(req.params.id, {
                images: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            });
            res.status(200).json({
                success: true,
                updateImage
            })


        }
        catch (err) {
            console.log(err)
        }
    }

    static imagedelete = async (req, res) => {
        try {

            const imagedelete = await imagemodel.findById(req.params.id);

            if (!imagedelete) {
                return res
                    .status(200)
                    .send({ status: "500", message: "  " });
            }

            const imageid = imagedelete.images.public_id;

            await cloudinary.uploader.destroy(imageid)


            await imagemodel.remove(imagedelete)
            res
                .status(200)
                .send({ status: "deleted successfully", message: "  Successfully IMAGE deleted 🥂🍻" });

        }
        catch (err) {
            console.log(err)
        }
    }


}

module.exports = Imagecontroller;