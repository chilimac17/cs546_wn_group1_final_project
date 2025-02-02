// tasks/seed.js
import { dbConnection, closeConnection } from '../config/mongoConnection.js'
import users from '../data/users.js'
import { faker } from '@faker-js/faker'

const db = await dbConnection()
await db.dropDatabase()

console.log('Starting to seed database')

// Seed 10 initial users
for (let i = 0; i < 10; i++) {
  let firstName = faker.person.firstName()
  let lastName = faker.person.lastName()
  let email = faker.internet.email()
  let password = faker.internet.password()

  try {
    const user = await users.createUser(firstName, lastName, email, password)
    console.log(`Created user: ${firstName} ${lastName} (${email})`)
  } catch (e) {
    console.error(
      `Error creating user for ${firstName} ${lastName} (${email}): ${e}`
    )
  }
}

console.log('Done seeding database')

await closeConnection()
