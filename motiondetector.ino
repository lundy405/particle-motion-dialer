
int led1 = D7; 
int sensor = D1;
String movement;

void setup() {


  pinMode(led1, OUTPUT);
  pinMode(sensor, INPUT);
  Particle.variable("Movement", movement);
  Particle.publish("Movement", "Monitoring Started");

}


void loop() {


  if (digitalRead(sensor)) {
    movement = "Motion Detected!!!";
    Particle.publish("Movement", movement);
    digitalWrite(led1, HIGH);
    delay(100);
    digitalWrite(led1, LOW);
    delay(100);
    digitalWrite(led1, HIGH);
    delay(100);
    digitalWrite(led1, LOW);
    delay(100);
    digitalWrite(led1, HIGH);
    delay(100);
    digitalWrite(led1, LOW);
    delay(100);
    

      
  } else {
  
    //movement = "No Movement";
    //Particle.publish("Movement", movement);
    if (movement == "Motion Detected!!!") {
        movement = "Motion Stopped";
        Particle.publish("Movement", movement);
    }
    
  
  }
  
  delay(4000);


 
}
