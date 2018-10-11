# Cookie Monster <br> svadivazhagu & dmcdonough
http://fp-cookiemonster.herokuapp.com
___
## About Cookie Monster

Cookie Monster leverages the power of modern JavaScript, IP tracing, and other toolkits to provide real-time data on a website's users. It features fully-functional geo-tracking, IP tracking, and many more features, all presented in a beautiful dashboard format. <br>
**Note**: **In order to run Cookie Monster on your browser, you must have all AdBlock extensions turned off and your browser must be Google Chrome. Otherwise the cookie storing functionality won't work.**.

**Note**: **We can only call Google maps once a day. However the geolocation will work. Meaning if you get an error about Maps not being able to load it in, it is still able to fetch your location and display, if you look past the message onto the greyed-out area. This issue is due to a billing problem with Google Maps API and their new billing system that charges a lot of money for simple dynamic calls.**
___
## Project Ideation
Cookie Monster was born from the desire to understand how services like Google Analytics and others are able to gather so much information on their users. While Cookie Monster lacks the deep data-mining features of Google Analytics, it is our testament to learning about persistent web analytics within the time-frame of an academic final project.
___
## Use Cases
 - **A/B UI Testing**
 - **Advertisements**
 - **Security Awareness**
 - **User Tracking**
___
## Achievements
### Technical Achivements
- **IP Tracking** : We made use of a RESTful IP Tracking API that allowed us to query and identify a user's IP. From this they are able to obtain a host of information, which we put into a mongoDB document corresponding to a user's cookie ID/hash, and then use that to persist through multiple sessions.
- **Persistent use of cookies and localStorage to cache high volumes of data for less render time** : From a user's IP data to the various other data points we collect, there is a great amount of information being pushed to our Mongo collection at any given time. We utilized localStorage as well as our own caching system using cookies to ensure that not too many ```insert``` operations are being run at once.
- **Current location map display**: We leveraged the power of the Google Maps API to
use the information from our IP routing to triangulate and identify a user's location and display an embedded Maps viewer to interact with.

### Design Achievements
- **Fully integrating Material Design philosophy into project**: The landing page and then the dashboard are both made with Material Design elements thoroughly.
- **Understanding color complementary principles** : We learned about complementary colors as the color choices for the buttons would have made a big impact on the overall presentation so we wanted to ensure that the colors selected were cohesive.
- **Sidebar for user information** : The user, when viewing the dashboard of their data, has a sidebar with basic information on it. This sidebar helps quickly communicate information that would otherwise have to be organized in a table.

___
Made with love at WPI.
