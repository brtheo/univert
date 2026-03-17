import { motion } from 'motion/react';
import { Calendar, Users, BookOpen, Plus, MapPin, Clock, ChefHat, CheckCircle2, Info } from 'lucide-react';
import { useState } from 'react';
import { Workshop } from '../types';

const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: '1',
    title: 'Batch cooking végétarien',
    organizer: 'Sophie D.',
    date: 'Dim. 14 Jan',
    location: 'Cuisine CROUS',
    participants: 6,
    maxParticipants: 8,
    price: 5,
    meals: 5,
    isInscribed: true
  },
  {
    id: '2',
    title: 'Spécial Légumes d\'Hiver',
    organizer: 'Marc L.',
    date: 'Sam. 20 Jan',
    location: 'Maison des Étudiants',
    participants: 3,
    maxParticipants: 10,
    price: 5,
    meals: 5,
    isInscribed: false
  }
];

interface AtelierScreenProps {
  onRegister: () => void;
}

export default function AtelierScreen({ onRegister }: AtelierScreenProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'tasks' | 'biblio'>('upcoming');

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ateliers</h1>
          <p className="text-sm text-gray-500">Cuisine collective</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-white rounded-xl shadow-sm">
            <Users size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Info Card */}
      <div className="bg-emerald-600 text-white rounded-3xl p-5 mb-6 shadow-lg shadow-emerald-100 flex gap-4 items-start">
        <div className="p-3 bg-white/20 rounded-2xl">
          <ChefHat size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-1">Préparez 5 repas pour 5€</h3>
          <p className="text-xs text-emerald-50 leading-relaxed">
            Rejoignez un atelier de batch cooking chaque semaine et divisez le temps et les coûts avec d'autres étudiants.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-2xl mb-6 shadow-sm border border-gray-100">
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'upcoming' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-400'}`}
        >
          <Calendar size={16} /> À venir
        </button>
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'tasks' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-400'}`}
        >
          <ChefHat size={16} /> Mes tâches
        </button>
        <button 
          onClick={() => setActiveTab('biblio')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'biblio' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-400'}`}
        >
          <BookOpen size={16} /> Biblio
        </button>
      </div>

      {/* Organize Button */}
      <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-bold flex items-center justify-center gap-2 mb-6 hover:border-emerald-300 hover:text-emerald-600 transition-all">
        <Plus size={20} /> Organiser un atelier
      </button>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'upcoming' && MOCK_WORKSHOPS.map((workshop) => (
          <motion.div 
            key={workshop.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"
          >
            <div className="h-24 bg-emerald-500 flex items-center justify-center relative">
              <ChefHat size={48} className="text-white/30" />
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase">
                {workshop.meals} repas
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{workshop.title}</h3>
              <p className="text-sm text-gray-500 mb-4">Organisé par {workshop.organizer}</p>
              
              <div className="grid grid-cols-2 gap-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Calendar size={14} className="text-emerald-600" /> {workshop.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <MapPin size={14} className="text-emerald-600" /> {workshop.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Users size={14} className="text-emerald-600" /> {workshop.participants}/{workshop.maxParticipants}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="font-bold text-emerald-600">€</span> {workshop.price}€ / personne
                </div>
              </div>

              <button 
                onClick={workshop.isInscribed ? undefined : onRegister}
                className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                workshop.isInscribed 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                  : 'bg-emerald-600 text-white shadow-lg shadow-emerald-100'
              }`}>
                {workshop.isInscribed ? <><CheckCircle2 size={18} /> Inscrit·e</> : 'S\'inscrire'}
              </button>
            </div>
          </motion.div>
        ))}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Tes tâches pour dimanche</h3>
              <div className="space-y-4">
                {[
                  { id: '1', task: 'Découpe des oignons et carottes', time: '10:00 - 10:30' },
                  { id: '2', task: 'Surveillance de la cuisson des lentilles', time: '10:30 - 11:15' },
                  { id: '3', task: 'Nettoyage du plan de travail principal', time: '11:45 - 12:00' },
                ].map(item => (
                  <div key={item.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                    <div className="mt-1 w-5 h-5 rounded-full border-2 border-emerald-200 group-hover:border-emerald-500 transition-colors"></div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{item.task}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'biblio' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                  <Info size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Bibliothèque Cuisine</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Besoin d'un mixeur, d'une balance ou d'une cocotte ? Emprunte gratuitement le matériel nécessaire sur ton campus.
              </p>
              <button className="w-full py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-colors">
                Voir le catalogue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
