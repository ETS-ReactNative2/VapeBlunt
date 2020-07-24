# VapeBlunt
This is the VapeBlunt mobile app repository. It is the mobile version of an already existing website, and it seeks to provide a smooth
and memorable experience for users who wish to acquire vapes of the utmost quality.

## Getting Started
This project constitutes, obviously, only the front end half of the whole application. This app is meant to be used in conjunction with the
[BlogContentManager](https://github.com/AlfreddGco/BlogContentManager) as its back end, since this is how you can manage the news and blogs that
are displayed on the app, as well
as most of the API calls. The exact setup of the BlogContentManager for this app is not provided here (for security reasons), so we strongly advice that you first
try getting it up and running on its own so that you get familiar with it.

### Prerequisites
All you need is an Android emulator or a real phone, if you have that kind of money. Same thing for iOS.

### Installing
So, this is it. After you clone it go to the main directory and do:
```
npm install
```

Then

```
react-native start
```
to start the react development server. After that's done, you can simply do:
```
react-native run-android
```
or
```
react-native run-ios
```
Don't forget to have your emulator running. React Native should detect it and install the app on there. You are probably going to have to setup
a couple more things to get your emulator running correctly, but that's beyond the scope of this README.

Fun Fact: you can do logging by running either of these commands:
```
react-native log-android
react-native log-ios
```
It's always useful to see what the app is doing under the hood.


## Built With
* React Native
* MongoDB
* VueJS
* ExpressJS
* NGINX
* Tears


## Contributing
Pull requests are welcome. Feel free to message us about any questions you might have about the project.

## Authors

* **Alfredo García** - *Initial work and local hero*
* **Carlos Brito** - *Back end work*
* **Casta Casta** - *Front end work*

You can also check out the list of [contributors](https://github.com/AlfreddGco/VapeBlunt/graphs/contributors).



## Acknowledgments

* My PC with 8GB of RAM who endured long, painful hours of Android development.
