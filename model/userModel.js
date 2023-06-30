const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
	sId:{
		type:String,
		required:[true,'Please add a name'],
	},
	sEmail:{
		type:String,
		required:[true,'Please add an email'],
		unique:true
	},
	sPassword:{
		type:String,
		required:[true,'Please add a password'],    
	},

	sUsername:{
		type:String,
		required:[true,'Please add a username'],
		unique:true
	},
    
	sRole:{
		type:String,
		default:'user'
	}
})
const Users=mongoose.model('User',userSchema)
module.exports=Users
