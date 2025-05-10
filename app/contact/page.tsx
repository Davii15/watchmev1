"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import Link from "next/link"
import { sendContactEmail } from "@/app/actions"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleRadioChange = (value: string) => {
    setFormState({
      ...formState,
      subject: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await sendContactEmail(formState)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      })
    } catch (err) {
      setError("There was an error sending your message. Please try again later.")
      console.error("Error sending contact form:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1A0F07] to-[#2A1A10] text-white py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Button
          asChild
          variant="ghost"
          className="mb-8 text-amber-400 hover:text-amber-300 hover:bg-amber-900/20 -ml-2"
        >
          <Link href="/home">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Contact Us
          </h1>
          <p className="text-xl text-amber-200/80 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Our team is always ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {isSubmitted ? (
              <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-8 text-center">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h2 className="text-2xl font-bold mb-4 text-amber-400">Thank You!</h2>
                <p className="text-amber-100/90 mb-6">
                  Your message has been sent successfully. We'll get back to you as soon as possible.
                </p>
                <Button className="bg-amber-600 hover:bg-amber-700" onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-amber-400">Send Us a Message</h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-md text-red-200">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-amber-300">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-amber-300">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-amber-300">Subject</Label>
                    <RadioGroup
                      value={formState.subject}
                      onValueChange={handleRadioChange}
                      className="flex flex-wrap gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="General Inquiry"
                          id="general"
                          className="border-amber-600 text-amber-600"
                        />
                        <Label htmlFor="general" className="text-amber-100 cursor-pointer">
                          General Inquiry
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Technical Support"
                          id="support"
                          className="border-amber-600 text-amber-600"
                        />
                        <Label htmlFor="support" className="text-amber-100 cursor-pointer">
                          Technical Support
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Partnership"
                          id="partnership"
                          className="border-amber-600 text-amber-600"
                        />
                        <Label htmlFor="partnership" className="text-amber-100 cursor-pointer">
                          Partnership
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Feedback" id="feedback" className="border-amber-600 text-amber-600" />
                        <Label htmlFor="feedback" className="text-amber-100 cursor-pointer">
                          Feedback
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-amber-300">
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help you?"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="min-h-32 bg-amber-950/50 border-amber-800/50 text-amber-100 placeholder:text-amber-400/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>

          <div>
            <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-amber-400">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-amber-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-amber-300 mb-1">Email Us</h3>
                    <p className="text-amber-100/90">
                      <a href="mailto:info@tucheki.com" className="hover:text-amber-400">
                        info@tucheki.com
                      </a>
                    </p>
                    <p className="text-amber-100/90">
                      <a href="mailto:support@tucheki.com" className="hover:text-amber-400">
                        support@tucheki.com
                      </a>
                    </p>
                  </div>
                </div>

                <Separator className="bg-amber-900/30" />

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-amber-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-amber-300 mb-1">Call Us</h3>
                    <p className="text-amber-100/90">+254 700 123 456</p>
                    <p className="text-amber-100/90">+254 733 987 654</p>
                  </div>
                </div>

                <Separator className="bg-amber-900/30" />

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-amber-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-amber-300 mb-1">Visit Us</h3>
                    <p className="text-amber-100/90">
                      Tucheki Headquarters
                      <br />
                      Westlands Business Park
                      <br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-amber-900/30">
                <h3 className="font-medium text-amber-300 mb-4">Business Hours</h3>
                <div className="space-y-2 text-amber-100/90">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
