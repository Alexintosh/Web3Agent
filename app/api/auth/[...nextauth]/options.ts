import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { storeUser } from '@/app/actions'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         username: {
        //             label: "Username:",
        //             type: "text",
        //             placeholder: "your-cool-username"
        //         },
        //         password: {
        //             label: "Password:",
        //             type: "password",
        //             placeholder: "your-awesome-password"
        //         }
        //     },
        //     async authorize(credentials) {
        //         // This is where you need to retrieve user data 
        //         // to verify with credentials
        //         // Docs: https://next-auth.js.org/configuration/providers/credentials
        //         const user = { id: "1", name: "noplacetohide", password: "noplacetohide" }

        //         if (credentials?.username === user.name && credentials?.password === user.password) {
        //             return user
        //         } else {
        //             return null
        //         }
        //     }
        // })
    ],
    callbacks: {
        async jwt({ token, profile }: any) {
            console.log("----------------- CALLBACK START -------------------")
            console.log({ token, profile })
            // if (profile) {
            //     token.id = profile.id
            //     token.image = profile.picture
            //     const user = {
            //         ...profile, // First spread the rest of the profile properties
            //         id: String(profile.id),  // Convert to string
            //     };
            //     console.log({ user })
            //     await storeUser(user);
            //     console.log("----------------- CALLBACK END -------------------")

            // }
            await storeUser(token);
            console.log("----------------- CALLBACK END -------------------")

            return token;
        },
        // authorized({ auth }) {
        //   return !!auth?.user
        // }
    },
}