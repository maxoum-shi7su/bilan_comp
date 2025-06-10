---
sidebar_position: 4
---

# Le wifi

## Mon expérience

Pour ajouter du contenue et des fonctionnalités intéressantes à Elioblocs,
nous avons décidé d'ajouter la possibilité de manipuler le Réseau avec des blocs.

Pour ce faire, j'ai dû suivre le processus que j'ai pu détailler dans la page [Processus de création de blocs](/docs/alternance/old/elioblocslocs/create-bloc.md).

J'ai donc identifié le besoin, qui était de pouvoir se connecter à un réseau wifi ou de pouvoir ouvrir un point d'accès wifi
depuis Elioblocs et d'être capable de créer une télécommande pour manipuler eliobot depuis un autre appareil.

J'ai fait quelque tests pour voir comment je pouvais manipuler le wifi avec CircuitPython,
je me suis familiarisé avec le fait d'ouvrir un serveur HTTP en ouvrant un point d'accès wifi sur Eliobot.
Puis de servir une page web, sur laquelle on place des éléments interactifs pour contrôler Eliobot.

Tout cela est devenu très simple pour moi très logique et fluide, j'ai donc décomposé toutes ces fonctionnalités en blocs que vous pouvez retrouver ici :

#### [Ancien Blocs](/docs/alternance/old/elioblocslocs/wifi-bloc.md)

Vous avez pu voir que la plupart des blocs étaient très complexes ;
j'avais complètement oublié l'objectif principal.
Certes, les blocs étaient fonctionnels et permettaient une grande liberté d'action,
mais pour un utilisateur novice, c'était un cauchemar. Des noms de blocs trop longs,
des blocs trop complexes... Après plusieurs retours plutôt négatifs, j'ai dû revoir mon implémentation.

Sur le moment, je n'ai pas compris pourquoi, mais après avoir essayé de reprendre mes blocs quelques semaines plus tard,
j'ai compris : j'avais développé en tant que développeur pour des développeurs.

J'ai donc revu toute ma stratégie de développement avec l'aide de Romain.
J'ai réduit au maximum tous mes blocs, voire supprimé certains.
Je suis revenu à l'objectif premier : permettre à un utilisateur de
contrôler Eliobot depuis un appareil externe et se connecter à un réseau Wi-Fi.

Après avoir revu tous mes blocs, je les ai retestés et redocumentés,
pour finalement me rendre compte que j'avais les mêmes fonctionnalités
avec quatre fois moins de blocs. Des blocs plus simples, plus clairs, plus intuitifs.

#### [Nouveaux blocs](/docs/alternance/old/elioblocslocs/wifi-bloc-new.md)

## Exemple

Pour vous montrer un exemple concret du niveau de simplification voici deux programmes qui font la même chose :

Lancer un serveur http sur Eliobot pour servir une page web qui permet de controller Eliobot depuis un téléphone avec 4 boutons.

<p align="middle">
    <img src={require('@site/static/img/pt2/old-remote.png').default} alt="Old Remote" width="49%" />
    <img src={require('@site/static/img/pt1/blank.png').default} width="2%"/>
    <img src={require('@site/static/img/pt2/new-remote.png').default} alt="New Remote" width="49%" />
</p>

L'ancien fonctionnement est à gauche, le nouveau à droite. Je ne suis pas sûr que ce soit utile de le préciser.

Avec ces changements, j'ai compris que certains aspects que je trouvais importants ne l'étaient pas pour l'utilisateur.
Je devais me mettre à sa place pour développer. J'avais réussi à m'approprier le projet et à comprendre parfaitement
son fonctionnement, mais j'avais oublié l'utilisateur et ses besoins. L'utilisateur doit aussi s'approprier le projet,
mais pas au niveau du développeur. Mon travail est de faire la passerelle entre le développement et l'utilisateur,
en veillant à ce que l'utilisateur puisse s'approprier les fonctionnalités par lui-même
sans être obligé de lire la documentation d'une API ou d'un serveur web.

**Je dois retirer le maximum d'obstacles de la route que mon utilisateur emprunte, car je ne veux pas qu'il trébuche.**

Je ne veux pas non plus que son voyage soit trop facile, car il n'apprendrait rien. Il faut donc trouver le juste milieu.

## Conclusion

J'ai appris à me mettre à la place de l'utilisateur, à penser comme lui, à anticiper ses besoins.
J'ai appris à simplifier, à réduire, à clarifier, à rendre intuitif.

Cet exemple me tient à cœur, car il m'a permis de comprendre que mon besoin de complexité n'était pas celui de l'utilisateur.

Je suis développeur pour les utilisateurs, et non pour moi.