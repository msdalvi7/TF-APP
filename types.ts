
export type UserRole = 'client' | 'admin' | 'freelancer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  deliveryTime: string;
  revisions: number;
  description: string;
  features: string[];
}

export interface Service {
  id: string;
  title: string;
  category: 'Design' | 'Content' | 'Social' | 'Management';
  description: string;
  icon: string;
  startingPrice: number;
  packages: ServicePackage[];
}

export type OrderStatus = 'pending' | 'in-progress' | 'delivered' | 'revision' | 'completed';

export interface Order {
  id: string;
  serviceId: string;
  clientId: string;
  freelancerId?: string;
  packageId: string;
  status: OrderStatus;
  createdAt: string;
  brief: string;
  price: number;
  deliverables: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}
