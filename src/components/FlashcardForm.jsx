'use client';

import { useState, useEffect } from 'react';

export default function FlashcardForm({ flashcard, onSave, onCancel, isSaving }) {
    // Stati per i campi del form
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    // Se stiamo modificando, popola i campi
    useEffect(() => {
        if (flashcard) {
            setQuestion(flashcard.question || '');
            setAnswer(flashcard.answer || '');
        }
    }, [flashcard]);

    // Gestisce l'invio del form
    const handleSubmit = async (e) => {
        e.preventDefault(); // Non ricaricare la pagina

        // Validazione
        if (!question.trim() || !answer.trim()) {
            alert('Compila entrambi i campi');
            return;
        }

        // Chiama la funzione di salvataggio passata dal parent
        await onSave(question, answer);

        // Pulisci i campi
        setQuestion('');
        setAnswer('');
    };

    return (
        // Overlay scuro che copre tutto lo schermo
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            {/* Card del form */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    {flashcard?.id ? 'Modifica Flashcard' : 'Nuova Flashcard'}
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Campo Quesito */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Quesito *
                        </label>
                        <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                            rows="6"
                            placeholder="Inserisci il quesito giuridico..."
                            required
                            disabled={isSaving}
                        />
                    </div>

                    {/* Campo Risposta */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Risposta *
                        </label>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                            rows="10"
                            placeholder="Inserisci la risposta..."
                            required
                            disabled={isSaving}
                        />
                    </div>

                    {/* Pulsanti */}
                    <div className="flex gap-4 justify-end">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isSaving}
                            className="px-6 py-3 bg-teal-400 text-white rounded-lg hover:bg-teal-500"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {isSaving ? 'Salvataggio...' : (flashcard?.id ? 'Salva' : 'Crea')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
