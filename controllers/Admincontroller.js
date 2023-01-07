const adminModel = require('../models/admin.js')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')

class Admincontroller {
  static adminregistration = async (req, res) => {
    res.header('Access-Control-Allow-Origin', "*")

    const { name, email, password, password_confirmation } = req.body;
    const admin = await adminModel.findOne({ email: email });
    if (admin) {
      res.send({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ ᴇxɪᴛꜱ 🙄😑😶" });
    } else {
      if (name && email && password && password_confirmation) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const doc = new adminModel({
              name: name,
              email: email,
              password: hashPassword,
            });
            await doc.save();
            res
              .status(201)
              .send({
                status: "success",
                message: "Registration Successfully 🍻🥂   ",
              });
          } catch (error) {
            console.log(error);
          }
        } else {
          res.send({ status: "failed", message: "Password not matched 🤔🤔" });
        }
      } else {
        res.send({ status: "failed", message: "All field are required 😜😝 " });
      }
    }
  };

  static adminlogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const admin = await adminModel.findOne({ email: email });
        //   console.log(admin);
        if (admin != null) {
          const isMatch = await bcrypt.compare(password, admin.password)
          if (admin.email == email && isMatch) {


            // GENERATE JWT TOKEN :)
            const token = jwt.sign({ adminID: admin._id },
              process.env.JWT_SECRET_KEY, { expiresIn: '30m' })

            res.cookie('token', token)

            res
              .status(201)
              .send({ status: "success", message: "login successfully with web token 😃🍻", "Token": token });


          } else {
            res.send({ status: "failed", message: "email and password  not match" });

          }
        } else {
          res.send({ status: "failed", message: "you are not a registered ADMIN" });

        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  static adminPasswordupdate = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body

    if (oldPassword && newPassword && confirmPassword) {
      //error aa rhi hai 
      const admin = await adminModel.findById(req.admin.id).select("+password");
      const isMatch = await bcrypt.compare(oldPassword, admin.password)
      if (!isMatch) {
        res.send({ "status": 400, "message": "Old password is incorrect" })
      } else {
        if (newPassword !== confirmPassword) {
          res.send({ "status": "failed", "message": "password does not match" })
        } else {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(newPassword, salt)
          //console.log(req.admin)
          await adminModel.findByIdAndUpdate(req.admin.id, { $set: { password: newHashPassword } })
          res.send({ "status": "success", "message": " ADMIN Password changed succesfully" })
        }

      }

    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }


  }


}

module.exports = Admincontroller;