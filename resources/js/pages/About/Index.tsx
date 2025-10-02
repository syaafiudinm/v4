import Layout from '@/components/Layouts';
import {
    Briefcase,
    Github,
    GraduationCap,
    Instagram,
    Linkedin,
    Mail,
} from 'lucide-react';

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
    return (
        <Layout>
            <div className="max-w-4xl">
                <div className="mb-16">
                    <h1 className="mb-8 text-4xl font-light md:text-5xl">
                        About Me
                    </h1>

                    <div className="space-y-6 leading-relaxed font-light text-gray-700">
                        <p className="text-xl">
                            Hi, I'm a passionate developer who loves creating
                            beautiful and functional web experiences.
                        </p>

                        <p>
                            With expertise in modern web technologies, I
                            specialize in building scalable applications that
                            solve real-world problems. My journey in web
                            development started several years ago, and I've been
                            continuously learning and evolving ever since.
                        </p>

                        <p>
                            I enjoy working with technologies like Laravel,
                            React, NextJS, and Tailwind CSS. When I'm not
                            coding, you can find me exploring new technologies,
                            contributing to open source, or sharing my knowledge
                            through blog posts.
                        </p>
                    </div>
                </div>

                {/* Experience Section */}
                <div className="mb-12 border-t border-gray-200 pt-12">
                    <h2 className="mb-8 flex items-center space-x-2 text-2xl font-light">
                        <Briefcase className="h-6 w-6" />
                        <span>Experience</span>
                    </h2>

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="relative border-l-2 border-gray-200 pl-8"
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
                <div className="mb-12 border-t border-gray-200 pt-12">
                    <h2 className="mb-8 flex items-center space-x-2 text-2xl font-light">
                        <GraduationCap className="h-6 w-6" />
                        <span>Education</span>
                    </h2>

                    <div className="space-y-8">
                        {education.map((edu, index) => (
                            <div
                                key={index}
                                className="relative border-l-2 border-gray-200 pl-8"
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

                <div className="border-t border-gray-200 pt-12">
                    <h2 className="mb-6 text-2xl font-light">Skills</h2>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {[
                            'Laravel',
                            'React',
                            'NextJS',
                            'Golang',
                            'Inertia',
                            'Tailwind',
                            'Bootstrap',
                            'MySQL',
                            'PostgreSQL',
                            'Supabase',
                            'Firebase',
                            'Git',
                            'Docker',
                        ].map((skill) => (
                            <div
                                key={skill}
                                className="border border-gray-200 px-4 py-3 text-center font-light"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-12">
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
