
import CTASection from "@/components/ui/CTASection";

export default function TermsPage() {
  return (
    <>

      <main className="min-h-screen bg-background pt-24 pb-24">
        <section className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Terms of Service</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
            <p className="lead text-xl mb-8">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <h3>1. Agreement to Terms</h3>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and MHDEVFUSION (“we,” “us” or “our”), concerning your access to and use of our website and services.
            </p>

            <h3>2. Intellectual Property Rights</h3>
            <p>
              Unless otherwise indicated, the Site and Services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.
            </p>

            <h3>3. User Representations</h3>
            <p>
              By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.
            </p>

            <h3>4. Prohibited Activities</h3>
            <p>
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>

            <h3>5. Termination</h3>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>

            <h3>6. Governing Law</h3>
            <p>
              These Terms shall be governed and construed in accordance with the laws of France, without regard to its conflict of law provisions.
            </p>

            <h3>7. Contact Us</h3>
            <p>
              If you have any questions about these Terms, please contact us at: <a href="mailto:salmanramzan6611@gmail.com" className="text-blue-600 hover:text-blue-800">salmanramzan6611@gmail.com</a>.
            </p>
          </div>
        </section>
        <CTASection />
      </main>
    </>
  )
}
