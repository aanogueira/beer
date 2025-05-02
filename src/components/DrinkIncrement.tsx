import { Team } from '@/lib/types';
import { Beer, MinusCircle, PlusCircle } from 'lucide-react';

type DrinkFormProps = {
  selectedTeam: Team | undefined;
  addDrinks: (teamName: string, amount: number) => void;
};

export default function DrinkIncrement({ selectedTeam, addDrinks }: DrinkFormProps) {
  return (
    <div className="w-2/3 pl-6">
      {selectedTeam ? (
        <div className="h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Adicionar Bebida para <span style={{ color: selectedTeam.color }}>{selectedTeam.name}</span>
            </h2>
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
              <Beer size={20} className="text-amber-500 mr-2" />
              <span className="font-bold text-2xl" style={{ color: selectedTeam.color }}>
                {selectedTeam.drinks}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-2">Clique um botão para adicionar ou remover bebidas</p>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => addDrinks(selectedTeam.name, 1)}
                className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 py-4 px-4 rounded-xl transition-colors duration-200 border border-blue-100">
                <PlusCircle size={24} className="mb-1" />
                <span className="font-bold text-xl">+1</span>
              </button>
              <button
                onClick={() => addDrinks(selectedTeam.name, 2)}
                className="flex flex-col items-center justify-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-4 px-4 rounded-xl transition-colors duration-200 border border-indigo-100">
                <PlusCircle size={24} className="mb-1" />
                <span className="font-bold text-xl">+2</span>
              </button>
              <button
                onClick={() => addDrinks(selectedTeam.name, 5)}
                className="flex flex-col items-center justify-center bg-purple-50 hover:bg-purple-100 text-purple-700 py-4 px-4 rounded-xl transition-colors duration-200 border border-purple-100">
                <PlusCircle size={24} className="mb-1" />
                <span className="font-bold text-xl">+5</span>
              </button>
              <button
                onClick={() => addDrinks(selectedTeam.name, 10)}
                className="flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 text-green-700 py-4 px-4 rounded-xl transition-colors duration-200 border border-green-100">
                <PlusCircle size={24} className="mb-1" />
                <span className="font-bold text-xl">+10</span>
              </button>
              <button
                onClick={() => addDrinks(selectedTeam.name, -10)}
                className="flex flex-col items-center justify-center bg-red-50 hover:bg-red-100 text-red-700 py-4 px-4 rounded-xl transition-colors duration-200 border border-red-100">
                <MinusCircle size={24} className="mb-1" />
                <span className="font-bold text-xl">-10</span>
              </button>
              <button
                onClick={() => addDrinks(selectedTeam.name, -5)}
                className="flex flex-col items-center justify-center bg-orange-50 hover:bg-orange-100 text-orange-700 py-4 px-4 rounded-xl transition-colors duration-200 border border-orange-100">
                <MinusCircle size={24} className="mb-1" />
                <span className="font-bold text-xl">-5</span>
              </button>
              <button
                onClick={() => addDrinks(selectedTeam.name, -2)}
                className="flex flex-col items-center justify-center bg-yellow-50 hover:bg-yellow-100 text-yellow-700 py-4 px-4 rounded-xl transition-colors duration-200 border border-yellow-100">
                <MinusCircle size={24} className="mb-1" />
                <span className="font-bold text-xl">-2</span>
              </button>
              <button
                onClick={() => addDrinks(selectedTeam.name, -1)}
                className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-4 rounded-xl transition-colors duration-200 border border-gray-200">
                <MinusCircle size={24} className="mb-1" />
                <span className="font-bold text-xl">-1</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center bg-gray-50 rounded-xl p-10">
          <div className="text-center">
            <Beer size={64} className="text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">Selecione uma Equipa</h3>
            <p className="text-gray-400">Clique em uma equipa à esquerda ou no gráfico acima para adicionar bebidas</p>
          </div>
        </div>
      )}
    </div>
  );
};
