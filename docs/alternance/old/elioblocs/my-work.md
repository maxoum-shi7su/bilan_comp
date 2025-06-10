---
sidebar_position: 2
---

# Mon travail sur Elioblocs

Quand on travaille sur Elioblocs, l'enjeu est de taille, car c'est une plateforme qui vise à permettre l'apprentissage de la programmation :

- à la maison
- à l'école
- par des enfants
- par des adultes

Il faut donc que l'application soit simple à utiliser, mais aussi complète pour donner le maximum de liberté à l'utilisateur.
Il faut aussi que tous les blocs soient claires et compatibles entre eux.
Mais le plus grand défi est de rendre l'application la plus intuitive possible, pour ce faire, j'ai travaillé sur plusieurs points :

- **L'ergonomie** : L'application doit être simple à utiliser, il faut donc que tout l'écosystème soit cohérent et adapté.
- **La formulation** : Les blocs doivent être clairs et compréhensibles, il faut donc que les blocs soient bien formulés.

Ces points ont été difficiles pour moi au début, car depuis que je suis en BUT, je ne suis jamais "revenu en arrière".
J'utilise ce terme parce que se remettre dans la peau d'un débutant est un exercice difficile.
Chaque nouvelle fonctionnalité, chaque composant de l'application doit être pensé pour être simple à utiliser.

Pour illustrer ce que je dis, je vais prendre l'exemple d'une implémentation que j'ai faite : le Terminal.
Pour chaque développeur, le terminal est un outil essentiel qui, une fois compris, est utilisé sans réfléchir.
Quand j'ai commencé à implémenter le terminal, pour moi, c'était un outil incroyable dont je me servais tout le temps,
pour voir si les programmes transmis à Eliobot compilaient, et pour avoir des informations sur les erreurs.

Après l'implémentation et la mise en production, il y a eu un atelier à NiortTech.
Les ateliers sont des sessions de programmation réservées aux enfants et animées par Romain.
Ils sont notamment utiles pour récupérer du feedback utilisateur en direct dans mon cas.
Lors de cet atelier, j'ai vu les enfants utiliser l'application et je me suis rendu compte qu'ils ne voyaient pas l'utilité du terminal.
Pour eux, c'était un outil en plus alors que, de mon point de vue, c'était un outil essentiel.

Pour vous faire comprendre comment j'ai travaillé sur Elioblocs, je vais détailler un processus que j'ai 
mis en place pour intégrer de nouveau blocs dans l'application.

## Processus de création de blocs

### Identifier le besoin

La première étape est d'identifier le besoin,
je me suis basée sur les retours utilisateurs,
les demandes de Romain et les besoins de l'application.

Nous gardons les blocs à développer et les idées dans le Trello qui nous sert de backlog.

### Identifier le type de bloc

Sur Elioblocs, il y a plusieurs types de blocs :

- Les blocs booléens
- Les blocs de valeurs
- Les blocs de commandes

[Voir la documentation de Elioblocs](https://docs.eliobot.com/docs/elioblocs/blocs/all-blocs)

Il faut donc identifier le type de bloc à créer et les potentielles options, pour un bloc qui écrit un message par exemple,
il faut penser à créer un champ pour le message.

### Créer le bloc

Une fois que le besoin est identifié, il faut créer le bloc, avec Blockly, pour créer un bloc, il y a trois parties :

- La définition du bloc
- La génération du code
- L'ajout du bloc à la toolbox

#### La définition du bloc

Pour définir un bloc, il existe plusieurs méthodes [voir la documentation de Blockly](https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks).

Sur Elioblocs, on utilise la méthode `Blockly.defineBlocksWithJsonArray` qui permet de définir plusieurs blocs dans un fichier JavaScript, mais en rédigent le bloc en JSON.

```javascript
Blockly.defineBlocksWithJsonArray([{
  "type": "string_length",
  "message0": 'length of %1',
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE",
      "check": "String"
    }
  ],
  "output": "Number",
  "colour": 160,
  "tooltip": "Returns number of letters in the provided text.",
  "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
}])
```

Voici un exemple de bloc qui retourne la longueur d'une chaîne de caractère.

#### La génération du code

Pour générer le code blockly, dispose de méthodes qui permettent de générer le code en fonction du bloc.
Dans Elioblocs, nous utilisons que Python pour l'instant, mais Blockly permet de générer du code dans plusieurs langages.

```javascript
Blockly.Python['string_length'] = function(block) {
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE)
  
  return [value + '.length', Blockly.Python.ORDER_MEMBER]
}
```

Voici un exemple de génération de code pour le bloc précédent en python.
On fait appel à la méthode `Blockly.Python.valueToCode` qui permet de récupérer le texte que l'utilisateur a entré dans le bloc.

#### L'ajout du bloc à la toolbox

C'est l'étape finale, il faut ajouter le bloc à la toolbox, c'est la boite à outils qui contient tous les blocs disponibles pour l'utilisateur.
On ajoute donc le bloc à la toolbox qui est un XML placé dans le code html de l'application.

```html
<xml id="toolbox" style="display: none">
  <category name="Text">
    <label text="Create text"></label>
    <block type="string_length"></block>
   </category>
</xml>
```

Dans l'exemple ci-dessus, on peut voir que c'est aussi dans le xml que l'ont défini le squelette de la toolbox.

### Tester le bloc

Bien sûr, une fois le bloc créé, il faut le tester, pour cela, on crée un programme type et on l'exécute pour voir si le bloc fonctionne correctement.

### La documentation

La dernière étape est de documenter le bloc, pour cela, on ajoute ou crée un nouvel espace pour nos blocs dans la documentation [Documentation](https://docs.eliobot.com/docs/elioblocs/).
Il faut faire attention à bien expliquer le bloc, comment il fonctionne, à quoi il sert et comment l'utiliser.
On ne parlera pas de la génération de code, car c'est une partie technique qui n'intéresse pas l'utilisateur d'Elioblocs.

