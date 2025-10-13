'use client';

import {useState} from 'react';

export default function Flashcard({flashcard, onEdit, onDelete, isDeleting}) {
    // Stato per controllare se la card è girata
    const [isFlipped, setIsFlipped] = useState(false);
    // Stato per il modale di conferma eliminazione
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Funzione per girare la card
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Gestisce la conferma di eliminazione
    // Apre il modale di conferma
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setShowDeleteConfirm(true);
    };

    // Conferma ed elimina
    const handleConfirmDelete = (e) => {
        e.stopPropagation();
        setShowDeleteConfirm(false);
        onDelete(flashcard.id);
    };

    // Annulla l'eliminazione
    const handleCancelDelete = (e) => {
        e.stopPropagation();
        setShowDeleteConfirm(false);
    };

    return (
        <>
            <div className="perspective-1000 w-full max-w-4xl mx-auto mb-6">
                {/* Contenitore che ruota */}
                <div className={`relative w-full h-110 transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                    onClick={handleFlip}>
                    {/* FRONTE: Quesito */}
                    <div
                        className="absolute w-full h-full backface-hidden bg-gradient-to-br from-green-500 to-sky-600 rounded-xl shadow-2xl p-8 flex flex-col justify-between">
                        {/* Header con pulsanti */}
                        <div className="flex justify-between items-start">
                        <span className="text-white text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                            Quesito
                        </span>
                            <div className="flex gap-2">
                                {/* Pulsante Modifica */}
                                <button onClick={(e) => {
                                    e.stopPropagation(); // Non girare la card quando clicco
                                    onEdit(flashcard);
                                }}
                                        disabled={isDeleting}
                                        className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                                        title="Modifica"
                                >
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                                    </svg>
                                </button>

                                {/* Pulsante Elimina */}
                                <button onClick={handleDeleteClick}
                                        disabled={isDeleting}
                                        className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                                        title="Elimina"
                                >
                                    {isDeleting ? (
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            {/* Icona loading */}
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Testo del quesito */}
                        <div className="flex-1 flex items-center justify-center px-4">
                            <p className="text-white text-2xl font-medium text-center">
                                {flashcard.question}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="text-center text-white/80 text-sm">
                            Clicca per vedere la risposta
                        </div>
                    </div>

                    {/* RETRO: Risposta */}
                    <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-green-500 to-sky-600 rounded-xl shadow-2xl p-8 flex flex-col justify-between rotate-y-180">
                        <div className="flex justify-between items-start">
                        <span className="text-white text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                            Risposta
                        </span>
                        </div>

                        {/* Testo della risposta */}
                        <div className="flex-1 flex items-center justify-start overflow-y-auto px-4 py-4">
                            <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">
                                {flashcard.answer}
                            </p>
                        </div>

                        <div className="text-center text-white/80 text-sm">
                            Clicca per tornare al quesito
                        </div>
                    </div>
                </div>
            </div>

            {/* Modale di conferma eliminazione */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={handleCancelDelete}>
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Conferma eliminazione</h3>
                        </div>

                        <p className="text-gray-600 mb-6">
                            Sei sicuro di voler eliminare questa flashcard? Questa azione non può essere annullata.
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button onClick={handleCancelDelete} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                                Annulla
                            </button>
                            <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                                Elimina
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
