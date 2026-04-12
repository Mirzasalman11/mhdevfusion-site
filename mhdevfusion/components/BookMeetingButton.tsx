"use client";

import { useState } from "react";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MEETING_TYPES = [
  { value: "consultation", label: "Initial Consultation", duration: 30 },
  { value: "project-discussion", label: "Project Discussion", duration: 45 },
  { value: "demo", label: "Product Demo", duration: 60 },
  { value: "support", label: "Technical Support", duration: 30 },
];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
];

export default function BookMeetingButton() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [meetingType, setMeetingType] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    meetingAbout: "",
  });

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour, minute, 0, 0);
        slots.push(time.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        }));
      }
    }
    return slots;
  };

  const validateForm = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      selectedDate &&
      selectedTime &&
      meetingType &&
      formData.meetingAbout.trim()
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      // Combine date and time to create ISO datetime string
      const dateTime = new Date(`${selectedDate}T${selectedTime}`);
      
      const meetingData = {
        ...formData,
        meetingType,
        dateTime: dateTime.toISOString(),
        duration: MEETING_TYPES.find(t => t.value === meetingType)?.duration || 30,
      };

      const res = await fetch("/api/meeting/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meetingData),
      });

      if (!res.ok) throw new Error("Failed to book meeting");

      setStatus("success");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        meetingAbout: "",
      });
      setSelectedDate("");
      setSelectedTime("");
      setMeetingType("");

      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
      }, 3000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
        size="lg"
      >
        <Calendar className="mr-2" size={20} />
        Book Meeting
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <Calendar className="text-primary" size={28} />
              Schedule a Meeting
            </DialogTitle>
          </DialogHeader>

          {status === "success" ? (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
              <h3 className="text-xl font-semibold mb-2">Meeting Scheduled!</h3>
              <p className="text-muted-foreground">
                We've sent you a confirmation email with the meeting details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Meeting Type Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Meeting Type</label>
                <Select value={meetingType} onValueChange={setMeetingType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEETING_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{type.label}</span>
                          <span className="text-muted-foreground text-sm ml-4">
                            {type.duration} min
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date and Time Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {generateTimeSlots().map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name *</label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone *</label>
                  <Input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <Input
                    placeholder="Your company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              {/* Meeting Details */}
              <div className="space-y-2">
                <label className="text-sm font-medium">What's the meeting about? *</label>
                <Textarea
                  rows={4}
                  placeholder="Tell us what you'd like to discuss..."
                  value={formData.meetingAbout}
                  onChange={(e) => setFormData({ ...formData, meetingAbout: e.target.value })}
                  required
                />
              </div>

              {/* Error Message */}
              {status === "error" && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                  Please fill all required fields correctly.
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 text-lg"
              >
                {status === "loading" ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Scheduling...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2" size={20} />
                    Book Meeting
                  </>
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
