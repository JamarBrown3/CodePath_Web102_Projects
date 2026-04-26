# Web Development Project 6 - *Data Dashboard Part 2*

Submitted by: **Jamar Brown**

This web app: **This is part 2 of Data Dashboard that includes the use of 2 charts and as well as routes**

Time spent: **13** hours spent in total

## Required Features

The following **required** functionality is completed:

- [X] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [X] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [X] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset


The following **optional** features are implemented:

- [ ] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [ ] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 

  
The following **additional** features are implemented:

* [X] List anything else that you added to improve the site's functionality!

* I have added a Not Found Page if the user goes to a page that doesn't exist

## Video Walkthrough

Here's a walkthrough of implemented user stories:

https://drive.google.com/file/d/1LNrCGefOQqQO_SiqoYv7Pe_aRqb3HBuE/view?usp=sharing

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
QuickTimePlayer macOS

## Notes

Describe any challenges encountered while building the app.

* Understanding how React Router works, especially how routes update only part of the page using Outlet
* Debugging route mismatches between Link paths and defined routes (e.g., /breweries/:id vs /breweryDetails/:id)
* Learning how to use the useParams() hook to extract dynamic URL parameters
* Passing dynamic data (IDs) correctly between components (DetailRow → BreweryDetails)
* Fixing issues with API fetching using dynamic parameters
* Avoiding infinite re-renders and React warnings caused by calling setState inside useEffect
* Refactoring code to use derived state with useMemo instead of redundant state variables
* Debugging why UI elements (like the table layout) were breaking despite data rendering correctly
* Fixing CSS conflicts and layout issues, especially with reusable class names like .List
* Troubleshooting why navigation links were leading to 404 pages
* Understanding how hash navigation (/#search) behaves in React Router
* Handling the case where navigation doesn’t trigger when already on the same route (/)
* Implementing a working solution to focus the search bar programmatically
* Debugging missing or deleted elements (e.g., missing id="search")
* Ensuring "View Details" links correctly navigate and load data
* Structuring components properly to separate layout, data fetching, and detail views
* Understanding how React apps re-render dynamically without page reloads
* Learning how to properly integrate and structure a NotFound (*) fallback route

**These challenges helped deepen my understanding of React’s component architecture, client-side routing, and dynamic data handling in modern web applications.**

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