import type { NextPage } from 'next'
import Image from 'next/image'
import StepperForm from '../components/StepperForm'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen py-2 mt-20">
      <div className="flex items-center justify-center mb-4">
        <Image src="/logo.png" width={30} height={30} />
        <h1 className="self-end ml-2 text-xl font-bold text-center align-bottom">
          Eden
        </h1>
      </div>
      <StepperForm />
    </div>
  )
}

export default Home
