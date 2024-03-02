const { MongoClient } = require('mongodb');

// Assuming you have updated the URL to include credentials of an administrative user
const url = 'mongodb://mongoadmin:secret@localhost:27017';

// Updated MongoClient instantiation without deprecated options
const client = new MongoClient(url);

async function createMongoDBUser() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to server');

    // Specify the database where you want to create a new user
    const db = client.db('employeeTimeTracking');

    // New user details
    const newUser = {
      createUser: 'newUserName',
      pwd: 'newUserPassword',
      roles: [
        {
          role: 'readWrite',
          db: 'employeeTimeTracking',
        },
      ],
    };

    // Create a new user
    await db.command(newUser);
    console.log(`User ${newUser.createUser} created successfully`);
  } catch (err) {
    console.error('Failed to create user:', err.message);
  } finally {
    await client.close();
  }
}

createMongoDBUser();
