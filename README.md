# ⚖️ Flashcards Giuridiche - App di Studio per Diritto

Un'applicazione web moderna e interattiva per studiare il diritto attraverso flashcards organizzate per materia. Costruita con **Next.js 15**, **React 19**, **Tailwind CSS** e **Supabase**.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-2.75.0-green?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat-square&logo=tailwind-css)

---

## ✨ Caratteristiche

### 🎯 Funzionalità Core
- ✅ **Tre aree di studio**: Diritto Civile, Amministrativo e Penale
- ✅ **Flashcards interattive** con animazione 3D flip
- ✅ **CRUD completo**: Crea, Leggi, Aggiorna, Elimina flashcards
- ✅ **Navigazione fluida** tra le flashcards con frecce direzionali
- ✅ **Modale di conferma** per operazioni critiche
- ✅ **Barra di progresso** visiva per tracciare lo studio
- ✅ **Responsive design** ottimizzato per tutti i dispositivi

### 🎨 UX/UI Moderna
- 🌈 **Gradienti colorati** personalizzati per ogni area
- 🔄 **Animazioni fluide** e transizioni CSS avanzate
- ⌨️ **Scorciatoie da tastiera** (frecce ←/→, ESC)
- 📱 **Mobile-first** con design adattivo
- 🎭 **Modali eleganti** con backdrop blur
- 💫 **Loading states** e feedback visivi

### 🔒 Tecnologie Moderne
- ⚡ **Next.js 15** con App Router
- ⚛️ **React 19** con hooks moderni
- 🎨 **Tailwind CSS** per styling utility-first
- 🗄️ **Supabase** per database PostgreSQL cloud
- 📦 **ESLint** per code quality

---

## 🎥 Demo Funzionalità

### Homepage
- Dashboard con 3 card per le diverse aree giuridiche
- Conteggio dinamico delle flashcards per area
- Navigazione intuitiva con icone tematiche

### Pagina Area
- Visualizzazione singola flashcard con flip 3D
- Pulsanti Modifica/Elimina in-card
- Navigazione Precedente/Successiva
- Indicatore posizione (es: "3 / 10")
- Barra di progresso percentuale

### Creazione/Modifica
- Modale overlay con form dedicato
- Textarea espandibili per quesiti e risposte lunghe
- Validazione in tempo reale
- Stati di caricamento durante il salvataggio

### Eliminazione
- Modale di conferma con warning visivo
- Prevenzione click accidentali
- Aggiornamento automatico della lista

---

## 🛠 Tecnologie Utilizzate

### Frontend
| Tecnologia | Versione | Scopo |
|------------|----------|-------|
| **Next.js** | 15.5.4   | Framework React con SSR e App Router |
| **React** | 19.2.0   | Libreria UI con hooks e componenti |
| **Tailwind CSS** | 4.1      | Framework CSS utility-first |
| **ESLint** | Latest   | Linting e code quality |

### Backend
| Tecnologia | Versione | Scopo |
|------------|----------|-------|
| **Supabase** | 2.75.0 | Backend-as-a-Service (PostgreSQL) |
| **@supabase/supabase-js** | 2.75.0 | Client JavaScript per Supabase |

### Build Tools
- **PostCSS** - Trasformazione CSS
- **Tailwind PostCSS Plugin** - Integrazione Tailwind
- **npm** - Package manager

---

## 📦 Prerequisiti

Prima di iniziare, assicurati di avere installato:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (incluso con Node.js)
- **Git** ([Download](https://git-scm.com/))
- Un account **Supabase** gratuito ([Registrati](https://supabase.com/))

## 🚀 Installazione e Avvio Locale

1. **Clona il repository:**
   ```bash
   git clone https://github.com/tuo-username/flashcards-giuridiche.git
   cd flashcards-giuridiche
   ```
2. **Installa le dipendenze:**
   ```bash
   npm install
   ```
3. **Configura Supabase:**
   - Crea un progetto su [Supabase](https://supabase.com/)
   - Copia le chiavi API e l'URL del progetto
   - Crea un file `.env.local` nella root con:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=la-tua-url-supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY=la-tua-anon-key
     ```
4. **Avvia il server di sviluppo:**
   ```bash
   npm run dev
   ```
   L'app sarà disponibile su [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Struttura del Progetto

```
flashcards/
├── public/                # Immagini e asset statici
├── src/
│   ├── app/               # Routing Next.js
│   │   ├── area/[id]/     # Pagine area di studio
│   │   ├── global-stats/  # Statistiche globali
│   ├── components/        # Componenti React riutilizzabili
│   ├── lib/               # Servizi e utilità (Supabase, flashcardService)
├── package.json           # Dipendenze e script
├── README.md              # Documentazione
```

---

## 🧩 Componenti Principali

- `Flashcard.jsx` - Card interattiva con animazione flip
- `FlashcardForm.jsx` - Form per creare/modificare flashcard
- `AreaStats.jsx` - Statistiche per area di studio
- `GlobalStatsClient.jsx` - Statistiche globali aggregate
- `StatCard.jsx` - Card per visualizzare metriche
- `Footer.jsx` - Footer informativo

---

## 📊 Novità e Funzionalità Recenti

- **Pagina Statistiche Globali**: Visualizza metriche aggregate su tutte le aree di studio (`/global-stats`)
- **Componenti StatCard e GlobalStatsClient**: Nuovi componenti per visualizzare dati statistici
- **Miglioramenti UI/UX**: Animazioni, feedback visivi, modali migliorate
- **Validazione avanzata**: Form con validazione in tempo reale

---

## ⚙️ Configurazione Supabase

Assicurati di aver configurato correttamente le variabili ambiente nel file `.env.local` come indicato sopra. Consulta la documentazione ufficiale Supabase per la gestione delle tabelle e delle policy di sicurezza.

---

## 📞 Supporto e Contatti

<div align="center">

[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com/tuo-username/flashcards-giuridiche/issues)
[![Email](https://img.shields.io/badge/Email-Contattaci-blue?style=for-the-badge&logo=gmail)](mailto:tua-email@example.com)
[![Discord](https://img.shields.io/badge/Discord-Community-5865F2?style=for-the-badge&logo=discord)](https://discord.gg/tuo-server)
[![Documentation](https://img.shields.io/badge/Docs-README-green?style=for-the-badge&logo=readme)](./README.md)

</div>

---

## 🙏 Ringraziamenti

<div align="center">

Questo progetto è reso possibile grazie a:

<br>

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<br>

**Un ringraziamento speciale alla comunità Open Source** 💙

</div>

---

## 📄 Licenza

Questo progetto è rilasciato sotto licenza **MIT**. Vedi il file [LICENSE.MD](./LICENSE.MD) per i dettagli.

---

**⭐ Se questo progetto ti è utile, lascia una stella su GitHub!**

**📚 Buono studio con le tue flashcards giuridiche!**
