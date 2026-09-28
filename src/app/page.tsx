"use client";
import { useState } from "react";
import Image from "next/image";

import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

import { HiOutlineArrowUpRight, HiOutlinePaperAirplane } from "react-icons/hi2";

import { SiJavascript, SiNextdotjs, SiTypescript } from "react-icons/si";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleContactSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Make absolutely sure Netlify receives the form name
    formData.set("form-name", "contact");

    setFormStatus("sending");

    try {
      const response = await fetch("/contact-form.html", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(
          Array.from(formData.entries()).map(([key, value]) => [
            key,
            String(value),
          ]),
        ).toString(),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setFormStatus("success");
    } catch (error) {
      console.error("Contact form error:", error);
      setFormStatus("error");
    }
  };

  const navItems = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <main>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/[0.07] bg-[#170b20]/65 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between py-5">
            {/* Logo */}
            <a
              href="#home"
              onClick={() => {
                setActiveSection("home");
                setMobileMenuOpen(false);
              }}
              className="relative z-50 text-xl font-bold tracking-tight text-white"
            >
              Chioma
              <span className="ml-1 text-[#e76aa9]">&lt;/&gt;</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setActiveSection(item.id)}
                    className={`group relative pb-2 text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-[#f09bc5]"
                        : "text-white/65 hover:text-white"
                    }`}
                  >
                    {item.name}

                    <span
                      className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#e76aa9] to-[#ad8be8] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((previous) => !previous)}
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              className="relative z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.05] transition duration-300 hover:border-[#e76aa9]/40 hover:bg-[#e76aa9]/10 md:hidden"
            >
              <div className="relative h-5 w-6">
                <span
                  className={`absolute left-0 top-[2px] h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
                    mobileMenuOpen
                      ? "translate-y-[7px] rotate-45 bg-[#f09bc5]"
                      : ""
                  }`}
                />

                <span
                  className={`absolute left-0 top-[9px] h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
                    mobileMenuOpen
                      ? "scale-x-0 opacity-0"
                      : "scale-x-100 opacity-100"
                  }`}
                />

                <span
                  className={`absolute left-0 top-[16px] h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
                    mobileMenuOpen
                      ? "-translate-y-[7px] -rotate-45 bg-[#f09bc5]"
                      : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
              mobileMenuOpen
                ? "max-h-[520px] pb-6 opacity-100"
                : "max-h-0 pb-0 opacity-0"
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#21102b]/95 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              {/* Subtle menu glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#e76aa9]/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#ad8be8]/10 blur-3xl" />

              <div className="relative flex flex-col">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`group flex items-center justify-between rounded-xl px-4 py-4 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-[#e76aa9]/10 text-[#f09bc5]"
                          : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <span>{item.name}</span>

                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? "scale-100 bg-[#e76aa9] shadow-[0_0_12px_rgba(231,106,169,0.8)]"
                            : "scale-0 bg-[#ad8be8] group-hover:scale-100"
                        }`}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden px-6 pb-10 pt-28 sm:pb-12 lg:px-10 lg:pb-6"
      >
        {/* Ambient background lights */}
        <div className="pointer-events-none absolute -left-24 top-36 h-80 w-80 rounded-full bg-[#e76aa9]/10 blur-[130px]" />

        <div className="pointer-events-none absolute -right-24 top-32 h-96 w-96 rounded-full bg-[#ad8be8]/10 blur-[150px]" />

        {/* Soft transition into About */}
        <div className="pointer-events-none absolute -bottom-48 left-1/2 h-[420px] w-[75%] -translate-x-1/2 rounded-full bg-[#71366f]/10 blur-[150px]" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-[1fr_1fr] lg:gap-12 xl:gap-16">
          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-10">
            {/* Availability */}
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#e76aa9]/25 bg-[#e76aa9]/[0.07] px-4 py-2 text-xs font-medium tracking-wide text-[#f5c0da] backdrop-blur-md sm:text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e76aa9] opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#e76aa9]" />
              </span>
              Open to opportunities
            </div>

            {/* Name */}
            <h1 className="max-w-4xl text-[3.5rem] font-bold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.8rem] xl:text-[5.4rem]">
              Chioma{" "}
              <span className="bg-gradient-to-r from-[#f6b4d3] via-[#e76aa9] to-[#c7a6f5] bg-clip-text text-transparent">
                Iwegbuna.
              </span>
            </h1>

            {/* Role */}
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#d9b5f4] sm:text-3xl lg:text-[2.35rem]">
              Web Developer
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-8 text-white/60 sm:text-lg">
              I build responsive, user-friendly web applications with a focus on
              clean design, functionality, and real-world usability.
            </p>

            {/* Actions */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                onClick={() => setActiveSection("projects")}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e76aa9] via-[#df76bd] to-[#ad8be8] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(231,106,169,0.20)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_45px_rgba(231,106,169,0.35)]"
              >
                View My Work
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="/Chioma-Iwegbuna-CV.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#e76aa9]/50 hover:bg-[#e76aa9]/[0.07] hover:text-white"
              >
                Download CV
                <span className="text-base">↓</span>
              </a>
            </div>
          </div>

          {/* ================= PORTRAIT AREA ================= */}
          <div className="relative flex min-h-[400px] items-center justify-center sm:min-h-[500px] lg:min-h-[590px]">
            {/* Main ambient portrait glow */}
            <div className="absolute h-[320px] w-[320px] rounded-full bg-gradient-to-br from-[#e76aa9]/20 via-[#71366f]/10 to-[#ad8be8]/20 blur-[55px] sm:h-[420px] sm:w-[420px] lg:h-[500px] lg:w-[500px] lg:blur-[65px]" />

            {/* Outer subtle ring */}
            <div className="absolute h-[320px] w-[320px] rounded-full border border-white/[0.08] sm:h-[420px] sm:w-[420px] lg:h-[500px] lg:w-[500px]" />

            {/* Pink orbit */}
            <div className="absolute h-[295px] w-[295px] rotate-[24deg] rounded-full border-l border-t border-[#e76aa9]/45 border-r-transparent border-b-transparent sm:h-[390px] sm:w-[390px] lg:h-[465px] lg:w-[465px]" />

            {/* Lavender orbit */}
            <div className="absolute h-[350px] w-[350px] -rotate-[18deg] rounded-full border-b border-r border-[#ad8be8]/30 border-l-transparent border-t-transparent sm:h-[455px] sm:w-[455px] lg:h-[535px] lg:w-[535px]" />

            {/* Decorative glowing dots */}
            <span className="absolute left-[5%] top-[25%] h-1.5 w-1.5 rounded-full bg-[#e76aa9] shadow-[0_0_14px_#e76aa9] sm:left-[11%] lg:left-[13%]" />

            <span className="absolute bottom-[21%] right-[5%] h-1.5 w-1.5 rounded-full bg-[#ad8be8] shadow-[0_0_14px_#ad8be8] sm:right-[10%] lg:right-[12%]" />

            <span className="absolute right-[10%] top-[14%] h-1 w-1 rounded-full bg-white/70 shadow-[0_0_12px_white] sm:right-[16%] lg:right-[18%]" />

            {/* ================= RESPONSIVE PORTRAIT ================= */}
            <div className="relative z-10 h-[270px] w-[270px] rounded-full bg-gradient-to-br from-[#f09bc5] via-[#e76aa9] to-[#ad8be8] p-[3px] shadow-[0_0_70px_rgba(231,106,169,0.25)] min-[400px]:h-[290px] min-[400px]:w-[290px] sm:h-[340px] sm:w-[340px] lg:h-[390px] lg:w-[390px]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-[#1a0d23]">
                <Image
                  src="/img-1.jpg"
                  alt="Chioma Iwegbuna"
                  fill
                  priority
                  sizes="(max-width: 399px) 270px, (max-width: 639px) 290px, (max-width: 1023px) 340px, 390px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* ================= HTML ================= */}
            <div
              title="HTML5"
              className="group absolute left-[1%] top-[26%] z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-orange-400/20 bg-[#1b1024]/80 text-[#f16529] shadow-[0_0_25px_rgba(241,101,41,0.16)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:scale-110 hover:border-orange-400/50 sm:left-[6%] sm:h-12 sm:w-12 lg:left-[4%] lg:top-[28%] lg:h-14 lg:w-14 lg:rounded-2xl"
            >
              <FaHtml5 className="text-[23px] sm:text-[26px] lg:text-[29px]" />

              <span className="pointer-events-none absolute -bottom-8 rounded-md bg-black/70 px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                HTML5
              </span>
            </div>

            {/* ================= CSS ================= */}
            <div
              title="CSS3"
              className="group absolute right-[1%] top-[22%] z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-[#1b1024]/80 text-[#2965f1] shadow-[0_0_25px_rgba(41,101,241,0.17)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:scale-110 hover:border-blue-400/50 sm:right-[5%] sm:h-12 sm:w-12 lg:right-[2%] lg:top-[23%] lg:h-14 lg:w-14 lg:rounded-2xl"
            >
              <FaCss3Alt className="text-[23px] sm:text-[26px] lg:text-[29px]" />

              <span className="pointer-events-none absolute -bottom-8 rounded-md bg-black/70 px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                CSS3
              </span>
            </div>

            {/* ================= JAVASCRIPT ================= */}
            <div
              title="JavaScript"
              className="group absolute bottom-[14%] left-[4%] z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-300/20 bg-[#1b1024]/80 text-[#f7df1e] shadow-[0_0_25px_rgba(247,223,30,0.14)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:scale-110 hover:border-yellow-300/50 sm:bottom-[16%] sm:left-[10%] sm:h-12 sm:w-12 lg:bottom-[17%] lg:left-[9%] lg:h-14 lg:w-14 lg:rounded-2xl"
            >
              <SiJavascript className="text-[21px] sm:text-[24px] lg:text-[27px]" />

              <span className="pointer-events-none absolute -bottom-8 rounded-md bg-black/70 px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                JavaScript
              </span>
            </div>

            {/* ================= REACT ================= */}
            <div
              title="React"
              className="group absolute bottom-[11%] right-[4%] z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-[#1b1024]/80 text-[#61dafb] shadow-[0_0_28px_rgba(97,218,251,0.16)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:scale-110 hover:border-cyan-300/50 sm:bottom-[12%] sm:right-[9%] sm:h-12 sm:w-12 lg:bottom-[13%] lg:right-[8%] lg:h-14 lg:w-14 lg:rounded-2xl"
            >
              <FaReact className="text-[23px] sm:text-[26px] lg:text-[29px]" />

              <span className="pointer-events-none absolute -bottom-8 rounded-md bg-black/70 px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                React
              </span>
            </div>

            {/* Decorative code symbols */}
            <span className="absolute left-[12%] top-[8%] font-mono text-xs text-[#f09bc5]/35 sm:left-[16%] sm:text-sm lg:left-[17%] lg:top-[11%]">
              &lt;/&gt;
            </span>

            <span className="absolute bottom-[6%] right-[27%] font-mono text-xs text-[#ad8be8]/30 sm:text-sm lg:bottom-[10%] lg:right-[30%]">
              {"{ }"}
            </span>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="relative scroll-mt-24 overflow-hidden px-6 pb-28 pt-16 sm:pb-32 sm:pt-20 lg:px-10 lg:pb-32 lg:pt-24"
      >
        {/* Background glows connecting About to Hero */}
        <div className="pointer-events-none absolute -top-48 left-1/2 h-[450px] w-[80%] -translate-x-1/2 rounded-full bg-[#71366f]/10 blur-[150px]" />

        <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[#71366f]/15 blur-[140px]" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#ad8be8]/10 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* About Heading */}
          <div className="mb-14">
            <p className="text-2xl font-bold uppercase tracking-[0.16em] text-[#f09bc5] sm:text-3xl">
              About Me
            </p>
          </div>

          <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            {/* LEFT IMAGE */}
            <div className="relative mx-auto w-full max-w-[430px]">
              <div className="absolute -left-5 -top-5 h-full w-full rounded-[32px] border border-[#e76aa9]/20" />

              <div className="absolute inset-8 rounded-[30px] bg-[#e76aa9]/15 blur-[60px]" />

              <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] p-2 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
                  <Image
                    src="/Img-2.jpg"
                    alt="Chioma Iwegbuna"
                    fill
                    sizes="(max-width: 1024px) 90vw, 430px"
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#170b20]/35 via-transparent to-transparent" />
                </div>
              </div>

              <div className="absolute -right-5 top-10 rounded-xl border border-white/10 bg-[#1c0e26]/80 px-4 py-2 font-mono text-xs text-[#f09bc5] shadow-xl backdrop-blur-xl">
                &lt;/developer&gt;
              </div>

              <div className="absolute -bottom-6 right-8 grid grid-cols-4 gap-2 opacity-40">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-1 w-1 rounded-full bg-[#ad8be8]"
                  />
                ))}
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="relative">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-[#f09bc5]">
                A little about me
              </p>

              <h2 className="max-w-3xl text-4xl font-bold leading-[1.12] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.5rem]">
                I build for{" "}
                <span className="bg-gradient-to-r from-[#f09bc5] via-[#e76aa9] to-[#ad8be8] bg-clip-text text-transparent">
                  people,
                </span>
                <br />
                not just screens.
              </h2>

              <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-white/60 sm:text-[17px]">
                <p>
                  I&apos;m Chioma Iwegbuna, a Web Developer with a B.Sc. (Hons)
                  in Software Engineering from Babcock University. My background
                  in software engineering shaped how I approach development:
                  understanding the problem first, thinking through how people
                  will use the solution, and then building something that works
                  well.
                </p>

                <p>
                  I enjoy bringing ideas to life on the web, especially when a
                  project gives me room to combine thoughtful design with
                  practical functionality. I&apos;m still growing as a
                  developer, and I value that process: learning, building,
                  improving, and becoming better with every project.
                </p>
              </div>

              {/* Degree Card */}
              <div className="mt-10 max-w-xl">
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#e76aa9]/30 hover:bg-[#e76aa9]/[0.04]">
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#e76aa9] to-[#ad8be8]" />

                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#e76aa9]/20 bg-[#e76aa9]/10">
                      <span className="text-xl">🎓</span>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#f09bc5]">
                        Education
                      </p>

                      <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                        B.Sc. (Hons) Software Engineering
                      </h3>

                      <p className="mt-1 text-sm text-white/50">
                        Babcock University · 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section
        id="skills"
        className="relative scroll-mt-24 overflow-hidden px-6 pb-28 pt-20 sm:pb-32 sm:pt-24 lg:px-10 lg:pb-36 lg:pt-28"
      >
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute -left-52 top-20 h-[420px] w-[420px] rounded-full bg-[#ad8be8]/10 blur-[160px]" />

        <div className="pointer-events-none absolute -right-52 bottom-10 h-[440px] w-[440px] rounded-full bg-[#e76aa9]/10 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section introduction */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-2xl font-bold uppercase tracking-[0.16em] text-[#f09bc5] sm:text-3xl">
              Skills
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl">
              Tools I build{" "}
              <span className="bg-gradient-to-r from-[#f09bc5] via-[#e76aa9] to-[#ad8be8] bg-clip-text text-transparent">
                with.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              The technologies and tools I use to turn ideas into functional web
              experiences.
            </p>
          </div>

          {/* Skill Cards */}
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
            {/* HTML */}
            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#f16529]/30 hover:bg-white/[0.045]">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#f16529]/10 blur-[35px]" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f16529]/20 bg-[#f16529]/10 text-[#f16529]">
                <FaHtml5 size={31} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">HTML5</h3>

              <div className="mt-5 flex gap-1.5">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 flex-1 rounded-full bg-[#f16529]/70"
                  />
                ))}
              </div>
            </div>

            {/* CSS */}
            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#2965f1]/30 hover:bg-white/[0.045]">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#2965f1]/10 blur-[35px]" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#2965f1]/20 bg-[#2965f1]/10 text-[#2965f1]">
                <FaCss3Alt size={31} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">CSS3</h3>

              <div className="mt-5 flex gap-1.5">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 flex-1 rounded-full bg-[#2965f1]/70"
                  />
                ))}
              </div>
            </div>

            {/* JavaScript */}
            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#f7df1e]/30 hover:bg-white/[0.045]">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#f7df1e]/10 blur-[35px]" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f7df1e]/20 bg-[#f7df1e]/10 text-[#f7df1e]">
                <SiJavascript size={29} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                JavaScript
              </h3>

              <div className="mt-5 flex gap-1.5">
                {[1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 flex-1 rounded-full bg-[#f7df1e]/70"
                  />
                ))}

                <span className="h-1.5 flex-1 rounded-full bg-white/[0.08]" />
              </div>
            </div>

            {/* React */}
            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#61dafb]/30 hover:bg-white/[0.045]">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#61dafb]/10 blur-[35px]" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#61dafb]/20 bg-[#61dafb]/10 text-[#61dafb]">
                <FaReact size={31} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">React</h3>

              <div className="mt-5 flex gap-1.5">
                {[1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 flex-1 rounded-full bg-[#61dafb]/70"
                  />
                ))}

                <span className="h-1.5 flex-1 rounded-full bg-white/[0.08]" />
              </div>
            </div>

            {/* Next.js */}
            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.045]">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/10 blur-[35px]" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.07] text-white">
                <SiNextdotjs size={31} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">Next.js</h3>

              <div className="mt-5 flex gap-1.5">
                {[1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 flex-1 rounded-full bg-white/55"
                  />
                ))}

                <span className="h-1.5 flex-1 rounded-full bg-white/[0.08]" />
              </div>
            </div>

            {/* TypeScript */}
            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#3178c6]/30 hover:bg-white/[0.045]">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#3178c6]/10 blur-[35px]" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#3178c6]/20 bg-[#3178c6]/10 text-[#3178c6]">
                <SiTypescript size={29} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                TypeScript
              </h3>

              <div className="mt-5 flex gap-1.5">
                {[1, 2, 3].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 flex-1 rounded-full bg-[#3178c6]/70"
                  />
                ))}

                {[1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 flex-1 rounded-full bg-white/[0.08]"
                  />
                ))}
              </div>
            </div>

            {/* Git */}
            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#f05032]/30 hover:bg-white/[0.045]">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#f05032]/10 blur-[35px]" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f05032]/20 bg-[#f05032]/10 text-[#f05032]">
                <FaGitAlt size={31} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">Git</h3>

              <div className="mt-5 flex gap-1.5">
                {[1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 flex-1 rounded-full bg-[#f05032]/70"
                  />
                ))}

                <span className="h-1.5 flex-1 rounded-full bg-white/[0.08]" />
              </div>
            </div>

            {/* GitHub */}
            <div className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#e76aa9]/30 hover:bg-white/[0.045]">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#e76aa9]/10 blur-[35px]" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.07] text-white">
                <FaGithub size={31} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">GitHub</h3>

              <div className="mt-5 flex gap-1.5">
                {[1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 flex-1 rounded-full bg-[#e76aa9]/70"
                  />
                ))}

                <span className="h-1.5 flex-1 rounded-full bg-white/[0.08]" />
              </div>
            </div>
          </div>

          {/* Small explanation */}
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-6 text-white/35">
            The indicators represent my current familiarity with each tool, not
            fixed proficiency scores. I&apos;m continuously learning and
            improving as I build.
          </p>
        </div>
      </section>
      {/* ================= EXPERIENCE ================= */}
      <section
        id="experience"
        className="relative scroll-mt-24 overflow-hidden px-6 pb-28 pt-20 sm:pb-32 sm:pt-24 lg:px-10 lg:pb-36 lg:pt-28"
      >
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute -left-48 top-1/3 h-[420px] w-[420px] rounded-full bg-[#e76aa9]/10 blur-[160px]" />

        <div className="pointer-events-none absolute -right-48 bottom-10 h-[430px] w-[430px] rounded-full bg-[#ad8be8]/10 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-2xl font-bold uppercase tracking-[0.16em] text-[#f09bc5] sm:text-3xl">
              Experience
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl">
              Where learning met{" "}
              <span className="bg-gradient-to-r from-[#f09bc5] via-[#e76aa9] to-[#ad8be8] bg-clip-text text-transparent">
                real work.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              My experience spans web development and practical IT environments,
              giving me the opportunity to build, troubleshoot, collaborate, and
              learn beyond the classroom.
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="relative mx-auto mt-20 max-w-5xl">
            {/* Vertical timeline */}
            <div className="absolute bottom-10 left-[23px] top-10 w-px bg-gradient-to-b from-[#e76aa9] via-[#ad8be8]/50 to-transparent sm:left-[27px]" />

            {/* ================= TOTALENERGIES ================= */}
            <div className="group relative grid grid-cols-[48px_1fr] gap-5 sm:grid-cols-[56px_1fr] sm:gap-8">
              {/* Timeline Node */}
              <div className="relative z-10 flex justify-center">
                <div className="mt-9 flex h-5 w-5 items-center justify-center rounded-full border border-[#e76aa9]/50 bg-[#170b20] shadow-[0_0_0_7px_rgba(231,106,169,0.06)] transition duration-300 group-hover:border-[#f09bc5] group-hover:shadow-[0_0_25px_rgba(231,106,169,0.45)]">
                  <div className="h-2 w-2 rounded-full bg-[#e76aa9]" />
                </div>
              </div>

              {/* Card */}
              <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#e76aa9]/25 hover:bg-white/[0.04] sm:p-9">
                {/* Card glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#e76aa9]/10 blur-[70px]" />

                <div className="relative">
                  {/* Top Row */}
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#f09bc5]">
                        Industrial Training
                      </p>

                      <h3 className="mt-3 text-2xl font-bold text-white sm:text-[1.75rem]">
                        TotalEnergies EP Nigeria Limited
                      </h3>

                      <p className="mt-2 text-base font-medium text-white/55">
                        Information Systems &amp; Technology
                      </p>
                    </div>

                    <div className="w-fit rounded-full border border-[#e76aa9]/20 bg-[#e76aa9]/[0.07] px-4 py-2 text-xs font-medium text-[#f5c0da]">
                      Mar 2025 · Jun 2025
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-7 max-w-3xl text-base leading-8 text-white/60">
                    Worked across Software Development, IT Infrastructure, and
                    Networking &amp; Print Services, gaining practical exposure
                    to how technology supports day-to-day operations in a
                    professional environment.
                  </p>

                  {/* Experience Highlights */}
                  <div className="mt-7 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/[0.07] bg-[#170b20]/35 p-4">
                      <span className="font-mono text-sm text-[#e76aa9]">
                        &lt;/&gt;
                      </span>

                      <p className="mt-3 text-sm font-semibold text-white">
                        Software Development
                      </p>

                      <p className="mt-2 text-xs leading-6 text-white/45">
                        Exposure to software development processes and
                        application-focused technical work.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.07] bg-[#170b20]/35 p-4">
                      <span className="font-mono text-sm text-[#ad8be8]">
                        {"{ }"}
                      </span>

                      <p className="mt-3 text-sm font-semibold text-white">
                        IT Infrastructure
                      </p>

                      <p className="mt-2 text-xs leading-6 text-white/45">
                        Practical experience with enterprise infrastructure,
                        systems, and technical operations.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.07] bg-[#170b20]/35 p-4">
                      <span className="font-mono text-sm text-[#f09bc5]">
                        //
                      </span>

                      <p className="mt-3 text-sm font-semibold text-white">
                        Networking
                      </p>

                      <p className="mt-2 text-xs leading-6 text-white/45">
                        Worked around networking and print-service environments
                        while learning practical troubleshooting.
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-7 flex flex-wrap gap-2">
                    {[
                      "Software Development",
                      "IT Infrastructure",
                      "Networking",
                      "Troubleshooting",
                      "Collaboration",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3.5 py-1.5 text-xs text-white/55 transition duration-300 hover:border-[#e76aa9]/30 hover:text-[#f5c0da]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ================= WOKU ================= */}
            <div className="group relative mt-10 grid grid-cols-[48px_1fr] gap-5 sm:mt-12 sm:grid-cols-[56px_1fr] sm:gap-8">
              {/* Timeline Node */}
              <div className="relative z-10 flex justify-center">
                <div className="mt-9 flex h-5 w-5 items-center justify-center rounded-full border border-[#ad8be8]/50 bg-[#170b20] shadow-[0_0_0_7px_rgba(173,139,232,0.06)] transition duration-300 group-hover:border-[#c7a6f5] group-hover:shadow-[0_0_25px_rgba(173,139,232,0.45)]">
                  <div className="h-2 w-2 rounded-full bg-[#ad8be8]" />
                </div>
              </div>

              {/* Card */}
              <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#ad8be8]/25 hover:bg-white/[0.04] sm:p-9">
                {/* Card glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#ad8be8]/10 blur-[70px]" />

                <div className="relative">
                  {/* Top Row */}
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#c7a6f5]">
                        Front-End Development Internship
                      </p>

                      <h3 className="mt-3 text-2xl font-bold text-white sm:text-[1.75rem]">
                        Woku Zolutionz International Ltd
                      </h3>

                      <p className="mt-2 text-base font-medium text-white/55">
                        Front-End Developer
                      </p>
                    </div>

                    <div className="w-fit rounded-full border border-[#ad8be8]/20 bg-[#ad8be8]/[0.07] px-4 py-2 text-xs font-medium text-[#d9c6f7]">
                      Jan 2025 · Mar 2025
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-7 max-w-3xl text-base leading-8 text-white/60">
                    Built and worked on responsive web interfaces while gaining
                    hands-on experience turning requirements and designs into
                    functional user-facing experiences.
                  </p>

                  {/* Work Highlight */}
                  <div className="mt-7 rounded-[22px] border border-[#ad8be8]/15 bg-gradient-to-r from-[#ad8be8]/[0.06] to-[#e76aa9]/[0.04] p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#ad8be8]/20 bg-[#ad8be8]/10 font-mono text-sm text-[#c7a6f5]">
                        &lt;/&gt;
                      </div>

                      <div>
                        <h4 className="text-base font-semibold text-white">
                          Web Application Development
                        </h4>

                        <p className="mt-2 text-sm leading-7 text-white/50">
                          Worked on authentication interfaces including sign-up,
                          login, password recovery, verification, and reset
                          flows, alongside other frontend pages and components.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-7 flex flex-wrap gap-2">
                    {[
                      "Frontend Development",
                      "Responsive Design",
                      "Authentication",
                      "UI Implementation",
                      "Problem Solving",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3.5 py-1.5 text-xs text-white/55 transition duration-300 hover:border-[#ad8be8]/30 hover:text-[#d9c6f7]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= PROJECTS ================= */}
      <section
        id="projects"
        className="relative scroll-mt-24 overflow-hidden px-6 pb-32 pt-20 sm:pb-36 sm:pt-24 lg:px-10 lg:pb-40 lg:pt-28"
      >
        {(() => {
          const studyMateLive = "https://studymate-oma.netlify.app/";

          const studyMateGithub = "https://github.com/Oma-3/studymate";

          const citizenReportLive = "https://citizenreport-chioma.netlify.app/";

          const citizenReportGithub = "https://github.com/Oma-3/CitizenReport";

          return (
            <>
              {/* Background atmosphere */}
              <div className="pointer-events-none absolute -left-56 top-[18%] h-[480px] w-[480px] rounded-full bg-[#e76aa9]/10 blur-[170px]" />

              <div className="pointer-events-none absolute -right-56 top-[58%] h-[500px] w-[500px] rounded-full bg-[#ad8be8]/10 blur-[180px]" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#71366f]/[0.06] blur-[190px]" />

              <div className="relative mx-auto max-w-7xl">
                {/* ================= SECTION HEADING ================= */}
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-2xl font-bold uppercase tracking-[0.16em] text-[#f09bc5] sm:text-3xl">
                    Projects
                  </p>

                  <h2 className="mt-5 text-4xl font-bold tracking-[-0.035em] text-white sm:text-5xl">
                    Selected{" "}
                    <span className="bg-gradient-to-r from-[#f09bc5] via-[#e76aa9] to-[#ad8be8] bg-clip-text text-transparent">
                      work.
                    </span>
                  </h2>

                  <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
                    A selection of projects that show how I approach design,
                    development, and turning ideas into useful web experiences.
                  </p>
                </div>

                {/* ================================================= */}
                {/* ================= STUDYMATE ====================== */}
                {/* ================================================= */}

                <div className="mt-20 grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 xl:gap-20">
                  {/* ================= BROWSER PREVIEW ================= */}
                  <div className="group relative">
                    {/* Glow */}
                    <div className="pointer-events-none absolute inset-8 rounded-[40px] bg-[#e76aa9]/15 blur-[85px] transition duration-700 group-hover:bg-[#e76aa9]/20" />

                    {/* Decorative frame */}
                    <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[28px] border border-[#e76aa9]/10 sm:-bottom-5 sm:-right-5" />

                    {/* Browser window */}
                    <div className="relative overflow-hidden rounded-[26px] border border-white/[0.11] bg-[#120918] shadow-[0_30px_90px_rgba(0,0,0,0.35)] transition duration-500 ease-out group-hover:-translate-y-2 group-hover:border-[#e76aa9]/25 group-hover:shadow-[0_35px_100px_rgba(231,106,169,0.13)]">
                      {/* Browser toolbar */}
                      <div className="flex h-12 items-center gap-3 border-b border-white/[0.07] bg-[#1d1025] px-4 sm:h-14 sm:px-5">
                        {/* Window buttons */}
                        <div className="flex shrink-0 items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b7a]/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#f3c75f]/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#68d391]/80" />
                        </div>

                        {/* Browser address bar */}
                        <div className="mx-auto flex h-7 w-full max-w-[350px] items-center justify-center rounded-lg border border-white/[0.06] bg-[#170b20] px-4 sm:h-8">
                          <span className="mr-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#68d391]" />

                          <span className="truncate text-[10px] text-white/40 sm:text-[11px]">
                            StudyMate
                          </span>
                        </div>

                        {/* Browser menu */}
                        <div className="flex shrink-0 items-center gap-[3px]">
                          <span className="h-1 w-1 rounded-full bg-white/25" />
                          <span className="h-1 w-1 rounded-full bg-white/25" />
                          <span className="h-1 w-1 rounded-full bg-white/25" />
                        </div>
                      </div>

                      {/* Full screenshot */}
                      <div className="relative w-full overflow-hidden bg-[#120918]">
                        <Image
                          src="/Studymate.png"
                          alt="StudyMate web application landing page"
                          width={1600}
                          height={1000}
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="block h-auto w-full"
                        />
                      </div>
                    </div>

                    {/* Live application badge */}
                    <div className="absolute -bottom-5 left-6 z-20 flex items-center gap-2 rounded-full border border-white/[0.09] bg-[#1a0d23]/95 px-4 py-2.5 shadow-xl backdrop-blur-xl sm:left-8">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#68d391] opacity-40" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#68d391]" />
                      </span>

                      <span className="text-[11px] font-medium tracking-wide text-white/65">
                        Web Application
                      </span>
                    </div>
                  </div>

                  {/* ================= PROJECT INFORMATION ================= */}
                  <div className="relative lg:pl-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-[#e76aa9]">
                        01
                      </span>

                      <div className="h-px w-10 bg-[#e76aa9]/35" />

                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                        Personal Project
                      </span>
                    </div>

                    <h3 className="mt-6 text-4xl font-bold tracking-[-0.035em] text-white sm:text-[2.8rem]">
                      StudyMate
                    </h3>

                    <p className="mt-5 max-w-xl text-base leading-8 text-white/60">
                      A web-based study and assessment platform designed to make
                      practice sessions simple and focused. Users can choose a
                      category, select the number of questions, complete timed
                      questions one at a time, and keep track of their
                      assessment experience.
                    </p>

                    {/* Features */}
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition duration-300 hover:border-[#e76aa9]/20 hover:bg-white/[0.04]">
                        <span className="font-mono text-xs text-[#f09bc5]">
                          &lt;/&gt;
                        </span>

                        <p className="mt-2 text-sm font-semibold text-white/80">
                          Interactive CBT
                        </p>

                        <p className="mt-1 text-xs leading-5 text-white/40">
                          Timed questions with simple one-by-one navigation.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition duration-300 hover:border-[#ad8be8]/20 hover:bg-white/[0.04]">
                        <span className="font-mono text-xs text-[#ad8be8]">
                          {"{ }"}
                        </span>

                        <p className="mt-2 text-sm font-semibold text-white/80">
                          Session Control
                        </p>

                        <p className="mt-1 text-xs leading-5 text-white/40">
                          Flexible question selection and saved study sessions.
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-7 flex flex-wrap gap-2">
                      {[
                        "Web Development",
                        "Responsive UI",
                        "CBT Experience",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#e76aa9]/15 bg-[#e76aa9]/[0.05] px-3.5 py-1.5 text-xs text-[#f5c0da]/75"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Project links */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      {/* Live Demo */}
                      <a
                        href={studyMateLive}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open StudyMate live demo"
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e76aa9] to-[#ad8be8] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(231,106,169,0.15)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(231,106,169,0.28)]"
                      >
                        <span>Live Demo</span>

                        <span className="transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          ↗
                        </span>
                      </a>

                      {/* Repository */}
                      <a
                        href={studyMateGithub}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open StudyMate GitHub repository"
                        className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-white/70 transition duration-300 hover:-translate-y-1 hover:border-[#e76aa9]/30 hover:bg-[#e76aa9]/[0.05] hover:text-white"
                      >
                        <FaGithub className="text-lg text-[#f09bc5] transition duration-300 group-hover:scale-110" />

                        <span>Repository</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* ================================================= */}
                {/* ================= CITIZENREPORT ================== */}
                {/* ================================================= */}

                <div className="mt-32 grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-20">
                  {/* ================= PROJECT INFORMATION ================= */}
                  <div className="relative order-2 lg:order-1 lg:pr-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-[#ad8be8]">
                        02
                      </span>

                      <div className="h-px w-10 bg-[#ad8be8]/35" />

                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                        Personal Project
                      </span>
                    </div>

                    <h3 className="mt-6 text-4xl font-bold tracking-[-0.035em] text-white sm:text-[2.8rem]">
                      CitizenReport
                    </h3>

                    <p className="mt-5 max-w-xl text-base leading-8 text-white/60">
                      A citizen reporting platform built to make it easier for
                      people to stay informed about incidents and activities
                      happening around them. The homepage brings recent reports
                      and local activity together in a clear, accessible
                      experience.
                    </p>

                    {/* Features */}
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition duration-300 hover:border-[#ad8be8]/20 hover:bg-white/[0.04]">
                        <span className="font-mono text-xs text-[#ad8be8]">
                          &lt;/&gt;
                        </span>

                        <p className="mt-2 text-sm font-semibold text-white/80">
                          Incident Reporting
                        </p>

                        <p className="mt-1 text-xs leading-5 text-white/40">
                          A clear experience for viewing and reporting incidents
                          happening around the user.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition duration-300 hover:border-[#e76aa9]/20 hover:bg-white/[0.04]">
                        <span className="font-mono text-xs text-[#f09bc5]">
                          {"{ }"}
                        </span>

                        <p className="mt-2 text-sm font-semibold text-white/80">
                          Recent Activity
                        </p>

                        <p className="mt-1 text-xs leading-5 text-white/40">
                          Recent incidents and local activity are surfaced in
                          one accessible homepage experience.
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-7 flex flex-wrap gap-2">
                      {[
                        "Citizen Reporting",
                        "Web Application",
                        "Responsive UI",
                        "User-Focused Design",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#ad8be8]/15 bg-[#ad8be8]/[0.05] px-3.5 py-1.5 text-xs text-[#d9c6f7]/75"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Project links */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      {/* Live Demo */}
                      <a
                        href={citizenReportLive}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open CitizenReport live demo"
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ad8be8] to-[#e76aa9] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(173,139,232,0.15)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(173,139,232,0.28)]"
                      >
                        <span>Live Demo</span>

                        <span className="transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          ↗
                        </span>
                      </a>

                      {/* Repository */}
                      <a
                        href={citizenReportGithub}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open CitizenReport GitHub repository"
                        className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-white/70 transition duration-300 hover:-translate-y-1 hover:border-[#ad8be8]/30 hover:bg-[#ad8be8]/[0.05] hover:text-white"
                      >
                        <FaGithub className="text-lg text-[#ad8be8] transition duration-300 group-hover:scale-110" />

                        <span>Repository</span>
                      </a>
                    </div>
                  </div>

                  {/* ================= BROWSER PREVIEW ================= */}
                  <div className="group relative order-1 lg:order-2">
                    {/* Glow */}
                    <div className="pointer-events-none absolute inset-8 rounded-[40px] bg-[#ad8be8]/15 blur-[85px] transition duration-700 group-hover:bg-[#ad8be8]/20" />

                    {/* Decorative frame */}
                    <div className="absolute -bottom-4 -left-4 h-full w-full rounded-[28px] border border-[#ad8be8]/10 sm:-bottom-5 sm:-left-5" />

                    {/* Browser window */}
                    <div className="relative overflow-hidden rounded-[26px] border border-white/[0.11] bg-[#120918] shadow-[0_30px_90px_rgba(0,0,0,0.35)] transition duration-500 ease-out group-hover:-translate-y-2 group-hover:border-[#ad8be8]/25 group-hover:shadow-[0_35px_100px_rgba(173,139,232,0.13)]">
                      {/* Browser toolbar */}
                      <div className="flex h-12 items-center gap-3 border-b border-white/[0.07] bg-[#1d1025] px-4 sm:h-14 sm:px-5">
                        {/* Window buttons */}
                        <div className="flex shrink-0 items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b7a]/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#f3c75f]/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#68d391]/80" />
                        </div>

                        {/* Address bar */}
                        <div className="mx-auto flex h-7 w-full max-w-[350px] items-center justify-center rounded-lg border border-white/[0.06] bg-[#170b20] px-4 sm:h-8">
                          <span className="mr-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#68d391]" />

                          <span className="truncate text-[10px] text-white/40 sm:text-[11px]">
                            CitizenReport
                          </span>
                        </div>

                        {/* Menu */}
                        <div className="flex shrink-0 items-center gap-[3px]">
                          <span className="h-1 w-1 rounded-full bg-white/25" />
                          <span className="h-1 w-1 rounded-full bg-white/25" />
                          <span className="h-1 w-1 rounded-full bg-white/25" />
                        </div>
                      </div>

                      {/* Full screenshot */}
                      <div className="relative w-full overflow-hidden bg-[#120918]">
                        <Image
                          src="/citizenReport.png"
                          alt="CitizenReport web application homepage"
                          width={1600}
                          height={1000}
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="block h-auto w-full"
                        />
                      </div>
                    </div>

                    {/* Activity badge */}
                    <div className="absolute -bottom-5 right-6 z-20 flex items-center gap-2 rounded-full border border-white/[0.09] bg-[#1a0d23]/95 px-4 py-2.5 shadow-xl backdrop-blur-xl sm:right-8">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#68d391] opacity-40" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#68d391]" />
                      </span>

                      <span className="text-[11px] font-medium tracking-wide text-white/65">
                        Recent Activity
                      </span>
                    </div>
                  </div>
                </div>

                {/* ================= SECTION CLOSING ================= */}
                <div className="mx-auto mt-32 max-w-3xl text-center">
                  <div className="mx-auto mb-5 h-px w-20 bg-gradient-to-r from-transparent via-[#e76aa9]/50 to-transparent" />

                  <p className="text-sm leading-7 text-white/40">
                    More than finished screens, these projects represent the
                    process of understanding a problem, building a solution, and
                    improving it through development.
                  </p>
                </div>
              </div>
            </>
          );
        })()}
      </section>
      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="relative scroll-mt-24 overflow-hidden px-6 pb-20 pt-20 sm:pb-24 sm:pt-24 lg:px-10 lg:pb-28 lg:pt-28"
      >
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute -left-56 top-16 h-[500px] w-[500px] rounded-full bg-[#e76aa9]/10 blur-[180px]" />

        <div className="pointer-events-none absolute -right-52 bottom-0 h-[520px] w-[520px] rounded-full bg-[#ad8be8]/10 blur-[190px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#71366f]/10 blur-[180px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* ================= SECTION HEADING ================= */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-2xl font-bold uppercase tracking-[0.16em] text-[#f09bc5] sm:text-3xl">
              Contact
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.4rem]">
              Have an idea?{" "}
              <span className="bg-gradient-to-r from-[#f09bc5] via-[#e76aa9] to-[#ad8be8] bg-clip-text text-transparent">
                Let&apos;s talk.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              I&apos;m open to opportunities, collaborations, and conversations
              around building thoughtful web experiences.
            </p>
          </div>

          {/* ================= MAIN CONTACT PANEL ================= */}
          <div className="relative mt-16 sm:mt-20">
            {/* Outer glow */}
            <div className="pointer-events-none absolute inset-x-10 inset-y-6 rounded-[50px] bg-gradient-to-r from-[#e76aa9]/10 via-[#71366f]/10 to-[#ad8be8]/10 blur-[80px]" />

            {/* Decorative outline */}
            <div className="pointer-events-none absolute -inset-[1px] rounded-[34px] bg-gradient-to-br from-[#e76aa9]/20 via-white/[0.04] to-[#ad8be8]/20" />

            <div className="relative overflow-hidden rounded-[33px] border border-white/[0.06] bg-[#170b20]/80 shadow-[0_35px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              {/* Decorative top glow */}
              <div className="pointer-events-none absolute left-[12%] top-0 h-px w-[76%] bg-gradient-to-r from-transparent via-[#e76aa9]/60 to-transparent" />

              {/* Tiny grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />

              <div className="relative grid lg:grid-cols-[0.9fr_1.1fr]">
                {/* ================= LEFT SIDE ================= */}
                <div className="relative flex flex-col justify-center overflow-hidden p-7 sm:p-10 lg:min-h-[650px] lg:p-12 xl:p-14">
                  <div className="pointer-events-none absolute -left-36 top-24 h-[360px] w-[360px] rounded-full bg-[#e76aa9]/10 blur-[130px]" />

                  <div className="relative">
                    {/* Availability */}
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-[#68d391]/15 bg-[#68d391]/[0.05] px-4 py-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#68d391] opacity-40" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#68d391]" />
                      </span>

                      <span className="text-xs font-medium tracking-wide text-white/60">
                        Open to opportunities
                      </span>
                    </div>

                    {/* Main statement */}
                    <h3 className="mt-8 max-w-lg text-4xl font-bold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.4rem]">
                      Let&apos;s build something{" "}
                      <span className="relative inline-block">
                        <span className="bg-gradient-to-r from-[#f09bc5] to-[#ad8be8] bg-clip-text text-transparent">
                          worth sharing.
                        </span>

                        <span className="absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-[#e76aa9]/70 to-transparent" />
                      </span>
                    </h3>

                    <p className="mt-8 max-w-md text-sm leading-7 text-white/50 sm:text-base">
                      Whether it&apos;s a role, a project, or simply a
                      conversation about an idea, feel free to reach out through
                      any of the platforms below.
                    </p>

                    {/* ================= CONTACT ICONS ================= */}
                    <div className="mt-10">
                      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/30">
                        Find me online
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {/* EMAIL - OPENS GMAIL */}
                        <a
                          href="https://mail.google.com/mail/?view=cm&fs=1&to=chiomaiwegbuna@gmail.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Email Chioma"
                          title="Email"
                          className="group relative flex h-13 w-13 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] text-white/65 transition duration-300 hover:-translate-y-1.5 hover:border-[#e76aa9]/35 hover:text-[#f09bc5] hover:shadow-[0_12px_35px_rgba(231,106,169,0.12)]"
                        >
                          <span className="absolute inset-0 translate-y-full bg-[#e76aa9]/[0.07] transition duration-300 group-hover:translate-y-0" />

                          <FaEnvelope className="relative z-10 text-[20px]" />
                        </a>

                        {/* LINKEDIN */}
                        <a
                          href="https://www.linkedin.com/in/iwegbuna-chioma-a5ab35309"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Visit Chioma's LinkedIn profile"
                          title="LinkedIn"
                          className="group relative flex h-13 w-13 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] text-white/65 transition duration-300 hover:-translate-y-1.5 hover:border-[#ad8be8]/35 hover:text-[#c5adf0] hover:shadow-[0_12px_35px_rgba(173,139,232,0.12)]"
                        >
                          <span className="absolute inset-0 translate-y-full bg-[#ad8be8]/[0.07] transition duration-300 group-hover:translate-y-0" />

                          <FaLinkedinIn className="relative z-10 text-[20px]" />
                        </a>

                        {/* GITHUB */}
                        <a
                          href="https://github.com/Oma-3"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Visit Chioma's GitHub profile"
                          title="GitHub"
                          className="group relative flex h-13 w-13 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] text-white/65 transition duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:text-white hover:shadow-[0_12px_35px_rgba(255,255,255,0.06)]"
                        >
                          <span className="absolute inset-0 translate-y-full bg-white/[0.05] transition duration-300 group-hover:translate-y-0" />

                          <FaGithub className="relative z-10 text-[22px]" />
                        </a>

                        {/* WHATSAPP */}
                        <a
                          href="https://wa.me/2348038215865"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Message Chioma on WhatsApp"
                          title="WhatsApp"
                          className="group relative flex h-13 w-13 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] text-white/65 transition duration-300 hover:-translate-y-1.5 hover:border-[#68d391]/30 hover:text-[#68d391] hover:shadow-[0_12px_35px_rgba(104,211,145,0.1)]"
                        >
                          <span className="absolute inset-0 translate-y-full bg-[#68d391]/[0.06] transition duration-300 group-hover:translate-y-0" />

                          <FaWhatsapp className="relative z-10 text-[22px]" />
                        </a>
                      </div>

                      {/* Small hint */}
                      <p className="mt-5 text-xs leading-6 text-white/30">
                        Choose whichever platform works best for you.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ================= RIGHT SIDE / FORM ================= */}
                <div className="relative border-t border-white/[0.07] bg-white/[0.018] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12 xl:p-14">
                  <div className="pointer-events-none absolute -right-40 bottom-0 h-[340px] w-[340px] rounded-full bg-[#ad8be8]/10 blur-[130px]" />

                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f09bc5]">
                          Send a message
                        </p>

                        <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
                          Tell me what&apos;s on your mind.
                        </h3>
                      </div>

                      <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#e76aa9]/15 bg-[#e76aa9]/[0.05] text-[#f09bc5] sm:flex">
                        <HiOutlinePaperAirplane className="text-xl" />
                      </div>
                    </div>

                    {/* ================= FORM ================= */}
                    <form
                      name="contact"
                      method="POST"
                      data-netlify="true"
                      onSubmit={handleContactSubmit}
                      className="mt-10 space-y-6"
                    >
                      <input type="hidden" name="form-name" value="contact" />

                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2.5 block text-xs font-medium uppercase tracking-[0.15em] text-white/40"
                        >
                          Your name
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="What should I call you?"
                          className="w-full rounded-2xl border border-white/[0.08] bg-[#120918]/55 px-5 py-4 text-sm text-white outline-none transition duration-300 placeholder:text-white/20 focus:border-[#e76aa9]/40 focus:bg-[#120918]/75 focus:shadow-[0_0_0_4px_rgba(231,106,169,0.04)]"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2.5 block text-xs font-medium uppercase tracking-[0.15em] text-white/40"
                        >
                          Email address
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="w-full rounded-2xl border border-white/[0.08] bg-[#120918]/55 px-5 py-4 text-sm text-white outline-none transition duration-300 placeholder:text-white/20 focus:border-[#ad8be8]/40 focus:bg-[#120918]/75 focus:shadow-[0_0_0_4px_rgba(173,139,232,0.04)]"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-2.5 block text-xs font-medium uppercase tracking-[0.15em] text-white/40"
                        >
                          Subject
                        </label>

                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          placeholder="What's this about?"
                          className="w-full rounded-2xl border border-white/[0.08] bg-[#120918]/55 px-5 py-4 text-sm text-white outline-none transition duration-300 placeholder:text-white/20 focus:border-[#e76aa9]/40 focus:bg-[#120918]/75 focus:shadow-[0_0_0_4px_rgba(231,106,169,0.04)]"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2.5 block text-xs font-medium uppercase tracking-[0.15em] text-white/40"
                        >
                          Message
                        </label>

                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          placeholder="Tell me a little about your idea, opportunity, or project..."
                          className="w-full resize-none rounded-2xl border border-white/[0.08] bg-[#120918]/55 px-5 py-4 text-sm leading-6 text-white outline-none transition duration-300 placeholder:text-white/20 focus:border-[#ad8be8]/40 focus:bg-[#120918]/75 focus:shadow-[0_0_0_4px_rgba(173,139,232,0.04)]"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={formStatus === "sending"}
                        className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#e76aa9] via-[#d56bb6] to-[#ad8be8] px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(231,106,169,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(231,106,169,0.25)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                      >
                        <span className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition duration-700 group-hover:translate-x-[110%]" />

                        <span className="relative">
                          {formStatus === "sending"
                            ? "Sending..."
                            : "Send Message"}
                        </span>

                        <HiOutlinePaperAirplane className="relative text-base transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                      </button>

                      {/* SUCCESS */}
                      {formStatus === "success" && (
                        <div
                          role="status"
                          className="rounded-2xl border border-[#68d391]/20 bg-[#68d391]/[0.06] px-5 py-4 text-center"
                        >
                          <p className="text-sm font-semibold text-[#8be3ab]">
                            Message sent successfully!
                          </p>

                          <p className="mt-1 text-xs leading-5 text-white/40">
                            Thanks for reaching out. I&apos;ll get back to you
                            soon.
                          </p>
                        </div>
                      )}

                      {/* ERROR */}
                      {formStatus === "error" && (
                        <div
                          role="alert"
                          className="rounded-2xl border border-[#ff6b7a]/20 bg-[#ff6b7a]/[0.05] px-5 py-4 text-center"
                        >
                          <p className="text-sm font-semibold text-[#ff8b96]">
                            Your message couldn&apos;t be sent.
                          </p>

                          <p className="mt-1 text-xs leading-5 text-white/40">
                            Please try again or use one of my contact links.
                          </p>
                        </div>
                      )}

                      {formStatus === "idle" && (
                        <p className="text-center text-[11px] leading-5 text-white/25">
                          I&apos;ll get back to you as soon as I can.
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/[0.06] pt-8 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-white/30">
              © 2026 Chioma Iwegbuna. Built with care and curiosity.
            </p>

            <a
              href="#home"
              onClick={() => setActiveSection("home")}
              className="group flex items-center gap-2 text-xs font-medium text-white/35 transition hover:text-[#f09bc5]"
            >
              Back to top
              <span className="transition duration-300 group-hover:-translate-y-1">
                ↑
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
