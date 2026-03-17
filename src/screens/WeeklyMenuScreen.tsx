import { motion } from 'motion/react';
import { ChevronLeft, Calendar, Clock, ChefHat, ArrowRight, Utensils } from 'lucide-react';

interface WeeklyMenuScreenProps {
  onBack: () => void;
}

const WEEKLY_PLAN = [
  { day: 'Lundi', lunch: 'Dahl de lentilles au coco', dinner: 'Soupe de potiron et gingembre' },
  { day: 'Mardi', lunch: 'Salade de quinoa rôtie', dinner: 'Curry de pois chiches' },
  { day: 'Mercredi', lunch: 'Risotto aux champignons', dinner: 'Reste de Dahl' },
  { day: 'Jeudi', lunch: 'Pâtes au pesto maison', dinner: 'Reste de Curry' },
  { day: 'Vendredi', lunch: 'Bowl de légumes rôtis', dinner: 'Soupe de potiron' },
  { day: 'Samedi', lunch: 'Brunch étudiant', dinner: 'Pizza maison' },
  { day: 'Dimanche', lunch: 'Repas de famille', dinner: 'Préparation Batch Cooking' },
];

export default function WeeklyMenuScreen({ onBack }: WeeklyMenuScreenProps) {
  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 bg-white rounded-xl shadow-sm text-gray-600 hover:text-emerald-600 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Mon Menu de la Semaine</h1>
      </header>

      <div className="space-y-4">
        {WEEKLY_PLAN.map((item, index) => (
          <motion.div
            key={item.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-emerald-700">{item.day}</h3>
              <Calendar size={16} className="text-gray-300" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 bg-orange-50 text-orange-600 rounded-lg">
                  <Utensils size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Déjeuner</p>
                  <p className="text-sm font-medium text-gray-800">{item.lunch}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <Clock size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Dîner</p>
                  <p className="text-sm font-medium text-gray-800">{item.dinner}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Button */}
      <div className="mt-8">
        <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
          Voir la liste de courses <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
