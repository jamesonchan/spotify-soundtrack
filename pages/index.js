import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Spotify Soundtrack</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-black h-screen overflow-hidden flex'>
        {/* sidebar */}
        <Sidebar />
        {/* center */}
        <Center />
      </main>
      <div className='sticky bottom-0'>
        {/* Player */}
        <Player />
      </div>
    
    </div>
  )
}

// prefecth session
export async function getServerSideProps(context){
  const session = await getSession(context)

  return{
    props:{
      session
    }
  }
}