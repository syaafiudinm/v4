import Layout from '@/components/Layouts';
import SeoHead from '@/components/SeoHead';
import { Mail, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { SiWhatsapp } from 'react-icons/si';

interface Props {
    whatsappNumber: string | null;
}

const TOPICS = ['Project inquiry', 'Collaboration', 'Just saying hi'] as const;

const MESSAGE_MAX_LENGTH = 1000;

interface FormState {
    name: string;
    email: string;
    topic: (typeof TOPICS)[number];
    message: string;
}

type FormErrors = Partial<Record<'name' | 'message', string>>;

function validate(form: FormState): FormErrors {
    const errors: FormErrors = {};
    if (form.name.trim().length < 2) {
        errors.name = 'Please enter your name.';
    }
    if (form.message.trim().length < 10) {
        errors.message = 'Message should be at least 10 characters.';
    }
    return errors;
}

function buildMessage(form: FormState) {
    const lines = [
        `Hi Syafiudin, I'm ${form.name.trim()}.`,
        `Topic: ${form.topic}`,
    ];
    if (form.email.trim()) lines.push(`Email: ${form.email.trim()}`);
    lines.push('', form.message.trim());
    return lines.join('\n');
}

export default function Contact({ whatsappNumber }: Props) {
    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        topic: TOPICS[0],
        message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [sent, setSent] = useState(false);

    const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: undefined }));
        setSent(false);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nextErrors = validate(form);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0 || !whatsappNumber) return;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildMessage(form))}`;
        // Fall back to same-tab navigation when the popup is blocked.
        const opened = window.open(url, '_blank', 'noopener,noreferrer');
        if (!opened) window.location.href = url;
        setSent(true);
    };

    return (
        <Layout>
            <SeoHead
                title="Contact"
                description="Get in touch with Andi Syafiudin Musafir — send a message directly via WhatsApp for project inquiries or collaboration."
                keywords="contact, hire, whatsapp, andi syafiudin musafir, web developer"
                url="/contact"
                type="website"
            />

            <div>
                {/* ── Header ── */}
                <header className="animate-fade-in mb-12">
                    <div className="mb-4 inline-flex border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]">
                        <div className="bg-[#FFEE00] px-3 py-1 text-[10px] font-bold tracking-widest text-[#1A1A1A] uppercase">
                            Say hello
                        </div>
                    </div>
                    <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl dark:text-[#FAFAF8]">
                        Get in touch
                    </h1>
                    <div className="mb-3 h-1 w-14 border border-[#1A1A1A] bg-[#FFEE00]" />
                    <p
                        className="max-w-xl text-base text-[#555] dark:text-[#999]"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                        Have a project in mind or just want to chat? Fill in the
                        form and it will open WhatsApp with your message ready
                        to send.
                    </p>
                </header>

                <div className="animate-fade-in-up animation-delay-200 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* ── Form ── */}
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="nb-card space-y-6 p-6 md:p-8 lg:col-span-2"
                    >
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="contact-name"
                                    className="mb-2 block text-xs font-bold tracking-widest uppercase"
                                >
                                    Name{' '}
                                    <span className="text-[#FF4F4F]">*</span>
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    autoComplete="name"
                                    value={form.name}
                                    onChange={(e) =>
                                        update('name', e.target.value)
                                    }
                                    placeholder="Your name"
                                    className="nb-input"
                                    aria-invalid={!!errors.name}
                                    aria-describedby={
                                        errors.name
                                            ? 'contact-name-error'
                                            : undefined
                                    }
                                />
                                {errors.name && (
                                    <p
                                        id="contact-name-error"
                                        className="mt-1.5 text-xs font-medium text-[#FF4F4F]"
                                    >
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="contact-email"
                                    className="mb-2 block text-xs font-bold tracking-widest uppercase"
                                >
                                    Email{' '}
                                    <span className="font-medium tracking-normal text-[#888] normal-case">
                                        (optional)
                                    </span>
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        update('email', e.target.value)
                                    }
                                    placeholder="you@example.com"
                                    className="nb-input"
                                />
                            </div>
                        </div>

                        <fieldset>
                            <legend className="mb-2 block text-xs font-bold tracking-widest uppercase">
                                Topic
                            </legend>
                            <div className="flex flex-wrap gap-2">
                                {TOPICS.map((topic) => {
                                    const active = form.topic === topic;
                                    return (
                                        <button
                                            key={topic}
                                            type="button"
                                            onClick={() =>
                                                update('topic', topic)
                                            }
                                            aria-pressed={active}
                                            className={`nb-btn px-3 py-1.5 text-xs ${
                                                active
                                                    ? 'nb-btn-yellow'
                                                    : 'nb-btn-ghost'
                                            }`}
                                        >
                                            {topic}
                                        </button>
                                    );
                                })}
                            </div>
                        </fieldset>

                        <div>
                            <div className="mb-2 flex items-baseline justify-between">
                                <label
                                    htmlFor="contact-message"
                                    className="block text-xs font-bold tracking-widest uppercase"
                                >
                                    Message{' '}
                                    <span className="text-[#FF4F4F]">*</span>
                                </label>
                                <span className="text-[10px] font-medium text-[#888]">
                                    {form.message.length}/{MESSAGE_MAX_LENGTH}
                                </span>
                            </div>
                            <textarea
                                id="contact-message"
                                rows={6}
                                maxLength={MESSAGE_MAX_LENGTH}
                                value={form.message}
                                onChange={(e) =>
                                    update('message', e.target.value)
                                }
                                placeholder="Tell me a bit about what you have in mind..."
                                className="nb-input resize-y"
                                aria-invalid={!!errors.message}
                                aria-describedby={
                                    errors.message
                                        ? 'contact-message-error'
                                        : undefined
                                }
                            />
                            {errors.message && (
                                <p
                                    id="contact-message-error"
                                    className="mt-1.5 text-xs font-medium text-[#FF4F4F]"
                                >
                                    {errors.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 border-t-2 border-dashed border-[#1A1A1A] pt-6 dark:border-[#444]">
                            <button
                                type="submit"
                                disabled={!whatsappNumber}
                                className="nb-btn nb-btn-black px-5 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <SiWhatsapp className="h-4 w-4" />
                                <span>Send via WhatsApp</span>
                                <Send className="h-3.5 w-3.5" />
                            </button>
                            <p
                                className="text-xs text-[#888]"
                                role="status"
                                aria-live="polite"
                            >
                                {!whatsappNumber
                                    ? 'WhatsApp is unavailable right now — please use email instead.'
                                    : sent
                                      ? 'WhatsApp opened in a new tab. Just hit send there!'
                                      : 'Opens WhatsApp with your message pre-filled.'}
                            </p>
                        </div>
                    </form>

                    {/* ── Side info ── */}
                    <aside className="space-y-6">
                        <div className="nb-card p-6">
                            <p className="mb-3 text-xs font-bold tracking-widest uppercase">
                                Prefer email?
                            </p>
                            <a
                                href="mailto:altafpasallo12@gmail.com"
                                className="inline-flex items-center gap-1.5 text-sm font-medium break-all text-[#1A1A1A] underline underline-offset-2 transition-colors hover:text-[#FF4F4F] dark:text-[#E5E7EB] dark:hover:text-[#FFEE00]"
                            >
                                <Mail className="h-4 w-4 shrink-0" />
                                <span>altafpasallo12@gmail.com</span>
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
        </Layout>
    );
}
