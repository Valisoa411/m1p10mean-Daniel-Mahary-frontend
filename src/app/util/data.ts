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
      { name: 'Liste des employés', href: 'manager/listEmploye' },
      { name: 'Ajouter employé', href: 'manager/createEmploye' },
      { name: 'Gestion des services', href: 'manager/service' },
      { name: 'Gestion des offres spéciales', href: 'manager/offreSpecial' },
      // Ajoutez d'autres liens spécifiques au rôle de manager
    ],
  },
  {
    role: 'employe',
    links: [
      { name: 'profil', href: 'employe/profil' },
      { name: 'horaire', href: 'employe/horaire' },
      { name: 'liste des rendez-vous', href: 'employe/listeRdv' }
      // Ajoutez d'autres liens spécifiques au rôle de manager
    ],
  },
  {
    role: 'client',
    links: [
      { name: 'Accueil', href: 'client/accueil' },
      { name: 'Employées', href: 'client/employe' },
    ]
  }
  // Ajoutez d'autres configurations de rôle si nécessaire
];
