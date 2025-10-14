'use client';

export default function AreaStats({stats}) {
    if (!stats) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Carte Totali</div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalCards}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Studiate</div>
                <div className="text-2xl font-bold text-green-600">{stats.studiedCards}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Da rivedere</div>
                <div className="text-2xl font-bold text-red-500">{stats.reviewCards}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Sessioni</div>
                <div className="text-2xl font-bold text-purple-600">{stats.totalStudies}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Precisione</div>
                <div className="text-2xl font-bold text-orange-600">{stats.accuracy}%</div>
            </div>
        </div>
    );
}
