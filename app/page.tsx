"use client";

import Image from "next/image";
import {
  CalendarDays,
  Camera,
  Check,
  CircleDollarSign,
  CreditCard,
  Mail,
  MapPinned,
  MessageCircle,
  Plane,
  ShieldCheck,
  Sparkles,
  TrainFront,
  X,
  Loader2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

type ComparisonItem = {
  without: string;
  with: string;
};

type LeadCapture = {
  email: string;
  tripDate: string;
  submittedAt: string;
};

type MessageCapture = {
  email: string;
  travelWindow: string;
  message: string;
  submittedAt: string;
};

const features: Feature[] = [
  {
    title: "Get Ready Before You Land",
    description:
      'Prepare mobile data, essential apps, and "Show-to-Driver" destination cards before your trip.',
    icon: MapPinned,
    color: "bg-teal-100 text-teal-800",
  },
  {
    title: "Payments & Transport Setup",
    description:
      "Step-by-step help for Alipay, WeChat Pay, Didi, metro, and high-speed rail essentials.",
    icon: TrainFront,
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    title: "Understand What You See",
    description:
      "Use visual translation for menus and signs, with practical context for everyday travel situations.",
    icon: Camera,
    color: "bg-amber-100 text-amber-800",
  },
  {
    title: "Real Human Backup",
    description:
      "When an app, payment, train, or ride problem gets confusing, ask a real person in China for help.",
    icon: MessageCircle,
    color: "bg-rose-100 text-rose-800",
  },
];

const comparisons: ComparisonItem[] = [
  {
    without: "Payment setup fails after landing",
    with: "Step-by-step payment setup and troubleshooting",
  },
  {
    without: "Train booking feels unfamiliar",
    with: "Guided high-speed rail booking support",
  },
  {
    without: "Menus and signs are hard to understand",
    with: "Visual translation with practical context",
  },
  {
    without: "No one to ask when something goes wrong",
    with: "Human support daily, 8:00-22:00 China Time",
  },
];

const offerItems = [
  "Pre-trip setup guidance for payments, mobile data, and essential apps",
  "Human support daily, 8:00-22:00 China Time",
  "High-speed rail, Didi, metro, and local travel assistance",
  "Priority help when a travel app or local process gets confusing",
];

const tripStack: Array<[string, LucideIcon]> = [
  ["Alipay ready", CreditCard],
  ["Beijing to Shanghai rail help", TrainFront],
  ["Menu allergy scan", Camera],
];

const ctaButton =
  "md-ripple inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/20 transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-teal-300 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";

const navSecondaryButton =
  "md-ripple inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-teal-700/30 bg-white/40 px-4 py-2 text-xs font-semibold text-teal-800 transition hover:border-teal-700/50 hover:bg-teal-50 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-teal-300 active:scale-[0.99] sm:px-5 sm:text-sm";

const heroSecondaryButton =
  "md-ripple inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/45 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/15 backdrop-blur-md transition hover:bg-white/20 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-white/70 active:scale-[0.99]";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isMessageSuccess, setIsMessageSuccess] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");
  const [travelWindow, setTravelWindow] = useState("");
  const [message, setMessage] = useState("");
  const [isMessageSubmitting, setIsMessageSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow =
      isModalOpen || isMessageModalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen, isMessageModalOpen]);

  const openPaymentIntent = () => {
    setIsSuccess(false);
    setIsModalOpen(true);
  };

  const closePaymentIntent = () => {
    setIsModalOpen(false);
  };

  const openMessageModal = () => {
    setIsMessageSuccess(false);
    setIsMessageModalOpen(true);
  };

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
  };

  // 处理 VIP 购买意向提交（连通钉钉 API）
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const leadCapture: LeadCapture = {
      email,
      tripDate,
      submittedAt: new Date().toISOString(),
    };

    try {
      // 离线/本地备份
      window.localStorage.setItem(
        "yotravel-payment-intent",
        JSON.stringify(leadCapture),
      );

      // 发送至钉钉后端 API
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadCapture),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert("Submission failed, please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 处理咨询留言提交（连通钉钉 API）
  const handleMessageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsMessageSubmitting(true);

    const messageCapture: MessageCapture = {
      email: messageEmail,
      travelWindow,
      message,
      submittedAt: new Date().toISOString(),
    };

    try {
      // 离线/本地备份
      window.localStorage.setItem(
        "yotravel-message-intent",
        JSON.stringify(messageCapture),
      );

      // 发送至钉钉后端 API
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageCapture),
      });

      if (res.ok) {
        setIsMessageSuccess(true);
      } else {
        alert("Failed to send message, please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error, please try again.");
    } finally {
      setIsMessageSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fbf8] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/75 shadow-sm shadow-slate-950/5 backdrop-blur-xl">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        >
          <a
            href="#hero"
            className="flex shrink-0 items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-teal-300"
          >
            <span className="grid size-10 place-items-center rounded-full bg-teal-700 text-white shadow-md shadow-teal-900/20">
              <Plane aria-hidden="true" className="size-5" />
            </span>
            <span className="text-lg font-bold text-slate-950">YoTravel</span>
          </a>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={openPaymentIntent}
              className="md-ripple inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-teal-700 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-teal-900/20 transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-teal-300 active:scale-[0.99] sm:px-5 sm:text-sm"
            >
              <CircleDollarSign aria-hidden="true" className="size-4" />
              <span>Free China Readiness Check</span>
            </button>
            <button
              type="button"
              onClick={openMessageModal}
              className={navSecondaryButton}
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              <span>Ask a Question</span>
            </button>
          </div>
        </nav>
      </header>

      <section
        id="hero"
        className="relative isolate flex min-h-[calc(100svh-8rem)] items-center overflow-hidden"
      >
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-transparent to-black/65" />

        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 backdrop-blur-md">
              <ShieldCheck aria-hidden="true" className="size-4" />
              Built for foreign tourists in China
            </div>
            <h1 className="max-w-5xl text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              First trip to China? Get ready before you land.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">
              Prepare payments, mobile data, Didi, metro, and high-speed rail before your trip — with real human help available if something goes wrong after you arrive.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4">
              <div className="flex flex-col items-start gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={openPaymentIntent}
                  className={ctaButton}
                >
                  <Sparkles aria-hidden="true" className="size-5" />
                  Get a Free Readiness Check
                </button>
                <button
                  type="button"
                  onClick={openMessageModal}
                  className={heroSecondaryButton}
                >
                  <MessageCircle aria-hidden="true" className="size-5" />
                  Ask a China Travel Question
                </button>
              </div>
              <p className="text-sm font-medium text-white/85">
                Free pre-trip check • No card required • Built for first-time visitors
              </p>
            </div>
          </div>

          <div className="hidden self-end rounded-2xl border border-white/20 bg-white/15 p-5 text-white shadow-xl shadow-black/20 backdrop-blur-xl lg:block">
            <p className="text-sm font-semibold uppercase text-white/70">
              Live Trip Stack
            </p>
            <div className="mt-5 space-y-4">
              {tripStack.map(([label, Icon]) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-white/20">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase text-teal-700">
              One place to get China-ready
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              Set up the essentials before you arrive — and know who to ask when you get stuck.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, description, icon: Icon, color }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10"
              >
                <span className={`grid size-12 place-items-center rounded-2xl ${color}`}>
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="value" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase text-teal-700">
                Reduce first-trip friction
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
                Arrive with the essentials ready instead of figuring everything out under pressure.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                YoTravel helps first-time visitors prepare the systems they will actually use in China — then provides human backup when instructions alone are not enough.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-red-100 bg-red-50 p-5 shadow-md shadow-red-950/5">
                <h3 className="flex items-center gap-2 text-lg font-bold text-red-900">
                  <X aria-hidden="true" className="size-5" />
                  Without YoTravel
                </h3>
                <ul className="mt-5 space-y-3">
                  {comparisons.map(({ without }) => (
                    <li
                      key={without}
                      className="rounded-xl bg-white/80 px-4 py-3 text-sm font-medium text-red-950"
                    >
                      {without}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5 shadow-lg shadow-teal-950/10">
                <h3 className="flex items-center gap-2 text-lg font-bold text-teal-950">
                  <Check aria-hidden="true" className="size-5" />
                  With YoTravel
                </h3>
                <ul className="mt-5 space-y-3">
                  {comparisons.map(({ with: withYoTravel }) => (
                    <li
                      key={withYoTravel}
                      className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-teal-950"
                    >
                      {withYoTravel}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="offer" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/10 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase text-teal-700">
                30-Day VIP Pass
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
                Keep human backup for your whole trip for $50.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                After the free readiness check, upgrade if you want guided help with payments, transport, trains, and local travel questions during your trip.
              </p>
              <button
                type="button"
                onClick={openPaymentIntent}
                className={`${ctaButton} mt-8`}
              >
                <CircleDollarSign aria-hidden="true" className="size-5" />
                Start with a Free Readiness Check
              </button>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <ul className="space-y-4">
                {offerItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-teal-700 text-white">
                      <Check aria-hidden="true" className="size-4" />
                    </span>
                    <span className="font-medium leading-6 text-slate-800">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        <p>YoTravel helps first-time visitors prepare for China and get real help when local apps or travel systems become confusing.</p>
      </footer>

      {/* VIP Intent Modal */}
      {isModalOpen ? (
        <div
          aria-labelledby="payment-intent-title"
          aria-modal="true"
          className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePaymentIntent();
            }
          }}
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl shadow-black/30 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase text-teal-700">
                  Pre-Trip Check
                </p>
                <h2
                  id="payment-intent-title"
                  className="mt-2 text-2xl font-bold text-slate-950"
                >
                  {isSuccess ? "Readiness Check Requested" : "Free China Readiness Check"}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={closePaymentIntent}
                className="md-ripple grid size-10 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-teal-300"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            {isSuccess ? (
              <div className="mt-8 rounded-2xl bg-teal-50 p-5 text-teal-950">
                <div className="grid size-12 place-items-center rounded-full bg-teal-700 text-white">
                  <Check aria-hidden="true" className="size-6" />
                </div>
                <p className="mt-5 text-base leading-7">
                  Thanks — we&apos;ve received your request. We&apos;ll review your trip date and email you with a simple China readiness checklist and next-step guidance. No card was required.
                </p>
                <button
                  type="button"
                  onClick={closePaymentIntent}
                  className={`${ctaButton} mt-6 w-full`}
                >
                  Done
                </button>
              </div>
            ) : (
              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Mail aria-hidden="true" className="size-4 text-teal-700" />
                    Email Address
                  </span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="min-h-[52px] w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-950 shadow-inner shadow-slate-950/5 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <CalendarDays
                      aria-hidden="true"
                      className="size-4 text-teal-700"
                    />
                    Expected Trip Date
                  </span>
                  <input
                    type="date"
                    value={tripDate}
                    onChange={(event) => setTripDate(event.target.value)}
                    className="min-h-[52px] w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-950 shadow-inner shadow-slate-950/5 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${ctaButton} w-full`}
                >
                  {isSubmitting ? (
                    <Loader2 aria-hidden="true" className="size-5 animate-spin" />
                  ) : (
                    <CreditCard aria-hidden="true" className="size-5" />
                  )}
                  {isSubmitting ? "Submitting..." : "Request My Free Check"}
                </button>
                <p className="text-center text-xs leading-5 text-slate-500">
                  No payment required. We&apos;ll use your email only to follow up on your China travel setup request.
                </p>
              </form>
            )}
          </div>
        </div>
      ) : null}

      {/* Message Modal */}
      {isMessageModalOpen ? (
        <div
          aria-labelledby="message-title"
          aria-modal="true"
          className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeMessageModal();
            }
          }}
        >
          <div className="max-h-[calc(100svh-3rem)] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl shadow-black/30 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase text-teal-700">
                  Ask a China Travel Question
                </p>
                <h2
                  id="message-title"
                  className="mt-2 text-2xl font-bold text-slate-950"
                >
                  Have a China Travel Question?
                </h2>
                {!isMessageSuccess ? (
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Tell us what you need help with — for example Alipay setup, mobile data, Didi, metro, or train tickets. We&apos;ll reply as soon as we can during China daytime hours.
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                aria-label="Close message modal"
                onClick={closeMessageModal}
                className="md-ripple grid size-10 shrink-0 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-teal-300"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            {isMessageSuccess ? (
              <div className="mt-8 rounded-2xl bg-teal-50 p-5 text-teal-950">
                <div className="grid size-12 place-items-center rounded-full bg-teal-700 text-white">
                  <Check aria-hidden="true" className="size-6" />
                </div>
                <p className="mt-5 text-base leading-7">
                  Thanks — your question has been received. We&apos;ll get back to you with practical next-step guidance.
                </p>
                <button
                  type="button"
                  onClick={closeMessageModal}
                  className={`${ctaButton} mt-6 w-full`}
                >
                  Done
                </button>
              </div>
            ) : (
              <form className="mt-8 space-y-5" onSubmit={handleMessageSubmit}>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Mail aria-hidden="true" className="size-4 text-teal-700" />
                    Your Email Address
                  </span>
                  <input
                    required
                    type="email"
                    value={messageEmail}
                    onChange={(event) => setMessageEmail(event.target.value)}
                    className="min-h-[52px] w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-950 shadow-inner shadow-slate-950/5 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <CalendarDays
                      aria-hidden="true"
                      className="size-4 text-teal-700"
                    />
                    Expected Travel Month/Dates
                  </span>
                  <input
                    type="text"
                    value={travelWindow}
                    onChange={(event) => setTravelWindow(event.target.value)}
                    className="min-h-[52px] w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-950 shadow-inner shadow-slate-950/5 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
                    placeholder="Oct 2026"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <MessageCircle
                      aria-hidden="true"
                      className="size-4 text-teal-700"
                    />
                    Your Message / Questions
                  </span>
                  <textarea
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="min-h-36 w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 shadow-inner shadow-slate-950/5 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
                    placeholder="e.g., How do I buy high-speed train tickets from Shanghai to Beijing with a US passport?"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isMessageSubmitting}
                  className={`${ctaButton} w-full`}
                >
                  {isMessageSubmitting ? (
                    <Loader2 aria-hidden="true" className="size-5 animate-spin" />
                  ) : (
                    <MessageCircle aria-hidden="true" className="size-5" />
                  )}
                  {isMessageSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
