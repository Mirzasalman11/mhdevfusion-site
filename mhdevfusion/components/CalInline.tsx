"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalInline() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", { styles: { branding: { brandColor: "#000000" } }, hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section className="py-20 container mx-auto px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 text-foreground">Book a Meeting</h2>
        <p className="text-muted-foreground">Schedule a time with us to discuss your project.</p>
      </div>
      <div className="w-full h-[600px] border border-border rounded-2xl overflow-hidden shadow-sm bg-card">
        <Cal
          calLink={process.env.NEXT_PUBLIC_CAL_LINK || "mhdevfusion/30min"}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: 'month_view' }}
        />
      </div>
    </section>
  );
}
