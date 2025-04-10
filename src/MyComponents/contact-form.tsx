"use client";
import { Loader2, Send } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormDataStore } from "@/stores/store";

interface Props {
  scrollToTop?: boolean;
  badge?: string;
  header?: string;
  desc?: string;
  btnText?: string;
}

export default function ContactForm({
  scrollToTop,
  badge,
  header,
  desc,
  btnText,
}: Props) {
  const {
    name,
    setName,
    email,
    setEmail,
    service,
    setService,
    projectDetails,
    setProjectDetails,
  } = useFormDataStore();
  const formData = {
    name,
    email,
    service,
    projectDetails,
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  useEffect(() => {
    if (scrollToTop) {
      scrollTo({ top: 0 });
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        // Need to send content to API
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setName("");
      setEmail("");
      setService("");
      setProjectDetails("");

      setStatus({
        type: "success",
        message: "Thank You for reaching out!",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        type: "error",
        message:
          "There was an error submitting your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-24"
    >
      <div className="container text-black mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-12">
            <Badge className="bg-amber-100 dark:bg-blue-900/50 text-black dark:text-white border-transparent mb-4 px-3 py-1">
              {badge ? `${badge.toUpperCase()}` : "CONTACT US"}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white mt-2 mb-4">
              {header ? `${header}` : "Ready to Start Your Project?"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {desc
                ? `${desc}`
                : "Tell us about your project and we'll get back to you within 24 hours with a free consultation."}
            </p>
          </div>

          {/* FORM */}
          <div className="bg-amber-100 dark:bg-black border-2 border-yellow-300 dark:border-blue-900 rounded-xl p-8 md:p-10 shadow-xl shadow-yellow-500/10 dark:shadow-blue-950/10">
            <div className="grid grid-cols-1 gap-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-yellow-600 dark:text-blue-200 font-medium mb-2"
                  >
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    placeholder="Enter your full name"
                    onChange={(e) => setName(e.target.value)}
                    className="bg-yellow-200 dark:bg-blue-950/10 border-yellow-800/40 dark:border-blue-800/40 dark:text-white focus:border-yellow-500 dark:focus:border-blue-500 h-12 text-base w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-yellow-600 dark:text-blue-200 font-medium mb-2"
                    >
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      value={formData.email}
                      placeholder="your@email.com"
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-yellow-200 dark:bg-blue-950/10 border-yellow-800/40 dark:border-blue-800/40 dark:text-white focus:border-yellow-500 dark:focus:border-blue-500 h-12 text-base w-full"
                      required
                    />
                  </div>

                  {/* Services */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-yellow-600 dark:text-blue-200 font-medium mb-2"
                    >
                      Service Needed
                    </label>
                    <select
                      id="service"
                      className="w-full bg-yellow-200 dark:bg-blue-950/10 border-yellow-800/40 dark:border-blue-800/40 dark:text-white focus:border-yellow-500 dark:focus:border-blue-500 rounded-md h-12 text-base px-3"
                      onChange={(e) => setService(e.target.value)}
                    >
                      <option value="" className="bg-yellow-200 dark:bg-blue-950">
                        Select a service
                      </option>
                      <option value="service 1" className="bg-yellow-200 dark:bg-blue-950">
                        Service 1
                      </option>
                      <option value="service 2" className="bg-yellow-200 dark:bg-blue-950">
                        Service 2
                      </option>
                      <option value="service 3" className="bg-yellow-200 dark:bg-blue-950">
                        service 3
                      </option>
                    </select>
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-yellow-600 dark:text-blue-200 font-medium mb-2"
                  >
                    Project Details
                  </label>
                  <Textarea
                    id="message"
                    className="bg-yellow-200 dark:bg-blue-950/10 border-yellow-800/40 dark:border-blue-800/40 dark:text-white focus:border-yellow-500 dark:focus:border-blue-500 h-40 text-base w-full resize-none"
                    value={formData.projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    placeholder="Tell us about your project requirements and goals..."
                  />
                </div>

                {/* Status Messages */}
                {status.type && (
                  <div
                    className={`p-4 rounded-lg ${
                      status.type === "success"
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center md:justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 dark:from-blue-600 dark:to-blue-800 dark:hover:from-blue-500 dark:hover:to-blue-700 
                    text-black dark:text-white border border-yellow-400 dark:border-blue-700/40 shadow-lg shadow-yellow-500/40 dark:shadow-blue-950/30 px-10 py-6 text-lg font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        {btnText ? `${btnText}` : "Send Message"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
