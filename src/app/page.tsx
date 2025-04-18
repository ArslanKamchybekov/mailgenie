'use client'

import NavBar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { pricingCards } from "@/constants/landing-page"
import clsx from "clsx"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import Phone from "@/components/landing-page/phone"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { VideoPlayer } from "@/components/videoplayer"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const Home = () => {
  const router = useRouter()
  const user = useUser()

  const handleStartForFree = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/auth/signin')
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <motion.section
      className="flex-1 flex items-center justify-center bg-gradient-to-b from-amber-50 to-gray-50 py-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div className="flex-1 max-w-2xl space-y-8" variants={containerVariants}>
            <motion.span
              className="text-orange bg-orange/20 px-4 py-2 rounded-full text-sm inline-block"
              variants={itemVariants}
            >
              <Sparkles className="w-5 h-5 inline-block mr-2" />
              AI powered sales assistant chatbot
            </motion.span>
            <motion.h1 className="text-5xl font-bold mb-6" variants={itemVariants}>
              Supercharge Your Sales with <span className="text-orange">MailGenie</span>
            </motion.h1>
            <motion.p className="text-xl text-gray-600 mb-8" variants={itemVariants}>
              Your AI-powered sales assistant! Embed MailGenie to any website with just a snippet of code and watch your
              conversions soar.
            </motion.p>
            <motion.div className="flex gap-4" variants={itemVariants}>
              <Button
                className="bg-orange hover:bg-orange text-white px-8 py-6 text-lg font-bold transition-all duration-200 ease-in-out transform hover:scale-105"
                onClick={handleStartForFree}
              >
                Start For Free
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 px-8 py-6 text-lg font-bold transition-all duration-200 ease-in-out transform hover:scale-105"
                onClick={() => router.push("/demo")}
              >
                Watch Demo <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
          <Phone />
        </div>
      </div>
    </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose MailGenie?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Intelligent Responses",
                description: "Our AI understands context and provides human-like responses.",
                icon: "🧠",
              },
              {
                title: "Easy Integration",
                description: "Embed MailGenie on your website with a single line of code.",
                icon: "🔌",
              },
              {
                title: "24/7 Availability",
                description: "Never miss a potential lead with round-the-clock automated responses.",
                icon: "🕰️",
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in-delay-3"
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video */}
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12">Watch MailGenie in Action</h1>
        <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <VideoPlayer videoSrc="https://utfs.io/f/08b0a37f-afd7-4623-b5cc-e85184528fce-1f02.mp4" />
        </div>
      </div>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Choose What Fits You Right</h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Our straightforward pricing plans are tailored to meet your needs. If you&apos;re not ready to commit, you can
            get started for free.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {pricingCards.map((card) => (
              <Card
                key={card.title}
                className={clsx(
                  "flex flex-col justify-between transition-all duration-300 ease-in-out transform hover:scale-105",
                  {
                    "border-2 border-orange shadow-lg": card.title === "Unlimited",
                    "animate-fade-in-delay-5": true,
                  },
                )}
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-orange">{card.title}</CardTitle>
                  <CardDescription className="text-lg">{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-4xl font-bold">{card.price}</span>
                  <span className="text-gray-600 ml-2">/ month</span>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div>
                    {card.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 mb-2">
                        <Check className="text-green-500" />
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/dashboard?plan=${card.title}`}
                    className="bg-gray-500 text-white p-2 w-full text-center font-bold rounded-md hover:bg-orange transition-colors duration-300"
                  >
                    Get Started
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MailGenie</h3>
              <p className="text-gray-400">
                MailGenie is an AI-powered sales and marketing assistant that helps you convert leads into customers. 
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 MailGenie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Home