"use client"

import { useToast } from "@/hooks/use-toast"
import { type UserRegistrationProps, UserRegistrationSchema } from "@/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { onCompleteUserRegistration } from "@/actions/auth"

export const useSignUpForm = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const { signUp, isLoaded, setActive } = useSignUp()
  const router = useRouter()
  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: "owner",
    },
    mode: "onChange",
  })

  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    if (!isLoaded) {
      toast({
        title: "Error",
        description: "Clerk is not loaded yet. Please try again.",
      })
      return
    }

    try {
      setLoading(true)
      await signUp.create({
        emailAddress: email,
        password: password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      setLoading(false)
      onNext((prev) => prev + 1)
    } catch (error) {
      setLoading(false)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : String(error),
      })
    }
  }

  const onHandleSubmit = methods.handleSubmit(async (values: UserRegistrationProps) => {
    if (!isLoaded) {
      toast({
        title: "Error",
        description: "Clerk is not loaded yet. Please try again.",
      })
      return
    }

    try {
      setLoading(true)
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.otp,
      })

      if (completeSignUp.status !== "complete") {
        throw new Error("Failed to verify email. Please try again.")
      }

      if (!signUp.createdUserId) {
        throw new Error("User ID not found. Please try signing up again.")
      }

      const registered = await onCompleteUserRegistration(values.fullname, signUp.createdUserId, values.type)

      if (registered?.status !== 200 || !registered.user) {
        throw new Error("Failed to complete registration. Please try again.")
      }

      await setActive({
        session: completeSignUp.createdSessionId,
      })

      setLoading(false)
      router.push("/dashboard")
    } catch (error) {
      setLoading(false)
      console.error(error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : String(error),
      })
    }
  })

  return {
    methods,
    onHandleSubmit,
    onGenerateOTP,
    loading,
  }
}
