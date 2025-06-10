---
id: projet-global
title: Réaliser, optimiser et administrer
sidebar_position: 0
---

# Projet regroupé pour les compétences déjà acquise en BUT 2

Les compétences Réaliser, Optimiser et Administrer sont regroupées en un seul projet que je vais détailler ici,
car ce sont des compétences déjà acquises en BUT2, je vais donc les aborder à l'aide d'un projet réaliser en cours.

## Contexte

Le projet concerné est une SAE de troisième année, apportée par **Adélaïde**, la secrétaire de l’IUT Informatique de La Rochelle.

Adélaïde est chargée de gérer les missions des professeurs, contractuels et intervenants qui viennent assurer des cours à Niort.  
Ces déplacements sont indemnisés, mais pour cela, elle doit créer une mission sur une plateforme de l’université. Cette opération, censée être administrative, s’avère en réalité chronophage et peu ergonomique.

Voici les principales difficultés rencontrées :

- Le formulaire à remplir est complexe, demande de nombreuses informations, et aucune donnée n’est mémorisée.  
  Elle doit donc tout ressaisir à chaque fois pour chaque intervenant.
- Les modes de transport doivent être spécifiés à chaque mission :  
  - Pour les déplacements en voiture, elle doit renseigner :
    - les informations d’assurance** et de carte grise,
    - calculer la distance avec une application externe,
    - appliquer une formule de remboursement à partir d’un tableau contenant des constantes.  
  - Pour les trajets en train, elle doit :
    - réserver les billets via une plateforme agréée par l’université,
    - s’assurer que les horaires correspondent à ceux de la mission.
- Si un intervenant reste sur place pour une réunion ou un autre motif, elle doit également fournir un **justificatif** pour éviter toute suspicion de fraude.

Adélaïde réalisait tout cela manuellement :
- Elle saisissait chaque mission à la main, en fonction de l’emploi du temps des enseignants,
- Elle notait les informations sur un calepin,
- Elle échangeait par e-mail pour collecter les informations complémentaires.

Ce système, entièrement artisanal, lui faisait perdre énormément de temps et laissait peu de place à l’automatisation ou à la fiabilité des données.

Dans ce projet, notre objectif était de concevoir une application permettant à Adélaïde de gérer les missions plus facilement et efficacement.

## Méthodologie de conduite du projet

Ce projet a été conduit selon une méthodologie Agile, structurée en trois sprints principaux.  
J’ai assuré le rôle de Product Owner, en lien direct avec les parties prenantes :
Adélaïde, mais aussi plusieurs enseignants de l’IUT, ce qui nous a un peu perdu au début du projet.

### Sprint 1 : cadrage du besoin

Le démarrage a été difficile en raison de besoin client diverse. 
Le projet mêlait les attentes d’Adélaïde (l’utilisatrice principale) et celles des enseignants, qui voulaient aussi bénéficier de l’outil.  
Une idée ambitieuse avait été envisagée : utiliser une IA pour extraire automatiquement les informations contenues dans les mails des enseignants afin d’aider à la génération des missions.  
Mais cette piste s’est révélée trop complexe et pas asser axée sur le besoin réel, elle à donc été gardé comme fonctionnalité future.
À la fin du sprint, nous avons recadré le besoin :  

#### Objectifs

L’application devait répondre aux besoins suivants :
- Centraliser les informations des enseignants/intervenants,
- Simplifier la création des missions en mémorisant les données utiles,
- Automatiser les calculs (remboursement, distance),
- Générer les justificatifs nécessaires,
- Offrir une interface claire et adaptée à son usage quotidien.

### Sprint 2 : gestionnaire de missions et automatisation

L’objectif de ce sprint était de remplacer le système papier (le calepin d’Adélaïde) par une application centralisée.  
Les principales avancées ont été :

#### Technologies utilisées

- **Back-end** : `FastAPI` (Python)  
  → Choix motivé par sa **simplicité**, sa **rapidité de mise en place** et sa **compatibilité native avec OpenAPI/Swagger** pour documenter automatiquement l’API.  
    Idéal pour construire rapidement une API RESTful. De plus l'ORM (Object Relation Model) SQLModel qui est aussi developpé par la même équipe,
    nous a permis de simplifier l’interaction avec la base de données.

- **Base de données** : `PostgreSQL`  
  → Base relationnelle robuste, adaptée à la structuration des données métiers (enseignants, missions).  
    Elle permet de gérer efficacement les relations entre les différentes entités et d’assurer la pérennité des données.

- **Front-end** : `React` avec `TypeScript`  
  → Framework moderne et maintenu, avec une forte réactivité côté interface utilisateur. TypeScript nous a permis de mieux structurer le code, limiter les erreurs et améliorer la maintenabilité.  
    Le Framework Tailwind CSS a été utilisé pour le design, afin de créer une interface utilisateur moderne et responsive.

- **Déploiement** : `Clever Cloud` avec deux environnements (développement et production)  
  → Clever Cloud offre un déploiement automatisé, simple et fiable. L’utilisation de deux environnements nous a permis de tester en continu sans impacter la version utilisée par Adélaïde.
    Un choix par défaut, car nous possédions des accès à cette plateforme mais qui par éxperience avec des concurrents, est très simple à mettre en place.

- **Gestion de versions** : `Git` avec `GitLab`  
  → GitLab de l'IUT pour la documentation (Wiki) et la gestion de versions.

