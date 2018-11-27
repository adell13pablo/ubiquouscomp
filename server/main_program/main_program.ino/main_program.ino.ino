int LED_CNT = 1; //Lights up if bean connected
int LED = A1; //Output led
int BTN = 3; //Input pin for button
int button_old_state= 0;
int state = 0; //Stores actual state of button
int TEMP = 0; //Stores the actual temperature
int LUM = 0; //Stores the value of the luminosity
int LUM_SENS = A0; //Sensor luminosidad
int SPK = A2;
int LED_SPK = 6;
int LED_TEMP = 7;
int GEST = 0;//Stores the value of the gesture (1 = Swipe, 2 = Shake, 0 = Nothing)
int x_axis = 0;
int y_axis = 0;
int z_axis = 0;
int x_axis_old = 0; //Variables to store values for acceleration 
int y_axis_old = 0;
int z_axis_old = 0;
int pressed = 0; //stores whether the button has been pressed or not 


//Melody 

#define  c4    261    // 261 Hz 
#define  d4    294    // 294 Hz 
#define  e4    329    // 329 Hz 
#define  f4    349    // 349 Hz 
#define  f4s   369
#define  g4    392    // 392 Hz 
#define  a4    440    // 440 Hz 
#define  a4s   466
#define  b4    493    // 493 Hz 
#define  c5    523
#define  c5s   554
#define  d5    587

int melody[] = {  g4,  f4s, g4,  b4, a4, g4, a4, b4, a4, g4, f4s, e4, f4s, g4, b4, b4, a4, g4, f4s, e4, b4, c5s, b4, a4s };
int duration[]  = {  2000,  1000, 1000,  2000,  2000, 1500, 1000, 500, 500, 500, 500 ,500, 500, 2000, 1000, 1000, 500, 500, 500, 500, 2000, 500, 1000, 1000};



void getLuminosidad(){
  LUM = map(analogRead(LUM_SENS), 0, 1023, 0, 99);
  
  /*  Serial.println("Luz");
    
    Serial.println(LUM);*/
 
    Bean.setScratchNumber(3,LUM);
}


void readButton(){
  state = digitalRead(BTN);
  if((state == 1) && (button_old_state == 0)){
     pressed = 1;
  //   Serial.println("Pressed");
     button_old_state = state;
  
  }else{
    pressed = 0;
    button_old_state = state;
  }
   Bean.setScratchNumber(4,pressed);
}

void getAltavoz(){
  uint8_t play = Bean.readScratchNumber(4);
  Serial.print("Value of scratch 4 is: ");
  Serial.print(play);
  Serial.print("\n");
  if(play == 1){
    for(int i = 0; i< sizeof(melody)/2; i++){
      int value = map(melody[i], 261, 570, 50, 255);
    analogWrite(LED, value);
    tone(SPK, melody[i],duration[i]);
    delay(duration[i]);
    analogWrite(LED, 0);
    }
  }

}

void readFoco(){
  uint8_t light = Bean.readScratchNumber(3);
  if(light == 1){
    digitalWrite(LED_TEMP, HIGH);
  }else{
    digitalWrite(LED_TEMP, LOW);
  }
}

void setup() {

   // put your setup code here, to run once:
  
  Serial.begin(57600);

  pinMode(LED, OUTPUT);
  pinMode(LED_CNT, OUTPUT);
  pinMode(BTN,INPUT);
  pinMode(A0,INPUT);
  pinMode(SPK, OUTPUT);
  pinMode(LED_TEMP, OUTPUT);

}

void loop() {;
  digitalWrite(LED_CNT,HIGH); //Ver si se ha connectado el bean 
while(1){
  readButton();
  getLuminosidad();
  getAltavoz();
  readFoco();
  
}

}



