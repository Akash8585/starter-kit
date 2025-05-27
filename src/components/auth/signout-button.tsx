"use client"

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth/auth-client'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {

    const router = useRouter()

    const handleClick = async () => {
        await signOut({
            fetchOptions: {
               onSuccess: () => {
                router.push('/')
               }
            }
        })
        
    }
  return (
    <Button variant="secondary" className="gap-2 cursor-pointer" onClick={handleClick}>
      <LogOut className="size-4" />
      <span>Sign out</span>
    </Button>
  )
}
