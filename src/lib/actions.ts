"use server"

import { APIError } from "better-auth/api"
import { auth } from "./auth/auth"
import { redirect } from "next/navigation"


interface State {
    errorMessage?:string | null;
}

export async function signUp(prevState: State, formData: FormData) {
    const rawFormData = {
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        email: formData.get("email") as string,
        password: formData.get("pwd") as string,
    }

   const {firstname, lastname, email, password} = rawFormData

   try {
    await auth.api.signUpEmail({
        body: {
            name: `${firstname} ${lastname}`,
            email,
            password,
        }
    })
   } catch (error) {
    if (error instanceof APIError) {
        switch (error.status){
            case "UNPROCESSABLE_ENTITY":
                return {errorMessage: "User already exists"}
            case "BAD_REQUEST":
                return {errorMessage: "Invalid email"}
            default:
                return {errorMessage: "Something went wrong"}
        }
    }
    console.log("signup with email and password is not working",error)

   }
    
  redirect("/dashboard")  
}   