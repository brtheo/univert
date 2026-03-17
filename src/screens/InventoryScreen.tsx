import { motion } from 'motion/react';
import { LayoutGrid, AlertCircle, Calendar, BarChart3, Plus, Search, Trash2, Clock } from 'lucide-react';
import { useState } from 'react';
import { Ingredient } from '../types';

const MOCK_STOCK: Ingredient[] = [
  { id: '1', name: 'Carottes', quantity: 500, unit: 'g', expiryDate: '2026-03-15', category: 'Légumes' },
  { id: '2', name: 'Lentilles Corail', quantity: 1, unit: 'kg', expiryDate: '2026-12-01', category: 'Féculents' },
  { id: '3', name: 'Oignons', quantity: 3, unit: 'pcs', expiryDate: '2026-03-20', category: 'Légumes' },
  { id: '4', name: 'Lait de Coco', quantity: 400, unit: 'ml', expiryDate: '2026-03-12', category: 'Autre' },
];

export default function InventoryScreen() {
  const [activeTab, setActiveTab] = useState<'stock' | 'stats' | 'history'>('stock');

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mon Stock</h1>
          <p className="text-sm text-gray-500">Gère tes ingrédients</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-white rounded-xl shadow-sm">
            <Plus size={20} className="text-emerald-600" />
          </button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Portions estimées</p>
          <p className="text-2xl font-bold text-emerald-600">~12</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">À consommer vite</p>
          <p className="text-2xl font-bold text-orange-500">2</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-2xl mb-6 shadow-sm border border-gray-100">
        <button 
          onClick={() => setActiveTab('stock')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'stock' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-400'}`}
        >
          <LayoutGrid size={16} /> Stock
        </button>
        <button 
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'stats' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-400'}`}
        >
          <BarChart3 size={16} /> Stats
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'history' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-400'}`}
        >
          <Calendar size={16} /> Historique
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Rechercher un ingrédient..."
          className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-emerald-500 text-sm"
        />
      </div>

      {/* List */}
      <div className="space-y-3">
        {activeTab === 'stock' && MOCK_STOCK.map((item) => {
          const isExpiringSoon = new Date(item.expiryDate).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000;
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  item.category === 'Légumes' ? 'bg-green-50 text-green-600' : 
                  item.category === 'Féculents' ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-600'
                }`}>
                  <LayoutGrid size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.quantity} {item.unit}</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <div className={`flex items-center gap-1 text-[10px] font-bold uppercase ${isExpiringSoon ? 'text-orange-500' : 'text-gray-400'}`}>
                  {isExpiringSoon && <AlertCircle size={10} />}
                  Exp: {new Date(item.expiryDate).toLocaleDateString('fr-FR')}
                </div>
                <button className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          );
        })}

        {activeTab === 'stats' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-6">Répartition du stock</h3>
            <div className="space-y-4">
              {[
                { label: 'Légumes', value: 45, color: 'bg-emerald-500' },
                { label: 'Féculents', value: 30, color: 'bg-orange-500' },
                { label: 'Protéines', value: 15, color: 'bg-blue-500' },
                { label: 'Autres', value: 10, color: 'bg-gray-400' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-gray-600">{stat.label}</span>
                    <span className="text-gray-900">{stat.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${stat.color}`} style={{ width: `${stat.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {[
              { date: '8 Mars', action: 'Atelier Cuisine', desc: '+5 repas préparés' },
              { date: '7 Mars', action: 'Échange', desc: '-1 portion Curry' },
              { date: '5 Mars', action: 'Distribution Linkee', desc: '+2kg légumes frais' },
            ].map((entry, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div className="w-0.5 h-12 bg-gray-100"></div>
                </div>
                <div className="pb-6">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{entry.date}</p>
                  <p className="text-sm font-bold text-gray-900">{entry.action}</p>
                  <p className="text-xs text-gray-500">{entry.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
