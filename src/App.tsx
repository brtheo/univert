/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen } from './types';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import ExchangeScreen from './screens/ExchangeScreen';
import AtelierScreen from './screens/AtelierScreen';
import InventoryScreen from './screens/InventoryScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import WeeklyMenuScreen from './screens/WeeklyMenuScreen';
import ProposeExchangeScreen from './screens/ProposeExchangeScreen';
import { Exchange } from './types';

const INITIAL_EXCHANGES: Exchange[] = [
  {
    id: '1',
    user: 'Marie L.',
    type: 'queue',
    title: "File d'attente Restos du Cœur",
    description: "Je récupère 2 portions demain matin. Cherche partenaire pour échange de repas.",
    location: 'Paris 13e',
    time: 'Demain, 9h',
    tags: ['Végétarien', 'Sans gluten'],
    diet: ['Végétarien']
  },
  {
    id: '2',
    user: 'Thomas B.',
    type: 'meal',
    title: "Curry de lentilles maison",
    description: "1 portion généreuse de curry de lentilles corail. Fait aujourd'hui, se conserve 3 jours.",
    location: 'Campus Jussieu',
    time: 'Disponible maintenant',
    tags: ['Végane', 'Protéiné'],
    diet: ['Végane']
  }
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [exchanges, setExchanges] = useState<Exchange[]>(INITIAL_EXCHANGES);

  const handleAddExchange = (newExchange: Omit<Exchange, 'id' | 'user'>) => {
    const exchange: Exchange = {
      ...newExchange,
      id: Math.random().toString(36).substr(2, 9),
      user: 'Moi', // Default user for demo
    };
    setExchanges([...exchanges, exchange]);
    setActiveScreen('exchange');
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return (
          <HomeScreen 
            onRegister={() => setActiveScreen('registration')} 
            onGenerateMenu={() => setActiveScreen('weekly-menu')}
          />
        );
      case 'exchange':
        return (
          <ExchangeScreen 
            exchanges={exchanges}
            onPropose={() => setActiveScreen('propose-exchange')} 
          />
        );
      case 'atelier':
        return <AtelierScreen onRegister={() => setActiveScreen('registration')} />;
      case 'inventory':
        return <InventoryScreen />;
      case 'registration':
        return (
          <RegistrationScreen 
            onBack={() => setActiveScreen('home')} 
            onConfirm={() => setActiveScreen('atelier')} 
          />
        );
      case 'weekly-menu':
        return <WeeklyMenuScreen onBack={() => setActiveScreen('home')} />;
      case 'propose-exchange':
        return (
          <ProposeExchangeScreen 
            onBack={() => setActiveScreen('exchange')} 
            onSuccess={handleAddExchange} 
          />
        );
      default:
        return (
          <HomeScreen 
            onRegister={() => setActiveScreen('registration')} 
            onGenerateMenu={() => setActiveScreen('weekly-menu')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {activeScreen !== 'registration' && activeScreen !== 'weekly-menu' && activeScreen !== 'propose-exchange' && (
        <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      )}
    </div>
  );
}
