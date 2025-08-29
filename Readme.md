what does scheduling a job means?
what is the creation of job?
what type of task can be assigned to a job, so that it runs on specific time? 
Can we assign a api call to a job?
examples of task that can be assigned?
how to create a task that should be assigned to a job scheduler?
what are the fields required to create, update and delete a job?


### Two Approaches:
1. Cron-based
2. Event Driven


### Event-Driven Approach
Suppose a user registers ( action -> create a user in db ). 
After creating the user, we want to send a welcome email to the user.
This welcome email sending is a job.
This job should run after the user is created.
So, we will create a job and assign it to the user creation action.
This is the event-driven approach.
we can use bullmq here.

### Install

- npm install

set up environment variables in .env file
env variables:
- MONGO_URI

Check package.json for dependencies

### Running the app

- npm run dev:server
- npm run dev:worker

### Approach

#### Task
1. User registers -> email is sent to the user
2. User can set reminder -> some message will appear after every 5 min

#### Endpoints

User: api/users
1. POST: /createUser : body- {email} // create user , job is created here for sending emails
2. GET: /getAllUsers
3. DELETE: /deleteAllUser


Jobs: api/jobs

1. POST: /createJob/:user_id : body- {job_name, job_type} // create job
2. GET: /getAllJobs
3. GET: /getJob/:id
4. DELETE: /deleteAllJobs
5. DELETE: /deleteJob/:id




