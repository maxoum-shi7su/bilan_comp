---
sidebar_position: 3
---

# Processus d'ajout

La librairie elio.py d'Eliobot est Open Source, il est donc possible de contribuer à son développement.
Si un utilisateur souhaite rajouter une fonctionnalité à la librairie, il peut le faire
et proposer une Pull Request sur le dépôt GitHub de la librairie.

Pour moi en tant que développeur chez Elio, je suis un processus pour l'ajout de fonctionnalités à la librairie elio.py.
La librairie doit être un entre-deux entre la programmation par bloc et la programmation en Python pur.

## Identifier le besoin

Comme pour tout projet, la première étape est d'identifier le besoin, mais ici, c'est un peu plus particuliers,
car un besoin ne veut pas forcément dire une fonctionnalité.

La librairie est là pour faciliter le développement des blocs de Elioblocs et la programmation de l'utilisateur novice en Python.
On regarde donc si ce que l'on veut ajouter à du sens pour l'utilisateur, si cela va lui faciliter la tâche.

Pour montrer l'importance de cette étape, je vais prendre un exemple concret, la partie `buzzer` de la librairie.

```python
#--------------- BUZZER ---------------#

# Buzzer initialisation
def buzzerInit():
    buzzerPin = pwmio.PWMOut(board.IO17, variable_frequency=True)
    return buzzerPin
    
    
# Play a frequency (in Hertz) for a given time (in seconds)
def playFrequency(frequency , waitTime, volume):
    buzzer = buzzerInit()
    buzzer.frequency = round(frequency)
    buzzer.duty_cycle = int(2 ** (0.06*volume + 9))  # 32768 value is 50% duty cycle, to get a square wave.
    time.sleep(waitTime)
    buzzer.deinit()


# Play a note (C, D, E, F, G, A or B) for a given time (in seconds)
def playNote(note, duration, NOTES_FREQUENCIES, volume):
  if note in NOTES_FREQUENCIES:
       frequency = NOTES_FREQUENCIES[note]
       if frequency != 0.1:
           playFrequency(frequency , duration, volume)
       else:
           time.sleep(duration)
```

Quand je suis arrivé chez Elio, la partie `buzzer` de la librairie était déjà implémentée et fonctionnelle.
Le problème est qu'elle était trop simplifiée l'utilisateur n'avait plus aucune option pour reprendre
le contrôle sur le buzzer et déveloper ses propres fonctionnalités, il n'avait pas le choix que d'utiliser les fonctions déjà implémentées.


## Développer la fonctionnalité

Une fois que le besoin est identifié, il faut développer la fonctionnalité.
Si on se rend compte que la fonctionnalité ne demande qu'une ligne de code ou deux,
c'est qu'elle n'est pas assez complexe pour être une fonctionnalité à part entière et
au contraire, si elle demande trop de code, c'est qu'elle est trop complexe et qu'il faut la découper en plusieurs fonctionnalités.

Pour exemple, je vais prendre les fonctionnalités du capteur de ligne, qui est un capteur infrarouge qui permet de suivre une ligne noire.

:::note
Ne perdez pas de temps à lire les fonctions le but de l'exemple est de montrer que j'ai découpé les fonctionnalités en plusieurs fonctions pour rendre le code plus lisible et modulaire.
:::

```python
# --------------- LINE FOLLOWING ---------------#

    def get_line(self, line_pos):
        """
        Get the value of the line sensor at the given position.

        This method calculates the difference between the sensor reading when
        the lineCmd is active (reflective light) and when it is inactive
        (ambient light). This helps in determining the presence of a line.

        Args:
            line_pos (int): The position of the line sensor.

        Returns:
            int: The value representing the difference between ambient light
            and reflected light, indicating the presence of a line.
        """

        self.lineCmd.value = True
        time.sleep(0.02)
        lit = self.lineInput[line_pos].value

        self.lineCmd.value = False
        time.sleep(0.02)
        ambient = self.lineInput[line_pos].value

        value = ambient - lit
        return value

    def follow_line(self, threshold):
        """
        Follow the line using the line sensors.

        Args:
            threshold (int): The threshold value for line detection.
        """
        speed = 60

        if self.get_line(2) < threshold:
            self.move_forward(speed)

        elif self.get_line(0) < threshold:
            self.motor_stop()
            self.spin_right_wheel_forward(speed)
            time.sleep(0.1)

        elif self.get_line(1) < threshold:
            self.motor_stop()
            self.spin_right_wheel_forward(speed)

        elif self.get_line(3) < threshold:
            self.motor_stop()
            self.spin_left_wheel_forward(speed)

        elif self.get_line(4) < threshold:
            self.motor_stop()
            self.spin_left_wheel_forward(speed)

            time.sleep(0.1)

        else:
            self.motor_stop()

    def calibrate_line_sensors(self):
        """
        Calibrate the line sensors by moving the robot forward and backward,
        collecting maximum and minimum sensor values, and calculating the
        threshold.
        """
        num_samples = 3
        all_values = [[] for _ in range(5)]

        for _ in range(num_samples):
            self.move_one_step("forward", 5)
            time.sleep(1)
            self.update_sensor_values(all_values)

            self.move_one_step("backward", 5)
            time.sleep(1)
            self.update_sensor_values(all_values)

        max_values = [max(sensor_values) for sensor_values in all_values]
        min_values = [min(sensor_values) for sensor_values in all_values]

        avg_max_value = self.calculate_median(max_values)
        avg_min_value = self.calculate_median(min_values)
        threshold = avg_min_value + (avg_max_value - avg_min_value) / 2

        self.save_calibration_data(threshold)

        print("Calibration completed:")
        print("Calculated Threshold:", threshold)

    def update_sensor_values(self, all_values):
        """
        Update the maximum and minimum values for the line sensors.

        Args:
            all_values (list of lists): All sensor readings for further filtering.
        """
        for i in range(5):
            current_value = self.get_line(i)
            all_values[i].append(current_value)

        print("All Values:", all_values)

    @staticmethod
    def save_calibration_data(threshold):
        """
        Save the calibration data to a JSON file.

        Args:
            threshold (float): The calculated threshold value for line detection.
        """
        calibration_data = {
            'line_threshold': threshold
        }
        with open('config.json', 'w') as file:
            json.dump(calibration_data, file)

    @staticmethod
    def calculate_median(data):
        """
        Calculate the median of a list of numbers.

        Args:
            data (list): The list of numbers to calculate the median for.

        Returns:
            float: The median value.
        """
        sorted_data = sorted(data)
        n = len(sorted_data)
        if n % 2 == 1:
            return sorted_data[n // 2]
        else:
            mid1 = sorted_data[n // 2 - 1]
            mid2 = sorted_data[n // 2]
            return (mid1 + mid2) / 2
```

Pour cette fonctionnalité, j'ai dû développer plusieurs fonctions pour alleger le code et le rendre plus lisible et compréhensible pour l'utilisateur.
Cela permet aussi de rendre la librairie plus modulaire et de laisser l'utilisateur utiliser les fonctions qu'il souhaite sans brider ses possibilités.


## Tester la fonctionnalité

Une fois que la fonctionnalité est développée, il faut vérifier qu'elle fonctionne correctement. 

## Documenter la fonctionnalité

On ne documente pas vraiment la fonctionnalité, mais on ajoute des commentaires dans le code pour expliquer le fonctionnement avec les paramètres et les retours de la fonction.

