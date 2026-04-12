"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { AnimatedSpan, Terminal, TypingAnimation } from "./magicui/terminal";

interface ExperienceData {
  company: string;
  position: string;
  timeline: string;
  stacking: string;
  description: string;
}

const experienceData: ExperienceData[] = [
  {
    company: "Công Ty Cổ Phần Tiên Phong CDS",
    position: "Front End Developer",
    timeline: "09/2023 - 09/2025",
    stacking:
      "ReactJS, NextJS, VueJS, NuxtJS, TailwindCSS, HeroUI, ShadcnUI, Framer Motion, UnoCSS, SWR, Zod, Recoil, Zustand, SEO",
    description:
      "Developed and maintained responsive web applications, implemented reusable UI components, optimized performance, and collaborated with design team to ensure pixel-perfect implementation. Integrated REST APIs and managed state using modern solutions.",
  },
  {
    company: "Lavenes Studio",
    position: "Junior Frontend Developer",
    timeline: "01/2023 - 02/2026",
    stacking:
      "Html5, Css3, Javascript, Typescript, ReactJS, NextJS, TailwindCSS, Bootstrap, ShadcnUI, HeroUI, Framer Motion, Swiper, Redux, Recoil, React Hook Form, Zod, SWR, Git, Figma, SEO",
    description:
      "Assisted in developing user interfaces for web applications, learned modern frontend technologies, and contributed to team projects under senior developer guidance.",
  },
  {
    company: "Jemmia Diamond",
    position: "Product Engineer",
    timeline: "10/2025 - Present",
    stacking:
      "Html5, Css3, Javascript, Typescript, ReactJS, NestJS, NodeJS, Express, Liquid, TailwindCSS, Bootstrap, GSAP, ThreeJS, Framer Motion, Swiper, Git, Figma, SEO",
    description:
      "Developed a full-stack Sales system and 3D animated landing pages. Collaborated on dynamic product visualization features, integrating sales tools to drive revenue growth in the diamond/jewelry sector.",
  },
];

export const Experience = () => {
  return (
    <div className="w-full ">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        modules={[Autoplay]}
        navigation={true}
        className="mySwiper"
      >
        {experienceData.map((experience, index) => (
          <SwiperSlide key={index}>
            <Terminal className="w-[90%] mx-auto bg-primary/20">
              <TypingAnimation className="w-full break-words text-xl font-semibold text-black/70">
                {`> ${experience.company}`}
              </TypingAnimation>

              <AnimatedSpan
                delay={1500}
                className="w-full break-words text-green-600"
              >
                <span className="break-words">
                  ✔ Position: {experience.position}
                </span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={2000}
                className="w-full break-words text-green-600"
              >
                <span>✔ Timeline: {experience.timeline}</span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={2500}
                className="w-full break-words text-green-600"
              >
                <span className="break-words whitespace-pre-wrap">
                  ✔ Stacking: {experience.stacking}
                </span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={3000}
                className="w-full break-words text-green-600"
              >
                <p className="break-words whitespace-pre-wrap">
                  ✔ Description: {experience.description}
                </p>
              </AnimatedSpan>
            </Terminal>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
