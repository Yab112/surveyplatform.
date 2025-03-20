import React from "react"; 
// import Callout from "../components/callout" 
import Callout from '@/components/callout/callout'

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className= "bg-green-400">
        <Callout>Welcome to <a href="https://nextjs.org">Next.js!</a></Callout>
      </h1>
    </main>
  );
}
