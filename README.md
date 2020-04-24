# UdacityFitness-mobile-App

This project was bootstrapped with Create React Native App and runs on the Expo client. Run npm start to build the Expo app.
You will need an Expo client on the phone to see the compiled app during development.

Build and Deploy
The easiest way to generate both the .apk and the .ipa files is to use Expo's exp CLI. First, 
run      npm install -g exp
Once that's installed (and after you've configured your app.json file),
you can run   --   exp build:ios   --    to build your .ipa file,
and   --   exp build:android    --    to build your .apk file.


Use exp build:status to track the progress of the build.
Once the build is ready, this command will return a link to an .ipa (iOS) or .apk (Android) file.
These are standalone binaries for your application. Download the binary at the link.
You can now upload the binary to the respective App store for review & distribution.
