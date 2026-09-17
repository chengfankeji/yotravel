"use client";

import Image from "next/image";
import {
  CalendarDays,
  Camera,
  Check,
  CircleDollarSign,
  CreditCard,
  LockKeyhole,
  Mail,
  MapPinned,
  MessageCircle,
  Plane,
  ShieldCheck,
  Sparkles,
  TrainFront,
  X,
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
    title: "YoTravel Dashboard",
    description:
      'Location-based survival tools, Wi-Fi setup, and "Show-to-Driver" destination cards.',
    icon: MapPinned,
    color: "bg-teal-100 text-teal-800",
  },
  {
    title: "YoTravel Guides",
    description:
      "Step-by-step interactive guides for foreign passport train bookings and eSIM setup.",
    icon: TrainFront,
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    title: "YoTravel AI Lens",
    description:
      "Camera-based visual translation for Chinese menus with allergen & spice alerts.",
    icon: Camera,
    color: "bg-amber-100 text-amber-800",
  },
  {
    title: "YoTravel Vault",
    description:
      "AES-256 encrypted storage for passport data and travel itineraries.",
    icon: LockKeyhole,
    color: "bg-rose-100 text-rose-800",
  },
];

const comparisons: ComparisonItem[] = [
  {
    without: "Payment cards declined",
    with: "Instant local mobile payments",
  },
  {
    without: "12306 app confusion",
    with: "Hassle-free train ticketing",
  },
  {
    without: "Menu reading panic",
    with: "AI ingredient decoder",
  },
  {
    without: "Getting lost without English taxi apps",
    with: "24/7 human concierge assistance",
  },
];

const offerItems = [
  "Unlimited AI Visual Menu Translation",
  "24/7 Human Concierge Support (8:00 - 22:00)",
  "High-Speed Rail & Attraction Booking Assistance",
  "Emergency Priority Routing",
];

const tripStack: Array<[string, LucideIcon]> = [
  ["Alipay ready", CreditCard],
  ["Beijing to Shanghai rail help", TrainFront],
  ["Menu allergy scan", Camera],
];

const ctaButton =
  "md-ripple inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/20 transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-teal-300 active:scale-[0.99]";

const navSecondaryButton =
  "md-ripple inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-teal-700/30 bg-white/40 px-4 py-2 text-xs font-semibold text-teal-800 transition hover:border-teal-700/50 hover:bg-teal-50 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-teal-300 active:scale-[0.99] sm:px-5 sm:text-sm";

const heroSecondaryButton =
  "md-ripple inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/45 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/15 backdrop-blur-md transition hover:bg-white/20 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-white/70 active:scale-[0.99]";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isMessageSuccess, setIsMessageSuccess] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");
  const [travelWindow, setTravelWindow] = useState("");
  const [message, setMessage] = useState("");

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const leadCapture: LeadCapture = {
      email,
      tripDate,
      submittedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      "yotravel-payment-intent",
      JSON.stringify(leadCapture),
    );
    setIsSuccess(true);
  };

  const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const messageCapture: MessageCapture = {
      email: messageEmail,
      travelWindow,
      message,
      submittedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      "yotravel-message-intent",
      JSON.stringify(messageCapture),
    );
    setIsMessageSuccess(true);
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
            <span>Get 30-Day VIP — $50</span>
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
          preload
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
              Travel China Like a Local — Zero Tech Barriers.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">
              Master WeChat & Alipay payments, 12306 high-speed trains, menu
              translations, and 24/7 localized human support in one app.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4">
              <div className="flex flex-col items-start gap-3 sm:flex-row">
              <button
                type="button"
                onClick={openPaymentIntent}
                className={ctaButton}
              >
                <Sparkles aria-hidden="true" className="size-5" />
                Unlock VIP Access — $50
              </button>
              <button
                type="button"
                onClick={openMessageModal}
                className={heroSecondaryButton}
              >
                <MessageCircle aria-hidden="true" className="size-5" />
                Leave a Message
              </button>
              </div>
              <p className="text-sm font-medium text-white/85">
                30-Day Pass • No Recurring Charges • Bank-Grade Security
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
              One assistant, four travel systems
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              Everything you need when China’s local apps become mission
              critical.
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
                Replace travel friction
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
                Turn China’s hardest first-week moments into guided actions.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                YoTravel gives tourists the local payment, transport,
                translation, and support layer they normally discover only
                after something goes wrong.
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
                Get concierge-backed travel confidence for $50.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                Built for travelers who need payments, trains, restaurants, and
                emergencies solved without switching between unfamiliar local
                apps.
              </p>
              <button
                type="button"
                onClick={openPaymentIntent}
                className={`${ctaButton} mt-8`}
              >
                <CircleDollarSign aria-hidden="true" className="size-5" />
                Get YoTravel VIP — $50
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
        <p>YoTravel helps foreign tourists move through China with local-grade confidence.</p>
      </footer>

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
                  YoTravel VIP
                </p>
                <h2
                  id="payment-intent-title"
                  className="mt-2 text-2xl font-bold text-slate-950"
                >
                  {isSuccess ? "Priority List Confirmed" : "Reserve VIP Access"}
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
                  ✨ You&apos;re on the YoTravel Priority List! Due to high demand,
                  daily slots for our 24/7 human concierge are currently full.
                  Your card was NOT charged. We&apos;ve saved your spot and will
                  email you an exclusive 20% discount code when your slot opens!
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

                <button type="submit" className={`${ctaButton} w-full`}>
                  <CreditCard aria-hidden="true" className="size-5" />
                  Proceed to Payment — $50
                </button>
                <p className="text-center text-xs leading-5 text-slate-500">
                  Fake-door validation only. Your card will not be charged.
                </p>
              </form>
            )}
          </div>
        </div>
      ) : null}

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
                  Leave a Message
                </p>
                <h2
                  id="message-title"
                  className="mt-2 text-2xl font-bold text-slate-950"
                >
                  Got Questions About Traveling to China?
                </h2>
                {!isMessageSuccess ? (
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Tell us what you need help with (e.g., Alipay setup, train
                    tickets, itineraries). Our team will reply within 2 hours!
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
                  ✨ Message Received! Thanks for reaching out. We&apos;ve sent
                  a confirmation to your email and will get back to you shortly
                  with tailored travel advice.
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

                <button type="submit" className={`${ctaButton} w-full`}>
                  <MessageCircle aria-hidden="true" className="size-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
