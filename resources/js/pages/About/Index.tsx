import Layout from '@/components/Layouts';
import SeoHead from '@/components/SeoHead';
import {
    Briefcase,
    Code,
    Database,
    Download,
    Github,
    GraduationCap,
    Instagram,
    Linkedin,
    Mail,
    Server,
} from 'lucide-react';
import {
    SiAmazonwebservices,
    SiBootstrap,
    SiCodeigniter,
    SiDocker,
    SiFirebase,
    SiGin,
    SiGit,
    SiGo,
    SiInertia,
    SiLaravel,
    SiLivewire,
    SiMysql,
    SiNextdotjs,
    SiPhp,
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

interface SkillCategory {
    label: string;
    icon: React.ReactNode;
    skills: { name: string; icon: React.ReactNode }[];
}

const experiences: Experience[] = [
    {
        company: 'PT. Digital Desa Indonesia',
        position: 'Backend Engineer Intern',
        period: '2025 - Present',
        description: 'Develop and troubleshoot internal business issues.',
    },
    {
        company: 'Freelancer',
        position: 'Software engineer',
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

const currentlyLearning = [
    'Kubernetes',
    'Serverless',
    'Go',
    'gRPC',
    'Microservices',
    'Google Cloud Platform',
];

const socials = [
    {
        label: 'altafpasallo12@gmail.com',
        href: 'mailto:altafpasallo12@gmail.com',
        icon: <Mail className="h-4 w-4" />,
        external: false,
    },
    {
        label: 'GitHub',
        href: 'https://github.com/syaafiudinm',
        icon: <Github className="h-4 w-4" />,
        external: true,
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/andi-syafiudin-musafir-a3b85a287/',
        icon: <Linkedin className="h-4 w-4" />,
        external: true,
    },
    {
        label: 'Instagram',
        href: 'https://instagram.com/syaafiudinm',
        icon: <Instagram className="h-4 w-4" />,
        external: true,
    },
];

export default function About() {
    const skillCategories: SkillCategory[] = [
        {
            label: 'Frontend',
            icon: <Code className="h-4 w-4" />,
            skills: [
                { name: 'React', icon: <SiReact size={18} /> },
                { name: 'Next.js', icon: <SiNextdotjs size={18} /> },
                { name: 'Inertia', icon: <SiInertia size={18} /> },
                { name: 'Livewire', icon: <SiLivewire size={18} /> },
                { name: 'Tailwind CSS', icon: <SiTailwindcss size={18} /> },
                { name: 'Bootstrap', icon: <SiBootstrap size={18} /> },
            ],
        },
        {
            label: 'Backend',
            icon: <Server className="h-4 w-4" />,
            skills: [
                { name: 'Php', icon: <SiPhp size={18} /> },
                { name: 'Laravel', icon: <SiLaravel size={18} /> },
                { name: 'CodeIgniter', icon: <SiCodeigniter size={18} /> },
                { name: 'Golang', icon: <SiGo size={18} /> },
                { name: 'Gin', icon: <SiGin size={18} /> },
            ],
        },
        {
            label: 'Database & Cloud',
            icon: <Database className="h-4 w-4" />,
            skills: [
                { name: 'MySQL', icon: <SiMysql size={18} /> },
                { name: 'PostgreSQL', icon: <SiPostgresql size={18} /> },
                { name: 'Supabase', icon: <SiSupabase size={18} /> },
                { name: 'Firebase', icon: <SiFirebase size={18} /> },
                { name: 'AWS', icon: <SiAmazonwebservices size={18} /> },
            ],
        },
        {
            label: 'DevOps & Tools',
            icon: <Server className="h-4 w-4" />,
            skills: [
                { name: 'Git', icon: <SiGit size={18} /> },
                { name: 'Docker', icon: <SiDocker size={18} /> },
            ],
        },
    ];

    return (
        <Layout>
            <SeoHead
                title="About"
                description="Learn more about Andi Syafiudin Musafir — a passionate engineer specializing in Laravel, React, and modern web technologies. Currently studying Computer Science at Hasanuddin University."
                keywords="andi syafiudin musafir, about, web engineer, software engineer, laravel, react, hasanuddin university, computer science"
                url="/about"
                type="profile"
                image="/profil.png"
            />

            <div className="max-w-4xl">
                {/* Hero / Intro */}
                <div className="animate-fade-in mb-14">
                    <div className="mb-10 flex flex-col items-start gap-8 md:flex-row md:items-center">
                        {/* Profile Photo */}
                        <div className="relative flex-shrink-0">
                            <img
                                src="/profil.png"
                                alt="Andi Syafiudin Musafir"
                                className="h-28 w-28 rounded-full border-2 border-gray-100 object-cover md:h-40 md:w-40 dark:border-gray-700"
                            />
                            <span
                                className="absolute right-1 bottom-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 md:right-2 md:bottom-2 dark:border-gray-900"
                                title="Available for work"
                            />
                        </div>

                        {/* Intro Text */}
                        <div className="flex-1">
                            <h1 className="mb-2 text-3xl font-light tracking-tight md:text-4xl dark:text-gray-100">
                                About Me
                            </h1>
                            <p className="mb-4 text-sm font-light text-gray-400 dark:text-gray-500">
                                Software Engineer · CS Student · Open Source
                                Enthusiast
                            </p>

                            <div className="space-y-4 text-sm leading-relaxed font-light text-gray-600 dark:text-gray-300">
                                <p>
                                    Hi, I'm a passionate engineer who loves
                                    creating beautiful and functional web
                                    experiences. With expertise in modern web
                                    technologies, I specialize in building
                                    scalable applications that solve real-world
                                    problems.
                                </p>
                                <p>
                                    My journey in web development started
                                    several years ago, and I've been
                                    continuously learning and evolving ever
                                    since.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <a
                                    href="/cv_syafiudin-1.pdf"
                                    download
                                    className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-light text-white transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Download CV</span>
                                </a>
                                <a
                                    href="mailto:altafpasallo12@gmail.com"
                                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-light text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-100"
                                >
                                    <Mail className="h-4 w-4" />
                                    <span>Get in touch</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Currently Learning */}
                    <div className="rounded-2xl border border-gray-300 bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-gray-800/30">
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-normal text-gray-900 dark:text-gray-100">
                            <span>📚</span>
                            <span>Currently Learning</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {currentlyLearning.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-light text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Experience */}
                <section className="animate-fade-in-up animation-delay-200 mb-14 border-t border-gray-300 pt-10 dark:border-gray-800">
                    <h2 className="mb-8 flex items-center gap-2.5 text-xl font-light dark:text-gray-100">
                        <Briefcase className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <span>Experience</span>
                    </h2>

                    <div className="space-y-1">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="animate-fade-in-up relative pl-8"
                                style={{
                                    animationDelay: `${300 + index * 120}ms`,
                                }}
                            >
                                {/* Timeline */}
                                <div className="absolute top-0 left-0 flex h-full flex-col items-center">
                                    <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full border-2 border-gray-900 bg-white dark:border-gray-100 dark:bg-gray-900" />
                                    {index < experiences.length - 1 && (
                                        <div className="mt-1 w-px flex-1 bg-gray-200 dark:bg-gray-700" />
                                    )}
                                </div>

                                <div className="rounded-2xl border border-gray-300 bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-gray-800/30">
                                    <div className="mb-1.5 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                                        <h3 className="text-sm font-normal text-gray-900 dark:text-gray-100">
                                            {exp.position}
                                        </h3>
                                        <span className="text-xs font-light text-gray-400 dark:text-gray-500">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="mb-2 text-xs font-light text-gray-500 dark:text-gray-400">
                                        {exp.company}
                                    </p>
                                    <p className="text-sm leading-relaxed font-light text-gray-600 dark:text-gray-300">
                                        {exp.description}
                                    </p>
                                </div>

                                {/* Spacer between cards */}
                                {index < experiences.length - 1 && (
                                    <div className="h-1" />
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section className="animate-fade-in-up animation-delay-400 mb-14 border-t border-gray-300 pt-10 dark:border-gray-800">
                    <h2 className="mb-8 flex items-center gap-2.5 text-xl font-light dark:text-gray-100">
                        <GraduationCap className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <span>Education</span>
                    </h2>

                    <div className="space-y-1">
                        {education.map((edu, index) => (
                            <div
                                key={index}
                                className="animate-fade-in-up relative pl-8"
                                style={{
                                    animationDelay: `${500 + index * 120}ms`,
                                }}
                            >
                                {/* Timeline */}
                                <div className="absolute top-0 left-0 flex h-full flex-col items-center">
                                    <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full border-2 border-gray-400 bg-white dark:border-gray-500 dark:bg-gray-900" />
                                    {index < education.length - 1 && (
                                        <div className="mt-1 w-px flex-1 bg-gray-200 dark:bg-gray-700" />
                                    )}
                                </div>

                                <div className="rounded-2xl border border-gray-300 bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-gray-800/30">
                                    <div className="mb-1.5 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                                        <h3 className="text-sm font-normal text-gray-900 dark:text-gray-100">
                                            {edu.degree} in {edu.field}
                                        </h3>
                                        <span className="text-xs font-light text-gray-400 dark:text-gray-500">
                                            {edu.period}
                                        </span>
                                    </div>
                                    <p className="mb-2 text-xs font-light text-gray-500 dark:text-gray-400">
                                        {edu.school}
                                    </p>
                                    {edu.description && (
                                        <p className="text-sm leading-relaxed font-light text-gray-600 dark:text-gray-300">
                                            {edu.description}
                                        </p>
                                    )}
                                </div>

                                {index < education.length - 1 && (
                                    <div className="h-1" />
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills — grouped by category */}
                <section className="animate-fade-in-up animation-delay-600 mb-14 border-t border-gray-300 pt-10 dark:border-gray-800">
                    <h2 className="mb-8 text-xl font-light dark:text-gray-100">
                        Skills
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {skillCategories.map((category, catIndex) => (
                            <div
                                key={category.label}
                                className="animate-fade-in-up rounded-2xl border border-gray-300 bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-gray-800/30"
                                style={{
                                    animationDelay: `${700 + catIndex * 100}ms`,
                                }}
                            >
                                <div className="mb-4 flex items-center gap-2">
                                    <span className="text-gray-400 dark:text-gray-500">
                                        {category.icon}
                                    </span>
                                    <h3 className="text-sm font-normal text-gray-900 dark:text-gray-100">
                                        {category.label}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-light text-gray-600 transition hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            <span className="text-gray-500 dark:text-gray-400">
                                                {skill.icon}
                                            </span>
                                            <span>{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section className="animate-fade-in-up animation-delay-800 border-t border-gray-100 pt-10 pb-4 dark:border-gray-800">
                    <h2 className="mb-3 text-xl font-light dark:text-gray-100">
                        Get in Touch
                    </h2>
                    <p className="mb-6 text-sm font-light text-gray-500 dark:text-gray-400">
                        I'm always open to new opportunities and collaborations.
                        Feel free to reach out!
                    </p>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target={social.external ? '_blank' : undefined}
                                rel={
                                    social.external
                                        ? 'noopener noreferrer'
                                        : undefined
                                }
                                className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 transition-all hover:border-gray-200 dark:border-gray-800 dark:bg-gray-800/30 dark:hover:border-gray-700"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors group-hover:bg-gray-200 group-hover:text-gray-900 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-gray-600 dark:group-hover:text-gray-100">
                                    {social.icon}
                                </span>
                                <span className="text-sm font-light text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100">
                                    {social.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
