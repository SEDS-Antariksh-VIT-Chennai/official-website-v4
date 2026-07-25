import { Code, Wrench, Rocket } from "lucide-react";

export const projects = [
  {
    id: 1,
    title: "Project Antariksh",
    category: "Space Robotics",
    description: "Our flagship lunar rover designed for the University Rover Challenge. Features autonomous navigation and a 6-DOF robotic arm for sample collection.",
    fullDescription: "Project Antariksh represents the pinnacle of our robotics division's efforts. Designed over two years for the prestigious University Rover Challenge, this rover features state-of-the-art autonomous navigation powered by ROS2, a custom rocker-bogie suspension system for rough lunar-like terrain, and a 6-DOF robotic arm capable of delicate sample retrieval. The rover acts as a testbed for novel computer vision algorithms and embedded system architectures.",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1600&auto=format&fit=crop",
    icon: Wrench,
    status: "Active",
    teamSize: 15,
    timeline: "2024 - Present"
  },
  {
    id: 2,
    title: "Vyom-1 CanSat",
    category: "Aerospace",
    description: "A miniature satellite the size of a soda can, deployed from a sounding rocket to gather atmospheric telemetry during descent.",
    fullDescription: "The Vyom-1 CanSat is a remarkable achievement in miniaturization. Built to fit inside a standard soda can volume, this satellite is deployed at an altitude of 10,000 feet. During its parachute-assisted descent, it continuously broadcasts atmospheric data including pressure, temperature, and GPS coordinates back to our ground station. The project gave students hands-on experience with telemetry, parachute deployment mechanics, and compact PCB design.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    icon: Rocket,
    status: "Completed",
    teamSize: 8,
    timeline: "Fall 2025"
  },
  {
    id: 3,
    title: "StarTracker API",
    category: "Software",
    description: "An open-source API built by our software team to track the real-time position of the ISS and other prominent satellites using orbital elements.",
    fullDescription: "StarTracker is an open-source software project that provides developers with a simple REST API to track the real-time position of the International Space Station and over 500 other prominent satellites. By utilizing Two-Line Element (TLE) sets provided by NORAD and implementing complex orbital propagation algorithms (SGP4), the API delivers accurate lat/lon coordinates and altitude data. It handles over 10,000 requests per day from amateur astronomers globally.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1600&auto=format&fit=crop",
    icon: Code,
    status: "Active",
    teamSize: 5,
    timeline: "Spring 2026 - Present"
  }
];
