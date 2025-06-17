---
id: projet-tut
title: Projet Suivi de Ligne IA
sidebar_position: 0
---

# Suivi de Ligne avec Intelligence Artificielle

## Le Suivi de Ligne en Robotique

### 1. Introduction

Le **suivi de ligne** est une tâche fondamentale en robotique mobile. Elle consiste à concevoir un robot capable de se déplacer en suivant un chemin matérialisé (généralement une ligne noire sur fond blanc, ou l'inverse) sans quitter la trajectoire.

C’est l'un des problèmes les plus étudiés en robotique éducative, industrielle (ex : chaînes logistiques) et même dans le domaine de la robotique autonome avancée (ex : prototypes de véhicules autonomes).

Dans ce projet, j'ai collecté des données réelles du robot et entraîné un modèle d'intelligence artificielle à l'aide de TensorFlow pour le rendre autonome dans son suivi de ligne. Le modèle a été converti et préparé pour être déployé sur un microcontrôleur ESP32-S2 via TensorFlow Lite.

### 2. Principe du suivi de ligne

L'objectif est que le robot détecte en temps réel sa position par rapport à la ligne, puis ajuste ses déplacements pour rester aligné avec celle-ci.

Deux grandes approches existent :

* **Approche basée sur capteurs** : Utilisation de capteurs infrarouges ou optiques pour détecter le contraste au sol.
* **Approche basée sur vision** : Utilisation d’une caméra pour analyser l’image et détecter la position de la ligne.

**Dans notre cas**, le robot est équipé de **capteurs infrarouges** pour effectuer cette détection.

### 3. Application pratique

Notre robot suiveur de ligne est équipé de :

* **Capteurs infrarouges (IR)** placés sous le châssis pour détecter la réflectivité du sol.
* **Moteurs** contrôlant les roues.
* **Un microcontrôleur ESP32-S2**, responsable du traitement des données capteurs et de la prise de décisions.

### 4. Objectifs du projet

#### Objectifs Techniques

* Collecter des données de capteurs en situation réelle.
* Entraîner un modèle de décision à partir de ces données.
* Convertir le modèle en TensorFlow Lite.
* Déployer le modèle sur l’ESP32-S2.
* Tester et valider le comportement du robot.

#### Objectifs Pédagogiques

L'objectif pédagogique est de vérifiér si on peut utiliser Eliobot comme support pour l'apprentissage de l'IA et de la robotique, en intégrant des concepts de machine learning dans un projet pratique ce projet permet de comprendre les étapes clés du développement d'un système autonome basé sur l'IA, depuis la collecte de données jusqu'au déploiement. Il est donc en lien étroit avec le projet Plateforme Elio Academy.

## Récolte des données

### 1. Données nécessaires

Chaque échantillon contient :

* **Valeurs des 5 capteurs infrarouges**, normalisées entre 0 et 1.
* **Commandes des deux moteurs** (gauche et droit) codées en booléen (0 = éteint, 1 = allumé).

**Exemple :**

| Sensor0 | Sensor1 | Sensor2 | Sensor3 | Sensor4 | MotorA | MotorB |
| ------- | ------- | ------- | ------- | ------- | ------ | ------ |
| 1       | 1       | 0       | 1       | 1       | 1      | 1      |
| 1       | 1       | 1       | 1       | 0       | 0      | 1      |

### 2. Collecte réelle

* Données enregistrées via l'ESP32-S2 sur un parcours test.
* Fichier CSV produit (3730 échantillons).

## Entraînement du modèle

### a) Traitement des données

* **Chargement et nettoyage** des données avec pandas.
* **Conversion booléen -> int** pour MotorA et MotorB.
* **Mélange et séparation** en jeu d'entraînement (80%) et de test (20%).

### b) Architecture du modèle

Un réseau de neurones régressif est utilisé car l'on souhaite prédire deux valeurs binaires (moteurs ON/OFF).

```python
model = Sequential([
    Input(shape=(5,)),
    Dense(16, activation='relu'),
    Dense(8, activation='relu'),
    Dense(2, activation='sigmoid')
])
```

**Explication des couches :**

* `Input(shape=(5,))` : 5 entrées correspondant aux capteurs.
* `Dense(16)` : 16 neurones pour apprendre des patterns complexes.
* `Dense(8)` : 8 neurones intermédiaires pour raffiner la prédiction.
* `Dense(2, sigmoid)` : 2 sorties (MotorA, MotorB), avec `sigmoid` pour une sortie entre 0 et 1.

### c) Compilation et entraînement

```python
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=20, batch_size=32, validation_split=0.2)
```

### d) Conversion TensorFlow Lite

```python
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()
```

## Évaluation du modèle

* **Matrice de confusion** pour MotorA et MotorB.
* **Heatmap des activations** pour voir quels capteurs sont les plus sollicités.
* **Courbes de perte et d’exactitude** sur le temps d'entraînement.


## Déploiement sur ESP32-S2

* Conversion en `.tflite` OK
* Prochaine étape : Intégration du modèle dans le firmware ESP32-S2 ou S3 
* Utilisation de TensorFlow Lite for Microcontrollers

Actuellement , le modèle est prêt à être intégré dans le firmware de l'ESP32-S2. Le problème est que les libraries de TensorFlow Lite for Microcontrollers ne sont pas assez modulaire et très complexe la documentation est presque inéxistante. Il faudra attendre une mise à jour de la bibliothèque ou envisager le développement d'une bibliothèque plus adaptée pour faciliter l'intégration de modèles TensorFlow Lite sur les microcontrôleurs ESP32-S2 ou S3.


