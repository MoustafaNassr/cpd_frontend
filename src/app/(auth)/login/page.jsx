"use client"
import { useRef } from 'react'
import Link from 'next/link'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'


export default function Login() {
  const userName = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };
  return (
    <AuthLayout
      title="Sign in to account"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href="/register" className="text-cyan-600">
            Sign up
          </Link>{' '}
          for a free trial.
        </>
      }
    >
      <div >
        <div className="space-y-6">
          <TextField
            label="User Name"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={(e) => (userName.current = e.target.value)}
          />
          <TextField
            label="Password"
            name="password"
            type={"password"}
            autoComplete="current-password"
            required
            onChange={(e) => (pass.current = e.target.value)}
          />
        </div>
        <Button onClick={onSubmit} type="submit" color="cyan" className="mt-8 w-full">
          Sign in to account
        </Button>
      </div>
    </AuthLayout>
  )
}
