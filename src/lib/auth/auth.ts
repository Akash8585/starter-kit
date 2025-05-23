import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import  db  from "@/db"; // your drizzle instance
import {user, session, account, verification} from "@/db/schema"

const schema = {
    user,
    session,
    account,
    verification,
}

export const auth = betterAuth({

    emailAndPassword: {  
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 8,
    },
    account: {
        accountLinking: {
            enabled: true,
        },
    },
    socialProviders: { 
        google: { 
           clientId: process.env.GOOGLE_CLIENT_ID as string, 
           clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }
    },

    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema ,// or "mysql", "sqlite"
    })

    
});