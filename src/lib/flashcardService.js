import { supabase } from './supabase';

// Costanti per le aree legali
export const legalAreas = {
    CIVILE: 'civile',
    AMMINISTRATIVO: 'amministrativo',
    PENALE: 'penale'
};

// FUNZIONE 1: Recupera tutte le flashcards di un'area
export async function getFlashcards(area) {
    try {
        const { data, error } = await supabase
            .from('flashcards')              // dalla tabella flashcards
            .select('*')                     // seleziona tutti i campi
            .eq('area', area)                // dove area = parametro area
            .order('created_at', { ascending: true }); // ordina per data crescente

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Errore getFlashcards:', error);
        throw error;
    }
}

// FUNZIONE 2: Crea una nuova flashcard
export async function createFlashcard(area, question, answer) {
    try {
        const payload = {
            area,
            question: question.trim(),
            answer: answer.trim(),
            // inizializza i contatori a 0 per evitare null
            studied_count: 0,
            correct_count: 0,
            review_count: 0, // nuovo campo per le risposte sbagliate
            last_studied: null
        };

        const { data, error } = await supabase
            .from('flashcards')
            .insert([payload])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Errore createFlashcard:', error);
        throw error;
    }
}

// FUNZIONE 3: Aggiorna una flashcard esistente
export async function updateFlashcard(id, question, answer) {
    try {
        const { data, error } = await supabase
            .from('flashcards')
            .update({                        // aggiorna questi campi
                question: question.trim(),
                answer: answer.trim()
            })
            .eq('id', id)                    // dove id = parametro id
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Errore updateFlashcard:', error);
        throw error;
    }
}

// FUNZIONE 4: Elimina una flashcard
export async function deleteFlashcard(id) {
    try {
        const { error } = await supabase
            .from('flashcards')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Errore deleteFlashcard:', error);
        throw error;
    }
}

// FUNZIONE 5: Conta le flashcards per area
export async function countFlashcardsByArea(area) {
    try {
        const { count, error } = await supabase
            .from('flashcards')
            .select('*', { count: 'exact', head: true }) // conta senza dati
            .eq('area', area);

        if (error) throw error;
        return count || 0;
    } catch (error) {
        console.error('Errore countFlashcardsByArea:', error);
        throw error;
    }
}

// ============================================
// NUOVE FUNZIONI PER STATISTICHE
// ============================================

// Aggiorna le statistiche dopo lo studio
export async function updateFlashcardStats(id, isCorrect) {
    try {
        const { data: current, error: fetchError } = await supabase
            .from('flashcards')
            .select('studied_count, correct_count, review_count')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;

        const studied_count = (current?.studied_count || 0) + 1;
        const correct_count = isCorrect
            ? (current?.correct_count || 0) + 1
            : (current?.correct_count || 0);
        const review_count = !isCorrect
            ? (current?.review_count || 0) + 1
            : 0; // Azzera review_count quando rispondi correttamente

        const updates = {
            studied_count,
            correct_count,
            review_count,
            last_studied: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('flashcards')
            .update(updates)
            .eq('id', id)
            .select('id, studied_count, correct_count, last_studied')
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Errore updateFlashcardStats:', error);
        throw error;
    }
}

// Ottieni statistiche per area
export async function getAreaStats(area) {
    try {
        const { data, error } = await supabase
            .from('flashcards')
            .select('studied_count, correct_count, review_count')
            .eq('area', area);

        if (error) throw error;
        if (!data) return { totalCards: 0, studiedCards: 0, totalStudies: 0, totalCorrect: 0, accuracy: 0, reviewCards: 0 };

        const totalCards = data.length;
        const studiedCards = data.filter(card => (card.studied_count || 0) > 0).length;
        const totalStudies = data.reduce((sum, card) => sum + (card.studied_count || 0), 0);
        const totalCorrect = data.reduce((sum, card) => sum + (card.correct_count || 0), 0);
        const reviewCards = data.filter(card => (card.review_count || 0) > 0).length;
        const accuracy = totalStudies > 0 ? ((totalCorrect / totalStudies) * 100).toFixed(1) : 0;

        return {
            totalCards,
            studiedCards,
            totalStudies,
            totalCorrect,
            reviewCards, // nuova statistica
            accuracy: parseFloat(accuracy)
        };
    } catch (error) {
        console.error('Errore getAreaStats:', error);
        throw error;
    }
}

// ============================================
// FUNZIONI PER RICERCA E FILTRI
// ============================================

// Ricerca flashcards per testo
export async function searchFlashcards(area, searchTerm) {
    try {
        const { data, error } = await supabase
            .from('flashcards')
            .select('*')
            .eq('area', area)
            .or(`question.ilike.%${searchTerm}%,answer.ilike.%${searchTerm}%`)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Errore searchFlashcards:', error);
        throw error;
    }
}

// Filtra flashcards per tipo
export async function filterFlashcards(area, filterType) {
    try {
        let query = supabase
            .from('flashcards')
            .select('*')
            .eq('area', area);

        switch (filterType) {
            case 'not-studied':
                // Carte mai studiate
                query = query.or('studied_count.is.null,studied_count.eq.0');
                break;
            case 'needs-review':
                // Carte studiate almeno una volta
                query = query.not('studied_count', 'is', null).gt('studied_count', 0);
                break;
            case 'recent':
                // Ordina per ultimo studio
                query = query.order('last_studied', { ascending: false, nullsFirst: false });
                break;
            default:
                // Tutte le carte
                query = query.order('created_at', { ascending: false });
        }

        const { data, error } = await query;

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Errore filterFlashcards:', error);
        throw error;
    }
}

// Ottieni statistiche globali (tutte le aree)
export async function getGlobalStats() {
    try {
        const stats = {};

        for (const [, areaValue] of Object.entries(legalAreas)) {
            stats[areaValue] = await getAreaStats(areaValue);
        }

        return stats;
    } catch (error) {
        console.error('Errore getGlobalStats:', error);
        throw error;
    }
}
