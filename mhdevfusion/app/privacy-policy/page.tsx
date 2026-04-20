import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", color: "#333", lineHeight: "1.8" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px" }}>Privacy Policy</h1>
      <p style={{ color: "#888", fontSize: "14px", marginBottom: "32px" }}>
        Last updated: April 20, 2026
      </p>

      <p>
        MH Devfusion ("we", "our", or "us") operates the website{" "}
        <a href="https://mhdevfusion.com" style={{ color: "#1a73e8" }}>https://mhdevfusion.com</a>{" "}
        and related B2B automation services. This Privacy Policy explains how we collect, use, and protect your information.
      </p>

      <h2 style={{ fontSize: "22px", fontWeight: "600", marginTop: "32px" }}>1. Information We Collect</h2>
      <p>We may collect the following information:</p>
      <ul>
        <li>Name and contact information (email, phone number)</li>
        <li>Business name and address</li>
        <li>WhatsApp Business account data</li>
        <li>Facebook and Instagram page data</li>
        <li>Messages sent and received through our platform</li>
        <li>Usage data and analytics</li>
      </ul>

      <h2 style={{ fontSize: "22px", fontWeight: "600", marginTop: "32px" }}>2. How We Use Your Information</h2>
      <p>We use the collected information to:</p>
      <ul>
        <li>Provide B2B automation and messaging services</li>
        <li>Send WhatsApp, Facebook, and Instagram messages on your behalf</li>
        <li>Improve our services and user experience</li>
        <li>Comply with legal obligations</li>
        <li>Communicate with you about your account</li>
      </ul>

      <h2 style={{ fontSize: "22px", fontWeight: "600", marginTop: "32px" }}>3. Meta Platform Data</h2>
      <p>
        Our application uses Meta APIs (WhatsApp Business API, Facebook API, Instagram API).
        By using our services, you authorize us to access and use data from your Meta accounts
        in accordance with{" "}
        <a href="https://www.facebook.com/policy" style={{ color: "#1a73e8" }}>Meta's Data Policy</a>.
      </p>
      <ul>
        <li>We only access data necessary to provide our services</li>
        <li>We do not sell your Meta platform data to third parties</li>
        <li>You can revoke access at any time from your Meta account settings</li>
      </ul>

      <h2 style={{ fontSize: "22px", fontWeight: "600", marginTop: "32px" }}>4. Data Sharing</h2>
      <p>We do not sell, trade, or share your personal information with third parties except:</p>
      <ul>
        <li>When required by law</li>
        <li>To trusted service providers who assist in operating our platform</li>
        <li>With your explicit consent</li>
      </ul>

      <h2 style={{ fontSize: "22px", fontWeight: "600", marginTop: "32px" }}>5. Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your data including
        encryption, secure servers, and access controls. However, no method of transmission
        over the internet is 100% secure.
      </p>

      <h2 style={{ fontSize: "22px", fontWeight: "600", marginTop: "32px" }}>6. Data Retention</h2>
      <p>
        We retain your data only as long as necessary to provide our services or as required
        by law. You may request deletion of your data at any time.
      </p>

      <h2 style={{ fontSize: "22px", fontWeight: "600", marginTop: "32px" }}>7. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Withdraw consent at any time</li>
        <li>Lodge a complaint with a supervisory authority</li>
      </ul>

      <h2 style={{ fontSize: "22px", fontWeight: "600", marginTop: "32px" }}>8. Cookies</h2>
      <p>
        We use cookies to improve your experience on our website. You can disable cookies
        in your browser settings, though this may affect some features.
      </p>

      <h2 style={{ fontSize: "22px", fontWeight: "600", marginTop: "32px" }}>9. Children's Privacy</h2>
      <p>
        Our services are not directed to children under 13. We do not knowingly collect
        personal information from children.
      </p>

      <h2 style={{ fontSize: "22px", fontWeight: "600", marginTop: "32px" }}>10. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any
        changes by posting the new policy on this page with an updated date.
      </p>

      <h2 style={{ fontSize: "22px", fontWeight: "600", marginTop: "32px" }}>11. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, contact us at:</p>
      <ul>
        <li>Business: MH Devfusion</li>
        <li>Address: 1386, Overseas B, Bahria Town, Lahore, Pakistan</li>
        <li>Email: <a href="mailto:ramzannoman4141@gmail.com" style={{ color: "#1a73e8" }}>ramzannoman4141@gmail.com</a></li>
        <li>Website: <a href="https://mhdevfusion.com" style={{ color: "#1a73e8" }}>https://mhdevfusion.com</a></li>
      </ul>

      <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #eee", color: "#888", fontSize: "13px" }}>
        © 2026 MH Devfusion. All rights reserved.
      </div>
    </div>
  );
}
