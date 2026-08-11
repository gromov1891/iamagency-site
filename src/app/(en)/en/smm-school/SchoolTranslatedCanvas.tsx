"use client";

import styles from "./translated-canvas.module.css";

type Layer = {
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  size: number;
  color?: string;
  background?: string;
  radius?: number;
  padding?: number;
  lineHeight?: number;
  weight?: number;
  family?: "display" | "body";
  align?: "left" | "center";
  tracking?: number;
  variant?: "teach" | "audience" | "program" | "story";
  titleSize?: number;
  bodySize?: number;
  overflow?: "hidden" | "visible";
};

const DARK = "#1c1c1c";
const CARD = "#222022";
const LIME = "#cee3a7";
const WHITE = "#fff";
const GRAY = "#9a9895";

const layers: Layer[] = [
  { x: 60, y: 24, w: 310, h: 36, text: "HOME   →   SMM SCHOOL", size: 19, color: WHITE, background: DARK, family: "body" },
  { x: 60, y: 145, w: 710, h: 270, text: "SMM SCHOOL\nBY I AM AGENCY", size: 76, color: WHITE, background: DARK, lineHeight: .86 },
  { x: 440, y: 505, w: 850, h: 225, text: "LEARN THE PROFESSION FROM ZERO —\nTHROUGH THE SAME SYSTEM WE USE EVERY DAY", size: 46, color: LIME, background: DARK, lineHeight: .98, overflow: "visible" },
  { x: 60, y: 840, w: 1280, h: 150, text: "We have taught SMM for 7 years. More than 350 people have graduated from our school. Today they manage major brands, work remotely from anywhere in the world, and many are active I AM AGENCY managers.", size: 28, color: GRAY, background: DARK, lineHeight: 1.02, family: "body", overflow: "visible" },
  { x: 350, y: 1120, w: 740, h: 105, text: "HOW WE TEACH", size: 82, color: WHITE, background: DARK, align: "center" },

  { x: 60, y: 1295, w: 645, h: 355, text: "90% PRACTICE\nThe programme is built around hands-on work, so every topic becomes a skill you can use on real client projects.", size: 48, titleSize: 48, bodySize: 28, color: WHITE, background: CARD, radius: 42, padding: 30, variant: "teach" },
  { x: 735, y: 1595, w: 645, h: 370, text: "REAL AGENCY PROJECTS\nLearn on active I AM AGENCY projects and use the same templates our team relies on every day.", size: 44, titleSize: 44, bodySize: 28, color: WHITE, background: CARD, radius: 42, padding: 30, variant: "teach" },
  { x: 60, y: 1935, w: 645, h: 265, text: "A READY PORTFOLIO\nBy the end of the course, you will have polished case studies you can confidently show to clients.", size: 46, titleSize: 46, bodySize: 27, color: WHITE, background: CARD, radius: 42, padding: 30, variant: "teach" },
  { x: 735, y: 2195, w: 645, h: 285, text: "HELP WITH FIRST CLIENTS\nWe show you where to find projects and how to build strong professional relationships with clients.", size: 44, titleSize: 44, bodySize: 27, color: WHITE, background: CARD, radius: 42, padding: 30, variant: "teach" },
  { x: 60, y: 2480, w: 645, h: 265, text: "A ROUTE INTO THE AGENCY\nWe invite our strongest graduates to intern at I AM AGENCY and grow into a role on the team.", size: 46, titleSize: 46, bodySize: 27, color: WHITE, background: CARD, radius: 42, padding: 30, variant: "teach" },

  { x: 55, y: 2960, w: 700, h: 80, text: "FORMAT", size: 49, color: DARK, background: LIME },
  { x: 55, y: 3040, w: 1280, h: 365, text: "The course is currently delivered one-to-one with a personal curator. Your curator supports you throughout the programme, reviews every assignment and adapts the pace to you.\n\nDuration — six weeks\nLifetime access to all materials", size: 28, color: DARK, background: LIME, lineHeight: 1.04, family: "body" },

  { x: 58, y: 3615, w: 850, h: 100, text: "WHO IS IT FOR?", size: 78, color: LIME, background: DARK },
  { x: 125, y: 3746, w: 780, h: 270, text: "PEOPLE WHO WANT FREEDOM\nWork online from anywhere in the world and keep travelling.  ↘", size: 36, titleSize: 36, bodySize: 27, color: DARK, background: "#fbfafa", radius: 42, padding: 30, variant: "audience" },
  { x: 910, y: 3964, w: 470, h: 225, text: "STUDENTS\nBuild an in-demand skill and earn alongside your studies.  ↘", size: 30, titleSize: 30, bodySize: 23, color: DARK, background: "#fbfafa", radius: 42, padding: 28, variant: "audience" },
  { x: 60, y: 4064, w: 575, h: 250, text: "PARENTS ON PARENTAL LEAVE\nLearn a remote profession and earn while staying close to your family.  ↘", size: 30, titleSize: 30, bodySize: 22, color: DARK, background: "#fbfafa", radius: 42, padding: 28, variant: "audience" },
  { x: 420, y: 4326, w: 845, h: 250, text: "PEOPLE READY FOR CHANGE\nLeave an unfulfilling job for a creative, in-demand career.  ↘", size: 36, titleSize: 36, bodySize: 27, color: DARK, background: "#fbfafa", radius: 42, padding: 30, variant: "audience" },

  { x: 235, y: 4750, w: 970, h: 110, text: "WHAT YOU WILL LEARN", size: 76, color: GRAY, background: DARK, align: "center" },
  { x: 105, y: 4870, w: 1230, h: 65, text: "From strategy to independently managing a complete social media project", size: 27, color: WHITE, background: DARK, align: "center", family: "body" },
  { x: 88, y: 5030, w: 1264, h: 170, text: "01  STRATEGY\nAnalysis, positioning, content pillars and a practical content plan.", size: 62, titleSize: 62, bodySize: 37, color: WHITE, background: DARK, padding: 22, variant: "program" },
  { x: 88, y: 5241, w: 1264, h: 168, text: "02  VISUALS AND CONTENT\nCreative production, layout and video editing — practical skills for everyday work.", size: 62, titleSize: 62, bodySize: 37, color: WHITE, background: DARK, padding: 22, variant: "program" },
  { x: 88, y: 5452, w: 1264, h: 169, text: "03  PLATFORMS\nInstagram, Telegram and VK: what makes each platform different and how to grow on it.", size: 62, titleSize: 62, bodySize: 37, color: WHITE, background: DARK, padding: 22, variant: "program" },
  { x: 88, y: 5662, w: 1264, h: 152, text: "04  INFLUENCER PARTNERSHIPS\nHow to find, assess and brief creators and prepare integrations.", size: 58, titleSize: 58, bodySize: 36, color: WHITE, background: DARK, padding: 22, variant: "program" },
  { x: 88, y: 5855, w: 1264, h: 158, text: "05  AI TOOLS\nHow to use AI for copy, imagery and faster routine production.", size: 62, titleSize: 62, bodySize: 37, color: WHITE, background: DARK, padding: 22, variant: "program" },
  { x: 88, y: 6056, w: 1264, h: 279, text: "06  MARKETING FUNDAMENTALS\nHow content supports sales and helps you make better commercial decisions.", size: 58, titleSize: 58, bodySize: 36, color: WHITE, background: DARK, padding: 22, variant: "program" },

  { x: 60, y: 6415, w: 880, h: 210, text: "OUR STUDENTS'\nSTORIES", size: 76, color: DARK, background: LIME, lineHeight: .88 },
  { x: 70, y: 6710, w: 375, h: 442, text: "Kristina, 29\nSaint Petersburg\n\nJoined with a five-month-old baby and received her first projects during the course. She later became a curator and now works as a creative director for a major cosmetics brand.", size: 20, titleSize: 22, bodySize: 19, color: WHITE, background: DARK, radius: 30, padding: 24, variant: "story", family: "body" },
  { x: 765, y: 6710, w: 375, h: 442, text: "Kira, 32\nYekaterinburg\n\nMoved from beauty services into SMM, built a portfolio on real projects and found her first clients. She now works remotely and lives in Thailand.", size: 20, titleSize: 22, bodySize: 19, color: WHITE, background: DARK, radius: 30, padding: 24, variant: "story", family: "body" },
  { x: 70, y: 7195, w: 375, h: 442, text: "Diana, 25\nMoscow\n\nLeft banking for creative work. Her first project was a clothing brand. Today she combines three projects and continues to grow.", size: 20, titleSize: 22, bodySize: 19, color: WHITE, background: DARK, radius: 30, padding: 24, variant: "story", family: "body" },
  { x: 765, y: 7195, w: 375, h: 442, text: "Nastya, 31\nKrasnoyarsk\n\nChanged careers while expecting her second child. Today she manages major international clients as part of the agency team.", size: 20, titleSize: 22, bodySize: 19, color: WHITE, background: DARK, radius: 30, padding: 24, variant: "story", family: "body" },

  { x: 60, y: 7860, w: 990, h: 150, text: "READY FOR A NEW PROFESSION?\nLEAVE AN APPLICATION", size: 49, color: WHITE, background: DARK, lineHeight: 1.02 },
  { x: 60, y: 8015, w: 610, h: 90, text: "We will explain the programme, format and current price.", size: 28, color: GRAY, background: DARK, lineHeight: 1.02, family: "body" },
  { x: 395, y: 8183, w: 478, h: 65, text: "Apply for the course", size: 27, color: DARK, background: LIME, radius: 96, align: "center", padding: 15, family: "body" },
  { x: 900, y: 8183, w: 475, h: 65, text: "Course terms and price", size: 27, color: DARK, background: WHITE, radius: 96, align: "center", padding: 15, family: "body" },
];

const desktopMasks: Layer[] = [
  { x: 0, y: 1090, w: 1440, h: 155, text: "", size: 1, background: DARK },
  { x: 0, y: 3520, w: 1120, h: 180, text: "", size: 1, background: DARK },
  { x: 220, y: 4680, w: 1220, h: 270, text: "", size: 1, background: DARK },
  { x: 0, y: 6350, w: 1050, h: 270, text: "", size: 1, background: LIME },
  { x: 0, y: 7800, w: 1110, h: 350, text: "", size: 1, background: DARK },
];

const mobileLayers: Layer[] = [
  { x: 232, y: 3810, w: 143, h: 82, text: "", size: 1, background: DARK },
  { x: 0, y: 2385, w: 375, h: 481, text: "", size: 1, background: DARK },
  { x: 0, y: 2700, w: 375, h: 150, text: "", size: 1, background: DARK },
  { x: 18, y: 1450, w: 130, h: 32, text: "", size: 1, background: LIME },
  { x: 18, y: 1490, w: 342, h: 170, text: "", size: 1, background: LIME },
  { x: 15, y: 880, w: 175, h: 130, text: "", size: 1, background: CARD, radius: 12 },
  { x: 188, y: 990, w: 175, h: 130, text: "", size: 1, background: CARD, radius: 12 },
  { x: 15, y: 1090, w: 175, h: 130, text: "", size: 1, background: CARD, radius: 12 },
  { x: 188, y: 1185, w: 175, h: 130, text: "", size: 1, background: CARD, radius: 12 },
  { x: 15, y: 1280, w: 175, h: 125, text: "", size: 1, background: CARD, radius: 12 },
  { x: 18, y: 66, w: 130, h: 18, text: "HOME  →  SMM SCHOOL", size: 7, color: WHITE, background: DARK, family: "body" },
  { x: 18, y: 268, w: 270, h: 100, text: "SMM SCHOOL\nBY I AM AGENCY", size: 30, color: WHITE, background: DARK, lineHeight: .86 },
  { x: 102, y: 465, w: 265, h: 92, text: "LEARN THE PROFESSION FROM ZERO —\nTHROUGH THE SAME SYSTEM WE USE EVERY DAY", size: 14.5, color: LIME, background: DARK, lineHeight: .96, overflow: "visible" },
  { x: 18, y: 648, w: 340, h: 82, text: "We have taught SMM for 7 years. More than 350 people have graduated. Today they manage major brands and work remotely around the world.", size: 9, color: GRAY, background: DARK, family: "body", lineHeight: 1.05, overflow: "visible" },
  { x: 0, y: 816, w: 375, h: 68, text: "HOW WE TEACH", size: 29, color: WHITE, background: DARK, align: "center" },
  { x: 20, y: 901, w: 164, h: 109, text: "90% PRACTICE\nHands-on work turns every topic into a practical client skill.", size: 11, titleSize: 11, bodySize: 6.5, color: WHITE, background: CARD, radius: 12, padding: 9, variant: "teach" },
  { x: 193, y: 1010, w: 164, h: 100, text: "REAL AGENCY PROJECTS\nLearn on active projects with I AM AGENCY templates.", size: 10, titleSize: 10, bodySize: 6.5, color: WHITE, background: CARD, radius: 12, padding: 9, variant: "teach" },
  { x: 20, y: 1110, w: 164, h: 98, text: "A READY PORTFOLIO\nFinish with case studies you can show to clients.", size: 10, titleSize: 10, bodySize: 6, color: WHITE, background: CARD, radius: 12, padding: 9, variant: "teach" },
  { x: 193, y: 1208, w: 164, h: 95, text: "HELP WITH FIRST CLIENTS\nLearn where to find projects and work with clients.", size: 9.5, titleSize: 9.5, bodySize: 6, color: WHITE, background: CARD, radius: 12, padding: 9, variant: "teach" },
  { x: 20, y: 1303, w: 164, h: 87, text: "A ROUTE INTO THE AGENCY\nThe strongest graduates can join our internship.", size: 10, titleSize: 10, bodySize: 6, color: WHITE, background: CARD, radius: 12, padding: 9, variant: "teach" },
  { x: 26, y: 1452, w: 205, h: 24, text: "FORMAT", size: 17, color: DARK, background: LIME },
  { x: 26, y: 1492, w: 333, h: 150, text: "One-to-one online training with a personal curator who reviews every assignment and adapts the pace to you.\n\nDuration — six weeks\nLifetime access to all materials", size: 10, color: DARK, background: LIME, family: "body", lineHeight: 1.04 },
  { x: 0, y: 1760, w: 350, h: 70, text: "WHO IS IT FOR?", size: 30, color: LIME, background: DARK, padding: 18 },
  { x: 20, y: 1872, w: 248, h: 64, text: "PEOPLE WHO WANT FREEDOM\nWork online from anywhere and keep travelling.  ↘", size: 10, titleSize: 10, bodySize: 7, color: DARK, background: "#fbfafa", radius: 14, padding: 10, variant: "audience" },
  { x: 196, y: 1970, w: 149, h: 64, text: "STUDENTS\nBuild a valuable skill and earn while studying.  ↘", size: 9, titleSize: 9, bodySize: 6.5, color: DARK, background: "#fbfafa", radius: 14, padding: 9, variant: "audience" },
  { x: 31, y: 2071, w: 182, h: 64, text: "PARENTS ON PARENTAL LEAVE\nBuild a remote career close to your family.  ↘", size: 8.5, titleSize: 8.5, bodySize: 6.3, color: DARK, background: "#fbfafa", radius: 14, padding: 9, variant: "audience" },
  { x: 88, y: 2170, w: 268, h: 65, text: "PEOPLE READY FOR CHANGE\nMove into a creative, in-demand career.  ↘", size: 10, titleSize: 10, bodySize: 7, color: DARK, background: "#fbfafa", radius: 14, padding: 9, variant: "audience" },
  { x: 60, y: 2240, w: 315, h: 145, text: "", size: 1, background: DARK },
  { x: 0, y: 2340, w: 80, h: 45, text: "", size: 1, background: DARK },
  { x: 0, y: 2240, w: 375, h: 145, text: "WHAT YOU WILL LEARN\n\nFrom strategy to independently managing a complete social media project", size: 25, color: GRAY, align: "center", lineHeight: .9 },
  { x: 20, y: 2400, w: 338, h: 60, text: "01  STRATEGY\nAnalysis, positioning, content pillars and a content plan.", size: 11, titleSize: 11, bodySize: 7.5, color: WHITE, background: DARK, padding: 7, variant: "program" },
  { x: 20, y: 2470, w: 338, h: 60, text: "02  VISUALS AND CONTENT\nCreative production, layout and video editing.", size: 11, titleSize: 11, bodySize: 7.5, color: WHITE, background: DARK, padding: 7, variant: "program" },
  { x: 20, y: 2540, w: 338, h: 60, text: "03  PLATFORMS\nInstagram, Telegram and VK.", size: 11, titleSize: 11, bodySize: 7.5, color: WHITE, background: DARK, padding: 7, variant: "program" },
  { x: 20, y: 2610, w: 338, h: 60, text: "04  INFLUENCER PARTNERSHIPS\nFinding creators and preparing integrations.", size: 10.5, titleSize: 10.5, bodySize: 7.3, color: WHITE, background: DARK, padding: 7, variant: "program" },
  { x: 20, y: 2680, w: 338, h: 60, text: "05  AI TOOLS\nCopy, imagery and faster production.", size: 11, titleSize: 11, bodySize: 7.5, color: WHITE, background: DARK, padding: 7, variant: "program" },
  { x: 20, y: 2750, w: 338, h: 60, text: "06  MARKETING FUNDAMENTALS\nHow content supports sales.", size: 10.5, titleSize: 10.5, bodySize: 7.3, color: WHITE, background: DARK, padding: 7, variant: "program" },
  { x: 0, y: 2866, w: 375, h: 135, text: "OUR STUDENTS'\nSTORIES", size: 29, color: DARK, background: LIME, padding: 18, lineHeight: .88 },
  { x: 73, y: 3011, w: 148, h: 165, text: "Kristina, 29\nSaint Petersburg\n\nFound her first projects during the course and became a creative director.", size: 7, titleSize: 8, bodySize: 6.5, color: WHITE, background: DARK, radius: 10, padding: 9, variant: "story", family: "body" },
  { x: 73, y: 3182, w: 148, h: 168, text: "Kira, 32\nYekaterinburg\n\nBuilt a portfolio, found clients and now works remotely from Thailand.", size: 7, titleSize: 8, bodySize: 6.5, color: WHITE, background: DARK, radius: 10, padding: 9, variant: "story", family: "body" },
  { x: 73, y: 3353, w: 148, h: 167, text: "Diana, 25\nMoscow\n\nLeft banking and now manages three creative projects.", size: 7, titleSize: 8, bodySize: 6.5, color: WHITE, background: DARK, radius: 10, padding: 9, variant: "story", family: "body" },
  { x: 73, y: 3524, w: 148, h: 166, text: "Nastya, 31\nKrasnoyarsk\n\nNow manages major international clients at the agency.", size: 7, titleSize: 8, bodySize: 6.5, color: WHITE, background: DARK, radius: 10, padding: 9, variant: "story", family: "body" },
  { x: 18, y: 3782, w: 275, h: 62, text: "READY FOR A NEW PROFESSION?\nLEAVE AN APPLICATION", size: 15, color: WHITE, background: DARK, lineHeight: 1 },
  { x: 18, y: 3847, w: 245, h: 42, text: "We will explain the programme, format and price.", size: 8, color: GRAY, background: DARK, family: "body" },
  { x: 20, y: 3902, w: 163, h: 23, text: "Apply for the course", size: 7, color: DARK, background: LIME, radius: 20, align: "center", padding: 6, family: "body" },
  { x: 193, y: 3902, w: 162, h: 23, text: "Terms and price", size: 7, color: DARK, background: WHITE, radius: 20, align: "center", padding: 6, family: "body" },
];

const tabletLayers: Layer[] = [
  { x: 0, y: 1980, w: 768, h: 260, text: "", size: 1, background: LIME },
  { x: 0, y: 3805, w: 768, h: 165, text: "", size: 1, background: DARK },
  { x: 0, y: 220, w: 610, h: 230, text: "", size: 1, background: DARK },
  { x: 0, y: 950, w: 768, h: 205, text: "", size: 1, background: DARK },
  { x: 0, y: 2300, w: 660, h: 150, text: "", size: 1, background: DARK },
  { x: 120, y: 2890, w: 648, h: 235, text: "", size: 1, background: DARK },
  { x: 0, y: 735, w: 768, h: 225, text: "", size: 1, background: DARK },
  { x: 34, y: 53, w: 180, h: 20, text: "HOME  →  SMM SCHOOL", size: 9, color: WHITE, background: DARK, family: "body" },
  { x: 34, y: 235, w: 560, h: 180, text: "SMM SCHOOL\nBY I AM AGENCY", size: 51, color: WHITE, background: DARK, lineHeight: .86 },
  { x: 195, y: 535, w: 510, h: 145, text: "LEARN THE PROFESSION FROM ZERO —\nTHROUGH THE SAME SYSTEM WE USE EVERY DAY", size: 27, color: LIME, background: DARK, lineHeight: .96, overflow: "visible" },
  { x: 34, y: 842, w: 700, h: 100, text: "We have taught SMM for 7 years. More than 350 people have graduated. Today they manage major brands, work remotely around the world, and many are I AM AGENCY managers.", size: 14.5, color: GRAY, background: DARK, family: "body", lineHeight: 1.04, overflow: "visible" },
  { x: 0, y: 1065, w: 768, h: 90, text: "HOW WE TEACH", size: 50, color: WHITE, background: DARK, align: "center" },
  { x: 34, y: 1137, w: 330, h: 145, text: "90% PRACTICE\nHands-on work turns every topic into a practical client skill.", size: 23, titleSize: 23, bodySize: 13, color: WHITE, background: CARD, radius: 22, padding: 16, variant: "teach" },
  { x: 397, y: 1276, w: 330, h: 190, text: "REAL AGENCY PROJECTS\nLearn on active projects with I AM AGENCY templates.", size: 21, titleSize: 21, bodySize: 13, color: WHITE, background: CARD, radius: 22, padding: 16, variant: "teach" },
  { x: 34, y: 1469, w: 330, h: 96, text: "A READY PORTFOLIO\nFinish with case studies you can confidently show to clients.", size: 21, titleSize: 21, bodySize: 12, color: WHITE, background: CARD, radius: 22, padding: 16, variant: "teach" },
  { x: 397, y: 1587, w: 330, h: 148, text: "HELP WITH FIRST CLIENTS\nLearn where to find projects and build professional client relationships.", size: 20, titleSize: 20, bodySize: 12, color: WHITE, background: CARD, radius: 22, padding: 16, variant: "teach" },
  { x: 34, y: 1754, w: 330, h: 96, text: "A ROUTE INTO THE AGENCY\nThe strongest graduates can join our internship and team.", size: 21, titleSize: 21, bodySize: 12, color: WHITE, background: CARD, radius: 22, padding: 16, variant: "teach" },
  { x: 30, y: 2020, w: 300, h: 35, text: "FORMAT", size: 25, color: DARK, background: LIME },
  { x: 30, y: 2060, w: 690, h: 160, text: "One-to-one online training with a personal curator who reviews every assignment and adapts the pace to you.\n\nDuration — six weeks\nLifetime access to all materials", size: 15, color: DARK, background: LIME, family: "body", lineHeight: 1.04 },
  { x: 0, y: 2315, w: 630, h: 105, text: "WHO IS IT FOR?", size: 49, color: LIME, background: DARK, padding: 34 },
  { x: 65, y: 2482, w: 420, h: 162, text: "PEOPLE WHO WANT FREEDOM\nWork online from anywhere and keep travelling.  ↘", size: 21, titleSize: 21, bodySize: 14, color: DARK, background: "#fbfafa", radius: 24, padding: 18, variant: "audience" },
  { x: 488, y: 2603, w: 258, h: 145, text: "STUDENTS\nBuild a valuable skill and earn while studying.  ↘", size: 18, titleSize: 18, bodySize: 12, color: DARK, background: "#fbfafa", radius: 24, padding: 16, variant: "audience" },
  { x: 34, y: 2651, w: 315, h: 142, text: "PARENTS ON PARENTAL LEAVE\nBuild a remote career close to your family.  ↘", size: 17, titleSize: 17, bodySize: 12, color: DARK, background: "#fbfafa", radius: 24, padding: 16, variant: "audience" },
  { x: 215, y: 2771, w: 510, h: 128, text: "PEOPLE READY FOR CHANGE\nMove into a creative, in-demand career.  ↘", size: 20, titleSize: 20, bodySize: 14, color: DARK, background: "#fbfafa", radius: 24, padding: 17, variant: "audience" },
  { x: 0, y: 2960, w: 768, h: 62, text: "WHAT YOU WILL LEARN", size: 36, color: GRAY, align: "center", lineHeight: 1 },
  { x: 80, y: 3034, w: 608, h: 55, text: "From strategy to independently managing a complete social media project", size: 14, color: WHITE, background: DARK, align: "center", family: "body", lineHeight: 1.12, tracking: -.02 },
  { x: 34, y: 3125, w: 700, h: 88, text: "01  STRATEGY\nAnalysis, positioning, content pillars and a content plan.", size: 29, titleSize: 29, bodySize: 18, color: WHITE, background: DARK, radius: 22, padding: 14, variant: "program" },
  { x: 34, y: 3220, w: 700, h: 100, text: "02  VISUALS AND CONTENT\nCreative production, layout and video editing.", size: 29, titleSize: 29, bodySize: 18, color: WHITE, background: DARK, radius: 22, padding: 14, variant: "program" },
  { x: 34, y: 3327, w: 700, h: 100, text: "03  PLATFORMS\nInstagram, Telegram and VK.", size: 29, titleSize: 29, bodySize: 18, color: WHITE, background: DARK, radius: 22, padding: 14, variant: "program" },
  { x: 34, y: 3434, w: 700, h: 100, text: "04  INFLUENCER PARTNERSHIPS\nFinding creators and preparing integrations.", size: 27, titleSize: 27, bodySize: 17, color: WHITE, background: DARK, radius: 22, padding: 14, variant: "program" },
  { x: 34, y: 3541, w: 700, h: 95, text: "05  AI TOOLS\nCopy, imagery and faster production.", size: 29, titleSize: 29, bodySize: 18, color: WHITE, background: DARK, radius: 22, padding: 14, variant: "program" },
  { x: 34, y: 3643, w: 700, h: 170, text: "06  MARKETING FUNDAMENTALS\nHow content supports sales and better commercial decisions.", size: 27, titleSize: 27, bodySize: 17, color: WHITE, background: DARK, radius: 22, padding: 14, variant: "program" },
  { x: 0, y: 3983, w: 580, h: 170, text: "OUR STUDENTS'\nSTORIES", size: 50, color: DARK, background: LIME, padding: 34, lineHeight: .88 },
  { x: 40, y: 4180, w: 225, h: 225, text: "Kristina, 29\nSaint Petersburg\n\nFound her first projects during the course and became a creative director.", size: 11, titleSize: 12, bodySize: 10, color: WHITE, background: DARK, radius: 18, padding: 14, variant: "story", family: "body" },
  { x: 405, y: 4180, w: 225, h: 225, text: "Kira, 32\nYekaterinburg\n\nBuilt a portfolio, found clients and now works remotely from Thailand.", size: 11, titleSize: 12, bodySize: 10, color: WHITE, background: DARK, radius: 18, padding: 14, variant: "story", family: "body" },
  { x: 40, y: 4435, w: 225, h: 225, text: "Diana, 25\nMoscow\n\nLeft banking and now manages three creative projects.", size: 11, titleSize: 12, bodySize: 10, color: WHITE, background: DARK, radius: 18, padding: 14, variant: "story", family: "body" },
  { x: 405, y: 4435, w: 225, h: 225, text: "Nastya, 31\nKrasnoyarsk\n\nNow manages major international clients at the agency.", size: 11, titleSize: 12, bodySize: 10, color: WHITE, background: DARK, radius: 18, padding: 14, variant: "story", family: "body" },
  { x: 34, y: 4780, w: 560, h: 100, text: "READY FOR A NEW PROFESSION?\nLEAVE AN APPLICATION", size: 27, color: WHITE, background: DARK, lineHeight: 1 },
  { x: 34, y: 4890, w: 400, h: 55, text: "We will explain the programme, format and price.", size: 14, color: GRAY, background: DARK, family: "body" },
  { x: 212, y: 4954, w: 252, h: 35, text: "Apply for the course", size: 12, color: DARK, background: LIME, radius: 22, align: "center", padding: 11, family: "body" },
  { x: 478, y: 4954, w: 251, h: 35, text: "Terms and price", size: 12, color: DARK, background: WHITE, radius: 22, align: "center", padding: 11, family: "body" },
];

function scaledLayer(layer: Layer, sx: number, sy: number): Layer {
  return {
    ...layer,
    x: layer.x * sx,
    y: layer.y * sy,
    w: layer.w * sx,
    h: layer.h * sy,
    size: layer.size * Math.min(sx * 1.12, sy),
    radius: layer.radius ? layer.radius * sx : undefined,
    padding: layer.padding ? layer.padding * sx : undefined,
    titleSize: layer.titleSize ? layer.titleSize * Math.min(sx * 1.12, sy) : undefined,
    bodySize: layer.bodySize ? layer.bodySize * Math.min(sx * 1.12, sy) : undefined,
  };
}

function LayerContent({ layer }: { layer: Layer }) {
  const lines = layer.text.split("\n");

  if (layer.variant === "teach" || layer.variant === "audience") {
    const title = lines[0];
    const body = lines.slice(1).join("\n").trim();
    const audience = layer.variant === "audience";
    return (
      <>
        <div style={{
          fontFamily: "Coolvetica, Inter, Arial, sans-serif",
          fontWeight: 400,
          fontSize: layer.titleSize ?? layer.size,
          lineHeight: audience ? .96 : .94,
          letterSpacing: audience ? "-.018em" : 0,
          textTransform: "uppercase",
          color: audience ? DARK : LIME,
        }}>{title}</div>
        <div style={{
          marginTop: audience
            ? Math.max(3, (layer.titleSize ?? layer.size) * .25)
            : Math.max(4, (layer.titleSize ?? layer.size) * .45),
          fontFamily: "Inter, sans-serif",
          fontSize: layer.bodySize ?? layer.size * .62,
          fontWeight: 400,
          lineHeight: audience ? 1.04 : 1.02,
          letterSpacing: audience ? "-.018em" : "-.025em",
          textTransform: "none",
          color: audience ? GRAY : WHITE,
          whiteSpace: "pre-line",
        }}>{body}</div>
      </>
    );
  }

  if (layer.variant === "program") {
    const [number = "", title = ""] = (lines[0] ?? "").match(/^(\d{2})\s+(.*)$/)?.slice(1) ?? [];
    const body = lines.slice(1).join("\n").trim();
    return (
      <>
        <div style={{ display: "flex", alignItems: "baseline", gap: Math.max(8, (layer.titleSize ?? layer.size) * .72) }}>
          <span style={{ fontFamily: "Coolvetica, Inter, Arial, sans-serif", fontWeight: 400, fontSize: layer.titleSize ?? layer.size, lineHeight: .9, color: LIME, letterSpacing: "-.018em" }}>{number}</span>
          <span style={{ fontFamily: "Coolvetica, Inter, Arial, sans-serif", fontWeight: 400, fontSize: layer.titleSize ?? layer.size, lineHeight: .9, color: WHITE, letterSpacing: "-.018em" }}>{title}</span>
        </div>
        <div style={{
          marginTop: Math.max(4, (layer.titleSize ?? layer.size) * .42),
          fontFamily: "Inter, sans-serif",
          fontSize: layer.bodySize ?? layer.size * .66,
          fontWeight: 400,
          lineHeight: .98,
          letterSpacing: "-.025em",
          textTransform: "none",
          color: GRAY,
          whiteSpace: "pre-line",
        }}>{body}</div>
      </>
    );
  }

  if (layer.variant === "story") {
    const name = lines[0] ?? "";
    const location = lines[1] ?? "";
    const body = lines.slice(2).join("\n").trim();
    return (
      <>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: layer.titleSize ?? layer.size, lineHeight: .92, letterSpacing: "-.05em", textTransform: "none", color: WHITE }}>{name}</div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: layer.titleSize ?? layer.size, lineHeight: .92, letterSpacing: "-.05em", textTransform: "none", color: GRAY }}>{location}</div>
        <div style={{ marginTop: Math.max(5, (layer.titleSize ?? layer.size) * 1.25), fontFamily: "Inter, sans-serif", fontSize: layer.bodySize ?? layer.size, lineHeight: .94, letterSpacing: "-.05em", textTransform: "none", color: WHITE, whiteSpace: "pre-line" }}>{body}</div>
      </>
    );
  }

  if (layer.background === CARD && layer.text) {
    return (
      <>
        <span style={{ color: LIME }}>{lines[0]}</span>
        {`\n${lines.slice(1).join("\n")}`}
      </>
    );
  }

  return layer.text;
}

function Frame({ kind, width, height, src }: { kind: string; width: number; height: number; src: string }) {
  const sx = width / 1440;
  const sy = height / 8323;
  const frameLayers = kind === "mobile"
    ? mobileLayers
    : kind === "tablet"
      ? tabletLayers
    : kind === "desktop"
      ? [...desktopMasks, ...layers]
      : [...desktopMasks, ...layers].map((layer) => scaledLayer(layer, sx, sy));

  const openForm = () => document.getElementById("global-course-lead-trigger")?.click();
  const firstCta = kind === "mobile"
    ? { left: 20, top: 3902, width: 163, height: 23 }
    : kind === "tablet"
      ? { left: 212, top: 4954, width: 252, height: 35 }
      : { left: 395, top: 8183, width: 478, height: 65 };
  const secondCta = kind === "mobile"
    ? { left: 193, top: 3902, width: 162, height: 23 }
    : kind === "tablet"
      ? { left: 478, top: 4954, width: 251, height: 35 }
      : { left: 900, top: 8183, width: 475, height: 65 };

  return (
    <div className={`${styles.frameWrap} ${styles[kind]}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <div className={styles.frame} style={{ width, height }}>
        <img src={src} alt="I AM AGENCY SMM School course, programme and student stories" width={width} height={height} />
        {frameLayers.map((layer, index) => (
          <div
            className={`${styles.layer} ${layer.family === "body" ? styles.body : styles.display}`}
            key={`${layer.x}-${layer.y}-${index}`}
            style={{
              left: layer.x,
              top: layer.y,
              width: layer.w,
              height: layer.h,
              fontSize: layer.size,
              color: layer.color,
              background: layer.background,
              borderRadius: layer.radius,
              padding: layer.padding,
              lineHeight: layer.lineHeight ?? .92,
              fontWeight: layer.weight ?? 400,
              letterSpacing: layer.tracking === undefined ? undefined : `${layer.tracking}em`,
              textAlign: layer.align ?? "left",
              overflow: layer.overflow,
            }}
          >
            <LayerContent layer={layer} />
          </div>
        ))}
        <button className={styles.ctaHotspot} style={firstCta} onClick={openForm} aria-label="Apply for the SMM course" />
        <button className={styles.ctaHotspot} style={secondCta} onClick={openForm} aria-label="Ask about course terms and price" />
      </div>
    </div>
  );
}

export default function SchoolTranslatedCanvas() {
  return (
    <section className={styles.canvas} aria-label="I AM AGENCY SMM School" data-en-cta-ignore>
      <Frame kind="desktop" width={1440} height={8323} src="/blk/responsive/mobile/school-desktop.webp" />
      <Frame kind="tablet" width={768} height={5084} src="/blk/responsive/mobile/school-tablet.webp" />
      <Frame kind="mobile" width={375} height={3982} src="/blk/responsive/mobile/school-mobile.webp" />
    </section>
  );
}
