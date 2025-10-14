'use client';

export default function FlashcardListItem({ flashcard, onEdit, onDelete, isDeleting }) {
    if (!flashcard) return null;

    const accuracy = flashcard.studied_count > 0
        ? ((flashcard.correct_count / flashcard.studied_count) * 100).toFixed(0)
        : 0;

    const getStatusBadge = () => {
        if (flashcard.studied_count === 0) {
            return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">📚 Non studiata</span>;
        }
        if (flashcard.review_count > 0) {
            return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">🔄 Da rivedere</span>;
        }
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">✅ Studiata</span>;
    };

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-all p-4 border border-gray-200">
            <div className="flex items-start justify-between gap-4">
                {/* Contenuto principale */}
                <div className="flex-1 min-w-0">
                    {/* Domanda */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {flashcard.question}
                    </h3>

                    {/* Risposta (preview) */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                        {flashcard.answer}
                    </p>

                    {/* Statistiche e badge */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {getStatusBadge()}

                        {flashcard.studied_count > 0 && (
                            <>
                                <span className="text-xs text-gray-500">
                                    📊 {flashcard.studied_count} {flashcard.studied_count === 1 ? 'volta' : 'volte'}
                                </span>
                                <span className="text-xs text-gray-500">
                                    🎯 {accuracy}% precisione
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Azioni */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Bottone Modifica */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(flashcard);
                        }}
                        disabled={isDeleting}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Modifica"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                        </svg>
                    </button>

                    {/* Bottone Elimina */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(flashcard.id);
                        }}
                        disabled={isDeleting}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Elimina"
                    >
                        {isDeleting ? (
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            </svg>
                        ) : (
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 3h6l1 2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7H4a1 1 0 110-2h4l1-2zm-1 6a1 1 0 012 0v8a1 1 0 11-2 0V9zm6-1a1 1 0 00-1 1v8a1 1 0 102 0V9a1 1 0 00-1-1z"/>
                            </svg>
                        )}
                    </button>

                    {/* Bottone Studia */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // Qui puoi aprire un modale per studiare la card o navigare
                        }}
                        className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        title="Studia"
                    >
                        📖
                    </button>
                </div>
            </div>
        </div>
    );
}
