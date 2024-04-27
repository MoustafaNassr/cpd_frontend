"use client"
import Link from 'next/link';
import { useState } from 'react';
import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/Button';
import { SelectField, TextField } from '@/components/Fields';




  // Handle form submission
  export default function Register() {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('') 
const [first_name, setFirst_name] = useState('')  
const [last_name, setLast_name] = useState('')
const [profession_title, setProfession_title] = useState('')


 const handleSubmit = async () => {
    // Handle form submission
    await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        profession_title: profession_title
      }),
    });
  }
  return (
    <AuthLayout
      title="Sign up for an account"
      subtitle={
        <>
          Already registered?{' '}
          <Link className="text-cyan-600" href="/login">
           Sign in
          </Link>{' '}
          to your account.
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <TextField
            label="First name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
            onChange={e=>setFirst_name(e.target.value)}
          />
          <TextField
            label="Last name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            required
            onChange={e=>setLast_name(e.target.value)}
          />
          <TextField
            className="col-span-full"
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={e=>setEmail(e.target.value)}
          />
          <TextField
            className="col-span-full"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            onChange={e=>setPassword(e.target.value)}
          />
             <TextField
            className="col-span-full"
            label="profession_title"
            name="profession_title"
            type="text"
         autoComplete="profession_title"
            required
            onChange={e=>setProfession_title(e.target.value)}
          />
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Get started today
        </Button>
      </form>
    </AuthLayout>
  );
}
