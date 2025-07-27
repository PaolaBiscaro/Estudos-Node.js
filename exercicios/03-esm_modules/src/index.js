import { connectToDatabase, databaseType } from "./utils/database.mjs"

import {getDataFromApi} from './utils/api.js'

getDataFromApi()



console.log('ECMA')
connectToDatabase('my-database')
