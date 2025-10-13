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
        const { data, error } = await supabase
            .from('flashcards')
            .insert([{                       // inserisci un nuovo record
                area,
                question: question.trim(),     // rimuove spazi all'inizio/fine
                answer: answer.trim()
            }])
            .select()                        // ritorna il record inserito
            .single();                       // aspettati un solo record

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
