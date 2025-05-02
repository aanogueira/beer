"use client";

import GraphDisplay from '@/components/GraphDisplay';
import { Team } from '@/lib/types';
import { readTeams, writeTeams } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import DrinkIncrement from '@/components/DrinkIncrement';
import DrinkCounter from '@/components/DrinksCounter';

// Extended color palette - 50 colors (with no duplicates)
const colorPalette = [
  // Blues
  '#0ea5e9', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#0369a1', '#0284c7', '#0891b2', '#06b6d4',
  // Greens
  '#10b981', '#059669', '#047857', '#065f46', '#047c5a', '#16a34a', '#15803d', '#166534', '#14532d', '#84cc16',
  // Purples
  '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#7e22ce', '#6b21a8', '#581c87', '#4338ca', '#4f46e5',
  // Reds/Oranges/Yellows
  '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f',
  // Pinks/Fuchsias
  '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843', '#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f',
  // Teals/Cyans
  '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#06b6d4', '#0e7490', '#155e75', '#164e63', '#0f766e',
];

export default function Home() {
  const [teams, setTeams] = useState([] as Team[]);

  useEffect(() => {
    const initialTeams = readTeams();
    setTeams(initialTeams);
  }, []);

  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(undefined);
  const [newTeamName, setNewTeamName] = useState('');
  const [showAddTeam, setShowAddTeam] = useState(false);

  const addDrinks = (teamName: string, amount: number) => {
    // Update state with the new drink count
    const updatedTeams = teams.map((team: Team) =>
      team.name === teamName ? { ...team, drinks: Math.max(0, team.drinks + amount) } : team
    );

    // Update state
    setTeams(updatedTeams);

    // Save to storage
    writeTeams(updatedTeams);

    // Update selected team if it's the one being modified
    if (selectedTeam && selectedTeam.name === teamName) {
      setSelectedTeam({
        ...selectedTeam,
        drinks: Math.max(0, selectedTeam.drinks + amount)
      });
    }
  };

  const addTeam = () => {
    if (newTeamName.trim()) {
      // Get a random color from our extended palette
      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];

      // Create new team
      const newTeam = { name: newTeamName, drinks: 0, color: randomColor } as Team;

      // Update state with new team
      const updatedTeams = [...teams, newTeam];
      setTeams(updatedTeams);

      // Save to storage
      writeTeams(updatedTeams);

      // Select the new team
      setSelectedTeam(newTeam);

      // Reset UI state
      setNewTeamName('');
      setShowAddTeam(false);
    }
  };

  const totalDrinks = teams.reduce((total, team) => total + team.drinks, 0);

  return (
    <div className="flex flex-col p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <DrinkCounter totalDrinks={totalDrinks} />

          <GraphDisplay teams={teams} />

          <div className="flex mb-8">
            <div className="w-1/3 pr-6 border-r border-gray-200">
              <h2 className="text-xl font-semibold mb-7 mt-2 text-gray-700">Selecione uma Equipa</h2>
              <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm">
                {teams.map((team) => (
                  <div
                    key={team.name}
                    onClick={() => setSelectedTeam(team)}
                    className={`flex justify-between items-center p-4 cursor-pointer transition-colors duration-200 border-l-4 ${selectedTeam?.name === team.name
                      ? 'bg-gray-100 border-l-blue-500'
                      : `hover:bg-gray-100 border-l-transparent`
                      }`}
                    style={{ borderBottomWidth: '1px', borderBottomColor: '#e5e7eb' }}
                  >
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: team.color }}
                      ></div>
                      <span className="font-medium">{team.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">{team.drinks}</span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </div>
                ))}

                {
                  !showAddTeam && (
                    <div
                      onClick={() => setShowAddTeam(true)}
                      className="flex items-center justify-center p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    >
                      <Plus size={18} className="mr-2 text-amber-700" />
                      <span className="font-medium">
                        Adicionar Equipa
                      </span>
                    </div>
                  )
                }
              </div>

              {showAddTeam && (
                <div className="mt-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h3 className="font-medium mb-2 text-gray-700">Nova Equipa</h3>
                  <div className="flex flex-col space-y-3">
                    <input
                      type="text"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      placeholder="Nome da equipa"
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none text-gray-700"
                      autoFocus
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={addTeam}
                        className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium flex-1">
                        Adicionar
                      </button>
                      <button
                        onClick={() => setShowAddTeam(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DrinkIncrement selectedTeam={selectedTeam} addDrinks={addDrinks} />
          </div>
        </div>
      </div>
    </div>
  );
};