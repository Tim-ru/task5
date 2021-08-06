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