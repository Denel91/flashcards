export default function StatCard({ area, stats, color }) {
    return (
        <div className={`rounded-xl shadow-lg p-6 bg-gradient-to-br ${color} text-white flex flex-col gap-2 transition-transform hover:scale-105`}>
            <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">{area}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <div className="font-semibold">Carte Totali</div>
                    <div className="text-2xl">{stats.totalCards}</div>
                </div>
                <div>
                    <div className="font-semibold">Studiate</div>
                    <div className="text-2xl">{stats.studiedCards}</div>
                </div>
                <div>
                    <div className="font-semibold">Sessioni</div>
                    <div className="text-2xl">{stats.totalStudies}</div>
                </div>
                <div>
                    <div className="font-semibold">Precisione</div>
                    <div className="text-2xl">{stats.accuracy}%</div>
                </div>
                <div>
                    <div className="font-semibold">Da rivedere</div>
                    <div className="text-2xl">{stats.reviewCards}</div>
                </div>
            </div>
        </div>
    );
}

