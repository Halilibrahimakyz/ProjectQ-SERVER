import "reflect-metadata"
import { DataSource } from "typeorm"
import { Student } from "./entities/Student"
import { User } from "./entities/User"
import { Supporter } from "./entities/Supporter"
import { ProjectType } from "./entities/ProjectType"
import { Project } from "./entities/Project"
import { Status } from "./entities/Status"
import { StudentTransaction } from "./entities/StudentTransaction"
import { SupporterTransaction } from "./entities/SupporterTransaction"
import { University } from "./entities/University"
import { Domain } from "./entities/Domain"
import {Interest} from "./entities/Interest"
import { RefreshToken } from "./entities/RefreshToken"
import {Country} from "./entities/Country"
import {City} from "./entities/City"
import { ProjectPhoto } from "./entities/ProjectPhoto"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [Student,User,Supporter,ProjectType,Project,Status,StudentTransaction,SupporterTransaction,University,Domain,Interest,RefreshToken,Country,City,ProjectPhoto],
  subscribers: [],
  migrations: [],
})