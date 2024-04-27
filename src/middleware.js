//without define a matcher this will apply nextauth to all routes
export { default } from "next-auth/middleware"

// apply nextauth to all routes that match the pattern   
export const config = { matcher: ["/dashboard"] }