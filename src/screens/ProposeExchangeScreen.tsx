import { motion } from 'motion/react';
import { ChevronLeft, Camera, MapPin, Clock, Tag, Info, X } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { Exchange } from '../types';

interface ProposeExchangeScreenProps {
  onBack: () => void;
  onSuccess: (exchange: Omit<Exchange, 'id' | 'user'>) => void;
}

export default function ProposeExchangeScreen({ onBack, onSuccess }: ProposeExchangeScreenProps) {
  const [type, setType] = useState<'meal' | 'queue'>('meal');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !location || !time) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const defaultImage = type === 'meal' 
      ? `https://picsum.photos/seed/${encodeURIComponent(title)}/800/450`
      : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'; // Generic community/queue image

    const newExchange: Omit<Exchange, 'id' | 'user'> = {
      type,
      title,
      description,
      location,
      time,
      tags: tags.split(',').map(t => t.trim()).filter(t => t !== ''),
      diet: [], // Can be expanded later
      image: image || defaultImage,
    };

    onSuccess(newExchange);
  };

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
        <h1 className="text-xl font-bold text-gray-900">Proposer un échange</h1>
      </header>

      <div className="space-y-6">
        {/* Type Selector */}
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
          <button 
            onClick={() => setType('meal')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${type === 'meal' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-400'}`}
          >
            Un repas
          </button>
          <button 
            onClick={() => setType('queue')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${type === 'queue' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-400'}`}
          >
            Une file d'attente
          </button>
        </div>

        {/* Photo Upload Section */}
        <div 
          onClick={() => !image && fileInputRef.current?.click()}
          className={`relative aspect-video rounded-[32px] border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all overflow-hidden ${
            image ? 'border-transparent bg-gray-100' : 'border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
          }`}
        >
          {image ? (
            <>
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
              <button 
                onClick={(e) => { e.stopPropagation(); setImage(null); }}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full backdrop-blur-sm"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <Camera size={32} />
              <span className="text-sm font-bold">Ajouter une photo</span>
              <p className="text-[10px] opacity-60">Ou utilise une photo générique</p>
            </>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Titre de l'annonce</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Curry de lentilles maison"
              className="w-full bg-transparent border-none p-0 text-gray-900 placeholder:text-gray-300 focus:ring-0 font-medium"
            />
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Détails sur les ingrédients, la conservation..."
              className="w-full bg-transparent border-none p-0 text-gray-900 placeholder:text-gray-300 focus:ring-0 font-medium min-h-[100px] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                <MapPin size={10} /> Lieu
              </label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Campus"
                className="w-full bg-transparent border-none p-0 text-gray-900 placeholder:text-gray-300 focus:ring-0 font-medium text-sm"
              />
            </div>
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                <Clock size={10} /> Disponibilité
              </label>
              <input 
                type="text" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Ex: Demain 12h"
                className="w-full bg-transparent border-none p-0 text-gray-900 placeholder:text-gray-300 focus:ring-0 font-medium text-sm"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
              <Tag size={10} /> Tags (séparés par des virgules)
            </label>
            <input 
              type="text" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ex: Végétarien, Sans gluten"
              className="w-full bg-transparent border-none p-0 text-gray-900 placeholder:text-gray-300 focus:ring-0 font-medium text-sm"
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-2xl p-4 flex gap-3">
          <Info size={20} className="text-blue-500 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            En proposant un échange, tu contribues à la lutte contre le gaspillage alimentaire. Merci !
          </p>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
        >
          Publier l'annonce
        </button>
      </div>
    </div>
  );
}
