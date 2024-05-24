import "reflect-metadata"
import { DataSource } from "typeorm"
import { Student } from "./entity/Student"
import { User } from "./entity/User"
import { Supporter } from "./entity/Supporter"
import { ProjectType } from "./entity/ProjectType"
import { Project } from "./entity/Project"
import { Status } from "./entity/Status"
import { StudentTransaction } from "./entity/StudentTransaction"
import { SupporterTransaction } from "./entity/SupporterTransaction"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [Student,User,Supporter,ProjectType,Project,Status,StudentTransaction,SupporterTransaction],
  subscribers: [],
  migrations: [],
})