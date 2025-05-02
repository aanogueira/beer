import { Beer } from "lucide-react";

export default function DrinkCounter({ totalDrinks }: { totalDrinks: number }) {
  return (
    <div className="flex justify-between items-center mb-10">
      <div className="flex items-center space-x-3">
        <Beer size={32} className="text-amber-600" />
        <h1 className="text-3xl font-bold bg-clip-text">
          Contador de Bebidas
        </h1>
      </div>
      <div className="bg-gray-50 px-4 py-2 rounded-lg">
        <span className="text-gray-800 font-medium">Total: </span>
        <span className="text-amber-700 font-bold text-xl">{totalDrinks}</span>
      </div>
    </div>
  );
}