export type Screen = 'home' | 'exchange' | 'atelier' | 'inventory' | 'registration' | 'weekly-menu' | 'propose-exchange';

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  category: 'Légumes' | 'Fruits' | 'Protéines' | 'Féculents' | 'Autre';
}

export interface Exchange {
  id: string;
  user: string;
  type: 'queue' | 'meal';
  title: string;
  description: string;
  location: string;
  time: string;
  tags: string[];
  diet: string[];
  image?: string;
}

export interface Workshop {
  id: string;
  title: string;
  organizer: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
  price: number;
  meals: number;
  isInscribed?: boolean;
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'pending' | 'done';
}
