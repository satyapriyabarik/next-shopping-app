"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { SCREENSHOT_URL } from "@/constants/apiList";
import {
    FaExternalLinkSquareAlt,
    FaBriefcase,
    FaCode,
    FaLaptopCode,
    FaUsers,
    FaRocket,
    FaLightbulb,
} from "react-icons/fa";



const PortfolioPage = () => {
    const [activeTab, setActiveTab] = useState("work");

    const descriptions = [
        {
            icon: <FaBriefcase />,
            title: "Role",
            text: "Senior Staff Engineer at Nagarro specializing in frontend development with React.js, building scalable, high-performance, and user-centric web applications."
        },
        {
            icon: <FaCode />,
            title: "Expertise",
            text: "Extensive experience in modern JavaScript (ES6+), React Hooks, Context API, Redux, and component-based architecture to develop maintainable and reusable UI solutions."
        },
        {
            icon: <FaLaptopCode />,
            title: "Skills",
            text: "Proficient in developing responsive interfaces, optimizing frontend performance, and integrating RESTful APIs to deliver seamless user experiences."
        },
        {
            icon: <FaRocket />,
            title: "Practices",
            text: "Experienced in implementing best practices in state management, code modularization, performance optimization, and UI scalability within agile development environments."
        },
        {
            icon: <FaUsers />,
            title: "Collaboration",
            text: "Strong collaborator with the ability to work effectively across cross-functional teams to deliver high-quality frontend solutions."
        },
        {
            icon: <FaLightbulb />,
            title: "Mindset",
            text: "Highly motivated professional with strong problem-solving skills, adaptability, and the ability to quickly learn and implement new technologies while maintaining high development standards."
        }

    ];
    const certifications = [
        {
            title: "Certified Azure Fundamentals",
            text: "AZ-900: Microsoft Azure Fundamentals certification validating foundational knowledge of cloud services and how they are provided with Microsoft Azure.",
            image: "/images/certifications/az-900.webp"
        },
        {
            title: "Certified Azure Data Fundamentals",
            text: "DP-900: Microsoft Azure Data Fundamentals certification demonstrating expertise in developing cloud applications and services on Microsoft Azure.",
            image: "/images/certifications/dp-900.webp"
        },
        {
            title: "Understanding Digital accessibility",
            text: "LinkedIn Learning certification in Understanding Digital Accessibility, showcasing knowledge of accessibility principles and best practices for inclusive digital experiences. ",
            image: "/images/certifications/accessibility-full.webp"
        },
        {
            title: "Accessibility First Design",
            text: "LinkedIn Learning certification in Accessibility First Design, demonstrating expertise in designing and developing accessible digital products and services.",
            image: "/images/certifications/accessibility-first.webp"
        },
        {
            title: "Accessibility and AI",
            text: "LinkedIn Learning certification in Accessibility and AI, bridging the disability divide with artificial intelligence to create inclusive digital experiences for all users.",
            image: "/images/certifications/accessibility-ai.webp"
        },
        {
            title: "React Server side rendering",
            text: "LinkedIn Learning certification in React Server side rendering, showcasing proficiency in implementing server-side rendering techniques for React applications.",
            image: "/images/certifications/react-ssr.webp"
        },
        {
            title: "GraphQL Essential Training",
            text: "LinkedIn Learning certification in GraphQL Essential Training, showcasing proficiency in implementing GraphQL APIs for modern web applications.",
            image: "/images/certifications/graph-ql.webp"
        },

        {
            title: "Commit to commitment",
            text: "Exilant certification in Commit to commitment, showcasing proficiency in setting and achieving personal and professional goals.",
            image: "/images/certifications/commit-to-committment.webp"
        }


    ];
    const achievements = [
        {
            title: "Wipro & US Bank Excellence Award",
            text: "Received the Wipro & US Bank Excellence Award for outstanding performance in frontend development.",
            image: "/images/achievements/wipro.webp"
        },
        {
            title: "Accenture Celebrating Excellence Award",
            text: "Honored with the Accenture Celebrating Excellence Award for exceptional contributions to frontend development projects and client satisfaction.",
            image: "/images/achievements/accenture.webp"
        },
        {
            title: "Spot Award Infosys",
            text: "Awarded the Spot Award for introducing innovative solutions and improving frontend development processes at Infosys.",
            image: "/images/achievements/infy.webp"
        },
    ];
    const workSnapshots = [
        {
            title: "GreenKart",
            text: "GreenKart project is about the e-commerce platform for sustainable products, showcasing expertise in building scalable and user-friendly web applications using Next.js and modern frontend technologies. It focused on server-side rendering, performance optimization, and seamless user experience to drive online sales and customer engagement.",
            image: SCREENSHOT_URL + "https://next-shopping-app-8ezc.vercel.app/",
            weburl: "https://next-shopping-app-8ezc.vercel.app/"
        },
        {
            title: "EngageIQ",
            text: "EngageIQ project is about the customer engagement platform, showcasing expertise in building scalable and user-friendly web applications using React.js and modern frontend technologies. It focused on real-time communication, personalized experiences, and seamless integration with existing systems to enhance customer satisfaction and retention.",
            image: SCREENSHOT_URL + "https://engageiq-dashboard.vercel.app/",
            weburl: "https://engageiq-dashboard.vercel.app/"
        },
        {
            title: "Wiki Search Engine",
            text: "Global Search Engine project is about the search engine for global information, showcasing expertise in building scalable and user-friendly web applications using React.js and modern frontend technologies. It is based on Wikipedia API and focused on performance optimization, and seamless user experience to drive online search and information retrieval. Speech Synthesis and Speech Recognition features are also implemented to enhance the user experience.",
            image: SCREENSHOT_URL + "https://satya-global-search-engine.vercel.app/",
            weburl: "https://satya-global-search-engine.vercel.app/"
        },
        {
            title: "Omm Kala kruiti",
            text: "Omm Kala kruiti project is about the cultural platform for promoting traditional arts and crafts, showcasing expertise in building scalable and user-friendly web applications using React.js and modern frontend technologies. It focused on community engagement, content management, and seamless user experience to drive cultural awareness and appreciation.",
            image: SCREENSHOT_URL + "https://ommkalakruti.in/",
            weburl: "https://ommkalakruti.in/"
        },
        {
            title: "Nursery Management System",
            text: "Nursery Management System project is about the web application for managing nursery operations, showcasing expertise in building scalable and user-friendly web applications using React.js and modern frontend technologies. It focused on inventory management, order processing, and seamless user experience to drive operational efficiency and customer satisfaction.",
            image: SCREENSHOT_URL + "https://nurseryapp.surge.sh/",
            weburl: "https://nurseryapp.surge.sh/"
        },
        {
            title: "Foundation Group",
            text: "Foundation Group pvt.Ltd. is about the corporate website for a leading IT services company, showcasing expertise in building scalable and user-friendly web applications using React.js and modern frontend technologies. It focused on performance optimization, and seamless user experience to drive online presence and client engagement.",
            image: "/images/worksnaps/foundation.png",
            weburl: "https://foundationgroup.in/"
        }
    ]
    const tabs = [
        {
            id: "about",
            label: "About Me",
            icon: "👤",
            content: (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {descriptions.map((desc, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                            }}
                            viewport={{ once: true }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.2 },
                            }}
                            className="group relative overflow-hidden rounded-2xl bg-white p-3 shadow-md hover:shadow-2xl border border-gray-100"
                        >
                            {/* Top Gradient Line */}
                            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                            {/* Icon */}
                            <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                                {desc.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                {desc.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">
                                {desc.text}
                            </p>

                            {/* Decorative Blur */}
                            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity" />
                        </motion.div>
                    ))}
                </section>
            )
        },
        {
            id: "work",
            label: "Work Snapshots",
            icon: "💼",
            content: <><h4 className="text-center fw-bold text-success mb-5" >Snapshots of projects, case studies, and portfolio highlights.</h4>
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                    {workSnapshots.map((work, index) => (
                        <motion.section
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all flex flex-col h-full"
                        >
                            <h4 className="text-xl font-semibold text-center text-indigo-700 mb-4">
                                {work.title}
                            </h4>

                            {work.image ? (
                                <Image
                                    src={work.image}
                                    alt={work.title}
                                    width={700}
                                    height={400}
                                    className="w-full h-52 md:h-64 object-cover rounded-lg border-2 border-indigo-600"
                                    priority
                                />
                            ) : (
                                <div className="h-52 md:h-64 flex items-center justify-center border rounded-lg">
                                    Waiting...
                                </div>
                            )}

                            <div className="mt-4 flex-grow text-gray-700 leading-relaxed text-sm md:text-base">
                                {work.text}
                            </div>

                            <div className="mt-4 text-center">
                                <a
                                    href={work.weburl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    View Project
                                    <FaExternalLinkSquareAlt />
                                </a>
                            </div>
                        </motion.section>
                    ))}</section>
            </>
        },
        {
            id: "certifications",
            label: "Certifications",
            icon: "📜",
            content: <><h4 className="text-center fw-bold text-success mb-5" >List of professional certifications and credentials earned.</h4>
                <section className="flex flex-col items-center space-y-6 md:space-y-10 mt-8 md:mt-16"> {certifications.map((cert, index) => (
                    <motion.section
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="max-w-xl w-full bg-white rounded-2xl  p-2 hover:shadow-xl hover:scale-[1.02] transition-transform items-center"
                    >
                        <h3 className="text-lg font-semibold text-indigo-600">{cert.title}</h3>
                        <div className="mt-2 text-gray-700 leading-relaxed">{cert.text}</div>
                        <Image src={cert.image} alt={cert.title} width={700} height={700} className="mt-4 border-2 border-indigo-600 rounded-lg w-full h-auto" priority />
                    </motion.section>
                ))}

                </section></>
        },

        {
            id: "Achievements",
            label: "Achievements",
            icon: "🏆",
            content: <><h4 className="text-center fw-bold text-success mb-5" >List of professional achievements and recognitions.</h4>
                <section className="flex flex-col items-center space-y-6 md:space-y-10 mt-8 md:mt-16">{achievements.map((achievement, index) => (
                    <motion.section
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="max-w-xl w-full bg-white rounded-2xl  p-2 hover:shadow-xl hover:scale-[1.02] transition-transform items-center"
                    >
                        <h3 className="text-lg font-semibold text-indigo-600">{achievement.title}</h3>
                        <div className="mt-2 text-gray-700 leading-relaxed">{achievement.text}</div>
                        <Image src={achievement.image} alt={achievement.title} width={700} height={700} className="mt-4 border-2 border-indigo-600" priority />
                    </motion.section>
                ))}

                </section></>
        },


    ];
    return (
        <>
            <section className="flex flex-col items-center">
                {/* Banner */}
                <div className="relative w-full h-32 md:h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    {/* Profile Image */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2">
                        <Image
                            src="/images/profile.png"
                            alt="Profile"
                            width={128}
                            height={128}
                            priority
                            className="rounded-full border-4 border-white shadow-lg"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className=" text-center" style={{ marginTop: 60, marginBottom: 40 }}>
                    <h1 className="text-2xl md:text-4xl font-bold">Satyapriya Barik</h1>
                    <div className="text-sm md:text-lg text-gray-600">Frontend Developer | Open Source Enthusiast</div>
                </div>
            </section>


            <section className="flex flex-col md:flex-row mt-12 max-w-7xl mx-auto bg-gray-100 rounded-xl shadow-lg overflow-hidden">                {/* Left Tabs */}
                <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 w-full text-left px-3 md:px-4 py-3 text-sm md:text-base font-medium transition-colors ${activeTab === tab.id
                                ? "bg-indigo-100 text-indigo-700"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <span className="text-xl">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Right Content */}
                <div className="w-full md:w-3/4 p-4 md:p-6">
                    {tabs.map(
                        (tab) =>
                            activeTab === tab.id && (
                                <motion.section
                                    key={tab.id}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="rounded-xl shadow-lg p-2"
                                >

                                    <div className="text-gray-700 leading-relaxed">{tab.content}</div>
                                </motion.section>
                            )
                    )}
                </div>
            </section>
        </>
    );
};
export default PortfolioPage;