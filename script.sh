LOCALARDUINOPATH='/home/robin/Arduino'
BUILDERPATH='/home/robin/arduino-1.8.5'
LOCALBUILDPATH='/home/robin/zzzArduinoBuilder/zzz'
LOCALSKETCHPATH='/home/robin/zzzArduinoBuilder'
SKETCHNAME='sketch.ino'

$BUILDERPATH/arduino-builder -compile -hardware $BUILDERPATH/hardware -build-path $LOCALBUILDPATH -tools $BUILDERPATH/hardware/tools -tools $BUILDERPATH/tools-builder -libraries $BUILDERPATH/libraries -libraries $LOCALARDUINOPATH/libraries -fqbn arduino:avr:uno $LOCALSKETCHPATH/$SKETCHNAME
