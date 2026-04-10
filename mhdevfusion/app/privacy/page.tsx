
import CTASection from "@/components/ui/CTASection";

interface PrivacySection {
  title: string;
  content: React.ReactNode;
}

const privacyPolicyData: PrivacySection[] = [
  {
    title: "1. Introduction",
    content: (
      <>
        <p>
          Welcome to MHDEVFUSION. We respect your privacy and are committed to protecting your personal data.
          This privacy policy will inform you as to how we look after your personal data when you visit our website
          (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
        </p>
      </>
    ),
  },
  {
    title: "2. Data We Collect",
    content: (
      <>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
        </p>
        {/* <ul>
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
        </ul> */}
      </>
    ),
  },
  {
    title: "3. How We Use Your Data",
    content: (
      <>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul>
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal or regulatory obligation.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Data Security",
    content: (
      <>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
        </p>
      </>
    ),
  },
  {
    title: "5. Contact Us",
    content: (
      <>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:salmanramzan6611@gmail.com" className="text-blue-600 hover:text-blue-800">salmanramzan6611@gmail.com</a>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen bg-background pt-24 pb-24">
        <section className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-muted-foreground">
            <p className="lead text-xl mb-8">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            {privacyPolicyData.map((section, index) => (
              <div key={index} className="mb-8">
                <h3 className="font-bold text-2xl mb-4">{section.title}</h3>
                {section.content}
              </div>
            ))}
          </div>
        </section>
        <CTASection />
      </main>
    </>
  )
}
