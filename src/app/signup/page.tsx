import Image from 'next/image'
import SignUpForm from '@/components/SignupForm'
export default function SignUp() {

  return (
    <main className="flex min-h-screen flex-col p-12">
      <div>Quoted</div>
      <SignUpForm/>
    </main>
  )
}
