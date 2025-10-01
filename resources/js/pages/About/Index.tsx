import Layout from '@/components/Layouts';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function About() {
    return (
        <Layout>
            <div className="max-w-4xl">
                <div className="mb-16">
                    <h1 className="mb-8 text-4xl font-light md:text-5xl">
                        About Me
                    </h1>

                    <div className="space-y-6 font-light leading-relaxed text-gray-700">
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
                            React, TypeScript, and Tailwind CSS. When I'm not
                            coding, you can find me exploring new technologies,
                            contributing to open source, or sharing my knowledge
                            through blog posts.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-12">
                    <h2 className="mb-6 text-2xl font-light">Skills</h2>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {[
                            'Laravel',
                            'React',
                            'TypeScript',
                            'Tailwind CSS',
                            'Inertia.js',
                            'MySQL',
                            'Git',
                            'REST APIs',
                            'Node.js',
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
                            href="mailto:your@email.com"
                            className="flex items-center space-x-2 font-light text-gray-600 transition hover:text-gray-900"
                        >
                            <Mail className="h-5 w-5" />
                            <span>your@email.com</span>
                        </a>
                        <a
                            href="https://github.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 font-light text-gray-600 transition hover:text-gray-900"
                        >
                            <Github className="h-5 w-5" />
                            <span>GitHub</span>
                        </a>
                        <a
                            href="https://linkedin.com/in/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 font-light text-gray-600 transition hover:text-gray-900"
                        >
                            <Linkedin className="h-5 w-5" />
                            <span>LinkedIn</span>
                        </a>
                        <a
                            href="https://twitter.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 font-light text-gray-600 transition hover:text-gray-900"
                        >
                            <Twitter className="h-5 w-5" />
                            <span>Twitter</span>
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
