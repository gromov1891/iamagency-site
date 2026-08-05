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
};

const DARK = "#1c1c1c";
const CARD = "#222022";
const LIME = "#cee3a7";
const WHITE = "#fff";
const GRAY = "#9a9895";

const layers: Layer[] = [
  { x: 60, y: 24, w: 310, h: 36, text: "HOME   →   SMM SCHOOL", size: 19, color: WHITE, background: DARK, family: "body" },
  { x: 60, y: 145, w: 710, h: 270, text: "SMM SCHOOL\nBY I AM AGENCY", size: 76, color: WHITE, background: DARK, lineHeight: .86 },
  { x: 440, y: 505, w: 760, h: 175, text: "LEARN THE PROFESSION FROM ZERO —\nTHROUGH THE SAME SYSTEM WE USE EVERY DAY", size: 50, color: LIME, background: DARK, lineHeight: .98 },
  { x: 60, y: 840, w: 1210, h: 125, text: "We have taught SMM for 7 years. More than 350 people have graduated from our school. Today they manage major brands, work remotely from anywhere in the world, and many are active I AM AGENCY managers.", size: 30, color: GRAY, background: DARK, lineHeight: 1.02, family: "body" },
  { x: 350, y: 1120, w: 740, h: 105, text: "HOW WE TEACH", size: 82, color: WHITE, background: DARK, align: "center" },

  { x: 60, y: 1295, w: 645, h: 355, text: "90% PRACTICE\n\nThe programme is built around hands-on work, so every topic becomes a skill you can use on real client projects.", size: 31, color: WHITE, background: CARD, radius: 42, padding: 30, lineHeight: 1.02 },
  { x: 735, y: 1595, w: 645, h: 370, text: "REAL AGENCY PROJECTS\n\nLearn on active I AM AGENCY projects and use the same templates our team relies on every day.", size: 31, color: WHITE, background: CARD, radius: 42, padding: 30, lineHeight: 1.02 },
  { x: 60, y: 1935, w: 645, h: 265, text: "A READY PORTFOLIO\n\nBy the end of the course, you will have polished case studies you can confidently show to clients.", size: 31, color: WHITE, background: CARD, radius: 42, padding: 30, lineHeight: 1.02 },
  { x: 735, y: 2195, w: 645, h: 285, text: "HELP WITH FIRST CLIENTS\n\nWe show you where to find projects and how to build strong professional relationships with clients.", size: 31, color: WHITE, background: CARD, radius: 42, padding: 30, lineHeight: 1.02 },
  { x: 60, y: 2480, w: 645, h: 265, text: "A ROUTE INTO THE AGENCY\n\nWe invite our strongest graduates to intern at I AM AGENCY and grow into a role on the team.", size: 31, color: WHITE, background: CARD, radius: 42, padding: 30, lineHeight: 1.02 },

  { x: 55, y: 2960, w: 700, h: 80, text: "FORMAT", size: 49, color: DARK, background: LIME },
  { x: 55, y: 3040, w: 1280, h: 365, text: "The course is currently delivered one-to-one with a personal curator. Your curator supports you throughout the programme, reviews every assignment and adapts the pace to you.\n\nDuration — six weeks\nLifetime access to all materials", size: 28, color: DARK, background: LIME, lineHeight: 1.04, family: "body" },

  { x: 58, y: 3615, w: 850, h: 100, text: "WHO IS IT FOR?", size: 78, color: LIME, background: DARK },
  { x: 125, y: 3746, w: 780, h: 195, text: "PEOPLE WHO WANT FREEDOM\nWork online from anywhere in the world and keep travelling.                                      ↘", size: 31, color: DARK, background: "#fbfafa", radius: 42, padding: 30, lineHeight: 1.08 },
  { x: 910, y: 3964, w: 470, h: 196, text: "STUDENTS\nBuild an in-demand skill and earn alongside your studies.                 ↘", size: 29, color: DARK, background: "#fbfafa", radius: 42, padding: 28, lineHeight: 1.06 },
  { x: 60, y: 4064, w: 575, h: 157, text: "PARENTS ON PARENTAL LEAVE\nLearn a remote profession and earn while staying close to your family.          ↘", size: 27, color: DARK, background: "#fbfafa", radius: 42, padding: 28, lineHeight: 1.04 },
  { x: 420, y: 4326, w: 845, h: 195, text: "PEOPLE READY FOR CHANGE\nLeave an unfulfilling job for a creative, in-demand career.                                ↘", size: 31, color: DARK, background: "#fbfafa", radius: 42, padding: 30, lineHeight: 1.06 },

  { x: 235, y: 4750, w: 970, h: 110, text: "WHAT YOU WILL LEARN", size: 76, color: GRAY, background: DARK, align: "center" },
  { x: 105, y: 4870, w: 1230, h: 65, text: "From strategy to independently managing a complete social media project", size: 27, color: WHITE, background: DARK, align: "center", family: "body" },
  { x: 60, y: 5011, w: 1320, h: 207, text: "01   STRATEGY\nAnalysis, positioning, content pillars and a practical content plan.", size: 38, color: WHITE, background: DARK, padding: 20, lineHeight: 1.12 },
  { x: 60, y: 5222, w: 1320, h: 205, text: "02   VISUALS AND CONTENT\nCreative production, layout and video editing — practical skills for everyday work.", size: 38, color: WHITE, background: DARK, padding: 20, lineHeight: 1.12 },
  { x: 60, y: 5433, w: 1320, h: 206, text: "03   PLATFORMS\nInstagram, Telegram and VK: what makes each platform different and how to grow on it.", size: 38, color: WHITE, background: DARK, padding: 20, lineHeight: 1.12 },
  { x: 60, y: 5643, w: 1320, h: 189, text: "04   INFLUENCER PARTNERSHIPS\nHow to find, assess and brief creators and prepare integrations.", size: 38, color: WHITE, background: DARK, padding: 20, lineHeight: 1.12 },
  { x: 60, y: 5836, w: 1320, h: 195, text: "05   AI TOOLS\nHow to use AI for copy, imagery and faster routine production.", size: 38, color: WHITE, background: DARK, padding: 20, lineHeight: 1.12 },
  { x: 60, y: 6037, w: 1320, h: 316, text: "06   MARKETING FUNDAMENTALS\nHow content supports sales and helps you make better commercial decisions.", size: 38, color: WHITE, background: DARK, padding: 20, lineHeight: 1.12 },

  { x: 60, y: 6415, w: 880, h: 210, text: "OUR STUDENTS'\nSTORIES", size: 76, color: DARK, background: LIME, lineHeight: .88 },
  { x: 70, y: 6710, w: 375, h: 380, text: "KRISTINA, 29\nSAINT PETERSBURG\n\nJoined with a five-month-old baby and received her first projects during the course. She later became a curator and now works as a creative director for a major cosmetics brand.", size: 24, color: WHITE, background: DARK, radius: 30, padding: 24, lineHeight: 1.04 },
  { x: 765, y: 6710, w: 375, h: 380, text: "KIRA, 32\nYEKATERINBURG\n\nMoved from beauty services into SMM, built a portfolio on real projects and found her first clients. She now works remotely and lives in Thailand.", size: 24, color: WHITE, background: DARK, radius: 30, padding: 24, lineHeight: 1.04 },
  { x: 70, y: 7195, w: 375, h: 380, text: "DIANA, 25\nMOSCOW\n\nLeft banking for creative work. Her first project was a clothing brand. Today she combines three projects and continues to grow.", size: 24, color: WHITE, background: DARK, radius: 30, padding: 24, lineHeight: 1.04 },
  { x: 765, y: 7195, w: 375, h: 380, text: "NASTYA, 31\nKRASNOYARSK\n\nChanged careers while expecting her second child. Today she manages major international clients as part of the agency team.", size: 24, color: WHITE, background: DARK, radius: 30, padding: 24, lineHeight: 1.04 },

  { x: 60, y: 7860, w: 990, h: 150, text: "READY FOR A NEW PROFESSION?\nLEAVE AN APPLICATION", size: 49, color: WHITE, background: DARK, lineHeight: 1.02 },
  { x: 60, y: 8015, w: 610, h: 90, text: "We will explain the programme, format and current price.", size: 28, color: GRAY, background: DARK, lineHeight: 1.02, family: "body" },
  { x: 395, y: 8183, w: 478, h: 65, text: "Apply for the course", size: 27, color: DARK, background: LIME, radius: 96, align: "center", padding: 15, family: "body" },
  { x: 900, y: 8183, w: 475, h: 65, text: "Course terms and price", size: 27, color: DARK, background: WHITE, radius: 96, align: "center", padding: 15, family: "body" },
];

const desktopMasks: Layer[] = [
  { x: 0, y: 1090, w: 1440, h: 155, text: "", size: 1, background: DARK },
  { x: 0, y: 3520, w: 1120, h: 180, text: "", size: 1, background: DARK },
  { x: 0, y: 4680, w: 1440, h: 270, text: "", size: 1, background: DARK },
  { x: 0, y: 4950, w: 1440, h: 1405, text: "", size: 1, background: DARK },
  { x: 0, y: 6350, w: 1050, h: 270, text: "", size: 1, background: LIME },
  { x: 0, y: 7800, w: 1110, h: 350, text: "", size: 1, background: DARK },
];

const mobileLayers: Layer[] = [
  { x: 0, y: 2385, w: 375, h: 481, text: "", size: 1, background: DARK },
  { x: 0, y: 2700, w: 375, h: 150, text: "", size: 1, background: DARK },
  { x: 18, y: 1450, w: 130, h: 32, text: "", size: 1, background: LIME },
  { x: 18, y: 1490, w: 342, h: 170, text: "", size: 1, background: LIME },
  { x: 18, y: 66, w: 130, h: 18, text: "HOME  →  SMM SCHOOL", size: 7, color: WHITE, background: DARK, family: "body" },
  { x: 18, y: 268, w: 270, h: 100, text: "SMM SCHOOL\nBY I AM AGENCY", size: 30, color: WHITE, background: DARK, lineHeight: .86 },
  { x: 102, y: 465, w: 265, h: 74, text: "LEARN THE PROFESSION FROM ZERO —\nTHROUGH THE SAME SYSTEM WE USE EVERY DAY", size: 15, color: LIME, background: DARK, lineHeight: .96 },
  { x: 18, y: 648, w: 340, h: 72, text: "We have taught SMM for 7 years. More than 350 people have graduated. Today they manage major brands and work remotely around the world.", size: 9, color: GRAY, background: DARK, family: "body", lineHeight: 1.05 },
  { x: 0, y: 816, w: 375, h: 68, text: "HOW WE TEACH", size: 29, color: WHITE, background: DARK, align: "center" },
  { x: 20, y: 901, w: 164, h: 91, text: "90% PRACTICE\n\nHands-on work turns every topic into a practical client skill.", size: 10, color: WHITE, background: CARD, radius: 12, padding: 9, lineHeight: 1.02 },
  { x: 193, y: 1010, w: 164, h: 91, text: "REAL AGENCY PROJECTS\n\nLearn on active projects with I AM AGENCY templates.", size: 10, color: WHITE, background: CARD, radius: 12, padding: 9, lineHeight: 1.02 },
  { x: 20, y: 1110, w: 164, h: 66, text: "A READY PORTFOLIO\n\nFinish with case studies you can show to clients.", size: 9, color: WHITE, background: CARD, radius: 12, padding: 9, lineHeight: 1.02 },
  { x: 193, y: 1208, w: 164, h: 76, text: "HELP WITH FIRST CLIENTS\n\nLearn where to find projects and work with clients.", size: 9, color: WHITE, background: CARD, radius: 12, padding: 9, lineHeight: 1.02 },
  { x: 20, y: 1303, w: 164, h: 70, text: "A ROUTE INTO THE AGENCY\n\nThe strongest graduates can join our internship.", size: 9, color: WHITE, background: CARD, radius: 12, padding: 9, lineHeight: 1.02 },
  { x: 26, y: 1452, w: 205, h: 24, text: "FORMAT", size: 17, color: DARK, background: LIME },
  { x: 26, y: 1492, w: 333, h: 150, text: "One-to-one online training with a personal curator who reviews every assignment and adapts the pace to you.\n\nDuration — six weeks\nLifetime access to all materials", size: 10, color: DARK, background: LIME, family: "body", lineHeight: 1.04 },
  { x: 0, y: 1760, w: 350, h: 70, text: "WHO IS IT FOR?", size: 30, color: LIME, background: DARK, padding: 18 },
  { x: 20, y: 1872, w: 248, h: 64, text: "PEOPLE WHO WANT FREEDOM\nWork online from anywhere and keep travelling.       ↘", size: 12, color: DARK, background: "#fbfafa", radius: 14, padding: 10, lineHeight: 1.04 },
  { x: 196, y: 1970, w: 149, h: 64, text: "STUDENTS\nBuild a valuable skill and earn while studying.     ↘", size: 10, color: DARK, background: "#fbfafa", radius: 14, padding: 9, lineHeight: 1.04 },
  { x: 31, y: 2071, w: 182, h: 64, text: "PARENTS ON PARENTAL LEAVE\nBuild a remote career close to your family.      ↘", size: 9, color: DARK, background: "#fbfafa", radius: 14, padding: 9, lineHeight: 1.04 },
  { x: 88, y: 2170, w: 268, h: 65, text: "PEOPLE READY FOR CHANGE\nMove into a creative, in-demand career.          ↘", size: 10, color: DARK, background: "#fbfafa", radius: 14, padding: 9, lineHeight: 1.04 },
  { x: 0, y: 2240, w: 375, h: 145, text: "WHAT YOU WILL LEARN\n\nFrom strategy to independently managing a complete social media project", size: 25, color: GRAY, background: DARK, align: "center", lineHeight: .9 },
  { x: 20, y: 2400, w: 338, h: 60, text: "01   STRATEGY\nAnalysis, positioning, content pillars and a content plan.", size: 11, color: WHITE, background: DARK, padding: 6, lineHeight: 1.05 },
  { x: 20, y: 2470, w: 338, h: 60, text: "02   VISUALS AND CONTENT\nCreative production, layout and video editing.", size: 11, color: WHITE, background: DARK, padding: 6, lineHeight: 1.05 },
  { x: 20, y: 2540, w: 338, h: 60, text: "03   PLATFORMS\nInstagram, Telegram and VK.", size: 11, color: WHITE, background: DARK, padding: 6, lineHeight: 1.05 },
  { x: 20, y: 2610, w: 338, h: 60, text: "04   INFLUENCER PARTNERSHIPS\nFinding creators and preparing integrations.", size: 11, color: WHITE, background: DARK, padding: 6, lineHeight: 1.05 },
  { x: 20, y: 2680, w: 338, h: 60, text: "05   AI TOOLS\nCopy, imagery and faster production.", size: 11, color: WHITE, background: DARK, padding: 6, lineHeight: 1.05 },
  { x: 20, y: 2750, w: 338, h: 60, text: "06   MARKETING FUNDAMENTALS\nHow content supports sales.", size: 11, color: WHITE, background: DARK, padding: 6, lineHeight: 1.05 },
  { x: 0, y: 2866, w: 375, h: 135, text: "OUR STUDENTS'\nSTORIES", size: 29, color: DARK, background: LIME, padding: 18, lineHeight: .88 },
  { x: 73, y: 3011, w: 148, h: 153, text: "KRISTINA, 29\nSAINT PETERSBURG\n\nFound her first projects during the course and became a creative director.", size: 8, color: WHITE, background: DARK, radius: 10, padding: 9, lineHeight: 1.05 },
  { x: 73, y: 3182, w: 148, h: 156, text: "KIRA, 32\nYEKATERINBURG\n\nBuilt a portfolio, found clients and now works remotely from Thailand.", size: 8, color: WHITE, background: DARK, radius: 10, padding: 9, lineHeight: 1.05 },
  { x: 73, y: 3353, w: 148, h: 155, text: "DIANA, 25\nMOSCOW\n\nLeft banking and now manages three creative projects.", size: 8, color: WHITE, background: DARK, radius: 10, padding: 9, lineHeight: 1.05 },
  { x: 73, y: 3524, w: 148, h: 154, text: "NASTYA, 31\nKRASNOYARSK\n\nNow manages major international clients at the agency.", size: 8, color: WHITE, background: DARK, radius: 10, padding: 9, lineHeight: 1.05 },
  { x: 18, y: 3782, w: 275, h: 62, text: "READY FOR A NEW PROFESSION?\nLEAVE AN APPLICATION", size: 15, color: WHITE, background: DARK, lineHeight: 1 },
  { x: 18, y: 3847, w: 245, h: 42, text: "We will explain the programme, format and price.", size: 8, color: GRAY, background: DARK, family: "body" },
  { x: 20, y: 3902, w: 163, h: 23, text: "Apply for the course", size: 7, color: DARK, background: LIME, radius: 20, align: "center", padding: 6, family: "body" },
  { x: 193, y: 3902, w: 162, h: 23, text: "Terms and price", size: 7, color: DARK, background: WHITE, radius: 20, align: "center", padding: 6, family: "body" },
];

const tabletLayers: Layer[] = [
  { x: 0, y: 3120, w: 768, h: 863, text: "", size: 1, background: DARK },
  { x: 0, y: 220, w: 610, h: 230, text: "", size: 1, background: DARK },
  { x: 0, y: 950, w: 768, h: 205, text: "", size: 1, background: DARK },
  { x: 0, y: 2300, w: 660, h: 150, text: "", size: 1, background: DARK },
  { x: 0, y: 2890, w: 768, h: 235, text: "", size: 1, background: DARK },
  { x: 34, y: 53, w: 180, h: 20, text: "HOME  →  SMM SCHOOL", size: 9, color: WHITE, background: DARK, family: "body" },
  { x: 34, y: 235, w: 560, h: 180, text: "SMM SCHOOL\nBY I AM AGENCY", size: 51, color: WHITE, background: DARK, lineHeight: .86 },
  { x: 195, y: 535, w: 470, h: 120, text: "LEARN THE PROFESSION FROM ZERO —\nTHROUGH THE SAME SYSTEM WE USE EVERY DAY", size: 29, color: LIME, background: DARK, lineHeight: .96 },
  { x: 34, y: 842, w: 680, h: 85, text: "We have taught SMM for 7 years. More than 350 people have graduated. Today they manage major brands, work remotely around the world, and many are I AM AGENCY managers.", size: 15, color: GRAY, background: DARK, family: "body", lineHeight: 1.04 },
  { x: 0, y: 1065, w: 768, h: 90, text: "HOW WE TEACH", size: 50, color: WHITE, background: DARK, align: "center" },
  { x: 34, y: 1137, w: 330, h: 145, text: "90% PRACTICE\n\nHands-on work turns every topic into a practical client skill.", size: 19, color: WHITE, background: CARD, radius: 22, padding: 16, lineHeight: 1.03 },
  { x: 397, y: 1276, w: 330, h: 190, text: "REAL AGENCY PROJECTS\n\nLearn on active projects with I AM AGENCY templates.", size: 19, color: WHITE, background: CARD, radius: 22, padding: 16, lineHeight: 1.03 },
  { x: 34, y: 1469, w: 330, h: 96, text: "A READY PORTFOLIO\n\nFinish with case studies you can confidently show to clients.", size: 18, color: WHITE, background: CARD, radius: 22, padding: 16, lineHeight: 1.03 },
  { x: 397, y: 1587, w: 330, h: 148, text: "HELP WITH FIRST CLIENTS\n\nLearn where to find projects and build professional client relationships.", size: 18, color: WHITE, background: CARD, radius: 22, padding: 16, lineHeight: 1.03 },
  { x: 34, y: 1754, w: 330, h: 96, text: "A ROUTE INTO THE AGENCY\n\nThe strongest graduates can join our internship and team.", size: 18, color: WHITE, background: CARD, radius: 22, padding: 16, lineHeight: 1.03 },
  { x: 30, y: 2020, w: 300, h: 35, text: "FORMAT", size: 25, color: DARK, background: LIME },
  { x: 30, y: 2060, w: 690, h: 160, text: "One-to-one online training with a personal curator who reviews every assignment and adapts the pace to you.\n\nDuration — six weeks\nLifetime access to all materials", size: 15, color: DARK, background: LIME, family: "body", lineHeight: 1.04 },
  { x: 0, y: 2315, w: 630, h: 105, text: "WHO IS IT FOR?", size: 49, color: LIME, background: DARK, padding: 34 },
  { x: 65, y: 2550, w: 420, h: 92, text: "PEOPLE WHO WANT FREEDOM\nWork online from anywhere and keep travelling.                 ↘", size: 21, color: DARK, background: "#fbfafa", radius: 24, padding: 18, lineHeight: 1.04 },
  { x: 488, y: 2653, w: 245, h: 91, text: "STUDENTS\nBuild a valuable skill and earn while studying.     ↘", size: 18, color: DARK, background: "#fbfafa", radius: 24, padding: 16, lineHeight: 1.04 },
  { x: 34, y: 2706, w: 315, h: 86, text: "PARENTS ON PARENTAL LEAVE\nBuild a remote career close to your family.      ↘", size: 17, color: DARK, background: "#fbfafa", radius: 24, padding: 16, lineHeight: 1.04 },
  { x: 215, y: 2793, w: 475, h: 94, text: "PEOPLE READY FOR CHANGE\nMove into a creative, in-demand career.                      ↘", size: 20, color: DARK, background: "#fbfafa", radius: 24, padding: 17, lineHeight: 1.04 },
  { x: 0, y: 2960, w: 768, h: 175, text: "WHAT YOU WILL LEARN\n\nFrom strategy to independently managing a complete social media project", size: 44, color: GRAY, background: DARK, align: "center", lineHeight: .9 },
  { x: 34, y: 3130, w: 700, h: 88, text: "01   STRATEGY\nAnalysis, positioning, content pillars and a content plan.", size: 22, color: WHITE, background: DARK, padding: 10, lineHeight: 1.05 },
  { x: 34, y: 3214, w: 700, h: 106, text: "02   VISUALS AND CONTENT\nCreative production, layout and video editing.", size: 22, color: WHITE, background: DARK, padding: 10, lineHeight: 1.05 },
  { x: 34, y: 3323, w: 700, h: 107, text: "03   PLATFORMS\nInstagram, Telegram and VK.", size: 22, color: WHITE, background: DARK, padding: 10, lineHeight: 1.05 },
  { x: 34, y: 3434, w: 700, h: 106, text: "04   INFLUENCER PARTNERSHIPS\nFinding creators and preparing integrations.", size: 22, color: WHITE, background: DARK, padding: 10, lineHeight: 1.05 },
  { x: 34, y: 3543, w: 700, h: 98, text: "05   AI TOOLS\nCopy, imagery and faster production.", size: 22, color: WHITE, background: DARK, padding: 10, lineHeight: 1.05 },
  { x: 34, y: 3644, w: 700, h: 190, text: "06   MARKETING FUNDAMENTALS\nHow content supports sales and better commercial decisions.", size: 22, color: WHITE, background: DARK, padding: 10, lineHeight: 1.05 },
  { x: 0, y: 3983, w: 580, h: 170, text: "OUR STUDENTS'\nSTORIES", size: 50, color: DARK, background: LIME, padding: 34, lineHeight: .88 },
  { x: 40, y: 4180, w: 225, h: 205, text: "KRISTINA, 29\nSAINT PETERSBURG\n\nFound her first projects during the course and became a creative director.", size: 12, color: WHITE, background: DARK, radius: 18, padding: 14, lineHeight: 1.05 },
  { x: 405, y: 4180, w: 225, h: 205, text: "KIRA, 32\nYEKATERINBURG\n\nBuilt a portfolio, found clients and now works remotely from Thailand.", size: 12, color: WHITE, background: DARK, radius: 18, padding: 14, lineHeight: 1.05 },
  { x: 40, y: 4435, w: 225, h: 205, text: "DIANA, 25\nMOSCOW\n\nLeft banking and now manages three creative projects.", size: 12, color: WHITE, background: DARK, radius: 18, padding: 14, lineHeight: 1.05 },
  { x: 405, y: 4435, w: 225, h: 205, text: "NASTYA, 31\nKRASNOYARSK\n\nNow manages major international clients at the agency.", size: 12, color: WHITE, background: DARK, radius: 18, padding: 14, lineHeight: 1.05 },
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
  };
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
              textAlign: layer.align ?? "left",
              borderTop: /^\d{2}\s/.test(layer.text) ? `1px solid ${LIME}` : undefined,
            }}
          >
            {layer.background === CARD && layer.text ? (
              <>
                <span style={{ color: LIME }}>{layer.text.split("\n")[0]}</span>
                {`\n${layer.text.split("\n").slice(1).join("\n")}`}
              </>
            ) : layer.text}
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
    <section className={styles.canvas} aria-label="I AM AGENCY SMM School">
      <Frame kind="desktop" width={1440} height={8323} src="/blk/responsive/mobile/school-desktop.webp" />
      <Frame kind="tablet" width={768} height={5084} src="/blk/responsive/mobile/school-tablet.webp" />
      <Frame kind="mobile" width={375} height={3982} src="/blk/responsive/mobile/school-mobile.webp" />
    </section>
  );
}
