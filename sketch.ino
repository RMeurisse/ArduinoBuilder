int LedPin = 13;
boolean LedPin_ON = HIGH;

// Een functie om een LED te doen blinken zonder gebruik te maken van WACHTEN
int ard_effect0_status = -1;
unsigned long ard_effect0_start, ard_effect0_time;
#define EFFECT0_PERIOD 2000
#define EFFECT0_1_DURATION 1000

void BlinkNietWachten() {
  //Variables of this effect are reffered to with ard_effect0
  boolean restart = false;
  ard_effect0_time = millis() - ard_effect0_start;
  if (ard_effect0_time > EFFECT0_PERIOD) {
    //end effect, make sure it restarts
    if (ard_effect0_status > -1) {
    }
    restart = true;
    ard_effect0_status = -1;
    ard_effect0_start = ard_effect0_start + ard_effect0_time;
    ard_effect0_time = 0;
  }
  if (not restart && ard_effect0_status == -1) {
    ard_effect0_status = 0;
    ard_effect0_start = ard_effect0_start + ard_effect0_time;
    ard_effect0_time = 0;
  digitalWrite(LedPin, LedPin_ON);
  }
  if (ard_effect0_time > EFFECT0_1_DURATION && ard_effect0_status < 1) {
   ard_effect0_status = 1;
  digitalWrite(LedPin, ! (LedPin_ON));
  }
}



void setup() {
  pinMode(LedPin, OUTPUT);
  ard_effect0_status = -1;
  ard_effect0_start = millis();

}

void loop() {
  // Een functie om een LED te doen blinken zonder gebruik te maken van WACHTEN

  BlinkNietWachten();

}
