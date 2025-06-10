---
sidebar_position: 3
---

# Processus de création de blocs

## Identifier le besoin

La première étape est d'identifier le besoin,
je me suis basé sur les retours utilisateurs,
les demandes de Romain et les besoins de l'application.

Nous gardons les blocs à développer et les idées dans le Trello, qui nous sert de backlog.

## Identifier le type de bloc

Sur Elioblocs, il y a plusieurs types de blocs :

- Les blocs booléens
- Les blocs de valeurs
- Les blocs de commandes

[Voir la documentation de Elioblocs](https://docs.eliobot.com/docs/elioblocs/blocs/all-blocs)

Il faut donc identifier le type de bloc à créer et les potentielles options, pour un bloc qui écrit un message par exemple,
il faut penser à créer un champ pour le message.

## Créer le bloc

Une fois que le besoin est identifié, il faut créer le bloc, avec Blockly, pour créer un bloc, il y a trois parties :

- La définition du bloc
- La génération du code
- L'ajout du bloc à la toolbox

### La définition du bloc

Pour définir un bloc, il existe plusieurs méthodes [voir la documentation de Blockly](https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks).

Sur Elioblocs, on utilise la méthode `Blockly.defineBlocksWithJsonArray` qui permet de définir plusieurs blocs dans un fichier JavaScript, mais en rédigeant le bloc en JSON.

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

### La génération du code

Pour générer le code blockly, dispose de méthodes qui permettent de générer le code en fonction du bloc.
Dans Elioblocs, nous utilisons que Python pour l'instant, mais Blockly permet de générer du code dans plusieurs langages.

```javascript
Blockly.Python['string_length'] = function(block) {
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE)
  
  return [value + '.length', Blockly.Python.ORDER_MEMBER]
}
```

Voici un exemple de génération de code pour le bloc précédent en python.
On fait appel à la méthode `Blockly.Python.valueToCode` qui permet de récupérer le texte que l'utilisateur à entrer dans le bloc.

### L'ajout du bloc à la toolbox

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

Dans l'exemple ci-dessus, on peut voir que c'est aussi dans le xml que l'on défini le squelette de la toolbox.

## Tester le bloc

Bien sûr, une fois le bloc créé, il faut le tester, pour cela, on crée un programme type et on l'exécute pour voir si le bloc fonctionne correctement.

## La documentation

La dernière étape est de documenter le bloc, pour cela, on ajoute ou crée un nouvel espace pour nos blocs dans la documentation [Documentation](https://docs.eliobot.com/docs/elioblocs/).
Il faut faire attention à bien expliquer le bloc, comment il fonctionne, à quoi il sert et comment l'utiliser.
On ne parlera pas de la génération de code, car c'est une partie technique qui n'intéresse pas l'utilisateur d'Elioblocs.


Toutes ces étapes sont importantes pour créer un bloc, il faut bien réfléchir à chaque étape pour que le bloc soit utile, facile à utiliser et fais rapidement.
Je parle de la rapidité de faire un bloc, car chaque étape mal pensée fais faire des changements sur toute la chaine de production.
J'en ai fait l'éxperience et j'en parle [ici](/docs/alternance/old/elioblocslocs/wifi.md).