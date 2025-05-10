import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 15, 2023"

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1A0F07] to-[#2A1A10] text-white py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
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

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-amber-500" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Privacy Policy
            </h1>
          </div>
          <p className="text-amber-300/70">Last Updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-invert prose-amber max-w-none">
          <p className="text-amber-100/90 text-lg">
            At Tucheki, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our platform. Please read this privacy policy carefully. If you do
            not agree with the terms of this privacy policy, please do not access the platform.
          </p>

          <Separator className="my-8 bg-amber-900/30" />

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">1. Information We Collect</h2>
            <p className="mb-4 text-amber-100/90">We may collect information about you in various ways, including:</p>

            <h3 className="text-xl font-semibold text-amber-300 mb-2">1.1 Personal Data</h3>
            <p className="mb-4 text-amber-100/90">
              When you create an account, we collect personally identifiable information, such as your name, email
              address, and profile picture. This information is collected on a voluntary basis when you register with
              the platform.
            </p>

            <h3 className="text-xl font-semibold text-amber-300 mb-2">1.2 Usage Data</h3>
            <p className="mb-4 text-amber-100/90">
              We automatically collect certain information when you visit, use, or navigate the platform. This
              information may include your IP address, browser type, operating system, referring URLs, device
              information, pages viewed, and actions taken while using the platform.
            </p>

            <h3 className="text-xl font-semibold text-amber-300 mb-2">1.3 User Content</h3>
            <p className="text-amber-100/90">
              We collect and store content that you post, upload, or provide to the platform, such as comments, ratings,
              and other interactions with trailers.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4 text-amber-100/90">
              We may use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-amber-100/90">
              <li>To provide, operate, and maintain our platform</li>
              <li>To improve, personalize, and expand our platform</li>
              <li>To understand and analyze how you use our platform</li>
              <li>To develop new products, services, features, and functionality</li>
              <li>To communicate with you, including for customer service and updates</li>
              <li>To process your transactions and manage your account</li>
              <li>To find and prevent fraud</li>
              <li>For compliance purposes, including enforcing our Terms of Service</li>
              <li>To respond to legal requests and prevent harm</li>
              <li>To personalize your experience and deliver content relevant to your interests</li>
            </ul>
            <p className="text-amber-100/90">
              We will only process your personal information in accordance with applicable data protection laws.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">3. Sharing Your Information</h2>
            <p className="mb-4 text-amber-100/90">We may share your information in the following situations:</p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-amber-100/90">
              <li>
                <span className="font-medium">With Service Providers:</span> We may share your information with
                third-party vendors, service providers, contractors, or agents who perform services for us.
              </li>
              <li>
                <span className="font-medium">Business Transfers:</span> We may share or transfer your information in
                connection with, or during negotiations of, any merger, sale of company assets, financing, or
                acquisition of all or a portion of our business to another company.
              </li>
              <li>
                <span className="font-medium">With Your Consent:</span> We may disclose your personal information for
                any other purpose with your consent.
              </li>
              <li>
                <span className="font-medium">Legal Obligations:</span> We may disclose your information where we are
                legally required to do so to comply with applicable law, governmental requests, judicial proceedings,
                court orders, or legal processes.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="mb-4 text-amber-100/90">
              We may use cookies, web beacons, tracking pixels, and other tracking technologies to help customize the
              platform and improve your experience. When you access the platform, your personal information is not
              collected through the use of tracking technology.
            </p>
            <p className="text-amber-100/90">
              You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn
              off all cookies. You do this through your browser settings. If you turn cookies off, some features may be
              disabled, but this will not affect your ability to use essential features of the platform.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">5. Third-Party Websites</h2>
            <p className="text-amber-100/90">
              The platform may contain links to third-party websites and applications of interest, including
              advertisements and external services. Once you have used these links to leave the platform, any
              information you provide to these third parties is not covered by this Privacy Policy. We cannot guarantee
              the safety and privacy of your information when using third-party websites, so we encourage you to review
              the privacy policies of these websites before providing any personal information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">6. Data Security</h2>
            <p className="text-amber-100/90">
              We use administrative, technical, and physical security measures to help protect your personal
              information. While we have taken reasonable steps to secure the personal information you provide to us,
              please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method
              of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">7. Your Privacy Rights</h2>
            <p className="mb-4 text-amber-100/90">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-amber-100/90">
              <li>The right to access personal information we hold about you</li>
              <li>The right to request that we correct any inaccurate personal information</li>
              <li>The right to request that we delete your personal information</li>
              <li>The right to withdraw consent to the processing of your personal information</li>
              <li>The right to request restriction of processing of your personal information</li>
              <li>The right to data portability</li>
            </ul>
            <p className="text-amber-100/90">
              To exercise these rights, please contact us using the contact information provided below.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">8. Children's Privacy</h2>
            <p className="text-amber-100/90">
              The platform is not intended for individuals under the age of 13. We do not knowingly collect personal
              information from children under 13. If you are a parent or guardian and you are aware that your child has
              provided us with personal information, please contact us so that we can take necessary actions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-amber-100/90">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
              Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on
              this page.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">10. Contact Us</h2>
            <p className="text-amber-100/90">
              If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@tucheki.com" className="text-amber-400 hover:text-amber-300">
                privacy@tucheki.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
