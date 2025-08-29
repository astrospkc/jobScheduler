import {Queue} from "bullmq"
import redisConnection from "../utils/redis.js"
export const emailQueue = new Queue("emailQueue", { connection: redisConnection })
export const secondQueue = new Queue("secondQueue", { connection: redisConnection })
export const reminderQueue = new Queue("reminderQueue", { connection: redisConnection })
