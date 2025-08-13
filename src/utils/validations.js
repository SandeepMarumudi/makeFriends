const validator=require("validator")
const validateUser=(req)=>{
    const {firstName,lastName,email,password,phone}=req
if(!firstName || !lastName){
    throw new Error("firstname and lastname are required")
}else if(firstName.length<4 || lastName.length>50){
    throw new Error("Naame should be greater than 4 and less than 50 characters")
}else if(!validator.isEmail(email)){
    throw new Error("Enter valid email")
}else if(!validator.isStrongPassword(password)){
      throw new Error("you password is not Strong")
}else if(!validator.isMobilePhoneLocales){
    throw new Error("Enter valid Phone number")
}
}
module.exports={
    validateUser
}