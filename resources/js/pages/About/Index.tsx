import Layout from '@/components/Layouts';
import {
    Briefcase,
    Download,
    Github,
    GraduationCap,
    Instagram,
    Linkedin,
    Mail,
} from 'lucide-react';
import {
    SiAmazonwebservices,
    SiBootstrap,
    SiDocker,
    SiFirebase,
    SiGit,
    SiGo,
    SiInertia,
    SiLaravel,
    SiLivewire,
    SiMysql,
    SiNextdotjs,
    SiPostgresql,
    SiReact,
    SiSupabase,
    SiTailwindcss,
} from 'react-icons/si';

interface Experience {
    company: string;
    position: string;
    period: string;
    description: string;
}

interface Education {
    school: string;
    degree: string;
    field: string;
    period: string;
    description?: string;
}

export default function About() {
    const experiences: Experience[] = [
        {
            company: 'Freelancer',
            position: 'Full Stack Developer',
            period: '2024 - Present',
            description:
                'Worked on various projects, including web applications. Learnt new technologies and frameworks.',
        },
        {
            company: 'OKIF FT-UH',
            position: 'Chairman Of HMIF FT-UH',
            period: '2024 - 2025',
            description:
                'Planning and executing educational and social programs for students. Organizing and leading student activities.',
        },
    ];

    const education: Education[] = [
        {
            school: 'Hasanuddin University',
            degree: 'Bachelor of Computer Science',
            field: 'Computer Science',
            period: '2022 - now',
            description:
                'Focused on software engineering, data structures, and web development. Learnt about algorithms, design patterns, and database management.',
        },
        {
            school: 'SMAN 3 Bone',
            degree: 'High School Diploma',
            field: 'Science',
            period: '2019 - 2022',
        },
    ];

    const skills = [
        { name: 'Laravel', icon: <SiLaravel size={20} /> },
        { name: 'React', icon: <SiReact size={20} /> },
        { name: 'Next.js', icon: <SiNextdotjs size={20} /> },
        { name: 'Golang', icon: <SiGo size={20} /> },
        { name: 'Inertia', icon: <SiInertia size={20} /> },
        { name: 'Livewire', icon: <SiLivewire size={20} /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss size={20} /> },
        { name: 'Bootstrap', icon: <SiBootstrap size={20} /> },
        { name: 'MySQL', icon: <SiMysql size={20} /> },
        { name: 'PostgreSQL', icon: <SiPostgresql size={20} /> },
        { name: 'Supabase', icon: <SiSupabase size={20} /> },
        { name: 'Firebase', icon: <SiFirebase size={20} /> },
        { name: 'Git', icon: <SiGit size={20} /> },
        { name: 'Docker', icon: <SiDocker size={20} /> },
        { name: 'AWS', icon: <SiAmazonwebservices size={20} /> },
    ];

    return (
        <Layout>
            <div className="max-w-4xl">
                <div className="animate-fade-in mb-16">
                    <div className="mb-8 flex flex-col items-center gap-8 md:flex-row">
                        {/* Profile Photo */}
                        <div className="flex-shrink-0">
                            <img
                                src="/profil.png"
                                alt="Andi Syafiudin Musafir"
                                className="h-32 w-32 rounded-full border-4 border-gray-200 object-cover md:h-48 md:w-48"
                            />
                        </div>

                        {/* Intro */}
                        <div className="flex-1">
                            <h1 className="mb-4 text-4xl font-light md:text-5xl">
                                About Me
                            </h1>

                            <div className="space-y-6 leading-relaxed font-light text-gray-700">
                                <p className="text-xl">
                                    Hi, I'm a passionate developer who loves
                                    creating beautiful and functional web
                                    experiences.
                                </p>

                                <p>
                                    With expertise in modern web technologies, I
                                    specialize in building scalable applications
                                    that solve real-world problems. My journey
                                    in web development started several years
                                    ago, and I've been continuously learning and
                                    evolving ever since.
                                </p>
                            </div>

                            {/* Download CV Button */}
                            <div className="mt-6">
                                <a
                                    href="/cv_syafiudin.pdf"
                                    download
                                    className="inline-flex items-center space-x-2 rounded-lg bg-gray-900 px-6 py-3 font-light text-white transition hover:bg-gray-800"
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Download CV</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Currently Learning Section */}
                    <div className="w-fit rounded-lg border border-gray-300 bg-gray-50 p-6">
                        <h3 className="mb-3 flex items-center space-x-2 text-lg font-light text-gray-900">
                            <span>📚</span>
                            <span>What I'm Currently Learning</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                'Kubernetes',
                                'Serverless',
                                'Go',
                                'gRPC',
                                'Microservices',
                                'Google Cloud Platform',
                            ].map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-sm font-light text-gray-800"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Experience Section */}
                <div className="animate-fade-in-up animation-delay-200 mb-12 border-t border-gray-200 pt-12">
                    <h2 className="mb-8 flex items-center space-x-2 text-2xl font-light">
                        <Briefcase className="h-6 w-6" />
                        <span>Experience</span>
                    </h2>

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="animate-fade-in-up relative border-l-2 border-gray-200 pl-8"
                                style={{
                                    animationDelay: `${300 + index * 150}ms`,
                                }}
                            >
                                <div className="absolute top-0 -left-2 h-4 w-4 rounded-full bg-gray-900"></div>
                                <div>
                                    <div className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between">
                                        <h3 className="text-lg font-light text-gray-900">
                                            {exp.position}
                                        </h3>
                                        <span className="text-sm font-light text-gray-500">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="mb-2 font-light text-gray-600">
                                        {exp.company}
                                    </p>
                                    <p className="leading-relaxed font-light text-gray-700">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Section */}
                <div className="animate-fade-in-up animation-delay-400 mb-12 border-t border-gray-200 pt-12">
                    <h2 className="mb-8 flex items-center space-x-2 text-2xl font-light">
                        <GraduationCap className="h-6 w-6" />
                        <span>Education</span>
                    </h2>

                    <div className="space-y-8">
                        {education.map((edu, index) => (
                            <div
                                key={index}
                                className="animate-fade-in-up relative border-l-2 border-gray-200 pl-8"
                                style={{
                                    animationDelay: `${500 + index * 150}ms`,
                                }}
                            >
                                <div className="absolute top-0 -left-2 h-4 w-4 rounded-full bg-gray-900"></div>
                                <div>
                                    <div className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between">
                                        <h3 className="text-lg font-light text-gray-900">
                                            {edu.degree} in {edu.field}
                                        </h3>
                                        <span className="text-sm font-light text-gray-500">
                                            {edu.period}
                                        </span>
                                    </div>
                                    <p className="mb-2 font-light text-gray-600">
                                        {edu.school}
                                    </p>
                                    {edu.description && (
                                        <p className="leading-relaxed font-light text-gray-700">
                                            {edu.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Section - Updated with Logos */}
                <div className="animate-fade-in-up animation-delay-600 border-t border-gray-200 pt-12">
                    <h2 className="mb-6 text-2xl font-light">Skills</h2>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {skills.map((skill, index) => (
                            <div
                                key={skill.name}
                                className="animate-fade-in-up flex items-center justify-center space-x-3 border border-gray-200 px-4 py-3 text-center font-light"
                                style={{
                                    animationDelay: `${700 + index * 30}ms`,
                                }}
                            >
                                {skill.icon}
                                <span>{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="animate-fade-in-up animation-delay-800 mt-12 border-t border-gray-200 pt-12">
                    <h2 className="mb-6 text-2xl font-light">Get in Touch</h2>

                    <div className="flex flex-wrap gap-6">
                        <a
                            href="mailto:altafpasallo12@gmail.com"
                            className="flex items-center space-x-2 font-light text-gray-600 transition hover:text-gray-900"
                        >
                            <Mail className="h-5 w-5" />
                            <span>altafpasallo12@gmail.com</span>
                        </a>
                        <a
                            href="https://github.com/syaafiudinm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 font-light text-gray-600 transition hover:text-gray-900"
                        >
                            <Github className="h-5 w-5" />
                            <span>GitHub</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/andi-syafiudin-musafir-a3b85a287/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 font-light text-gray-600 transition hover:text-gray-900"
                        >
                            <Linkedin className="h-5 w-5" />
                            <span>LinkedIn</span>
                        </a>
                        <a
                            href="https://instagram.com/syaafiudinm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 font-light text-gray-600 transition hover:text-gray-900"
                        >
                            <Instagram className="h-5 w-5" />
                            <span>Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
