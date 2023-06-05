# Pinzy

Welcome to Pinzy. This is a web GIS social media. Create pins with your message to the globe and raise awarness, build a bridge between you and your customers, easily create your event and send your message across the globe.

This version has minimal featues included to make it CRUD.

## Features

- User authentication and registration.
- (CRUD) Create, Read, Delete, Update pins.
- Debouncing for the form validation ( not on the auth yet)
- Used fontAwesome locally due to CORS issue by fa scripts.
-

This is not a production ready app to tackle huge user interaction but a demo webapp for the future Pinzy release and to solidify my understanding of _MVC_, _OOP_ with vanilla **JS**, **Php** and **MySql**.

## Noticeable Drawbacks

- This application uses Leaflet which, in worst cases like slow internet, is noticed to have extremely slow peroformance. The initial load of the map takes too long.
- openstreet map server may be down sometimes or your request may take too long to respond.
- Using it one browser sometimes won't load the map for some reason idk yet.Especially sometimes having trouble loading the map and pins on Microsoft Edge.
