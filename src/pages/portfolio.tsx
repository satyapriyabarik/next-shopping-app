"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
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
const tabs = [
    {
        id: "about",
        label: "About Me",
        icon: "👤",
        content: <>{descriptions.map((desc, index) => (
            <div className="flex flex-col items-center space-y-10 mt-24" key={index}>

                <motion.section

                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-xl w-full bg-white rounded-2xl  p-2 hover:shadow-xl hover:scale-[1.02] transition-transform items-center"
                >
                    <h3 className="text-lg font-semibold text-indigo-600">{desc.title}</h3>
                    <p className="mt-2 text-gray-700 leading-relaxed">{desc.text}</p>
                </motion.section>

            </div>))}</>
    },
    {
        id: "achievements",
        label: "Achievements",
        icon: "🏆",
        content: "Highlights of major accomplishments, awards, and recognitions."
    },
    {
        id: "certifications",
        label: "Certifications",
        icon: "📜",
        content: "List of professional certifications and credentials earned."
    },
    {
        id: "work",
        label: "Work Snapshots",
        icon: "💼",
        content: "Snapshots of projects, case studies, and portfolio highlights."
    }
];
const PortfolioPage = () => {
    const [activeTab, setActiveTab] = useState("achievements");
    return (
        <>
            <div className="flex flex-col items-center">
                {/* Banner */}
                <div className="relative w-full h-30 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x ">
                    {/* Profile Image */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2">
                        <Image
                            src="/images/profile.png"
                            alt="Profile"
                            width={128}
                            height={128}
                            className="rounded-full border-4 border-white shadow-lg"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="mt-16 text-center" style={{ marginTop: "65px" }}>
                    <h1 className="text-2xl font-bold">Satyapriya Barik</h1>
                    <p className="text-gray-600">Frontend Developer | Open Source Enthusiast</p>
                </div>
            </div>


            <div className="flex mt-12 max-w-5xl mx-auto">
                {/* Left Tabs */}
                <div className="w-1/4 border-r border-gray-200">
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
                <div className="w-3/4 p-6">
                    {tabs.map(
                        (tab) =>
                            activeTab === tab.id && (
                                <motion.div
                                    key={tab.id}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white rounded-xl shadow-lg p-2"
                                >

                                    <p className="text-gray-700 leading-relaxed">{tab.content}</p>
                                </motion.div>
                            )
                    )}
                </div>
            </div>
        </>
    );
};
export default PortfolioPage;