import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
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
            <FileText className="h-8 w-8 text-amber-500" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Terms of Service
            </h1>
          </div>
          <p className="text-amber-300/70">Last Updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-invert prose-amber max-w-none">
          <p className="text-amber-100/90 text-lg">
            Welcome to Tucheki. Please read these Terms of Service ("Terms") carefully as they contain important
            information about your legal rights, remedies, and obligations. By accessing or using the Tucheki platform,
            you agree to comply with and be bound by these Terms.
          </p>

          <Separator className="my-8 bg-amber-900/30" />

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4 text-amber-100/90">
              By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy. If you do
              not agree to these Terms, you may not access or use the services.
            </p>
            <p className="text-amber-100/90">
              We may modify these Terms at any time. Your continued use of our services following the posting of
              modified Terms means you accept the changes. It is your responsibility to check the Terms periodically for
              changes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">2. Description of Services</h2>
            <p className="mb-4 text-amber-100/90">
              Tucheki provides a platform for users to discover and watch Kenyan movie trailers. Our services include
              browsing, watching, and interacting with trailer content, participating in our rewards program, and
              engaging with other users and content creators.
            </p>
            <p className="text-amber-100/90">
              We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, including
              the availability of any feature, database, or content.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">3. User Accounts</h2>
            <p className="mb-4 text-amber-100/90">
              To access certain features of our services, you may need to create an account. You are responsible for
              maintaining the confidentiality of your account information, including your password, and for all activity
              that occurs under your account.
            </p>
            <p className="mb-4 text-amber-100/90">
              You agree to provide accurate, current, and complete information during the registration process and to
              update such information to keep it accurate, current, and complete.
            </p>
            <p className="text-amber-100/90">
              We reserve the right to suspend or terminate your account if any information provided during the
              registration process or thereafter proves to be inaccurate, not current, or incomplete.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">4. User Content</h2>
            <p className="mb-4 text-amber-100/90">
              Our services may allow you to post, link, store, share, and otherwise make available certain information,
              text, graphics, videos, or other material ("User Content"). You are responsible for the User Content that
              you post, including its legality, reliability, and appropriateness.
            </p>
            <p className="mb-4 text-amber-100/90">
              By posting User Content, you grant us the right to use, modify, publicly perform, publicly display,
              reproduce, and distribute such content on and through our services. You retain any and all of your rights
              to any User Content you submit, post, or display on or through our services and you are responsible for
              protecting those rights.
            </p>
            <p className="text-amber-100/90">
              We reserve the right to remove any User Content from our services at our discretion, without prior notice,
              for any reason, including if we believe that such content violates these Terms or our policies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">5. Intellectual Property</h2>
            <p className="mb-4 text-amber-100/90">
              Our services and their original content (excluding User Content), features, and functionality are and will
              remain the exclusive property of Tucheki and its licensors. Our services are protected by copyright,
              trademark, and other laws of both Kenya and foreign countries.
            </p>
            <p className="text-amber-100/90">
              You may not use, copy, adapt, modify, prepare derivative works based upon, distribute, license, sell,
              transfer, publicly display, publicly perform, transmit, stream, broadcast, or otherwise exploit our
              services or content, except as expressly permitted in these Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">6. Prohibited Activities</h2>
            <p className="mb-4 text-amber-100/90">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-amber-100/90">
              <li>
                Violating any applicable laws, regulations, or third-party rights, including intellectual property and
                privacy rights
              </li>
              <li>
                Using our services to transmit any material that is defamatory, obscene, indecent, abusive, offensive,
                harassing, violent, hateful, inflammatory, or otherwise objectionable
              </li>
              <li>
                Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions
                to or from the servers running our services
              </li>
              <li>
                Taking any action that imposes, or may impose, an unreasonable or disproportionately large load on our
                infrastructure
              </li>
              <li>
                Collecting or harvesting any personally identifiable information, including account names, from our
                services
              </li>
              <li>Using our services for any commercial solicitation purposes without our prior written consent</li>
              <li>
                Impersonating another person or otherwise misrepresenting your affiliation with a person or entity
              </li>
            </ul>
            <p className="text-amber-100/90">
              Violation of these prohibitions may result in termination of your access to our services and may also
              expose you to civil and/or criminal liability.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">7. Disclaimer of Warranties</h2>
            <p className="mb-4 text-amber-100/90">
              Our services are provided on an "as is" and "as available" basis. Tucheki and its suppliers and licensors
              hereby disclaim all warranties of any kind, express or implied, including, without limitation, the
              warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p className="text-amber-100/90">
              Neither Tucheki nor its suppliers and licensors make any warranty that our services will be error-free or
              that access thereto will be continuous or uninterrupted. You understand that you download from, or
              otherwise obtain content or services through, our services at your own discretion and risk.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">8. Limitation of Liability</h2>
            <p className="mb-4 text-amber-100/90">
              In no event will Tucheki, or its suppliers or licensors, be liable with respect to any subject matter of
              these Terms under any contract, negligence, strict liability, or other legal or equitable theory for: (i)
              any special, incidental, or consequential damages; (ii) the cost of procurement for substitute products or
              services; (iii) for interruption of use or loss or corruption of data; or (iv) for any amounts that exceed
              the fees paid by you to Tucheki under these Terms during the twelve (12) month period prior to the cause
              of action.
            </p>
            <p className="text-amber-100/90">
              Tucheki shall have no liability for any failure or delay due to matters beyond their reasonable control.
              The foregoing shall not apply to the extent prohibited by applicable law.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">9. Governing Law</h2>
            <p className="text-amber-100/90">
              These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its
              conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be
              considered a waiver of those rights. If any provision of these Terms is held to be invalid or
              unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">10. Contact Us</h2>
            <p className="text-amber-100/90">
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:legal@tucheki.com" className="text-amber-400 hover:text-amber-300">
                legal@tucheki.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
