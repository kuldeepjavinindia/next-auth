import React from 'react'
import ChildComponent from './ChildComponent'
import { auth } from '@/auth';
import { redirect } from "next/navigation";

const page = async () => {

    const session = await auth();
    if (!session?.user) {
      redirect("/sign-in");
    }

  return (
    <>
        <ChildComponent />
    </>
  )
}

export default page