import Layout from '@/components/Layouts';
import Section, { accentLink, inputClass } from '@/components/Section';
import SeoHead from '@/components/SeoHead';
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
        // `noopener` would make window.open return null, so detach manually.
        const opened = window.open(url, '_blank');
        if (opened) {
            opened.opener = null;
        } else {
            // Popup blocked: fall back to same-tab navigation.
            window.location.href = url;
        }
        setSent(true);
    };

    const labelClass =
        'mb-1.5 block text-base font-semibold text-gray-900 dark:text-gray-100';
    const errorClass = 'mt-1 text-sm text-red-600 dark:text-red-400';

    return (
        <Layout>
            <SeoHead
                title="Contact"
                description="Get in touch with Andi Syafiudin Musafir — send a message directly via WhatsApp for project inquiries or collaboration."
                keywords="contact, hire, whatsapp, andi syafiudin musafir, web developer"
                url="/contact"
                type="website"
            />

            <Section title="Contact" as="h1">
                <p className="text-lg leading-[27px] text-gray-700 dark:text-gray-300">
                    Have a project in mind or just want to chat? Fill in the
                    form and it will open{' '}
                    <span className="font-medium text-blue-700 dark:text-blue-400">
                        WhatsApp
                    </span>{' '}
                    with your message ready to send. Prefer email? Write to{' '}
                    <a
                        href="mailto:altafpasallo12@gmail.com"
                        className={accentLink}
                    >
                        altafpasallo12@gmail.com
                    </a>
                    .
                </p>
            </Section>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
            >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="contact-name" className={labelClass}>
                            Name
                        </label>
                        <input
                            id="contact-name"
                            type="text"
                            autoComplete="name"
                            value={form.name}
                            onChange={(e) => update('name', e.target.value)}
                            placeholder="Your name"
                            className={inputClass}
                            aria-invalid={!!errors.name}
                            aria-describedby={
                                errors.name ? 'contact-name-error' : undefined
                            }
                        />
                        {errors.name && (
                            <p id="contact-name-error" className={errorClass}>
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="contact-email" className={labelClass}>
                            Email{' '}
                            <span className="font-normal text-gray-500 dark:text-gray-400">
                                (optional)
                            </span>
                        </label>
                        <input
                            id="contact-email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => update('email', e.target.value)}
                            placeholder="you@example.com"
                            className={inputClass}
                        />
                    </div>
                </div>

                <fieldset>
                    <legend className={labelClass}>Topic</legend>
                    <div className="flex flex-wrap gap-2">
                        {TOPICS.map((topic) => {
                            const active = form.topic === topic;
                            return (
                                <button
                                    key={topic}
                                    type="button"
                                    onClick={() => update('topic', topic)}
                                    aria-pressed={active}
                                    className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                                        active
                                            ? 'border-blue-700 bg-blue-50 font-semibold text-blue-700 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-300'
                                            : 'border-gray-300 text-gray-700 hover:border-gray-400 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500'
                                    }`}
                                >
                                    {topic}
                                </button>
                            );
                        })}
                    </div>
                </fieldset>

                <div>
                    <div className="flex items-baseline justify-between">
                        <label htmlFor="contact-message" className={labelClass}>
                            Message
                        </label>
                        <span className="text-sm text-gray-400 dark:text-gray-500">
                            {form.message.length}/{MESSAGE_MAX_LENGTH}
                        </span>
                    </div>
                    <textarea
                        id="contact-message"
                        rows={6}
                        maxLength={MESSAGE_MAX_LENGTH}
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        placeholder="Tell me a bit about what you have in mind..."
                        className={`${inputClass} resize-y`}
                        aria-invalid={!!errors.message}
                        aria-describedby={
                            errors.message ? 'contact-message-error' : undefined
                        }
                    />
                    {errors.message && (
                        <p id="contact-message-error" className={errorClass}>
                            {errors.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <button
                        type="submit"
                        disabled={!whatsappNumber}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-base font-semibold text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
                    >
                        <SiWhatsapp className="h-4 w-4" />
                        Send via WhatsApp
                    </button>
                    <p
                        className="text-sm text-gray-500 dark:text-gray-400"
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
        </Layout>
    );
}
