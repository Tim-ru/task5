### Develop only typescript
#### prepare
1. setting your system by react-native guide https://reactnative.dev/docs/environment-setup
2. install yarn https://classic.yarnpkg.com/en/docs/install/#mac-stable
### starting new project
1. `git clone https://git-storage.osora.ru/q-digital-core.git yourappname`
2. `npx react-native-cli init yourappname`
3. `cd yourappname`
4. `git add ios android`
5. `git commit -m 'core'`
6. `git clean -f -d ./`
7. `git reset --hard HEAD`
8. copy .env.example as .env
9. replace all q-digital-core to yourappname in VS Code find by folder
10. `yarn i`
11. `npx react-native link @react-native-community/async-storage`
12. `https://github.com/oblador/react-native-vector-icons#installation` - optional

### Dev
1. `yarn start`
2. `yarn android` or `yarn ios`

#### aliases for crop paths
1. babel.config.js
2. tsconfig.json

---

### Prod
#### ***Android***
1. if key not exist
	1. `cd android/app`
	2. `keytool -genkeypair -v -keystore yourappname.keystore -alias yourappname -keyalg RSA -keysize 2048 -validity 10000`
	3. Compile
2. key exist
	1. Compile
3. Compile
	* `cd android && ./gradlew assembleRelease && cd ../`
	* or `cd android && ./gradlew app:assembleRelease && cd ../`
	* or `cd android && ./gradlew installRelease && cd ../`
#### ***IOS***
1. xcode - get apllication
	1. top menu - product - archive
	2. _
2. terminal - install on devise
	1. `react-native run-ios --configuration Release --device "connecteddevicename"`
---
### Troubleshooting
1. access denied for build
	* `chmod 755 android/gradlew`
2. memory limit error
	* `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
3. your pckgs in node_modules not compiling on android api
	* `npx jetify`
4. aapt2 error
	* `./gradlew app:assembleRelease`
5. memory limit error 2
	* `./gradlew installRelease`
6. reactotron does not see the device
	* `adb reverse tcp:9090 tcp:9090`
7. WebRTC' does not contain bitcode
	* `cd node_modules/react-native-webrtc/tools/`
	* `./downloadBitcode.sh`
	* `cd ../../../`

### Form element adding
1. create component `/src/js/components/base/form/elements/yourelement.js`
2. your component should be created based on `core/components/abstract/formElement`
- for get value support - add method getValue to your component
3. import|export your component in `/src/js/components/base/form/elements/index.js`