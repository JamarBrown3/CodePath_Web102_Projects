# Web Development Project 4 - *VENI-VINCI*

Submitted by: **Jamar Brown**

This web app: **This is the Veni-VINCI**

Time spent: **12** hours spent in total

## Required Features

The following **required** functionality is completed: 

- [X] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The type of attribute displayed for each image should be consistent across API calls (i.e. if you are using a cat API, and display the color, breed, and age in response to an initial API call, subsequent button clicks should also result in the color, breed, and age being displayed)
- [X] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - A single result of an API call is displayed at a time 
  - Displayed attributes should match the displayed image (i.e., if showing a picture of a Siamese cat and the attribute breed, the displayed breed should be 'Siamese' not 'Ragdoll' or another breed that doesn't match)
  - There is at least one image per API call
- [X] **API call response results should appear random to the user**
  - Clicking on the API call button should generate a seemingly random new result each time
  - Note: Repeat results are permitted but the API used should have a reasonably large amount of data and repeats should not be frequent
- [X] **Clicking on a displayed value for one attribute adds it to a displayed ban **list**
  - At least one attribute for each API result should be clickable
  - Clicking on a clickable attribute not on the ban list, should imnmediately add it to the ban list 
  - Clicking on an attribute in the ban list should immediately remove it from the ban list 
- [X] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Clicking on the API call button should not result in any image/attributes with attribute values in the ban list being displayed (ex. Using a cat API, if the ban list includes the value 'Siberian' for the breed attribute, clicking on the Discover button should never result in a Siberian cat being displayed)
  - Note: More attribute values on the ban list may result in a higher frequency of repeat results
  -  [X] _To ensure an accurate grade, your recording **must** show that when clicked, an attribute in the ban list is immediately removed from the list of banned attributes_


The following **optional** features are implemented:

- [X] Multiple types of attributes are clickable and can be added to the ban list
- [X] Users can see a stored history of their previously displayed  results from this session
  - A dedicated section of the application displays all the previous images/attributes seen before
  - Each time the API call button is clicked, the history updates with the newest API result

The following **additional** features are implemented:

* [] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

https://drive.google.com/file/d/1JrZwLAvQlLp-DubeVN34oUZY-zRRHgt7/view?usp=sharing

<!-- Replace this with whatever GIF tool you used! -->
GIF created with QuickTimePlayer Macbook


## Notes

Describe any challenges encountered while building the app.

Rendering Objects directly: I tried to render {item} (the whole object) inside a tag.

The Struggle: In standard JavaScript, I can sometimes print an object. In React, if I don't pick a specific "child" (like {item.name}), the whole app crashes.

Key Prop Identity: You used key={item}.

The Struggle: React needs a simple "ID card" for every list item. Using a complex object as a key is like trying to use a whole person as their own Social Security number.

String Matching (Silent Logic Error): My code sent "Release Date" but checked for "Release."

The Struggle: This didn't cause an error message, which is why it was so frustrating. It just... didn't work. 

Lifting State Up: Moving the banList from the child (ApiCall) to the parent (App).

The Struggle: This is the most confusing part of React. Understanding that the "Source of Truth" must live in the parent so the Left, Center, and Right divs can all see it is a major architectural hurdle.

The "Unban" Loop: Making items in the list clickable to remove them.

The Struggle: This required "two-way communication." The Center div adds to the list, and the Right div removes from it. Keeping those in sync requires a solid grasp of array methods like .filter().

Flexbox Alignment: Getting the three columns to sit side-by-side.

The Struggle: CSS behaves differently inside React components. Using display: flex on the worldDiv is the "magic key" that turns a vertical stack into a professional three-column dashboard.

What I did Right (The Wins):

Component Structure: I correctly separated my API logic into its own component (ApiCall). 

API Fetching: I successfully handled an async/await fetch request and converted it to JSON. 

State Management: I used useState correctly to track multiple pieces of data (names, ratings, images).

Visual Logic: I had the vision for a "Banned List" and a "Seen List," which is a more complex UI state than most beginner projects.

I did use Ai Assist coding for the project 

## License

    Copyright [2026] [Jamar Brown]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.