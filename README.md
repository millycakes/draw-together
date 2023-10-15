# Draw Together :art: 
![2023-05-26 (2)](https://github.com/millycakes/draw-together/assets/105938846/eb21d9e4-65c1-45cb-bd67-a525be1aa1d5)

Draw Together is a web app that allows two people to draw collaboratively with each other online! Since coming to college, our team has experienced how hard it is to maintain relationships with all of our friends and families back home, and we wanted to build something that we could use to stay connected. We drew inspiration from a social media trend where couples would draw on a small canvas for a few minutes and swap with each other. We wanted to expand on this idea and include multiple ways two people can collaborate with each other in one platform. There are three modes you and your friend can play: Draw Together (you and your friend both draw together on one canvas), Top Bottom (you and your friend each draw on either the top half or bottom half of the canvas without being able to see the other half), and Canvas Swap (you and your friend draw on two different canvases and swap canvases every 2 minutes until the time is up). I worked as a full-stack developer in a team of three which consisted of a UI developer and a UI developer & front-end developer. 


## How to run :woman_technologist: 
You can simply run:
`npm i`

If you want to install each package individually, you can do so by cding into backend first and typing:

`npm i socket.io`

`npm i express concurrently`

`npm i cors`

`npm i http`

`npm i --save-dev nodemon`

For the client side, you will need to type

`npm i socket.io-client`

After downloading the packages, you can then compile the code and run it on local host by cding into server side and typing

`npm run dev`

We have also hosted our code on a Glitch site. You can try it out [here](https://fine-outgoing-hornet.glitch.me/)(this might take a few seconds to load up), but it's recommended that you use local host to run Draw Together!

## Tech Stack Details :computer: 
For our project, we used React for frontend, Node for backend, and Socket.io to connect server side and client side. Since our app needed constant communication between backend and frontend, we found Socket to be our best choice due to the low latency communication. We stored user and key data in server side, so that when we needed to store any long-term information we retrieved from the players in client side or needed to validate something, we would have our client side Socket emit to backend where our service side Socket would be listening. We would then retrieve the necessary data from backend, and use our server side Socket to emit to our client side Socket, so that our client side will now also hold the information. 

## Challenges :question: 
We had never worked with Node, React, or Socket.io before, so this project provided us with an opportunity to learn the three softwares. However, we had a few obstacles that we ran into while we were programming our project. Socket kept firing twice even when we wrapped the socket.emit code in React.useEffect, and there existed timing inconcistencies between both players' web app caused by different renderings and delays between the time it takes for the client side Socket to emit to back end and for server side Socket to emit back. To fix the former problem, instead of passing Socket into our client side files, we passed a boolean variable that would turn true if Socket needs to emit. In our App.js file, we used multiple useEffect functions so that once a boolean variable becomes true, Socket emits a certain message associated with the specific boolean variable to server side. After server side Socket emits back to client side, we turn the variable false. For the latter problem, instead of forcing our previous ideas, we took a step back and asked ourselves how we could approach the problem differrently, and remodeled some of our past ideas to accomodate for the delay time. For example, the two players' timers for Canvas Swap sometimes would not match, so one player would reach the 0 second countdown before the other. When we attempted to fix this, we realized the delays were caused by some things that were out of our control. Since we still had many other functions that needed to be implemented, we decided to run a simple cost-benefit analysis and came to the conclusion that attempting to make sure every second is counted down correctly would not be worth our time. Instead, we made it so that the canvases would only swap when both players have reached 0 in their respective countdowns.

## Demo :popcorn: 

### Draw Together

https://github.com/millycakes/draw-together/assets/105938846/9fdbcb2a-7563-4922-a4d6-659e143b389c

### Top Bottom

https://github.com/millycakes/draw-together/assets/105938846/33af47b8-6f0b-4a5a-abb1-b71a4e326522


### Canvas Swap

https://github.com/millycakes/draw-together/assets/105938846/5b90865a-8fc8-4905-9c25-5b2baa1d1479

## Lessons Learned :thought_balloon: 
### Planning, planning, and more planning!
Before building Draw Together, I had never been the type to plan out client side, server side, and the interactions between the two before starting to code it because most of my projects have been so small scale. However, I quickly become extremely overwhelmed, not knowing what my next step should be. Because I was also working with a team, me being lost led to our team not being able to progress much. I quickly realized this, took a step backward, and drew a simple diagram on how I thought variables and information should be passed between client side and server side. I showed our teams' frontend developer this, and she added on some other things that I was missing. We were then able to gain a clear idea on how to move forward.

### Agile Development!
Our team approached creating Draw Together through an agile development method. We would create a mini product, implement it into our existing product, and test and rework if necessary. This required a lot of communication between me and our teams' frontend developer. We kept each other consistently informed on our ideas, what we would introduce next into Draw Together, and the problems we were facing and how we could help each other. It was a new experience for me and proved difficult at times, but it was extremely rewarding, and I am proud of how much we have accomplished.

## Future Iterations :keyboard:  
We are still iterating on our game! We recently finished user testing, and we are deciding on some of our next changes, and how we should move forward with them. 
 
