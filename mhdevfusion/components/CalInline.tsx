"use client";

import { useState } from "react";
import { Calendar, Clock } from "lucide-react";

export default function CalInline() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3, 1)); // April 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 3, 13));
  const [selectedTime, setSelectedTime] = useState("1:00pm");
  const [step, setStep] = useState<"datetime" | "form" | "confirm">("datetime");
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "", guests: "" });
  const [meetingType, setMeetingType] = useState("consultation");
  const [timezone, setTimezone] = useState("Asia/Karachi");
  const [tzOpen, setTzOpen] = useState(false);
  const [tzSearch, setTzSearch] = useState("");
  const [duration, setDuration] = useState(30);
  const [durOpen, setDurOpen] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const timezones = [
    "Asia/Karachi","Asia/Kolkata","Asia/Dubai","Asia/Dhaka","Asia/Kabul",
    "Asia/Tashkent","Asia/Almaty","Asia/Bangkok","Asia/Singapore","Asia/Tokyo",
    "Asia/Shanghai","Asia/Seoul","Europe/London","Europe/Paris","Europe/Berlin",
    "Europe/Moscow","America/New_York","America/Chicago","America/Denver",
    "America/Los_Angeles","America/Toronto","America/Sao_Paulo",
    "Africa/Cairo","Africa/Lagos","Pacific/Auckland","Australia/Sydney","UTC",
  ];

  const filteredTz = timezones.filter(tz =>
    tz.toLowerCase().includes(tzSearch.toLowerCase())
  );

  const timeSlots12 = [
    "9:00am","9:30am","10:00am","10:30am","11:00am","11:30am",
    "12:00pm","12:30pm","1:00pm","1:30pm","2:00pm","2:30pm",
    "3:00pm","3:30pm","4:00pm","4:30pm","5:00pm","5:30pm","6:00pm",
  ];
  const timeSlots24 = [
    "09:00","09:30","10:00","10:30","11:00","11:30",
    "12:00","12:30","13:00","13:30","14:00","14:30",
    "15:00","15:30","16:00","16:30","17:00","17:30","18:00",
  ];
  const timeSlots = timeFormat === "12h" ? timeSlots12 : timeSlots24;

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(new Date(year, month, i));
    return days;
  };

  const isAvailable = (date: Date) => {
    const today = new Date(); today.setHours(0,0,0,0);
    const d = new Date(date); d.setHours(0,0,0,0);
    return d >= today && date.getDay() !== 0 && date.getDay() !== 6;
  };

  const isToday = (date: Date) => {
    const t = new Date(); t.setHours(0,0,0,0);
    const d = new Date(date); d.setHours(0,0,0,0);
    return d.getTime() === t.getTime();
  };

  const isSelected = (date: Date) =>
    selectedDate?.toDateString() === date.toDateString();

  const navigateMonth = (dir: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + dir, 1));
    setSelectedDate(null);
    setSelectedTime("");
  };

  const handleDateSelect = (date: Date) => {
    if (!isAvailable(date)) return;
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.email) return;
    const msg = encodeURIComponent(
      `New Booking\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDate: ${selectedDate.toLocaleDateString()}\nTime: ${selectedTime}\nNotes: ${formData.notes}`
    );
    window.open(`https://wa.me/923396411668?text=${msg}`, "_blank");
    setStep("confirm");
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const monthLabel = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const [monthName, yearNum] = monthLabel.split(" ");

  return (
    <section className="py-20 container mx-auto px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 text-foreground">Book a Meeting</h2>
        <p className="text-lg text-muted-foreground">Schedule a time with us to discuss your project.</p>
      </div>
      
      {/* Centered Calendar Container with Increased Width */}
      <div className="flex justify-center">
        <div className="w-full max-w-5xl border border-border rounded-2xl overflow-hidden shadow-sm bg-card">
          <div style={{
            minHeight: "600px",
            background: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
            fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
          }}>
      {step === "confirm" ? (
        <div style={{
          background: "#fff",
          borderRadius: 16,
          padding: "48px 40px",
          textAlign: "center",
          maxWidth: 420,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "#f0fdf4", display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 20px",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Booking Confirmed!</h2>
          <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>
            Sent via WhatsApp. We'll confirm your appointment shortly.
          </p>
          <button onClick={() => { setStep("datetime"); setFormData({ name:"",email:"",phone:"",notes:"",guests:"" }); }}
            style={{ background: "#111827", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
            Book another meeting
          </button>
        </div>
      ) : step === "form" ? (
        /* ── FORM STEP ── */
        <div style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)",
          width: "100%",
          maxWidth: 460,
          overflow: "hidden",
        }}>
          {/* Back header */}
          <div style={{ borderBottom: "1px solid #f3f4f6", padding: "16px 20px", display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setStep("datetime")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "#6b7280" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>MHDEVFUSION</p>
              <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>
                30 min · {selectedDate?.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})} · {selectedTime}
              </p>
            </div>
          </div>

          <div style={{ padding: "24px 24px 28px" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Enter Details</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Your Name *", key: "name", type: "text", placeholder: "Full name" },
                { label: "Email Address *", key: "email", type: "email", placeholder: "you@email.com" },
                { label: "Phone Number", key: "phone", type: "tel", placeholder: "+92 300 0000000" },
                { label: "Additional Guests", key: "guests", type: "text", placeholder: "guest@email.com" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 5 }}>{label}</label>
                  <input type={type} placeholder={placeholder}
                    value={(formData as any)[key]}
                    onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                    style={{
                      width: "100%", padding: "9px 12px", border: "1px solid #d1d5db",
                      borderRadius: 8, fontSize: 14, color: "#111827", outline: "none",
                      boxSizing: "border-box", background: "#fff",
                    }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 5 }}>Notes (optional)</label>
                <textarea rows={3} placeholder="Tell us about your project..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  style={{
                    width: "100%", padding: "9px 12px", border: "1px solid #d1d5db",
                    borderRadius: 8, fontSize: 14, color: "#111827", outline: "none",
                    resize: "none", boxSizing: "border-box", fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            <button onClick={handleSubmit} disabled={!formData.name || !formData.email}
              style={{
                marginTop: 20, width: "100%", padding: "11px", borderRadius: 8,
                background: (!formData.name || !formData.email) ? "#d1d5db" : "#111827",
                color: "#fff", border: "none", fontSize: 14, fontWeight: 600,
                cursor: (!formData.name || !formData.email) ? "not-allowed" : "pointer",
                transition: "background 0.15s",
              }}>
              Confirm Booking
            </button>
          </div>
        </div>
      ) : (
        /* ── CALENDAR + TIMESLOTS STEP ── */
        <div style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)",
          display: "flex",
          width: "100%",
          maxWidth: 860,
          overflow: "hidden",
          height: "auto",
        }}>

          {/* ── LEFT PANEL: Info ── */}
          <div style={{
            width: 220,
            borderRight: "1px solid #f3f4f6",
            padding: "28px 24px",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}>
            {/* Avatar */}
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "#16a34a", display: "flex", alignItems: "center",
              justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700,
            }}>m</div>

            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", margin: "0 0 4px", letterSpacing: "0.04em", textTransform: "uppercase" }}>MHDEVFUSION</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: "0 0 16px", lineHeight: 1.2 }}>{duration} min meeting</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* ── Duration dropdown ── */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => { setDurOpen(o => !o); setTzOpen(false); }}
                  style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#6b7280" strokeWidth="1.8"/><path d="M12 7v5l3 3" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  <span style={{ fontSize: 13, color: "#374151" }}>{duration}m</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d={durOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {durOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 6px)", left: 0,
                    background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 100, width: 140, overflow: "hidden",
                  }}>
                    {[15, 20, 30, 45, 60, 90].map(d => (
                      <button key={d} onClick={() => { setDuration(d); setDurOpen(false); }}
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          padding: "9px 14px", border: "none", fontSize: 12,
                          background: d === duration ? "#f9fafb" : "#fff",
                          color: d === duration ? "#111827" : "#374151",
                          fontWeight: d === duration ? 600 : 400,
                          cursor: "pointer",
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#f9fafb"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = d === duration ? "#f9fafb" : "#fff"; }}
                      >
                        {d} minutes
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cal Video static */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#6b7280" strokeWidth="1.8"/><path d="M3 9h18M9 4v5M15 4v5" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round"/></svg>
                <span style={{ fontSize: 13, color: "#374151" }}>Cal Video</span>
              </div>

              {/* ── Timezone dropdown ── */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => { setTzOpen(o => !o); setTzSearch(""); setDurOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "none", border: "none", cursor: "pointer", padding: 0,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#6b7280" strokeWidth="1.8"/>
                    <path d="M2 12h4M18 12h4M12 2v4M12 18v4" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: 13, color: "#374151" }}>{timezone}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d={tzOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {tzOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 6px)", left: 0,
                    background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    zIndex: 100, width: 220, overflow: "hidden",
                  }}>
                    {/* Search */}
                    <div style={{ padding: "8px 10px", borderBottom: "1px solid #f3f4f6" }}>
                      <input
                        autoFocus
                        placeholder="Search timezone..."
                        value={tzSearch}
                        onChange={e => setTzSearch(e.target.value)}
                        style={{
                          width: "100%", padding: "6px 10px", border: "1px solid #e5e7eb",
                          borderRadius: 6, fontSize: 12, outline: "none",
                          color: "#111827", boxSizing: "border-box",
                        }}
                      />
                    </div>
                    {/* List */}
                    <div style={{ maxHeight: 200, overflowY: "auto" }}>
                      {filteredTz.length === 0 ? (
                        <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", padding: "12px 0" }}>No results</p>
                      ) : filteredTz.map(tz => (
                        <button key={tz} onClick={() => { setTimezone(tz); setTzOpen(false); }}
                          style={{
                            display: "block", width: "100%", textAlign: "left",
                            padding: "9px 14px", border: "none", fontSize: 12,
                            background: tz === timezone ? "#f9fafb" : "#fff",
                            color: tz === timezone ? "#111827" : "#374151",
                            fontWeight: tz === timezone ? 600 : 400,
                            cursor: "pointer",
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#f9fafb"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = tz === timezone ? "#f9fafb" : "#fff"; }}
                        >
                          {tz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── MIDDLE PANEL: Calendar ── */}
          <div style={{ flex: 1, padding: "28px 28px 24px", borderRight: "1px solid #f3f4f6", overflowY: "auto" }}>
            {/* Month nav */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <button onClick={() => navigateMonth(-1)} style={navBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: "#111827", margin: 0 }}>
                <span style={{ color: "#111827" }}>{monthName}</span>
                {" "}
                <span style={{ color: "#9ca3af", fontWeight: 400 }}>{yearNum}</span>
              </h4>
              <button onClick={() => navigateMonth(1)} style={navBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>

            {/* Weekday headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: 4 }}>
              {weekDays.map(d => (
                <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "#9ca3af", padding: "4px 0", letterSpacing: "0.05em", textTransform: "uppercase" }}>{d}</div>
              ))}
            </div>

            {/* Day grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
              {days.map((date, i) => {
                if (!date) return <div key={i} />;
                const avail = isAvailable(date);
                const sel = isSelected(date);
                const tod = isToday(date);
                return (
                  <button key={i} onClick={() => handleDateSelect(date)} disabled={!avail}
                    style={{
                      aspectRatio: "1",
                      border: "none",
                      borderRadius: 8,
                      background: sel ? "#111827" : "transparent",
                      color: sel ? "#fff" : avail ? "#111827" : "#d1d5db",
                      fontSize: 14,
                      fontWeight: avail ? 500 : 400,
                      cursor: avail ? "pointer" : "not-allowed",
                      position: "relative",
                      transition: "background 0.1s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                    onMouseEnter={e => { if (avail && !sel) (e.currentTarget as HTMLButtonElement).style.background = "#f9fafb"; }}
                    onMouseLeave={e => { if (!sel) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                  >
                    {date.getDate()}
                    {/* dot for today */}
                    {tod && !sel && (
                      <span style={{ position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "#111827" }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT PANEL: Time slots ── */}
          {selectedDate && (
            <div style={{ width: 210, flexShrink: 0, display: "flex", flexDirection: "column" }}>
              {/* Sticky date header + format toggle */}
              <div style={{ padding: "28px 16px 12px", flexShrink: 0, borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>
                      {selectedDate.toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                    {" "}
                    <span style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>
                      {selectedDate.getDate()}
                    </span>
                  </div>
                  {/* 12h/24h toggle */}
                  <div style={{ display: "flex", border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", fontSize: 11, fontWeight: 600 }}>
                    {(["12h","24h"] as const).map(f => (
                      <button key={f} onClick={() => setTimeFormat(f)} style={{
                        padding: "4px 8px",
                        background: timeFormat === f ? "#111827" : "#fff",
                        color: timeFormat === f ? "#fff" : "#6b7280",
                        border: "none", cursor: "pointer",
                      }}>{f}</button>
                    ))}
                  </div>
                </div>
              </div>
              

              {/* Scrollable slots — takes remaining height */}
              <div style={{
                overflowY: "auto",
                maxHeight: 420,
                padding: "12px 16px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                scrollbarWidth: "thin",
                scrollbarColor: "#e5e7eb transparent",
              }}>
                {timeSlots.map(time => {
                  const sel = selectedTime === time;
                  return (
                    <button key={time} onClick={() => {
                      if (sel) { setStep("form"); return; }
                      setSelectedTime(time);
                    }}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: 8,
                        border: sel ? "2px solid #111827" : "1px solid #e5e7eb",
                        background: "#fff",
                        color: "#111827",
                        fontSize: 13,
                        fontWeight: sel ? 600 : 400,
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.1s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        flexShrink: 0,
                      }}
                      onMouseEnter={e => { if (!sel) (e.currentTarget as HTMLButtonElement).style.background = "#f9fafb"; }}
                      onMouseLeave={e => { if (!sel) (e.currentTarget as HTMLButtonElement).style.background = "#fff"; }}
                    >
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", display: "inline-block", flexShrink: 0 }} />
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Placeholder when no date selected */}
          {!selectedDate && (
            <div style={{ width: 210, padding: "28px 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ color: "#d1d5db", fontSize: 13, textAlign: "center" }}>Select a date to see available times</p>
            </div>
          )}
        </div>
      )}
          </div>
        </div>
      </div>

      {/* Book Meeting Button and Form Container */}
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-5xl">
          {!showBookingForm ? (
            <div className="text-center">
              <button
                onClick={() => setShowBookingForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
              >
                <Calendar size={20} />
                Book Meeting
              </button>
            </div>
          ) : (
            <div className="bg-white border border-border rounded-xl shadow-sm" style={{ maxHeight: "500px", overflow: "auto" }}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-foreground">Book Your Meeting</h3>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ×
                  </button>
                </div>

                {bookingStatus === "success" ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="text-green-600" size={32} />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Meeting Scheduled!</h4>
                    <p className="text-muted-foreground">We've sent you a confirmation email with the meeting details.</p>
                  </div>
                ) : (
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    alert('Form submitted! Check browser console for debug info.');

                    // Debug: Log form data and validation
                    console.log('=== BOOKING FORM DEBUG ===');
                    console.log('Form Data:', formData);
                    console.log('Selected Date:', selectedDate);
                    console.log('Selected Time:', selectedTime);
                    console.log('Name (trimmed):', formData.name.trim());
                    console.log('Email (trimmed):', formData.email.trim());
                    console.log('Phone (trimmed):', formData.phone.trim());
                    console.log('Notes (trimmed):', formData.notes.trim());

                    // Validate required fields
                    const nameValid = !!formData.name.trim();
                    const emailValid = !!formData.email.trim();
                    const phoneValid = !!formData.phone.trim();
                    const notesValid = !!formData.notes.trim();
                    const dateValid = !!selectedDate;
                    const timeValid = !!selectedTime;

                    console.log('Validation Results:');
                    console.log('Name valid:', nameValid);
                    console.log('Email valid:', emailValid);
                    console.log('Phone valid:', phoneValid);
                    console.log('Notes valid:', notesValid);
                    console.log('Date valid:', dateValid);
                    console.log('Time valid:', timeValid);

                    const isFormValid = nameValid && emailValid && phoneValid && notesValid && dateValid && timeValid;
                    console.log('Form valid overall:', isFormValid);
                    console.log('===========================');

                    if (!isFormValid) {
                      setBookingStatus("error");
                      return;
                    }

                    setBookingStatus("loading");

                    try {
                      // Convert 12-hour time to 24-hour format
                      console.log('Original selectedTime:', selectedTime);
                      
                      let time24Hour = selectedTime;
                      
                      // Simple string replacement for common time formats
                      if (selectedTime.includes('am') || selectedTime.includes('pm')) {
                        const timeMap: { [key: string]: string } = {
                          '9:00am': '09:00:00', '9:30am': '09:30:00',
                          '10:00am': '10:00:00', '10:30am': '10:30:00',
                          '11:00am': '11:00:00', '11:30am': '11:30:00',
                          '12:00pm': '12:00:00', '12:30pm': '12:30:00',
                          '1:00pm': '13:00:00', '1:30pm': '13:30:00',
                          '2:00pm': '14:00:00', '2:30pm': '14:30:00',
                          '3:00pm': '15:00:00', '3:30pm': '15:30:00',
                          '4:00pm': '16:00:00', '4:30pm': '16:30:00',
                          '5:00pm': '17:00:00', '5:30pm': '17:30:00',
                          '6:00pm': '18:00:00', '6:30pm': '18:30:00'
                        };
                        
                        time24Hour = timeMap[selectedTime] || selectedTime;
                      }
                      
                      const dateTimeString = `${selectedDate.toISOString().split('T')[0]}T${time24Hour}`;
                      
                      console.log('Time conversion:', {
                        original12h: selectedTime,
                        converted24h: time24Hour,
                        finalDateTime: dateTimeString
                      });
                      
                      const bookingData = {
                        name: formData.name.trim(),
                        email: formData.email.trim(),
                        phone: formData.phone.trim(),
                        company: formData.guests.trim(),
                        meetingType: meetingType,
                        dateTime: dateTimeString,
                        duration: duration,
                        meetingAbout: formData.notes.trim(),
                      };

                      console.log('Sending booking data:', bookingData);
                      
                      const response = await fetch("/api/meeting/book", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(bookingData),
                      });

                      console.log('API Response status:', response.status);
                      console.log('API Response ok:', response.ok);

                      if (response.ok) {
                        setBookingStatus("success");
                        setFormData({ name: "", email: "", phone: "", notes: "", guests: "" });
                        setTimeout(() => {
                          setShowBookingForm(false);
                          setBookingStatus("idle");
                        }, 3000);
                      } else {
                        setBookingStatus("error");
                      }
                    } catch {
                      setBookingStatus("error");
                    }
                  }} className="space-y-4">
                    <div className="space-y-4">
                      <div style={{ marginBottom: '16px', backgroundColor: '#f0f8ff', padding: '12px', borderRadius: '8px', border: '2px solid #007bff' }}>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#007bff', fontWeight: 'bold' }}>Meeting Type *</label>
                        <select
                          value={meetingType}
                          onChange={(e) => {
                            setMeetingType(e.target.value);
                            if (bookingStatus === "error") setBookingStatus("idle");
                          }}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                          style={{ backgroundColor: 'white', border: '1px solid #007bff' }}
                        >
                          <option value="consultation">Consultation</option>
                          <option value="demo">Demo</option>
                          <option value="support">Support</option>
                          <option value="sales">Sales Call</option>
                          <option value="follow-up">Follow-up</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value });
                              if (bookingStatus === "error") setBookingStatus("idle");
                            }}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (bookingStatus === "error") setBookingStatus("idle");
                            }}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="your@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone *</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              if (bookingStatus === "error") setBookingStatus("idle");
                            }}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="+1234567890"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Company</label>
                          <input
                            type="text"
                            value={formData.guests}
                            onChange={(e) => {
                              setFormData({ ...formData, guests: e.target.value });
                              if (bookingStatus === "error") setBookingStatus("idle");
                            }}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Your company"
                          />
                        </div>
                      </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Meeting Date</label>
                        <input
                          type="text"
                          readOnly
                          value={selectedDate ? selectedDate.toLocaleDateString() : "Select date above"}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-muted"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Meeting Time</label>
                        <input
                          type="text"
                          readOnly
                          value={selectedTime}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-muted"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Meeting Details *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => {
                          setFormData({ ...formData, notes: e.target.value });
                          if (bookingStatus === "error") setBookingStatus("idle");
                        }}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Tell us what you'd like to discuss..."
                      />
                    </div>

                    {bookingStatus === "error" && (
                      <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                        Please fill all required fields: Name, Email, Phone, and Meeting Details. Make sure you've also selected a date and time from the calendar above.
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={bookingStatus === "loading"}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                      >
                        {bookingStatus === "loading" ? "Booking..." : "Book Meeting"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowBookingForm(false)}
                        className="px-4 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const navBtn: React.CSSProperties = {
  background: "none",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};