# Web Development Project 5 - *Data Dashboard Part 1*

Submitted by: **Jamar Brown**

This web app: **This project is a data dashboard that grabs the information of various breweries(name, state, city, Longitude)**

Time spent: **11** hours spent in total

## Required Features

The following **required** functionality is completed:

- [X] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [X] **`useEffect` React hook and `async`/`await` are used**
- [X] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - *How many unique cities has a brewery, average longitude, and total number of breweries*
- [X] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [X] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [X] Multiple filters can be applied simultaneously
- [X] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [ ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

Google Drive Link: https://drive.google.com/file/d/1vK0Y5lik-3LAX4SwHAqiQZyy3ozTRnmx/view?usp=sharing


GIF created with ...  
QuickTimePlayer for macOS


## Notes

What I struggled with:

1. Synchronous State Update Conflicts: Encountered "cascading render" errors when attempting to update the UI state (breweries) inside a useEffect hook. Resolved this by refactoring the filtering logic into a centralized applyFilters function to ensure a single-directional data flow.

2. Managing "Source of Truth" Data: Initially struggled with the search bar "overwriting" the original API data. Implemented a dual-state approach using allBreweries as a permanent master list and breweries as a derived display list to preserve data integrity during filtering.

3. Multi-Attribute Filtering Logic: Faced challenges in restricting search results to specific categories (City, State, Longitude) as per the rubric. Solved this by implementing conditional filtering within the results.filter method, allowing the dropdown to dynamically change the search target.

4. Asynchronous Data Handling: Ensured that the dashboard didn't attempt to render or filter empty arrays before the async/await fetch from the Open Brewery DB API was completed, preventing "undefined" map errors.

5. CSS Case-Sensitivity and Layout Shifts: Debugged UI inconsistencies where React component className naming conventions (app-row vs App-row) caused flexbox layout collapses. Fixed this by standardizing the CSS architecture to support a responsive, glassmorphic dashboard design.

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