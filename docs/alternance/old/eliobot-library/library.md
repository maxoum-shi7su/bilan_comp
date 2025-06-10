---
sidebar_position: 2
---

# La librairie Eliobot

## L'organisation et le fonctionnement

La librairie d'Eliobot est une librairie python qui permet de faciliter le travail de programmation.
Elle le facilite pour avoir des blocs moins chargé dans l'application Elioblocs
et pour le début de la programmation pure en python, c'est un entre-deux qui sert aussi d'exemple pour les utilisateurs,
elle est notamment open-source et disponible sur [Github](https://github.com/Eliobot/Eliobot-Python-Library).

Quand je suis arrivé chez Elio, la librairie se composait de fonctions contenues dans un fichier `elio.py`.
La définition des broches pour utiliser les capteurs et moteurs était aussi dans ce fichier.

Avec Romain, on a identifié plusieurs problèmes :
- La librairie était difficile à maintenir, car aucune règle n'avait été définie pour son organisation,
  les fonctions étaient ajoutées au fur et à mesure des besoins.
- L'utilisateur devait obligatoirement utiliser les broches définies dans le fichier `elio.py`, il était donc
  difficile de modifier le comportement d'une broche sans modifier le fichier de librairie.
- Si la librairie était utilisée chaque broche était utilisée, même si l'utilisateur n'en avait pas besoin.

On a donc décidé de refondre la librairie pour la rendre plus modulaire et plus facile à utiliser.

Le premier critère était de supprimer les broches de la librairie, pour laisser l'utilisateur les définir.
On a donc créé une classe `Eliobot` qui prend en paramètre les broches utilisées pour les capteurs et moteurs.
L'utilisateur peut définir les broches qu'il veut utiliser pour chaque capteur et moteur.

### L'éxistant avant la refonte

Avant la refonte, la librairie ressemblait à ça :

```python
#--------------- LIBRARIES IMPORT ---------------#

import time
import board
from digitalio import DigitalInOut, Direction, Pull
from analogio import AnalogIn
import pwmio
import busio
import adafruit_dht
from alphabet import character

#--------------- PINS DECLARATION ---------------#

# IR_Cmd pin declaration
ir_cmd_pin = DigitalInOut(board.IO34)

# boot pin declaration
boot = DigitalInOut(board.IO0)

# Line led declaration
lineLed = DigitalInOut(board.IO18)

# UART pins declaration
uart = busio.UART(board.IO43, board.IO44)

# I2C pins declaration
i2c = busio.I2C(board.IO8, board.IO9)

# Header pins declaration
header_3_pin = board.IO2

# Setup the BATTERY voltage sense pin
vbat_voltage = AnalogIn(board.BATTERY)

# Setup the VBUS sense pin
vbus_sense = DigitalInOut(board.VBUS_SENSE)
vbus_sense.direction = Direction.INPUT

# Obstacle input Pins declaration
obstacleCmd = DigitalInOut(board.IO33)
obstacleCmd.direction = Direction.OUTPUT
obstacleInput = [AnalogIn(board.IO4), AnalogIn(board.IO5), AnalogIn(board.IO6), AnalogIn(board.IO7)]

# Line input Pins declaration
lineInput = [AnalogIn(board.IO10), AnalogIn(board.IO11), AnalogIn(board.IO12), AnalogIn(board.IO13), AnalogIn(board.IO14)]
threshold = 45000

# Motor Driver Pins declaration
AIN1 = pwmio.PWMOut(board.IO36)
AIN2 = pwmio.PWMOut(board.IO38)
BIN1 = pwmio.PWMOut(board.IO35)
BIN2 = pwmio.PWMOut(board.IO37)

#--------------- OBSTACLE SENSORS ---------------#

# Get the obstacles sensors value from Left (position 0) to Right (position 3) and back (postion 4)
def getObstacle(obstacle_pos):
    obstacle_pos = obstacle_pos
    
    value = 0

    value = obstacleInput[obstacle_pos].value

    if value < 10000:
        return True
    else :
        return False



#--------------- MOTORS ---------------#

# Convert the speed from 0 - 100% to 0 - 65535 for pwmio usage
def setSpeed(speedValue):
    # Some filtering to fit the 0-100% range and increasing the minimum value (motors won't spin under 15%)
    if speedValue > 100:
        speedValue = 100
    elif speedValue < 15:
        speedValue += 15
        
    pwmValue = int((speedValue / 100) * 65535)

    return pwmValue


# Move the robot Forward (0 - 100% speed)
def moveForward(speed = 100):
    pwm_value = setSpeed(speed)

    # Faire avancer le robot à la vitesse spécifiée
    AIN1.duty_cycle = 0
    AIN2.duty_cycle = pwm_value
    BIN1.duty_cycle = 0
    BIN2.duty_cycle = pwm_value
    
```

On avait une grande partie située au début de la librairie avec tous les imports nécessaires puis la définition de toutes les broches
utilisées par le robot et enfin les fonctions développées par Elio pour faciliter la programmation.

### La refonte

On a donc décidé de refondre la librairie pour la rendre plus modulaire et plus facile à utiliser.

```python
#------------- LIBRARIES IMPORT --------------#

import json
import math
import time
import wifi

#--------------- ELIOBOT CLASS ---------------#


class Eliobot:
    SPACE_BETWEEN_WHEELS = 77.5  # mm
    WHEEL_DIAMETER = 33.5  # mm
    DISTANCE_PER_REVOLUTION = (WHEEL_DIAMETER * math.pi) / 10  # cm

    def __init__(self,
                 AIN1,
                 AIN2,
                 BIN1,
                 BIN2,
                 vBatt_pin,
                 obstacleInput,
                 buzzer,
                 lineInput,
                 lineCmd):
        """
        Initialize Eliobot with the given hardware components.

        Args:
            AIN1: Motor control pin for direction 1 on motor A.
            AIN2: Motor control pin for direction 2 on motor A.
            BIN1: Motor control pin for direction 1 on motor B.
            BIN2: Motor control pin for direction 2 on motor B.
            vBatt_pin: Pin to read battery voltage.
            obstacleInput: List of obstacle sensor inputs.
            buzzer: Buzzer control object.
            lineInput: List of line sensor inputs.
            lineCmd: Line sensor command pin.
        """
        self.AIN1 = AIN1
        self.AIN2 = AIN2
        self.BIN1 = BIN1
        self.BIN2 = BIN2
        self.vBatt_pin = vBatt_pin
        self.obstacleInput = obstacleInput
        self.buzzer = buzzer
        self.lineInput = lineInput
        self.lineCmd = lineCmd

  

    # --------------- OBSTACLE SENSORS ---------------#

    def get_obstacle(self, obstacle_pos):
        """
        Check if there is an obstacle in front of the specified sensor.

        Args:
            obstacle_pos (int): The position of the obstacle sensor.

        Returns:
            bool: True if an obstacle is detected, False otherwise.
        """
        value = self.obstacleInput[obstacle_pos].value
        return value < 10000
        
    # --------------- MOTORS ---------------#

    def repetition_per_second(self):
        """
        Calculate the number of repetitions per second the motor can perform.

        Returns:
            float: The number of repetitions per second.
        """
        vBatt = self.get_battery_voltage()
        rpm = 20.3 * vBatt
        rps = rpm / 60
        return rps

    @staticmethod
    def set_speed(speed_value):
        """
        Set the speed of the motor.

        Args:
            speed_value (int): Desired speed value (0-100).

        Returns:
            int: The PWM value corresponding to the desired speed.
        """
        if speed_value > 100:
            speed_value = 100
        elif speed_value < 15:
            speed_value += 15
        pwm_value = int((speed_value / 100) * 65535)
        return pwm_value

    def move_forward(self, speed=100):
        """
        Move the robot forward.

        Args:
            speed (int, optional): Speed of the robot (0-100). Defaults to 100.
        """
        pwm_value = self.set_speed(speed)
        self.AIN1.duty_cycle = 0
        self.BIN1.duty_cycle = 0
        self.AIN2.duty_cycle = pwm_value
        self.BIN2.duty_cycle = pwm_value

```

On a donc créé une classe `Eliobot` qui prend en paramètre les broches utilisées pour les capteurs et moteurs.
L'utilisateur peut définir les broches qu'il veut utiliser pour chaque capteur et moteur dans son programme ce
qui lui permet de créer des programmes plus personnels sans être bloqué par le fait que les broches soient définies par la librairie.

La librairie a encore beaucoup de potentiel d'amélioration, mais elle est déjà plus modulaire et plus facile à utiliser.
Les prochaines étapes seront de séparer les fonctions de la librairie en plusieurs fichiers pour faciliter la maintenance
(un fichier par type de fonctionnalité par exemple) ce qui permettra de mieux organiser les fonctions et de les retrouver plus facilement.
Pour l'instant le fichier n'est pas encore très long donc ce n'est pas une priorité, mais nous y réfléchissons déjà.

## Les fonctions de mouvements

Dans la librairie, nous avons aussi des fonctions de mouvement assez pratique pour déplacer eliobot :
- `move_one_step` : permet de faire avancer eliobot d'une case en choisissant vers l'avant ou l'arrière et la distance de la case.
- `turn_one_step` : permet de faire tourner eliobot d'un certain angle en choisissant le sens de rotation.

À mon arrivée à Elio, j'ai assisté à un atelier de programmation pour les enfants.
Une des activités proposées par Romain était de faire sortir Eliobot d'un labyrinthe.
Le premier réflexe d'un enfant a été de cartographier le labyrinthe et de refaire le chemin exact à Eliobot.
Pour cela, les enfants utilisaient les fonctions `move_one_step` et `turn_one_step`.

Ces fonctions utilisaient des valeurs en dur pour les déplacements.
Si on avançait d'une case, on faisait avancer le robot le temps de parcourir une case.
Si on tournait de 90°, on faisait tourner le robot le temps de tourner de 90°.
Le problème est que ces valeurs ne sont pas les mêmes pour tous les robots.
En fonction du niveau de batterie, le robot ne va pas avancer de la même distance.

La programmation était donc très difficile pour les enfants, car il fallait ajuster les valeurs à chaque fois.
Pour résoudre ce problème, on s'est dit qu'il fallait que le robot puisse mesurer sa distance parcourue et son angle de rotation.
Le facteur le plus impactant étant la batterie, on a décidé de mesurer le nombre de répétitions par seconde que le moteur peut faire en fonction de la batterie.


Pour ce faire, j'ai utilisé la même technique que les cyclistes pour mesurer leur vitesse, j'ai utilisé un Tachymètre et une alimentation
et j'ai mesuré le nombre de répétitions par seconde que le moteur pouvait faire en fonction de la tension de la batterie sur la plage de tension
possible d'une batterie de robot. J'ai ensuite fait une régression linéaire pour trouver la formule qui permet de calculer le nombre de répétitions.

Pour l'implémentation, j'ai créé une fonction `repetition_per_second` qui permet de calculer le nombre de répétitions par seconde que le moteur peut faire en fonction de la batterie.
Cette fonction est utilisée dans les fonctions `move_one_step` et `turn_one_step` pour calculer le temps de déplacement et de rotation.
Pour tout ça, on a aussi eu besoin d'une fonction pour récupérer la tension de la batterie, j'ai donc créé une fonction `get_battery_voltage`.

```python
    SPACE_BETWEEN_WHEELS = 77.5  # mm
    WHEEL_DIAMETER = 33.5  # mm
    DISTANCE_PER_REVOLUTION = (WHEEL_DIAMETER * math.pi) / 10  # cm
```

Pour calculer la distance parcourue par le robot, j'ai utilisé la formule de la circonférence
d'un cercle pour calculer la distance parcourue par une roue en une révolution.

```python
    def get_battery_voltage(self):
        """
        Get the battery voltage.

        Returns:
            float: The current battery voltage.
        """
        return ((self.vBatt_pin.value / 2 ** 16) * 3.3) * 2
```

Pour récupérer la tension de la batterie, j'ai utilisé la formule de conversion de la tension en valeur numérique.

```python
    def repetition_per_second(self):
        """
        Calculate the number of repetitions per second the motor can perform.

        Returns:
            float: The number of repetitions per second.
        """
        vBatt = self.get_battery_voltage()
        rpm = 20.3 * vBatt
        rps = rpm / 60
        return rps
```

Pour calculer le nombre de répétitions par seconde, j'ai utilisé la formule de conversion de la tension en nombre de répétitions par seconde.

```python
    def move_one_step(self, direction, distance=20):
        """
        Move the robot a certain distance.

        Args:
            direction (str): Direction to move ('forward' or 'backward').
            distance (int): Distance to move in centimeters.
        """
        required_rps = distance / self.DISTANCE_PER_REVOLUTION
        required_time = required_rps / self.repetition_per_second()
        pwm_value = 65535

        if direction == "forward":
            self.AIN1.duty_cycle = 0
            self.BIN1.duty_cycle = 0
            self.AIN2.duty_cycle = pwm_value
            self.BIN2.duty_cycle = pwm_value
        elif direction == "backward":
            self.BIN2.duty_cycle = 0
            self.AIN2.duty_cycle = 0
            self.AIN1.duty_cycle = pwm_value
            self.BIN1.duty_cycle = pwm_value

        time.sleep(required_time)
        self.motor_stop()
```

Et finalement pour faire avancer ou reculer le robot de la distance voulue,
j'attends le temps nécessaire pour parcourir le nombre de revolution qu'il faut pour ma distance.
Pour tourner d'un certain angle, c'est le même principe, j'ai calculé le nombre de répétitions nécessaires pour tourner de l'angle voulu.

Ces fonctions ont permis de simplifier la programmation pour les enfants, car ils n'ont plus besoin de faire du pifomètre pour
faire avancer ou tourner le robot, ils peuvent maintenant utiliser des valeurs en centimètres ou en degrés pour faire avancer ou tourner le robot
comme il le souhaitent.