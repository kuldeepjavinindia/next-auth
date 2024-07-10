"use client";
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { registerAction, loginWithCreds } from "@/actions/auth";
import { Controller, useForm } from "react-hook-form";
import { redirect, useRouter } from 'next/navigation'


const RegisterForm = () => {

  const { control, handleSubmit } = useForm({
    defaultValues: {
      
    },
  })

  const router = useRouter()

const callbackUrl = '/';
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

  const onSubmit = (data) => {
    setError("");
    setSuccess("");

    // e.preventDefault();

   let res =  registerAction(data, callbackUrl)
        .then((data) => {
          if (data?.error) {
            // form.reset();
            setError(data.error);
          }
          console.log('data?.success', data)
          if (data?.success) {
            
            setSuccess(data.success);
            
            router.push('/sign-in')


          }

        })
        .catch(() => setError("Something went wrong"));


        console.log('res')
    
    console.log('values >> ', data)

  }



  
  return (
    <div>

<p className="text-green-400">{success}</p>
<p className="text-red-400">{error}</p>


      <form

onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Name
          </label>
          <Controller
          name="name"
        control={control}
        render={({ field }) => (
        <input {...field}
          type="text"
          placeholder="Name"
          className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
        />)}
      />

          
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <Controller
          name="email"
        control={control}
        render={({ field }) => (
        <input {...field}
          type="email"
          placeholder="Email"
          // id="Email"
          className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
        />)}
      />

          
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <Controller
        // name="firstName"

            name="password"
        control={control}
        render={({ field }) => (
          <input {...field}
            type="password"
            placeholder="Password"
            id="password"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        )}
      />

          
        </div>
        <div className="mt-4">
          <AuthButton type="signup" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
