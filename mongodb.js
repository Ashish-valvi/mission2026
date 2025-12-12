const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://ashishvalvinvp:O1z1gYSWysjEInwq@namasteashish.447hw.mongodb.net/?retryWrites=true&w=majority&appName=namasteAshish%22';
const client = new MongoClient(url);

// Database Name
const dbName = 'login';

//login dummy data
const loginData = {
    email:"anjalvalvi123@gmail.com",
    pass:"Ashish123"
}

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users'); // name of collection 
//   const insertResult = await collection.insertOne(loginData);
// console.log('Inserted documents =>', insertResult);

  // the following code examples can be pasted here...

  const findResult = await collection.find({}).toArray();
console.log('Found documents =>', findResult);

const filteredDocs = await collection.find({ email: "ashish123@gmail.com" }).toArray();
console.log('Found documents filtered by { a: 3 } =>', filteredDocs);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());