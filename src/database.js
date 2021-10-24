import { Pool } from 'pg'

export const pool = new Pool({
    host: 'ec2-3-226-165-74.compute-1.amazonaws.com',
    user: 'bpbwkjwnhfydch',
    password: 'ee4025321040eccf3d62cf1cdff2ac711ebcc1aef62d293762b1c5a477752035',
    database: 'd2ig9aif3ecnof',
    port: 5432,
    ssl: { rejectUnauthorized: false }
})