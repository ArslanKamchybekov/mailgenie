"use client"

import { useEffect } from "react"
import { motion, useAnimate } from "framer-motion"
import { Mail } from "lucide-react"

const emails = [
  { id: 1, subject: "Welcome to our service!", sender: "support@example.com" },
  { id: 2, subject: "Your account summary", sender: "notifications@example.com" },
  { id: 3, subject: "Exclusive offer inside!", sender: "marketing@example.com" },
  { id: 4, subject: "Your invoice is ready", sender: "billing@example.com" },
  { id: 5, subject: "Security alert", sender: "security@example.com" },
]

const EmailItem = ({ email, index }: { email: (typeof emails)[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    className="bg-white rounded-lg shadow-md p-3 mb-2 flex items-center"
  >
    <Mail className="w-5 h-5 mr-3 text-blue-500" />
    <div className="flex-grow">
      <h3 className="font-semibold text-sm">{email.subject}</h3>
      <p className="text-xs text-gray-500">{email.sender}</p>
    </div>
  </motion.div>
)

export default function Phone() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const animation = async () => {
      await animate(scope.current, { y: [0, -20, 0] }, { duration: 2, ease: "easeInOut" })
      animation()
    }
    animation()
  }, [animate, scope])

  return (
    <div className="flex items-center justify-center h-full w-1/4">
      <motion.div ref={scope} className="w-full max-w-sm bg-gray-900 rounded-[3rem] p-6 pt-8 shadow-xl overflow-hidden">
        <div className="bg-gray-800 rounded-t-3xl h-6 w-24 mx-auto mb-4" />
        <div className="bg-gray-800 rounded-3xl p-4 h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {emails.map((email, index) => (
              <EmailItem key={email.id} email={email} index={index} />
            ))}
          </div>
        </div>
        <div className="bg-gray-800 rounded-full h-12 w-12 mx-auto mt-4 flex items-center justify-center">
          <div className="bg-gray-700 rounded-full h-8 w-8" />
        </div>
      </motion.div>
    </div>
  )
}

