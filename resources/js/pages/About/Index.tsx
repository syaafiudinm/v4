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
import { useEffect, useRef, useState } from 'react';

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
    color: string;
    skills: { name: string; icon: React.ReactNode }[];
}

function useSectionVisible(rootMargin = '50px') {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold: 0.1 },
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [rootMargin]);

    return { ref, isVisible };
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
        position: 'Software Engineer',
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
        color: '#FFEE00',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/syaafiudinm',
        icon: <Github className="h-4 w-4" />,
        external: true,
        color: '#A8FF78',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/andi-syafiudin-musafir-a3b85a287/',
        icon: <Linkedin className="h-4 w-4" />,
        external: true,
        color: '#A8FF78',
    },
    {
        label: 'Instagram',
        href: 'https://instagram.com/syaafiudinm',
        icon: <Instagram className="h-4 w-4" />,
        external: true,
        color: '#FF4F4F',
    },
];

export default function About() {
    const expSection = useSectionVisible();
    const eduSection = useSectionVisible();
    const skillsSection = useSectionVisible();
    const contactSection = useSectionVisible();

    const skillCategories: SkillCategory[] = [
        {
            label: 'Frontend',
            icon: <Code className="h-4 w-4" />,
            color: '#FFEE00',
            skills: [
                { name: 'React', icon: <SiReact size={16} /> },
                { name: 'Next.js', icon: <SiNextdotjs size={16} /> },
                { name: 'Inertia', icon: <SiInertia size={16} /> },
                { name: 'Livewire', icon: <SiLivewire size={16} /> },
                { name: 'Tailwind CSS', icon: <SiTailwindcss size={16} /> },
                { name: 'Bootstrap', icon: <SiBootstrap size={16} /> },
            ],
        },
        {
            label: 'Backend',
            icon: <Server className="h-4 w-4" />,
            color: '#A8FF78',
            skills: [
                { name: 'PHP', icon: <SiPhp size={16} /> },
                { name: 'Laravel', icon: <SiLaravel size={16} /> },
                { name: 'CodeIgniter', icon: <SiCodeigniter size={16} /> },
                { name: 'Golang', icon: <SiGo size={16} /> },
                { name: 'Gin', icon: <SiGin size={16} /> },
            ],
        },
        {
            label: 'Database & Cloud',
            icon: <Database className="h-4 w-4" />,
            color: '#FFEE00',
            skills: [
                { name: 'MySQL', icon: <SiMysql size={16} /> },
                { name: 'PostgreSQL', icon: <SiPostgresql size={16} /> },
                { name: 'Supabase', icon: <SiSupabase size={16} /> },
                { name: 'Firebase', icon: <SiFirebase size={16} /> },
                { name: 'AWS', icon: <SiAmazonwebservices size={16} /> },
            ],
        },
        {
            label: 'DevOps & Tools',
            icon: <Server className="h-4 w-4" />,
            color: '#A8FF78',
            skills: [
                { name: 'Git', icon: <SiGit size={16} /> },
                { name: 'Docker', icon: <SiDocker size={16} /> },
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

                {/* ── Hero / Intro ── */}
                <section className="animate-fade-in py-16 md:py-28">
                    {/* Status badge */}
                    <div className="mb-6 inline-flex items-center gap-0 border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A]">
                        <div className="bg-[#FFEE00] px-3 py-1 text-[10px] font-bold tracking-widest text-[#1A1A1A] uppercase">
                            Software Engineer
                        </div>
                        <div className="bg-[#1A1A1A] px-3 py-1 text-[10px] font-bold tracking-widest text-[#FFEE00] uppercase">
                            CS Student · Open Source
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-8 md:flex-row md:items-start">
                        {/* Profile Photo — neobrutalism frame */}
                        <div className="relative flex-shrink-0">
                            <div className="border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] dark:shadow-[4px_4px_0px_#E5E7EB] dark:border-[#E5E7EB]">
                                <img
                                    src="/profil.png"
                                    alt="Andi Syafiudin Musafir"
                                    className="h-28 w-28 object-cover md:h-36 md:w-36 block"
                                />
                            </div>
                            {/* Available dot */}
                            <span
                                className="absolute -right-2 -bottom-2 flex h-5 w-5 items-center justify-center border-2 border-[#1A1A1A] bg-[#A8FF78]"
                                title="Available for work"
                            >
                                <span className="h-2 w-2 rounded-full bg-[#1A1A1A]" />
                            </span>
                        </div>

                        {/* Intro Text */}
                        <div className="flex-1">
                            <h1 className="mb-4 text-4xl font-bold tracking-tight leading-tight md:text-5xl dark:text-white">
                                About Me
                            </h1>

                            <p
                                className="mb-6 max-w-xl border-l-4 border-[#FFEE00] pl-4 text-lg leading-relaxed text-[#555] dark:text-[#999]"
                                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                            >
                                A passionate engineer who loves creating beautiful
                                and functional web experiences. I specialize in
                                building scalable applications that solve
                                real-world problems.
                            </p>

                            <p
                                className="mb-6 max-w-xl text-sm leading-relaxed text-[#666] dark:text-[#888]"
                                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                            >
                                My journey in web development started several years ago,
                                and I've been continuously learning and evolving ever since.
                            </p>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center gap-4">
                                <a
                                    href="/cv_syafiudin-1.pdf"
                                    download
                                    className="nb-btn nb-btn-black px-5 py-2.5 text-sm"
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Download CV</span>
                                </a>
                                <a
                                    href="mailto:altafpasallo12@gmail.com"
                                    className="nb-btn nb-btn-yellow px-5 py-2.5 text-sm"
                                >
                                    <Mail className="h-4 w-4" />
                                    <span>Get in touch</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Currently Learning */}
                    <div className="mt-10 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] bg-[#FAFAF8] dark:bg-[#222222] dark:border-[#E5E7EB] dark:shadow-[4px_4px_0px_#E5E7EB]">
                        <div className="flex items-center gap-0 border-b-2 border-[#1A1A1A] dark:border-[#E5E7EB]">
                            <div className="bg-[#FFEE00] px-3 py-2 text-[10px] font-bold tracking-widest text-[#1A1A1A] uppercase border-r-2 border-[#1A1A1A] dark:border-[#E5E7EB]">
                                📚
                            </div>
                            <span className="px-3 py-2 text-xs font-bold tracking-widest text-[#1A1A1A] uppercase dark:text-white">
                                Currently Learning
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 p-4">
                            {currentlyLearning.map((tech) => (
                                <span
                                    key={tech}
                                    className="nb-tag"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Experience ── */}
                <section
                    ref={expSection.ref as React.RefObject<HTMLElement>}
                    className="border-t-2 border-[#1A1A1A] py-16 dark:border-[#E5E7EB]"
                    style={{
                        opacity: expSection.isVisible ? 1 : 0,
                        transform: expSection.isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                    }}
                >
                    <div className="mb-10">
                        <h2 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight dark:text-white">
                            <Briefcase className="h-5 w-5" />
                            Experience
                        </h2>
                        <div className="mt-1 h-1 w-10 border border-[#1A1A1A] bg-[#FFEE00]" />
                    </div>

                    <div className="space-y-4">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="nb-card p-0 overflow-hidden"
                            >
                                {/* Colored top accent */}
                                <div
                                    className="h-1 w-full"
                                    style={{ backgroundColor: index % 2 === 0 ? '#FFEE00' : '#A8FF78' }}
                                />
                                <div className="p-5">
                                    <div className="mb-2 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                                        <h3 className="text-base font-bold text-[#1A1A1A] dark:text-white">
                                            {exp.position}
                                        </h3>
                                        <span
                                            className="inline-flex items-center border border-[#1A1A1A] px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-[#FAFAF8] dark:bg-[#2a2a2a] dark:border-[#E5E7EB] dark:text-white"
                                        >
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="mb-2 text-xs font-bold tracking-wide text-[#555] uppercase dark:text-[#999]">
                                        {exp.company}
                                    </p>
                                    <p
                                        className="text-sm leading-relaxed text-[#666] dark:text-[#aaa]"
                                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                                    >
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Education ── */}
                <section
                    ref={eduSection.ref as React.RefObject<HTMLElement>}
                    className="border-t-2 border-[#1A1A1A] py-16 dark:border-[#E5E7EB]"
                    style={{
                        opacity: eduSection.isVisible ? 1 : 0,
                        transform: eduSection.isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                    }}
                >
                    <div className="mb-10">
                        <h2 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight dark:text-white">
                            <GraduationCap className="h-5 w-5" />
                            Education
                        </h2>
                        <div className="mt-1 h-1 w-10 border border-[#1A1A1A] bg-[#A8FF78]" />
                    </div>

                    <div className="space-y-4">
                        {education.map((edu, index) => (
                            <div
                                key={index}
                                className="nb-card p-0 overflow-hidden"
                            >
                                <div
                                    className="h-1 w-full"
                                    style={{ backgroundColor: index % 2 === 0 ? '#A8FF78' : '#FFEE00' }}
                                />
                                <div className="p-5">
                                    <div className="mb-2 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                                        <h3 className="text-base font-bold text-[#1A1A1A] dark:text-white">
                                            {edu.degree} — {edu.field}
                                        </h3>
                                        <span className="inline-flex items-center border border-[#1A1A1A] px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-[#FAFAF8] dark:bg-[#2a2a2a] dark:border-[#E5E7EB] dark:text-white">
                                            {edu.period}
                                        </span>
                                    </div>
                                    <p className="mb-2 text-xs font-bold tracking-wide text-[#555] uppercase dark:text-[#999]">
                                        {edu.school}
                                    </p>
                                    {edu.description && (
                                        <p
                                            className="text-sm leading-relaxed text-[#666] dark:text-[#aaa]"
                                            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                                        >
                                            {edu.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Skills ── */}
                <section
                    ref={skillsSection.ref as React.RefObject<HTMLElement>}
                    className="border-t-2 border-[#1A1A1A] py-16 dark:border-[#E5E7EB]"
                    style={{
                        opacity: skillsSection.isVisible ? 1 : 0,
                        transform: skillsSection.isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                    }}
                >
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold tracking-tight dark:text-white">
                            Skills
                        </h2>
                        <div className="mt-1 h-1 w-10 border border-[#1A1A1A] bg-[#FFEE00]" />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {skillCategories.map((category) => (
                            <div
                                key={category.label}
                                className="nb-card p-0 overflow-hidden"
                            >
                                {/* Category header */}
                                <div
                                    className="flex items-center gap-2 border-b-2 border-[#1A1A1A] px-4 py-2.5 dark:border-[#E5E7EB]"
                                    style={{ backgroundColor: category.color }}
                                >
                                    <span className="text-[#1A1A1A]">{category.icon}</span>
                                    <h3 className="text-xs font-bold tracking-widest text-[#1A1A1A] uppercase">
                                        {category.label}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-2 p-4">
                                    {category.skills.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className="inline-flex items-center gap-1.5 border border-[#1A1A1A] bg-[#FAFAF8] px-2.5 py-1 text-xs font-medium text-[#1A1A1A] transition hover:bg-[#1A1A1A] hover:text-white dark:bg-[#2a2a2a] dark:border-[#E5E7EB] dark:text-white dark:hover:bg-[#E5E7EB] dark:hover:text-[#1A1A1A]"
                                        >
                                            <span>{skill.icon}</span>
                                            <span>{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Contact ── */}
                <section
                    ref={contactSection.ref as React.RefObject<HTMLElement>}
                    className="border-t-2 border-[#1A1A1A] py-16 dark:border-[#E5E7EB]"
                    style={{
                        opacity: contactSection.isVisible ? 1 : 0,
                        transform: contactSection.isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                    }}
                >
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold tracking-tight dark:text-white">
                            Get in Touch
                        </h2>
                        <div className="mt-1 h-1 w-10 border border-[#1A1A1A] bg-[#A8FF78]" />
                    </div>

                    <p
                        className="mb-8 max-w-md text-sm leading-relaxed text-[#666] dark:text-[#999]"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                        I'm always open to new opportunities and collaborations.
                        Feel free to reach out!
                    </p>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target={social.external ? '_blank' : undefined}
                                rel={social.external ? 'noopener noreferrer' : undefined}
                                className="group nb-card flex items-center gap-3 p-4 no-underline"
                            >
                                <span
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-2 border-[#1A1A1A] dark:border-[#E5E7EB]"
                                    style={{ backgroundColor: social.color }}
                                >
                                    <span className="text-[#1A1A1A]">{social.icon}</span>
                                </span>
                                <span className="text-sm font-semibold text-[#1A1A1A] dark:text-white">
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