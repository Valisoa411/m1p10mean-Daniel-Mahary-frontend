export const jourSemaine: string[] = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
]

export const sidebarConfig = [
  {
    role: 'manager',
    links: [
      { name: 'liste des employés', href: 'manager/listEmploye' },
      { name: 'ajouter employé', href: 'manager/createEmploye' }
      // Ajoutez d'autres liens spécifiques au rôle de manager
    ],
  },
  {
    role: 'employe',
    links: [
      { name: 'profil', href: 'employe/profil' },
      { name: 'horaire', href: 'employe/horaire' }
      // Ajoutez d'autres liens spécifiques au rôle de manager
    ],
  },
  // Ajoutez d'autres configurations de rôle si nécessaire
];
