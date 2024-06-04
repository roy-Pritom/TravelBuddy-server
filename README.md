# Node.js(Express js) TypeScript Prisma with PostgreSQL Application(Travel Buddy Matching Assignment)

This is a sample Prisma (ORM) Node.js application written in TypeScript and using postgreSql as a database.With secure user authentication (jwt).

## Requirements

Before you run locally, ensure that you must have the following requirements:

- Node.js installed
- npm package manager installed
- typescript installed
- PostgreSQL installed and running locally

## Getting Started

1. **First clone the repository:**

   ```bash
   git clone https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-roy-Pritom
   cd change the directory
2. **Install Dependencies:**

   ```bash
   npm install
   make sure all package properly installed.
   (If you face any problem with prisma then follow the instruction)
   For prisma go to prisma.io
   install prisma and Prisma client properly for ts and postgreSql version.
3. **Set supabase for server**

   ```bash
   Create a account on supabase.Then create a project and remember the password.In project setting database section there is a Connection string copy the uri for connect to your server.
4. **Configuration(.env):**

   ```bash
   Create a .env file in the root of your project
   DATABASE_URL=supabase Uri(password)
   PORT=server_port
   ACCESS_TOKEN_SECRET=your jwt access token secret
   ACCESS_TOKEN_EXPIRESIN=your jwt access token expire time
   REFRESH_TOKEN_SECRET=your jwt refresh token secret
   REFRESH_TOKEN_EXPIRESIN=your jwt refresh token expire time
   BCRYPT_SALT_ROUNDS
5. **Build the typescript code:**

   ```bash
   npm run build
6. **Run Application(production):**

   ```bash
   npm run start:prod
7. **Prisma migrate:**

   ```bash
   npx prisma migrate dev --name init
8. **Run Application(development):**

   ```bash
   npm run start:dev
9. **See code problems(eslint):**

   ```bash
   npm run lint
10. **Schema Model:**

   ```bash
   User
   Trip
   TravelBuddyRequest
   Profile
   ```
11. **Schema Model Relation:**

- **User Model:**
  - One-to-One relationship with UserProfile (each user has one profile).
  - One-to-Many relationship with Trip (each user can create multiple trips).
  - One-to-Many relationship with Travel Buddy Request (each user can send or receive multiple buddy requests).

- **Trip Model:**
  - Many-to-One relationship with User (each trip belongs to one user).
  - One-to-Many relationship with Travel Buddy Request (each trip can have multiple buddy requests).

- **Travel Buddy Request Model:**
  - Many-to-One relationship with User (each request belongs to one user).
  - Many-to-One relationship with Trip (each request belongs to one trip).

12. **Api end points:**
   ```
   User Registration
   Endpoint: /api/register
   Method:POST
   put appropriate json data

   User Login
   Endpoint: /api/login
   Method:POST

   Create a Trip
   Endpoint: /api/trips
   Method:POST
   Request Headers:Authorization: <JWT_TOKEN>

   Get Paginated and Filtered Trips
   Endpoint: /api/trips?your_query
   Method: GET

   Send Travel Buddy Request
   Endpoint: /api/trip/:tripId/request
   Method:POST
   Request Headers:Authorization: <JWT_TOKEN>

   Get Potential Travel Buddies For a Specific Trip
   Endpoint:  /api/travel-buddies/:tripId
   Method:GET
   Request Headers:Authorization: <JWT_TOKEN>

   Respond to Travel Buddy Request
   Endpoint: /api/travel-buddies/:buddyId/respond
   Method:PUT
   Request Headers:Authorization: <JWT_TOKEN>

   Update User Profile (Partial Update)
   Endpoint: /api/profile
   Method:PUT
   Request Headers:Authorization: <JWT_TOKEN>

   Get User Profile
   Endpoint: /api/profile
   Method:GET
   Request Headers:Authorization: <JWT_TOKEN>
   ```
13. **Live link(vercel):**

   
Live link:https://assignment-8-server-gamma.vercel.app
