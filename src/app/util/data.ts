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
      { name: 'ajouter employé', href: 'manager/createEmploye' },
      { name: 'nombre de reservation', href: 'manager/nombrereservation' },
      { name: 'chiffre d\'affaires', href: 'manager/chiffreaffaire' },
      { name: 'créer un type de dépense', href: 'manager/createTypeDepense' },
      { name: 'créer dépense', href: 'manager/createDepense' },
      { name: 'listes Benefices', href: 'manager/listeBenefice' }
      // Ajoutez d'autres liens spécifiques au rôle de manager
    ],
  },
  {
    role: 'employe',
    links: [
      { name: 'profil', href: 'employe/profil' },
      { name: 'horaire', href: 'employe/horaire' },
      { name: 'liste des rendez-vous', href: 'employe/listeRdv' },
      { name: 'suivi des taches', href: 'employe/suiviTache' }
      // Ajoutez d'autres liens spécifiques au rôle de manager
    ],
  },
  {
    role: 'client',
    links: [
      { name: 'liste des rendez-vous', href: 'client/listeRdv' },
    ],
  },
  // Ajoutez d'autres configurations de rôle si nécessaire
];
