import Layout from '@/components/Layouts';
import Section, { Divider, Highlight, accentLink } from '@/components/Section';
import SeoHead from '@/components/SeoHead';
import { Link } from '@inertiajs/react';
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
    description?: string;
}

interface Education {
    school: string;
    degree: string;
    field?: string;
    period: string;
    description?: string;
}

interface SkillCategory {
    label: string;
    // Brand color revealed on hover; omitted for monochrome logos (Next.js).
    // Uses a plain `.group:hover` selector instead of `group-hover:` because
    // Tailwind v4 wraps that in `@media (hover: hover)`, which touch
    // devices (and touch emulation) don't match.
    skills: { name: string; icon: React.ReactNode; color?: string }[];
}

const experiences: Experience[] = [
    {
        company: 'Galesong Group',
        position: 'Software Engineer',
        period: 'Oct 2026 - Present',
        description:
            'Build and maintain web applications and internal tools across the group. Design APIs, improve system performance, and collaborate with cross-functional teams to ship new features.',
    },
    {
        company: 'PT. Digital Desa Indonesia',
        position: 'Backend Engineer Intern',
        period: '2025 - Mar 2026',
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
        degree: 'Bachelor of Informatics Engineering',
        period: '2022 - 2026',
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

const skillCategories: SkillCategory[] = [
    {
        label: 'Frontend',
        skills: [
            { name: 'React', icon: <SiReact />, color: '#61DAFB' },
            { name: 'Next.js', icon: <SiNextdotjs /> },
            { name: 'Inertia', icon: <SiInertia />, color: '#9553E9' },
            { name: 'Livewire', icon: <SiLivewire />, color: '#FB70A9' },
            { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4' },
            { name: 'Bootstrap', icon: <SiBootstrap />, color: '#7952B3' },
        ],
    },
    {
        label: 'Backend',
        skills: [
            { name: 'PHP', icon: <SiPhp />, color: '#777BB4' },
            { name: 'Laravel', icon: <SiLaravel />, color: '#FF2D20' },
            { name: 'CodeIgniter', icon: <SiCodeigniter />, color: '#EF4223' },
            { name: 'Golang', icon: <SiGo />, color: '#00ADD8' },
            { name: 'Gin', icon: <SiGin />, color: '#008ECF' },
        ],
    },
    {
        label: 'Database & Cloud',
        skills: [
            { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
            { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
            { name: 'Supabase', icon: <SiSupabase />, color: '#3FCF8E' },
            { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
            { name: 'AWS', icon: <SiAmazonwebservices />, color: '#FF9900' },
        ],
    },
    {
        label: 'DevOps & Tools',
        skills: [
            { name: 'Git', icon: <SiGit />, color: '#F05032' },
            { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
        ],
    },
];

function TimelineItem({
    title,
    subtitle,
    period,
    description,
}: {
    title: string;
    subtitle: string;
    period: string;
    description?: string;
}) {
    return (
        <li className="flex flex-col gap-1">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-lg leading-snug font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                </h3>
                <span className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
                    {period}
                </span>
            </div>
            <p className="text-base text-gray-500 dark:text-gray-400">
                {subtitle}
            </p>
            {description && (
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    {description}
                </p>
            )}
        </li>
    );
}

export default function About() {
    return (
        <Layout>
            <SeoHead
                title="About"
                description="Learn more about Andi Syafiudin Musafir — a passionate engineer specializing in Laravel, React, and modern web technologies. Software Engineer at Galesong Group and Informatics Engineering graduate of Hasanuddin University."
                keywords="andi syafiudin musafir, about, web engineer, software engineer, galesong group, laravel, react, hasanuddin university, informatics engineering"
                url="/about"
                type="profile"
                image="/profil.png"
            />

            {/* ── Intro ── */}
            <Section title="About" as="h1">
                <div className="flex flex-col gap-4 text-lg leading-[27px] text-gray-700 dark:text-gray-300">
                    <p>
                        A <Highlight>software engineer</Highlight> who loves
                        creating beautiful and functional Applications. I
                        specialize in building{' '}
                        <Highlight>scalable applications</Highlight> that solve
                        real-world problems.
                    </p>
                    <p>
                        My journey in web development started several years ago,
                        and I've been continuously learning and evolving ever
                        since. Currently exploring{' '}
                        {currentlyLearning.map((tech, i) => (
                            <span key={tech}>
                                <Highlight>{tech}</Highlight>
                                {i < currentlyLearning.length - 2
                                    ? ', '
                                    : i === currentlyLearning.length - 2
                                      ? ', and '
                                      : '.'}
                            </span>
                        ))}
                    </p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-lg">
                    <a
                        href="/cv_syafiudin-6.pdf"
                        download
                        className={accentLink}
                    >
                        Download CV
                    </a>
                    <Link href="/contact" className={accentLink}>
                        Get in touch
                    </Link>
                </div>
            </Section>

            <Divider />

            {/* ── Experience ── */}
            <Section title="Experience">
                <ul className="flex flex-col gap-6">
                    {experiences.map((exp) => (
                        <TimelineItem
                            key={`${exp.company}-${exp.position}`}
                            title={exp.position}
                            subtitle={exp.company}
                            period={exp.period}
                            description={exp.description}
                        />
                    ))}
                </ul>
            </Section>

            <Divider />

            {/* ── Education ── */}
            <Section title="Education">
                <ul className="flex flex-col gap-6">
                    {education.map((edu) => (
                        <TimelineItem
                            key={edu.school}
                            title={edu.school}
                            subtitle={
                                edu.field
                                    ? `${edu.degree} — ${edu.field}`
                                    : edu.degree
                            }
                            period={edu.period}
                            description={edu.description}
                        />
                    ))}
                </ul>
            </Section>

            <Divider />

            {/* ── Skills ── */}
            <Section title="Skills">
                <dl className="flex flex-col gap-4">
                    {skillCategories.map((category) => (
                        <div
                            key={category.label}
                            className="flex flex-col gap-2 sm:flex-row sm:gap-4"
                        >
                            <dt className="shrink-0 text-base text-gray-500 sm:w-40 dark:text-gray-400">
                                {category.label}
                            </dt>
                            <dd className="flex flex-wrap gap-x-4 gap-y-1.5">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="group inline-flex items-center gap-1.5 text-base text-gray-900 dark:text-gray-100"
                                        style={
                                            skill.color
                                                ? ({
                                                      '--brand': skill.color,
                                                  } as React.CSSProperties)
                                                : undefined
                                        }
                                    >
                                        <span
                                            className={`text-gray-400 transition-colors duration-200 dark:text-gray-500 ${
                                                skill.color
                                                    ? '[.group:hover_&]:text-(--brand)'
                                                    : '[.group:hover_&]:text-gray-900 dark:[.group:hover_&]:text-white'
                                            }`}
                                        >
                                            {skill.icon}
                                        </span>
                                        {skill.name}
                                    </span>
                                ))}
                            </dd>
                        </div>
                    ))}
                </dl>
            </Section>
        </Layout>
    );
}
