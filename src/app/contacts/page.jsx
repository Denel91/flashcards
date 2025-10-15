'use client'

import { useState } from "react";
import {useRouter} from 'next/navigation';

export default function ContactsPage() {
    const router = useRouter();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    // Simula una chiamata al server per una UX realistica
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Bottone Torna alla Home */}
        <div className="mb-8 flex justify-start">
            <button onClick={() => router.push('/')} className="group flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200 hover:gap-3">
                <span className="text-xl group-hover:transform group-hover:-translate-x-1 transition-transform">←</span>
                <span>Torna alla Home</span>
            </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200">Parliamo insieme</span>
          <div className="flex flex-col items-center justify-center mt-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl md:text-5xl">
                <svg className="inline-block h-10 w-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 2.386 1.053 4.55 2.828 6.07A1 1 0 0 1 5 19v2a1 1 0 0 0 1.447.894l3.11-1.555A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </span>
              <h1 className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-extrabold text-4xl md:text-5xl tracking-tight transition-transform duration-200 hover:-translate-y-1">
                Mettiti in contatto con noi
              </h1>
            </div>
            <span className="block w-16 h-1 mt-3 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mx-auto"></span>
          </div>
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            Per domande, collaborazioni o richieste commerciali, scegli uno dei canali
            qui sotto oppure usa il modulo. Rispondiamo in 24/48 ore.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact methods */}
          <section className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-transparent to-purple-50/60" aria-hidden="true" />
              <div className="relative p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-gray-900">Canali diretti</h2>
                <p className="mt-1 text-sm text-gray-600">Scegli il canale che preferisci.</p>

                <ul className="mt-6 divide-y divide-gray-100">
                  <li className="py-4">
                    <a href="mailto:tuo@email.com" className="group flex items-start gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100">
                        {/* Mail icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                          <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5A2.25 2.25 0 0 1 22.5 6.75v10.5A2.25 2.25 0 0 1 20.25 19.5H3.75A2.25 2.25 0 0 1 1.5 17.25V6.75Zm2.4-.9a.75.75 0 0 0-.9 1.2l7.65 5.737a1.5 1.5 0 0 0 1.8 0l7.65-5.738a.75.75 0 1 0-.9-1.199L12 11.39 3.9 5.85Z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">Email</p>
                        <p className="text-sm text-gray-600">disi91@hotmail.it</p>
                      </div>
                    </a>
                  </li>
                  <li className="py-4">
                    <a href="tel:+391234567890" className="group flex items-start gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100">
                        {/* Phone icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                          <path fillRule="evenodd" d="M1.5 3.75A2.25 2.25 0 0 1 3.75 1.5h1.64c.9 0 1.691.6 1.937 1.469l.78 2.73a2.25 2.25 0 0 1-.563 2.205l-1.22 1.22a16.5 16.5 0 0 0 6.553 6.553l1.22-1.22a2.25 2.25 0 0 1 2.205-.562l2.73.78A2.063 2.063 0 0 1 22.5 16.61v1.64a2.25 2.25 0 0 1-2.25 2.25H18A18 18 0 0 1 1.5 3.75Z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">Telefono</p>
                        <p className="text-sm text-gray-600">+39 3208869683</p>
                      </div>
                    </a>
                  </li>
                  <li className="py-4">
                    <a href="https://linkedin.com/in/tuoprofilo" target="_blank" rel="noopener" className="group flex items-start gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
                        {/* LinkedIn icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001ZM3 9h4v12H3zM10 9h3.8v1.64h.055c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.45 4.77 5.64V21H19v-5.37c0-1.28-.02-2.92-1.78-2.92-1.79 0-2.06 1.4-2.06 2.83V21H10z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">LinkedIn</p>
                        <p className="text-sm text-gray-600 truncate">linkedin.com/in/daniele-di-salvo</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-600 to-indigo-600 p-6 sm:p-8 text-white shadow-lg">
              <p className="text-lg font-semibold">Preferisci una call veloce?</p>
              <p className="mt-1 text-sm text-blue-100">Prenota un breve confronto per capire insieme le tue esigenze.</p>
              <a href="https://calendly.com/disi91/new-meeting" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/20 backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 5.25a.75.75 0 0 1 .75.75V11h4.5a.75.75 0 0 1 0 1.5h-4.5v5a.75.75 0 0 1-1.5 0v-5H6.75a.75.75 0 0 1 0-1.5h4.5V6a.75.75 0 0 1 .75-.75Z"/></svg>
                Prenota ora su Calendly
              </a>
            </div>
          </section>

          {/* Form */}
          <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50" aria-hidden="true" />
            <div className="relative p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">Modulo di contatto</h2>
              <p className="mt-1 text-sm text-gray-600">Compila i campi: ti risponderemo al più presto.</p>

              {sent ? (
                <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-green-200 bg-green-50 p-8 text-center">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700 ring-1 ring-inset ring-green-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                      <path fillRule="evenodd" d="M10.28 15.22a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l2.47 2.47 5.97-5.97a.75.75 0 1 1 1.06 1.06l-6.5 6.5Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-base font-medium text-green-800">Messaggio inviato!</p>
                  <p className="mt-1 text-sm text-green-700 max-w-sm">Grazie per averci contattato. Ti risponderemo via email appena possibile.</p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-green-800 ring-1 ring-inset ring-green-200 hover:bg-green-50"
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form className="mt-6 space-y-5" onSubmit={handleSubmit} aria-live="polite">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        placeholder="Mario Rossi"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        placeholder="mario.rossi@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Oggetto</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="Es. Collaborazione, Supporto, Info prezzi..."
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Messaggio</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="Scrivi qui il tuo messaggio..."
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <input id="privacy" type="checkbox" required className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="privacy" className="text-sm text-gray-600">Ho letto e accetto l'informativa sulla privacy.</label>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        Invia messaggio
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          Preferisci scriverci direttamente? <a className="font-medium text-blue-700 hover:underline" href="mailto:tuo@email.com">Manda un'email</a>
        </div>
      </div>
    </div>
  );
}
