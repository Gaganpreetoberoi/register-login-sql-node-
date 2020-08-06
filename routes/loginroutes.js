var bcrypt = require ('bcrypt');
const saltRounds=10;
var con= require('../dbconnection');
const config=require('config');
const jwt=require('jsonwebtoken');

module.exports.register = async function(req,res){
    const password = req.body.password;
    console.log(password);

      const encryptedPassword = await bcrypt.hash(password, 10)
      var users={
         "name":req.body.name,
         "email":req.body.email,
         "password":encryptedPassword
       }
      con.query("SELECT COUNT(*) AS cnt FROM user WHERE email = ? " , users.email , function(err , data){
         if(err){
             console.log(err); 
         }   
         else{
             if(data[0].cnt > 0){  
              return res.status(400).json({resType:0});
             }else{
              var sql = "INSERT INTO `user`(`email`,`name`,`password`) VALUES ('" + users.email + "','" + users.name + "','" + users.password + "')";
              var query = con.query(sql, function(err, result) {  
                if (err) {
                  res.send({
                    "code":400,
                    "failed":"error ocurred"
                  })
                } else {
                  res.send({
                    "code":200,
                    "success":"user registered sucessfully"
                      });
                  }
              });  
            }       
             }
      })
      
    
   
  }
  module.exports.login = async function(req,res){
    var email= req.body.email;
    var password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, 10)
    con.query('SELECT * FROM user WHERE email = ?',email, async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        if(results.length >0){
          console.log(results[0].password);
          console.log(password);        
          let comparision = await bcrypt.compare(password, results[0].password)
          console.log(comparision);
          if(comparision){
           
              res.send({
                "code":204,
                "success":"Email and password match"
           })
              
          }
          else{
            res.send({
                 "code":204,
                 "success":"Email and password does not match"
            })
          }
        }
        else{
          res.send({
            "code":206,
            "success":"Email does not exits"
              });
        }
      }
      });
    }