'use client';

import {useState, useEffect, useCallback, useRef} from 'react';
import {useParams, useRouter} from 'next/navigation';
import Flashcard from '@/components/Flashcard';
import FlashcardForm from '@/components/FlashcardForm';
import AreaStats from '@/components/AreaStats';
import toast from 'react-hot-toast';
import {
    getFlashcards,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
    updateFlashcardStats,
    getAreaStats,
} from '@/lib/flashcardService';

export default function AreaPage() {
    const params = useParams();
    const router = useRouter();
    const areaId = params.id; // 'civile', 'amministrativo', o 'penale'

    const [flashcards, setFlashcards] = useState([]);
    const [stats, setStats] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // --- NEW: ref del container principale (per attaccare listener touch in modo robusto) ---
    const mainRef = useRef(null);

    // --- Nuove funzionalità mobile: swipe refs (spostate prima del return per rispettare le regole hooks) ---
    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const lastTouchX = useRef(null);
    const lastTouchY = useRef(null);
    const isTouchMoving = useRef(false);

    const areaConfig = {
        civile: {
            name: 'Diritto Civile',
            icon: '⚖️',
            gradient: 'from-red-500 to-orange-500',
            bgGradient: 'from-red-50 to-orange-50'
        },
        amministrativo: {
            name: 'Diritto Amministrativo',
            icon: '🏛️',
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50'

        },
        penale: {
            name: 'Diritto Penale',
            icon: '⚔️',
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-50 to-emerald-50'
        }
    };

    const currentArea = areaConfig[areaId] || areaConfig.civile;

    const loadFlashcards = useCallback(async () => {
        try {
            setIsLoading(true);
            const cards = await getFlashcards(areaId);
            setFlashcards(cards);
        } catch (error) {
            console.error('Errore caricamento flashcards:', error);
            toast.error('Errore nel caricamento delle flashcards');
        } finally {
            setIsLoading(false);
        }
    }, [areaId]);

    // Carica le statistiche
    const loadStats = useCallback(async () => {
        try {
            const statsData = await getAreaStats(areaId);
            setStats(statsData);
        } catch (error) {
            console.error('Errore caricamento statistiche:', error);
        }
    }, [areaId]);

    useEffect(() => {
        loadFlashcards();
        loadStats();
    }, [loadFlashcards, loadStats]);

    // --- Nuove funzionalità mobile: swipe (spostato prima del return) ---
    useEffect(() => {
        if (flashcards.length === 0) return;

        const container = mainRef.current || window;
        if (!container || !container.addEventListener) return;

        const handleTouchStart = (e) => {
            if (showForm) return; // non interpretare swipe se il form è aperto
            if (!e.touches || e.touches.length === 0) return;
            const t = e.touches[0];
            touchStartX.current = t.clientX;
            touchStartY.current = t.clientY;
            lastTouchX.current = t.clientX;
            lastTouchY.current = t.clientY;
            isTouchMoving.current = false;
        };

        const handleTouchMove = (e) => {
            if (showForm) return;
            if (!e.touches || e.touches.length === 0) return;
            const t = e.touches[0];
            lastTouchX.current = t.clientX;
            lastTouchY.current = t.clientY;
            // Se il movimento supera una piccola soglia consideralo movimento (evita click tap interpretati come swipe)
            const dx = Math.abs(lastTouchX.current - touchStartX.current);
            const dy = Math.abs(lastTouchY.current - touchStartY.current);
            if (dx > 5 || dy > 5) isTouchMoving.current = true;
        };

        const handleTouchEnd = (e) => {
            if (showForm) return; // non interpretare swipe se il form è aperto
            // Usa lastTouch* se disponibili
            if (touchStartX.current == null) return;

            const endX = (lastTouchX.current != null) ? lastTouchX.current : (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientX);
            const endY = (lastTouchY.current != null) ? lastTouchY.current : (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientY);
            if (endX == null || endY == null) {
                touchStartX.current = null;
                touchStartY.current = null;
                lastTouchX.current = null;
                lastTouchY.current = null;
                isTouchMoving.current = false;
                return;
            }

            const deltaX = endX - touchStartX.current;
            const deltaY = endY - touchStartY.current;

            // Considera solo swipe orizzontali significativi e solo se c'è stato movimento
            if (isTouchMoving.current && Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX < 0) {
                    // swipe left -> next
                    setCurrentIndex(prev => Math.min(prev + 1, flashcards.length - 1));
                } else {
                    // swipe right -> previous
                    setCurrentIndex(prev => Math.max(prev - 1, 0));
                }
            }

            touchStartX.current = null;
            touchStartY.current = null;
            lastTouchX.current = null;
            lastTouchY.current = null;
            isTouchMoving.current = false;
        };

        // Attacca listener al container determinato
        container.addEventListener('touchstart', handleTouchStart, {passive: true});
        container.addEventListener('touchmove', handleTouchMove, {passive: true});
        container.addEventListener('touchend', handleTouchEnd, {passive: true});

        return () => {
            try {
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchend', handleTouchEnd);
            } catch (err) {
                // ignore cleanup errors
            }
        };
    }, [flashcards.length, showForm]);

    // Navigazione con tastiera
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (showForm) {
                if (e.key === 'Escape') {
                    setShowForm(false);
                    setEditingCard(null);
                }
                return;
            }

            const target = e.target;
            const tag = target?.tagName?.toLowerCase();
            const isTyping = tag === 'input' || tag === 'textarea' || target?.isContentEditable;
            if (isTyping) return;

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                setCurrentIndex((prev) => Math.min(prev + 1, flashcards.length - 1));
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setCurrentIndex((prev) => Math.max(prev - 1, 0));
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [showForm, flashcards.length]);

    // Gestisci creazione/modifica flashcard
    const handleSubmitFlashcard = async (question, answer) => {
        try {
            setIsSaving(true);

            if (editingCard) {
                // MODIFICA: Aggiorna localmente prima del salvataggio
                const updatedCard = { ...editingCard, question, answer };

                setFlashcards(prev =>
                    prev.map(card => card.id === editingCard.id ? updatedCard : card)
                );

                // Poi salva sul database
                await updateFlashcard(editingCard.id, question, answer);
                toast.success('Flashcard aggiornata!');
            } else {
                // CREAZIONE: Aggiungi localmente con ID temporaneo
                const tempId = `temp-${Date.now()}`;
                const newCard = {
                    id: tempId,
                    area: areaId,
                    question: question.trim(),
                    answer: answer.trim(),
                    created_at: new Date().toISOString(),
                    studied_count: 0,
                    correct_count: 0,
                    review_count: 0,
                    last_studied: null
                };

                // Aggiungi subito alla lista
                setFlashcards(prev => [newCard, ...prev]);

                // Salva sul database e ottieni l'ID reale
                const savedCard = await createFlashcard(areaId, question, answer);

                // Sostituisci l'ID temporaneo con quello reale
                setFlashcards(prev =>
                    prev.map(card => card.id === tempId ? savedCard : card)
                );

                toast.success('Flashcard creata con successo!');
            }

            // Ricarica solo le statistiche
            await loadStats();

            setShowForm(false);
            setEditingCard(null);
        } catch (error) {
            console.error('Errore salvataggio flashcard:', error);
            toast.error('Errore nel salvataggio');
            // In caso di errore, ricarica tutto per sicurezza
            await loadFlashcards();
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (flashcard) => {
        setEditingCard(flashcard);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            // Rimuovi subito dall'UI e aggiorna currentIndex in funzione della nuova lunghezza
            setFlashcards(prev => {
                const next = prev.filter(card => card.id !== id);
                // Aggiorna currentIndex in modo funzionale basandosi sulla nuova lunghezza
                setCurrentIndex(idx => Math.min(idx, Math.max(0, next.length - 1)));
                return next;
            });

            setIsDeleting(true);

            // Elimina dal database
            await deleteFlashcard(id);
            await loadStats();

            toast.success('Flashcard eliminata');

        } catch (error) {
            console.error('Errore eliminazione:', error);
            toast.error('Errore nell\'eliminazione');

            // Ricarica in caso di errore
            await loadFlashcards();
        } finally {
            setIsDeleting(false);
        }
    };

    const handleStudied = async (id, isCorrect) => {
        try {

            // 1) Update ottimistico della card nello stato
            const nowISO = new Date().toISOString();
            setFlashcards(prev => prev.map(card =>
                card.id === id
                    ? {
                        ...card,
                        studied_count: (card.studied_count || 0) + 1,
                        correct_count: (card.correct_count || 0) + (isCorrect ? 1 : 0),
                        review_count: !isCorrect ? (card.review_count || 0) + 1 : 0,
                        last_studied: nowISO,
                    }
                    : card
            ));

            // 2) Aggiorna il backend (senza bloccare l'UI con loading globale)
            await updateFlashcardStats(id, isCorrect);

            // 3) Aggiorna solo le statistiche (opzionale). In alternativa, puoi aggiornarle localmente.
            await loadStats();

            // 4) Feedback utente
            if (isCorrect) {
                toast.success('Conoscevi la risposta! 🎉');
            } else {
                toast('Da rivedere 📚', { icon: '💡', duration: 1000 });
            }
        } catch (error) {
            console.error('Errore aggiornamento statistiche:', error);
            toast.error("Errore nell'aggiornamento");
            // fallback: ricarica tutto solo in caso di errore
            await loadFlashcards();
            await loadStats();
        }
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(prev + 1, flashcards.length - 1));
    };

    const handlePrevious = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    // Gestisci apertura/chiusura form
    const handleToggleForm = () => {
        if (showForm) {
            setEditingCard(null);
        }
        setShowForm(!showForm);
    };

    // Loading moderno
    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-xl text-gray-600 animate-pulse">Caricamento...</p>
            </div>
        );
    }

    const progressPercentage = flashcards.length > 0 ? ((currentIndex + 1) / flashcards.length) * 100 : 0;

    return (
        <div className={`min-h-screen bg-gradient-to-br ${currentArea.bgGradient} transition-all duration-500`}>
            <div ref={mainRef} className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={() => router.push('/')} className="group flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200 hover:gap-3">
                            <span className="text-xl group-hover:transform group-hover:-translate-x-1 transition-transform">←</span>
                            <span>Torna alla Home</span>
                        </button>

                        <button onClick={handleToggleForm} className={`group bg-gradient-to-r ${currentArea.gradient} text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2`}>
                            <span className="text-xl group-hover:rotate-90 transition-transform duration-200">
                                {showForm ? '✖' : '+'}
                            </span>
                            <span>{showForm ? 'Chiudi' : 'Nuova Flashcard'}</span>
                        </button>
                    </div>

                    {/* Titolo con icona */}
                    <div className="text-center">
                        <div className="inline-flex items-center gap-4 mb-4">
                            <span className="text-6xl">{currentArea.icon}</span>
                            <h1 className={`text-6xl font-bold bg-gradient-to-r ${currentArea.gradient} bg-clip-text text-transparent`}>
                                {currentArea.name}
                            </h1>
                        </div>

                        {flashcards.length > 0 && (
                            <div className="flex items-center justify-center gap-4 mt-4">
                                <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-md">
                                    <span className="text-gray-600 font-medium">
                                        📚 {flashcards.length} Flashcard{flashcards.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Barra di progresso */}
                {flashcards.length > 0 && (
                    <div className="mb-8">
                        <div className="bg-white/50 backdrop-blur-sm rounded-full h-3 overflow-hidden shadow-inner">
                            <div className={`h-full bg-gradient-to-r ${currentArea.gradient} transition-all duration-300 ease-out rounded-full`}
                                style={{width: `${progressPercentage}%`}}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Contenuto */}
                {flashcards.length === 0 ? (
                    <div className="text-center py-20 animate-fade-in">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 max-w-2xl mx-auto">
                            <div className="text-6xl mb-4">📝</div>
                            <p className="text-2xl mb-6 text-gray-700 font-semibold">Nessuna flashcard</p>
                            <p className="text-gray-600 mb-8">Inizia creando la tua prima flashcard per studiare!</p>
                            <button onClick={handleToggleForm} className={`bg-gradient-to-r ${currentArea.gradient} text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200`}>
                                ✨ Crea la prima flashcard
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <div className="transition-all duration-300">
                            <Flashcard
                                flashcard={flashcards[currentIndex]}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                isDeleting={isDeleting}
                                onStudied={handleStudied}
                            />
                        </div>

                        {/* Navigazione Migliorata per desktop/tablet (nascosta su mobile) */}
                        <div className="hidden md:flex justify-center items-center gap-6 mt-8">
                            <button
                                onClick={handlePrevious}
                                disabled={currentIndex === 0}
                                className={`group px-8 py-4 bg-gradient-to-r ${currentArea.gradient} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md flex items-center gap-2`}
                            >
                                <span className="group-hover:transform group-hover:-translate-x-1 transition-transform">←</span>
                                <span>Precedente</span>
                            </button>

                            <div className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-xl shadow-lg">
                                <span className="text-lg font-bold text-gray-700">
                                    {currentIndex + 1} <span className="text-gray-400">/</span> {flashcards.length}
                                </span>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={currentIndex === flashcards.length - 1}
                                className={`group px-8 py-4 bg-gradient-to-r ${currentArea.gradient} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md flex items-center gap-2`}
                            >
                                <span>Successiva</span>
                                <span className="group-hover:transform group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>

                        {/* Navigazione mobile: sticky bottom, compatta, con barra di progresso */}
                        <div className="md:hidden fixed bottom-6 left-4 right-4 z-40">
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-3 py-3 flex items-center justify-between gap-3">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentIndex === 0}
                                    className={`flex items-center justify-center w-12 h-12 rounded-lg text-white font-semibold ${currentIndex === 0 ? 'bg-gray-300' : `bg-gradient-to-r ${currentArea.gradient}`} disabled:opacity-50`}
                                >
                                    ←
                                </button>

                                <div className="flex-1 px-3">
                                    <div className="text-center text-sm text-gray-700 font-medium">{currentIndex + 1} / {flashcards.length}</div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                        <div className={`h-full bg-gradient-to-r ${currentArea.gradient} rounded-full transition-all duration-300`} style={{width: `${progressPercentage}%`}} />
                                    </div>
                                </div>

                                <button
                                    onClick={handleNext}
                                    disabled={currentIndex === flashcards.length - 1}
                                    className={`flex items-center justify-center w-12 h-12 rounded-lg text-white font-semibold ${currentIndex === flashcards.length - 1 ? 'bg-gray-300' : `bg-gradient-to-r ${currentArea.gradient}`} disabled:opacity-50`}
                                >
                                    →
                                </button>
                            </div>
                        </div>

                        {/* Hint per tastiera */}
                        <div className="text-center mt-6 mb-6">
                            <p className="text-sm text-gray-500">
                                💡 Usa le frecce ← → per navigare
                            </p>
                        </div>
                    </div>
                )}

                {/* Statistiche */}
                {stats && <AreaStats stats={stats} />}

                {/* Form modale con animazione */}
                {showForm && (
                    <div className="fixed inset-0 z-50 animate-fade-in">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => {
                            setShowForm(false);
                            setEditingCard(null);
                        }}>
                        </div>
                        <div className="relative z-10">
                            <FlashcardForm
                                flashcard={editingCard}
                                onSave={handleSubmitFlashcard}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingCard(null);
                                }}
                                isSaving={isSaving}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
