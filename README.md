# Task Manager App

## Meenakshi Rama Subramanian

## Table of Contents

1. Project Description
2. Tech Stack
3. Set Up
4. App Features
5. Design Process with Figma
6. Future Steps
7. Additional Notes
8. Thank you!

## Project Description
This is a Task Manager Application that enables users to track their daily tasks. Users are able to add new tasks, check off tasks when completed, and track their progress!

## Tech Stack
- React Native
  - Libraries: React Native Progress Bar (third party library for visual progression tracker)
  - React Hooks (useStates and Hooks such as useRef)
- Javascript
- Expo Go
- Google Fonts
- Figma
- Prettier (code formatting)

## Set Up
In order to run this application on your local device please follow the following steps:
1. Clone this repository to your local machine (via HTTPS, SSH, etc...)
2. Check that Node.js is installed (if not please install)
3. Navigate to the directory that repository was cloned in then run "npm start" or "npx expo start" in terminal
4. Open application in one of the following ways
   A. type "w" to open application on the web
   B. Use Expo Go
     1. Install the app "Expo Go" on phone (both Android and iOS will work)
     2. Once installed, create an account on Expo Go
     3. Use phone's camera app to ccan the QR code available in terminal (where the Task Manager Application was run)
     4. Wait for TaskManagerApp to download
5. Add your tasks!

## App Features
This application is intended to provide the usert with an easy way to add and manage their tasks. Features include:
1. Add Tasks via user input fields! This includes a section to add the task's name and a section for the amount of time the task requires. Click the "Add" button below the input fields to add the task to the  list!
2. Users are able click completed tasks as compelted with the check box mechanism towards the left side of tasks. Note users are also able to uncheck a task from the Completed Tasks section.
3. Users can delete a task with the X button located on the far right of each task. This deleting can be done in both the Incomplete Tasks and Complete Tasks section.
4. Users are able to track their progression with the progress bar located above the Incomplete Tasks section. This will visually display the users progression and also show the percentage of tasks they have completed. Note if there are no tasks then no progress bar is displayed.
5. This application is accessible via phone and web browser!

## Design Process
The Technical Assessment description provided simple implementation details that helped me understand the scope of this project! I began working on this application by designing a simple wireframe on Figma. Links to the Figma wireframes are provided below:
- [Figma Design](https://www.figma.com/design/VeIVqxglVxy2DGtYOknQBF/Chapter-One-Technical-Assessment?node-id=1-2&t=V2fyWsPlh4dxBKR8-1)
- [Prototype Link](https://www.figma.com/proto/VeIVqxglVxy2DGtYOknQBF/Chapter-One-Technical-Assessment?node-id=1-2&t=V2fyWsPlh4dxBKR8-1)

After the wireframes were complete I broke down the required components, objects, variables, and react frameworks needed. This application is a relatively simple project and did not requrie extensive Componenets or organization. As such I was immediately able to get working!
My goal was to implement functionality then design/CSS. I used several different react useStates to identify user input then create new Task objects. These were added to a tasksList that was dynamically rendered everytime a new task was added. I used a filtering system to create 2 separate lists for complete and incomplete tasks (this simplified the UI for visually representing both tasks list). Once these components were complete, I followed my wireframes to add aesthetics and CSS to ensure a clean and smooth user interface.

## Future Steps
My future steps for this application would be to integrate a back end for user authentication and storing tasks. I would ideally use Google Firebase's Firestore and Auth to do this. Once a backend is implemented, I would deploy this application so it can be downloaded and used across devices!

## Additional Notes
I used [Coolers](https://coolors.co/palette/1e1e24-92140c-fff8f0) for a color palette for this application and [Google Fonts](https://fonts.google.com/selection) to import Quicksand (one of my all time favorite fonts!)

## Thank you!
Thank you so much for providing me with this opportunity to showcase my technical skills! If there are any technical issues with accessing or viewing this project please let me know!
Additionally, if you require any further details on my part such as an unofficial transcript please let me know! I am excited about the possibility of contributing to Chapter One this summer! Thank you, and I look forward to hearing about the next steps in this application process!
