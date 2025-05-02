import { Team } from '@/lib/types';
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

export default function GraphDisplay({ teams }: { teams: Team[] }) {
  return (
    <>
      {
        teams.length === 0 ? (
          <div className="flex items-center justify-center h-full mb-15">
            <p className="text-gray-500">Nenhuma equipa adicionada ainda.</p>
          </div>
        ) : (
          <div className="h-72 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teams} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fill: '#4b5563' }} axisLine={{ stroke: '#9ca3af' }} />
                <YAxis tick={{ fill: '#4b5563' }} axisLine={{ stroke: '#9ca3af' }} />
                <Tooltip
                  formatter={(value) => [`${value} bebidas`, 'Quantidade']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  cursor={{ fill: 'rgba(224, 231, 255, 0.2)' }}
                />
                <Bar
                  dataKey="drinks"
                  radius={[6, 6, 0, 0]}
                  barSize={60}
                  fillOpacity={0.8}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {teams.map((team, index) => (
                    <Cell key={`cell-${index}`} fill={team.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      }
    </>
  );
};
