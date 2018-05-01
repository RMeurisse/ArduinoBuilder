LOCALARDUINOPATH='/home/robin/Arduino'
BUILDERPATH='/home/robin/arduino-1.8.5'

SKETCHNAME=$1
BOARDNAME='arduino:avr:uno'

LOCALBUILDPATH='/home/robin/zzzArduinoBuilder/'$SKETCHNAME
LOCALSKETCHPATH='/home/robin/zzzArduinoBuilder'


mkdir $LOCALBUILDPATH

$BUILDERPATH/arduino-builder -compile -hardware $BUILDERPATH/hardware -build-path $LOCALBUILDPATH -tools $BUILDERPATH/hardware/tools -tools $BUILDERPATH/tools-builder -libraries $BUILDERPATH/libraries -libraries $LOCALARDUINOPATH/libraries -fqbn $BOARDNAME $LOCALSKETCHPATH/$SKETCHNAME'.ino'
