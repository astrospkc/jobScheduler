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
