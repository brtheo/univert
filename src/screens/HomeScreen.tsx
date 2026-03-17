import { motion } from 'motion/react';
import { Bell, User, ChevronRight, ExternalLink, Search, Plus, ChefHat, Heart, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';
import Vivi from '../components/Vivi';

interface HomeScreenProps {
  onRegister: () => void;
  onGenerateMenu: () => void;
}

export default function HomeScreen({ onRegister, onGenerateMenu }: HomeScreenProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addIngredient = () => {
    if (inputValue.trim()) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">uni-vert</h1>
          <p className="text-sm text-gray-500">Ton hub étudiant à Nantes</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-white rounded-xl shadow-sm relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 bg-white rounded-xl shadow-sm">
            <User size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Banners Stack */}
      <div className="space-y-4 mb-8">
        {/* Atelier Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-100 rounded-3xl p-5 relative overflow-hidden shadow-sm"
        >
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
              Prochain Atelier
            </span>
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              Atelier Cuisine Collective <ChefHat size={20} className="text-gray-700" />
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Prépare 5 repas pour la semaine avec d'autres étudiants — seulement 5 € !
            </p>
            <div className="flex gap-4 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1">📅 Dim. 9 mars</span>
              <span className="flex items-center gap-1">📍 Campus Nantes</span>
            </div>
            <button 
              onClick={onRegister}
              className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
            >
              S'inscrire <ChevronRight size={18} />
            </button>
          </div>
          <ChefHat size={80} className="absolute -right-4 -top-4 text-emerald-100 opacity-50 rotate-12" />
        </motion.div>

        {/* Linkee Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-teal-50 border border-teal-100 rounded-3xl p-5 relative overflow-hidden shadow-sm"
        >
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
              Aide Alimentaire
            </span>
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              Linkee Nantes <Heart size={20} className="text-emerald-500 fill-emerald-500" />
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Récupère des produits frais gratuits lors des distributions solidaires. Ouvert à tous les étudiants, sans condition.
            </p>
            <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <ExternalLink size={18} /> Prochaine distribution
            </button>
          </div>
          <Heart size={80} className="absolute -right-4 -bottom-4 text-teal-100 opacity-50 -rotate-12" />
        </motion.div>

        {/* CROUS Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-100 rounded-3xl p-5 relative overflow-hidden shadow-sm"
        >
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
              Resto U
            </span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Menus CROUS du jour
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Repas équilibrés à partir de 1 € dans les restaurants universitaires de Nantes.
            </p>
            <button className="text-emerald-600 font-bold flex items-center gap-1 hover:underline">
              Voir les menus CROUS <ChevronRight size={18} />
            </button>
          </div>
          <UtensilsCrossed size={80} className="absolute -right-4 -bottom-4 text-gray-50 opacity-50 rotate-45" />
        </motion.div>
      </div>

      {/* Menu Generator */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          Générateur de Menu <ChefHat size={20} className="text-emerald-600" />
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Quels ingrédients as-tu reçus aujourd'hui ? Vivi t'aide à planifier ta semaine.
        </p>
        
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Ex: Carottes, Lentilles..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 text-sm"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
            />
          </div>
          <button 
            onClick={addIngredient}
            className="p-3 bg-emerald-600 text-white rounded-2xl shadow-md shadow-emerald-100"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {ingredients.map((ing, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1">
              {ing}
              <button onClick={() => setIngredients(ingredients.filter((_, i) => i !== idx))} className="hover:text-emerald-900">×</button>
            </span>
          ))}
          {ingredients.length === 0 && (
            <p className="text-xs text-gray-400 italic">Aucun ingrédient ajouté</p>
          )}
        </div>

        <button 
          onClick={onGenerateMenu}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
        >
          Générer mon menu de la semaine
        </button>
      </section>

      {/* Vivi Mascot Floating */}
      <div className="fixed bottom-24 right-6 z-[100]">
        <Vivi className="scale-110" />
      </div>
    </div>
  );
}
