import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Plus, MapPin, Clock, Bell, User, QrCode } from 'lucide-react';
import { useState } from 'react';
import { Exchange } from '../types';

interface ExchangeScreenProps {
  exchanges: Exchange[];
  onPropose: () => void;
}

export default function ExchangeScreen({ exchanges, onPropose }: ExchangeScreenProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'my'>('browse');
  const [showFilters, setShowFilters] = useState(false);
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* ... existing header ... */}
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Échanges</h1>
          <p className="text-sm text-gray-500">Entraide alimentaire</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-white rounded-xl shadow-sm">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="p-2 bg-white rounded-xl shadow-sm">
            <User size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-2xl mb-6 shadow-sm border border-gray-100">
        <button 
          onClick={() => setActiveTab('browse')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'browse' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-400'}`}
        >
          Parcourir
        </button>
        <button 
          onClick={() => setActiveTab('my')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'my' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-400'}`}
        >
          Mes échanges
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${showFilters ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}
        >
          <Filter size={18} /> Filtres
        </button>
        <button 
          onClick={onPropose}
          className="flex-1 py-3 px-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
        >
          <Plus size={18} /> Proposer
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100 overflow-hidden"
        >
          <h3 className="font-bold text-gray-900 mb-4">Régimes alimentaires</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {['Végane', 'Végétarien', 'Lacto-Végé', 'Ovo-Végé', 'Pescétarien', 'Flexitarien'].map(diet => (
              <label key={diet} className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                {diet}
              </label>
            ))}
          </div>
          <h3 className="font-bold text-gray-900 mb-4">Allergies</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Gluten', 'Lactose', 'Arachides', 'Soja'].map(allergy => (
              <label key={allergy} className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                {allergy}
              </label>
            ))}
          </div>
        </motion.div>
      )}

      {/* List */}
      <div className="space-y-4">
        {exchanges.map((exchange) => (
          <motion.div 
            key={exchange.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold overflow-hidden">
                {exchange.image ? (
                  <img src={exchange.image} alt={exchange.user} className="w-full h-full object-cover" />
                ) : (
                  exchange.user[0]
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{exchange.user}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${exchange.type === 'queue' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {exchange.type === 'queue' ? "File d'attente" : "Repas"}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900">{exchange.title}</h3>
              </div>
            </div>

            {exchange.image && (
              <div className="mb-4 rounded-2xl overflow-hidden aspect-video">
                <img src={exchange.image} alt={exchange.title} className="w-full h-full object-cover" />
              </div>
            )}
            
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {exchange.description}
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1"><MapPin size={14} /> {exchange.location}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {exchange.time}</span>
            </div>

            <div className="flex gap-2 mb-6">
              {exchange.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold">
                  {tag}
                </span>
              ))}
            </div>

            <button className="w-full py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
              Contacter
            </button>
          </motion.div>
        ))}
      </div>

      {/* QR Code Floating Button (for retrieval) */}
      <button 
        onClick={() => setShowQR(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-white text-emerald-600 rounded-2xl shadow-xl flex items-center justify-center border border-emerald-100 active:scale-90 transition-transform"
      >
        <QrCode size={28} />
      </button>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
            onClick={() => setShowQR(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] p-8 w-full max-w-xs text-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-16 h-1 bg-gray-100 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Récupération</h3>
              <p className="text-sm text-gray-500 mb-8">Scanne ce code sur le frigo partagé pour déverrouiller ton repas.</p>
              
              <div className="bg-emerald-50 p-6 rounded-[32px] mb-8 flex items-center justify-center">
                <div className="w-48 h-48 bg-white rounded-2xl border-8 border-emerald-100 flex items-center justify-center relative overflow-hidden">
                  <QrCode size={120} className="text-emerald-900" />
                  <div className="absolute inset-0 border-2 border-emerald-500/20 animate-pulse"></div>
                </div>
              </div>

              <button 
                onClick={() => setShowQR(false)}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
