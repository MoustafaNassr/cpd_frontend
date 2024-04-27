

   
import CredentialsProvider from 'next-auth/providers/credentials';

export const options = { 
    providers: [

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" },
            },
             async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const res = await fetch("https://cpd-admin.apexnile.com/api/sign_in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            email: credentials?.username, 
            password: credentials?.password
          }),
        });
        const user = await res.json();

        if (res.ok  && user) {
          // Any object returned will be saved in `user` property of the JWT
           
          return user;
        } else {

          
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
        }),
    ],
    pages:{
        signIn: '/login',   
        newUser: "/register"},
        
     callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token 
      return session;
    },
  },
};


    

    