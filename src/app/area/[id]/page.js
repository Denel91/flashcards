'use client';

import {useState, useEffect} from 'react';
import {useParams, useRouter} from 'next/navigation';
import Flashcard from '@/components/Flashcard';
import FlashcardForm from '@/components/FlashcardForm';
import {
    getFlashcards,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard
} from '@/lib/flashcardService';

export default function AreaPage() {
    const params = useParams();
    const router = useRouter();
    const areaId = params.id;

    const [flashcards, setFlashcards] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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

    useEffect(() => {
        loadFlashcards();
    }, [areaId]);

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

            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrevious();
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentIndex, flashcards.length, showForm]);

    const loadFlashcards = async () => {
        try {
            setIsLoading(true);
            const cards = await getFlashcards(areaId);
            setFlashcards(cards);
        } catch (error) {
            console.error('Errore caricamento:', error);
            alert('Errore nel caricamento');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (question, answer) => {
        try {
            setIsSaving(true);

            if (editingCard?.id) {
                await updateFlashcard(editingCard.id, question, answer);
            } else {
                await createFlashcard(areaId, question, answer);
            }

            await loadFlashcards();
            setShowForm(false);
            setEditingCard(null);
        } catch (error) {
            console.error('Errore salvataggio:', error);
            alert('Errore nel salvataggio');
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
            setIsDeleting(true);
            await deleteFlashcard(id);
            await loadFlashcards();

            if (currentIndex >= flashcards.length - 1 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        } catch (error) {
            console.error('Errore eliminazione:', error);
            alert('Errore nell\'eliminazione');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
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
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={() => router.push('/')} className="group flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200 hover:gap-3">
                            <span className="text-xl group-hover:transform group-hover:-translate-x-1 transition-transform">←</span>
                            <span>Torna alla Home</span>
                        </button>

                        <button onClick={() => setShowForm(true)} className={`group bg-gradient-to-r ${currentArea.gradient} text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2`}>
                            <span className="text-xl group-hover:rotate-90 transition-transform duration-200">+</span>
                            <span>Nuova Flashcard</span>
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
                            <button onClick={() => setShowForm(true)} className={`bg-gradient-to-r ${currentArea.gradient} text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200`}>
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
                            />
                        </div>

                        {/* Navigazione Migliorata */}
                        <div className="flex justify-center items-center gap-6 mt-8">
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

                        {/* Hint per tastiera */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-500">
                                💡 Usa le frecce ← → per navigare
                            </p>
                        </div>
                    </div>
                )}

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
                                onSave={handleSave}
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
