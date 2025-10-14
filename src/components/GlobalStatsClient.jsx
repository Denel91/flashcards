"use client";
import { useEffect, useState } from 'react';
import { getGlobalStats } from '@/lib/flashcardService';

const areaConfig = {
    civile: {
        name: 'Diritto Civile',
        icon: '⚖️',
        color: 'from-amber-400 via-amber-500 to-orange-500',
        bgColor: 'from-amber-400 via-amber-500 to-orange-500',
        textColor: 'text-white',
        borderColor: 'border-amber-300'
    },
    amministrativo: {
        name: 'Diritto Amministrativo',
        icon: '🏛️',
        color: 'from-blue-400 via-blue-500 to-indigo-500',
        bgColor: 'from-blue-400 via-blue-500 to-indigo-500',
        textColor: 'text-white',
        borderColor: 'border-blue-300'
    },
    penale: {
        name: 'Diritto Penale',
        icon: '⚔️',
        color: 'from-emerald-400 via-green-500 to-teal-500',
        bgColor: 'from-emerald-400 via-green-500 to-teal-500',
        textColor: 'text-white',
        borderColor: 'border-green-300'
    },
};

export default function GlobalStatsClient() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGlobalStats().then((result) => {
            setStats(result);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 font-medium">Caricamento statistiche...</p>
                </div>
            </div>
        );
    }

    // Calcola statistiche globali
    const globalTotals = Object.values(stats || {}).reduce((acc, areaStats) => ({
        totalCards: acc.totalCards + areaStats.totalCards,
        studiedCards: acc.studiedCards + areaStats.studiedCards,
        totalStudies: acc.totalStudies + areaStats.totalStudies,
        totalCorrect: acc.totalCorrect + areaStats.totalCorrect,
        reviewCards: acc.reviewCards + areaStats.reviewCards,
    }), { totalCards: 0, studiedCards: 0, totalStudies: 0, totalCorrect: 0, reviewCards: 0 });

    const globalAccuracy = globalTotals.totalStudies > 0
        ? ((globalTotals.totalCorrect / globalTotals.totalStudies) * 100).toFixed(1)
        : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header con bottone per tornare alla Home */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="group flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200 hover:gap-3"
                    >
                        <span className="text-xl group-hover:transform group-hover:-translate-x-1 transition-transform">←</span>
                        <span>Torna alla Home</span>
                    </button>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
                        Dashboard Statistiche
                    </h1>
                    <p className="text-lg text-gray-600">
                        Panoramica completa del tuo progresso nello studio
                    </p>
                </div>

                {/* Metriche Globali */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="text-sm font-medium text-gray-500 mb-1">Flashcard Totali</div>
                        <div className="text-3xl font-bold text-blue-600">{globalTotals.totalCards}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="text-sm font-medium text-gray-500 mb-1">Studiate</div>
                        <div className="text-3xl font-bold text-green-600">{globalTotals.studiedCards}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="text-sm font-medium text-gray-500 mb-1">Da Rivedere</div>
                        <div className="text-3xl font-bold text-red-500">{globalTotals.reviewCards}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="text-sm font-medium text-gray-500 mb-1">Sessioni</div>
                        <div className="text-3xl font-bold text-purple-600">{globalTotals.totalStudies}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="text-sm font-medium text-gray-500 mb-1">Precisione</div>
                        <div className="text-3xl font-bold text-orange-600">{globalAccuracy}%</div>
                    </div>
                </div>

                {/* Tabella Comparativa Aree */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-xl font-bold text-gray-900">Confronto per Area</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Area
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Totali
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Studiate
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Da Rivedere
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Sessioni
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Precisione
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Progresso
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Object.entries(stats).map(([areaKey, areaStats]) => {
                                    const config = areaConfig[areaKey];

                                    const progress = areaStats.totalCards > 0
                                        ? ((areaStats.studiedCards / areaStats.totalCards) * 100).toFixed(0)
                                        : 0;

                                    return (
                                        <tr key={areaKey} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{config.icon}</span>
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900">{config.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                    {areaStats.totalCards}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    {areaStats.studiedCards}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {areaStats.reviewCards > 0 ? (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                                        {areaStats.reviewCards}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">0</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm font-medium text-gray-900">{areaStats.totalStudies}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className={`text-sm font-bold ${
                                                        areaStats.accuracy >= 80 ? 'text-green-600' :
                                                        areaStats.accuracy >= 60 ? 'text-orange-600' :
                                                        'text-red-600'
                                                    }`}>
                                                        {areaStats.accuracy}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                                        <div
                                                            className={`h-full bg-gradient-to-r ${config.color} transition-all duration-500`}
                                                            style={{ width: `${progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-600 w-10 text-right">{progress}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Card Dettagliate per Area */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(stats).map(([areaKey, areaStats]) => {
                        const config = areaConfig[areaKey];
                        if (!config) return null; // Ignora aree non configurate

                        const progress = areaStats.totalCards > 0
                            ? ((areaStats.studiedCards / areaStats.totalCards) * 100).toFixed(0)
                            : 0;

                        return (
                            <div key={areaKey} className={`bg-white rounded-xl shadow-sm border ${config.borderColor} overflow-hidden hover:shadow-md transition-shadow`}>
                                <div className={`bg-gradient-to-r ${config.bgColor} px-6 py-4 border-b ${config.borderColor}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{config.icon}</span>
                                        <h3 className={`text-lg font-bold ${config.textColor}`}>{config.name}</h3>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    {/* Progress Bar */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600 font-medium">Completamento</span>
                                            <span className={`font-bold ${config.textColor}`}>{progress}%</span>
                                        </div>
                                        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${config.color} transition-all duration-500`}
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Metriche */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="text-xs text-gray-500 mb-1">Flashcard</div>
                                            <div className="text-xl font-bold text-gray-900">{areaStats.totalCards}</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="text-xs text-gray-500 mb-1">Studiate</div>
                                            <div className="text-xl font-bold text-green-600">{areaStats.studiedCards}</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="text-xs text-gray-500 mb-1">Da Rivedere</div>
                                            <div className="text-xl font-bold text-red-500">{areaStats.reviewCards}</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="text-xs text-gray-500 mb-1">Precisione</div>
                                            <div className={`text-xl font-bold ${
                                                areaStats.accuracy >= 80 ? 'text-green-600' :
                                                areaStats.accuracy >= 60 ? 'text-orange-600' :
                                                'text-red-600'
                                            }`}>
                                                {areaStats.accuracy}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
