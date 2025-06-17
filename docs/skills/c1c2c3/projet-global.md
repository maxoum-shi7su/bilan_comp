---
id: projet-global
title: Réaliser, optimiser et administrer
sidebar_position: 0
---

# Projet regroupé pour les compétences déjà acquises en BUT 2

Pour illustrer les compétences de réalisation, d’optimisation et d’administration, j’ai choisi de présenter un projet concret mené en 3ème année de BUT Informatique. Ces compétences, déjà largement abordées au cours des deux premières années, ont été mobilisées et consolidées à travers un projet professionnel complet, avec des enjeux métiers réels et des utilisateurs finaux.

## Contexte et origine du projet

Ce projet est né d’un besoin exprimé par **Adélaïde**, secrétaire de l’IUT Informatique de La Rochelle. Elle est en charge de la gestion des missions des enseignants et intervenants extérieurs venant assurer des cours sur le site délocalisé de Niort.

La gestion de ces missions constitue une charge administrative lourde et complexe. Chaque déplacement doit être déclaré sur la plateforme universitaire afin de permettre l’indemnisation des intervenants. Cependant, cette procédure est fastidieuse et source d’erreurs, car :

- Le formulaire est long et complexe, nécessitant une ressaisie complète des informations à chaque nouvelle mission.
- Les déplacements doivent être justifiés et accompagnés de divers documents (numéro d’assurance, information carte grise, justificatifs d'emploi du temps…).
- Les distances doivent être calculées avec Mappy et les remboursements sont soumis à des barèmes précis.
- Les échanges d’informations se faisaient essentiellement par mail ou teams, souvent accompagnés de notes manuscrites.

Adélaïde passait donc beaucoup de temps à centraliser les informations, réaliser des calculs et générer des justificatifs à la main. L'objectif du projet était de concevoir une application web capable de simplifier et d'automatiser ces différentes tâches.

## Méthodologie de conduite du projet

Le projet a été conduit selon une approche Agile, avec des itérations courtes et une forte interaction avec les utilisateurs finaux. J’ai assuré le rôle de Product Owner (PO) tout au long du projet, en étroite collaboration avec Adélaïde, les enseignants et l'équipe de développement.

La gestion Agile nous a permis d’ajuster progressivement le périmètre fonctionnel en fonction des retours utilisateurs et des contraintes techniques rencontrées.

### Sprint 1 — Analyse des besoins et cadrage fonctionnel

Le démarrage du projet n’a pas été simple. Très rapidement, nous avons constaté que les attentes des enseignants et celles d'Adélaïde divergeaient sur certains aspects :

- Les enseignants souhaitaient pouvoir planifier et déclarer leurs propres missions de façon semi-automatique.
- Adélaïde, de son côté, souhaitait avant tout automatiser ses propres tâches récurrentes.

Une piste initiale avait même envisagé l’intégration d’une IA permettant d’analyser les mails des enseignants pour extraire automatiquement les informations nécessaires à la déclaration des missions. Après évaluation, cette option s’est révélée prématurée et trop complexe par rapport aux priorités du projet. Cette idée a été mise de côté pour être éventuellement envisagée comme amélioration future.

**Objectifs validés à l’issue du cadrage :**

- Centraliser et mémoriser les informations des enseignants/intervenants.
- Faciliter la création des missions récurrentes.
- Automatiser les calculs de remboursement et de distance.
- Générer les justificatifs nécessaires au dépôt sur la plateforme universitaire.
- Offrir une interface simple et ergonomique, adaptée à une utilisation quotidienne.

### Sprint 2 — Conception technique et développement initial

Durant ce sprint, nous avons posé les bases techniques de l'application et développé les premières fonctionnalités fonctionnelles et métiers.

#### Choix techniques motivés

- **Back-end : FastAPI (Python)**  
  Choisi pour sa rapidité de développement, sa simplicité, et sa documentation automatique via OpenAPI/Swagger. L’utilisation de `SQLModel` (un ORM léger développé par le créateur de FastAPI) a grandement facilité la modélisation des données métiers.
  
- **Base de données : PostgreSQL**  
  Base relationnelle robuste et éprouvée, parfaitement adaptée à la structuration des données liées aux missions, intervenants, etc.
  
- **Front-end : React avec TypeScript et Tailwind CSS**  
  Choix moderne et fiable pour une interface réactive et maintenable. TypeScript a permis une meilleure qualité de code et une détection précoce des erreurs. Tailwind a simplifié le design responsive et harmonisé les interfaces.
  
- **Déploiement : Clever Cloud**  
  Solution PaaS simple et efficace, avec deux environnements distincts (développement et production), facilitant le déploiement continu et sécurisé.
  
- **Gestion de versions : GitLab de l’IUT**  
  Pour centraliser le code, la documentation et organiser les différentes branches de développement.

#### Fonctionnalités développées lors de ce sprint

- **Création et gestion des missions** : avec génération automatique à partir de l'emploi du temps des enseignants.
- **Formulaires simplifiés** : permettant d’ajouter les détails de chaque mission (lieu, date, heure, motif…).
- **Génération de justificatifs en PDF** : export des emplois du temps sous forme de pièces justificatives.

### Sprint 3 — Améliorations ergonomiques et gestion des comptes utilisateurs

Une fois le socle fonctionnel stabilisé, nous avons concentré les efforts sur l'expérience utilisateur :

- **Système d'authentification et de comptes utilisateurs**  
  Chaque intervenant dispose désormais d’un compte personnel, lui permettant de retrouver facilement ses missions, compléter ses informations et fournir ses pièces justificatives directement dans l’application.

- **Amélioration de l’interface utilisateur (UI/UX)**  
  Intégration de nombreux retours utilisateurs pour fluidifier les opérations quotidiennes, notamment la gestion des transports et le copier-coller vers la plateforme universitaire.

- **Centralisation des informations de transport**  
  Les données récurrentes (assurance, carte grise, lieux habituels de départ, etc.) sont mémorisées dans le compte utilisateur, évitant la ressaisie systématique.

- **Calcul automatique des remboursements** : intégration des barèmes officiels kilométriques et des distances.

#### Gestion des données personnelles et respect du RGPD

Dès la conception, nous avons pris en compte la nécessité de limiter la quantité de données personnelles collectées :

- Prénom et Nom
- Trigramme (identifiant unique de l’IUT)
- Informations de transport strictement nécessaires (véhicule et documents obligatoires)

Aucune donnée superflue ou sensible inutile n’est stockée, et les utilisateurs ont accès à leurs données personnelles directement depuis leur compte.

## Difficultés rencontrées

Au-delà des aspects purement techniques, plusieurs difficultés ont nécessité des ajustements importants :

- **Clarification des besoins fonctionnels en phase initiale**, les attentes multiples des différentes parties prenantes ont nécessité plusieurs ateliers de recadrage.
- **Alignement de l'équipe projet** : certains choix techniques devaient être justifiés pour assurer l'adhésion collective.
- **Équilibre charge de travail - priorités** : respecter les délais tout en proposant une solution vraiment utilisable dès la livraison.

## Bilan personnel et enseignements

Ce projet a été très formateur à plusieurs niveaux :

- **Sur le plan technique** : développement full-stack, gestion des bases de données relationnelles, déploiement cloud, sécurisation des données.
- **Sur le plan gestion de projet** : planification agile, adaptation continue, gestion de l'incertitude, recadrage fonctionnel.
- **Sur le plan humain** : communication avec les parties prenantes, pédagogie auprès de l'équipe projet, recherche de compromis équilibrés.

L’un des aspects les plus satisfaisants a été de voir l’application adoptée immédiatement par Adélaïde, qui a très vite pu abandonner ses méthodes manuelles. Ce type de retour d’usage concret est extrêmement motivant et donne du sens aux compétences que nous acquérons pendant le BUT.

## Compétences validées

- **C1. Réaliser un développement d'application**  
  Conception et réalisation complète d’une application web, du cahier des charges jusqu’à la mise en production.

- **C2. Optimiser des applications**  
  Automatisation des tâches administratives et des calculs de remboursement. Structure de données efficace et performances optimisées.

- **C3. Administrer des systèmes informatiques communicants complexes**  
  Déploiement cloud, gestion de la base de données PostgreSQL, configuration des environnements.

- **C5. Conduire un projet**  
  Gestion des sprints, animation des réunions de cadrage, planification des fonctionnalités, coordination de l’équipe.

- **C6. Collaborer au sein d’une équipe informatique**  
  Communication continue, gestion des échanges techniques et fonctionnels, adaptation au rythme de travail collectif.

## Conclusion

Ce projet représente parfaitement l’entente entre les compétences techniques et les compétences de gestion de projet que j’ai acquises au cours de mon BUT. La satisfaction de livrer un outil utile et utilisé au quotidien par de vrais utilisateurs reste l’une des plus belles récompenses sur un projet informatique.
