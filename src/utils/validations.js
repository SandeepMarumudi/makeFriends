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
}else if(!validator.isMobilePhone(phone)){
    throw new Error("Enter valid Phone number")
}
}

const validateUserProfileForUpdate=(req)=>{
const {firstName,lastName,email,phone,skills,age,}=req
const checkInputFields=["firstName","lastName","email","age","phone","skills"]
const isAllowed=Object.keys(req).every((each)=>checkInputFields.includes(each))
if(!isAllowed){
throw new Error("inputs requests are invalid")
}

 if(firstName!==undefined && firstName.length<4){
    throw new Error("firstname should be more than 3 charcaters")
 }
 if(lastName!==undefined && lastName.length>40){
    throw new Error("lastname should be less than 40 characters")
 }
 if(email!==undefined && !validator.isEmail(email)){
    throw new Error("email is not valid")
 }
//   if( phone!==undefined && !validator.isMobilePhone(phone)){
//     throw new Error("Enter valid Phone number")
//   }
  if( skills!==undefined && skills.length>20){
    throw new Error("skills should be less than 20")
  }
  if(age!==undefined && age>100){
    throw new Error("Age should be less than 100")
  }

return isAllowed
}

module.exports={ 
    validateUser,validateUserProfileForUpdate
}