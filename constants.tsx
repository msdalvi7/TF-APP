
import React from 'react';
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Graphic Design',
    category: 'Design',
    description: 'Stunning logos, posters, and brand identities.',
    icon: 'fa-palette',
    startingPrice: 49,
    packages: [
      { id: 'p1a', name: 'Starter', price: 49, deliveryTime: '2 Days', revisions: 1, description: 'Basic logo or social post', features: ['1 Concept', 'High Res', 'PNG/JPG'] },
      { id: 'p1b', name: 'Pro', price: 99, deliveryTime: '3 Days', revisions: 3, description: 'Full brand kit', features: ['3 Concepts', 'Source Files', 'Stationery'] }
    ]
  },
  {
    id: 's2',
    title: 'Social Media Management',
    category: 'Social',
    description: 'Consistent, high-quality posts for your brand.',
    icon: 'fa-share-nodes',
    startingPrice: 199,
    packages: [
      { id: 'p2a', name: 'Growth', price: 199, deliveryTime: '30 Days', revisions: 0, description: '12 Posts / Month', features: ['Monthly Plan', 'Captions', 'Basic Analytics'] }
    ]
  },
  {
    id: 's3',
    title: 'Copywriting & Content',
    category: 'Content',
    description: 'Persuasive copy for blogs, ads, and sites.',
    icon: 'fa-pen-nib',
    startingPrice: 29,
    packages: [
      { id: 'p3a', name: 'Standard', price: 29, deliveryTime: '24 Hours', revisions: 1, description: '500-word blog post', features: ['SEO Optimized', 'Plagiarism Check'] }
    ]
  },
  {
    id: 's4',
    title: 'LinkedIn Management',
    category: 'Management',
    description: 'Authority building for founders and pages.',
    icon: 'fa-linkedin-in',
    startingPrice: 79,
    packages: [
      { id: 'p4a', name: 'Executive', price: 79, deliveryTime: '7 Days', revisions: 2, description: '5 Targeted Posts', features: ['Strategy Session', 'Bio Optimization'] }
    ]
  },
  {
    id: 's5',
    title: 'Script Writing',
    category: 'Content',
    description: 'Engaging scripts for YouTube, Reels, and Ads.',
    icon: 'fa-video',
    startingPrice: 39,
    packages: [
      { id: 'p5a', name: 'Viral', price: 39, deliveryTime: '48 Hours', revisions: 2, description: '1 Script (up to 3 mins)', features: ['Hook Strategy', 'CTA included'] }
    ]
  },
  {
    id: 's6',
    title: 'Caption Writing',
    category: 'Social',
    description: 'Stop the scroll with killer captions.',
    icon: 'fa-quote-left',
    startingPrice: 15,
    packages: [
      { id: 'p6a', name: 'Bulk', price: 15, deliveryTime: '24 Hours', revisions: 1, description: '10 Engaging Captions', features: ['Hashtag Research', 'Emojis Included'] }
    ]
  }
];

export const MOCK_USER = {
  id: 'u1',
  name: 'Alex Rivera',
  email: 'alex@creator.com',
  role: 'client' as const,
  avatar: 'https://picsum.photos/200'
};

export const MOCK_ORDERS = [
  { id: 'ord1', serviceId: 's1', clientId: 'u1', packageId: 'p1a', status: 'in-progress' as const, createdAt: '2024-05-10', brief: 'A modern minimalist logo for my coffee shop.', price: 49, deliverables: [] },
  { id: 'ord2', serviceId: 's3', clientId: 'u1', packageId: 'p3a', status: 'delivered' as const, createdAt: '2024-05-08', brief: 'Blog post about productivity hacks.', price: 29, deliverables: ['https://example.com/blog.docx'] }
];
