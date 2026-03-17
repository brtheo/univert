import { motion } from 'motion/react';
import { ChevronLeft, Calendar, MapPin, Clock, Euro, ChefHat, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { Screen } from '../types';

interface RegistrationScreenProps {
  onBack: () => void;
  onConfirm: () => void;
}

export default function RegistrationScreen({ onBack, onConfirm }: RegistrationScreenProps) {
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
        <h1 className="text-xl font-bold text-gray-900">Inscription Atelier</h1>
      </header>

      {/* Workshop Summary Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 mb-6"
      >
        <div className="h-32 bg-emerald-600 flex items-center justify-center relative">
          <ChefHat size={64} className="text-white/20" />
          <div className="absolute bottom-4 left-6 text-white">
            <h2 className="text-2xl font-bold">Batch cooking végétarien</h2>
            <p className="text-emerald-100 text-sm">Organisé par Sophie D.</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Date</p>
                <p className="text-sm font-bold text-gray-900">Dim. 14 Jan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Heure</p>
                <p className="text-sm font-bold text-gray-900">10:00 - 13:00</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Lieu</p>
                <p className="text-sm font-bold text-gray-900">Cuisine CROUS</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Euro size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Prix</p>
                <p className="text-sm font-bold text-gray-900">5,00 €</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Info size={18} className="text-emerald-600" /> Au menu cette semaine
              </h3>
              <ul className="space-y-2">
                {['Dahl de lentilles corail au coco', 'Curry de pois chiches et épinards', 'Risotto aux champignons', 'Salade de quinoa rôtie', 'Soupe de potiron et gingembre'].map((dish, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-2xl">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                    {dish}
                  </li>
                ))}
              </ul>
            </section>

            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="text-xs text-orange-800 leading-relaxed">
                <span className="font-bold">Note :</span> Apporte tes propres contenants (5 boîtes) pour repartir avec tes repas !
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 z-50">
        <button 
          onClick={onConfirm}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
        >
          Confirmer l'inscription <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
