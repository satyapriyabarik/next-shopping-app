"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { SCREENSHOT_URL } from "@/constants/apiList";
import { FaExternalLinkSquareAlt } from "react-icons/fa";




const PortfolioPage = () => {
    const [activeTab, setActiveTab] = useState("work");

    const descriptions = [
        {
            title: "Role",
            text: "Senior Staff Engineer at Nagarro specializing in frontend development with React.js, building scalable, high-performance, and user-centric web applications."
        },
        {
            title: "Expertise",
            text: "Extensive experience in modern JavaScript (ES6+), React Hooks, Context API, Redux, and component-based architecture to develop maintainable and reusable UI solutions."
        },
        {
            title: "Skills",
            text: "Proficient in developing responsive interfaces, optimizing frontend performance, and integrating RESTful APIs to deliver seamless user experiences."
        },
        {
            title: "Practices",
            text: "Experienced in implementing best practices in state management, code modularization, performance optimization, and UI scalability within agile development environments."
        },
        {
            title: "Collaboration",
            text: "Strong collaborator with the ability to work effectively across cross-functional teams to deliver high-quality frontend solutions."
        },
        {
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
            content: <>{descriptions.map((desc, index) => (
                <section className="flex flex-col items-center space-y-10 mt-24" key={index}>

                    <motion.section

                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="max-w-xl w-full bg-white rounded-2xl  p-2 hover:shadow-xl hover:scale-[1.02] transition-transform items-center"
                    >
                        <h3 className="text-lg font-semibold text-indigo-600">{desc.title}</h3>
                        <div className="mt-2 text-gray-700 leading-relaxed">{desc.text}</div>
                    </motion.section>

                </section>))}</>
        },
        {
            id: "work",
            label: "Work Snapshots",
            icon: "💼",
            content: <><h4 className="text-center fw-bold text-success mb-5" >Snapshots of projects, case studies, and portfolio highlights.</h4>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 flex-col items-center space-y-10 mt-24"> {workSnapshots.map((work, index) => (
                    <motion.section
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="max-w-xl w-full bg-white rounded-2xl  p-2 hover:shadow-xl hover:scale-[1.02] transition-transform items-center"
                    >
                        <h4 className="text-md text-blue-300 text-center">{work.title}</h4>
                        {work.image && <Image src={work.image as unknown as string} alt={work.title} width={800} height={700} className="mt-4 border-2 border-indigo-600 mb-2" priority /> || <div>Waiting....</div>}
                        <div className=" text-center"><a href={work.weburl} target="_blank" className="text-decoration-none mt-2  text-center border-indigo-600 p-2 ">View Project <FaExternalLinkSquareAlt className="inline-block mr-2" /></a></div>
                        <div className="mt-2 text-gray-700 leading-relaxed">{work.text}</div>

                    </motion.section>
                ))}</section>
            </>
        },
        {
            id: "certifications",
            label: "Certifications",
            icon: "📜",
            content: <><h4 className="text-center fw-bold text-success mb-5" >List of professional certifications and credentials earned.</h4>
                <section className="flex flex-col items-center space-y-10 mt-24"> {certifications.map((cert, index) => (
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
                        <Image src={cert.image} alt={cert.title} width={700} height={700} className="mt-4 border-2 border-indigo-600" priority />
                    </motion.section>
                ))}

                </section></>
        },

        {
            id: "Achievements",
            label: "Achievements",
            icon: "🏆",
            content: <><h4 className="text-center fw-bold text-success mb-5" >List of professional achievements and recognitions.</h4>
                <section className="flex flex-col items-center space-y-10 mt-24"> {achievements.map((achievement, index) => (
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
                <div className="relative w-full h-30 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x ">
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
                    <h1 className="text-2xl font-bold">Satyapriya Barik</h1>
                    <div className="text-gray-600">Frontend Developer | Open Source Enthusiast</div>
                </div>
            </section>


            <section className="flex mt-12 max-w-7xl mx-auto m-3b-10 bg-gray-100 rounded-xl shadow-lg overflow-hidden">
                {/* Left Tabs */}
                <div className="w-1/4 border-r border-gray-200 mt-4 mb-10">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 w-full text-left px-4 py-3 font-medium transition-colors ${activeTab === tab.id
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
                <div className="w-3/4 p-6 mt-4 mb-10">
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