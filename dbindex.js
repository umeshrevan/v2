const dbConnect = require('./utils/mongodb')

const main = async ()=>{
	let data = await dbConnect()
	data = await data.find().toArray()
	console.warn(data)
}
main()

const insert =async ()=>{
	const db = await dbConnect()
	const result = await db.insertOne(
		{sUsername: 'V3', sEmail: 'vp@gmail.com', sPassword: 'Vishal@1234', sRole: 'user' }
	)
	if(result.acknowledged){
		console.log('Data inserted')
	}
}
insert()

const updateData=async ()=>{
	let data = await dbConnect()
	let updateResult = await data.updateOne(
		{ sUsername:'V3'},
		{
			$set:{ sPassword: 'Vishalprajapati@1234'}
		}
	)
	console.log(updateResult,'Data updated')

}

updateData()

const deleteData=async ()=>{
	let data = await dbConnect()
	let deleteResult = await data.deleteMany({sPassword: 'Vishal@1234'})
	console.log(deleteResult,'Data deleted')

}
deleteData()