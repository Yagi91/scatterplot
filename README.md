# scatterplot

*TABLE OF CONTENT*
- [Description of Project](#description).
- [LINK to app](https://yagi91.github.io/pomodoro-clock/).
- [Tools Used and why I choose them.](#tools).
- [User Stories](#users-story-completed-and-added-functionality-of-the-clock).
- [Problems Encountered](#problems-faced).
- [Credit](#credits).

### Description
This a Scatter PLot that shows the Doping in Professional Bicycle Racing based on the 35 Fastest Runs from the the year 1994-2016. Doping has really been an issue in Pro Bicycle racing through out the past 36 years with many having accepted of once doping.


### TOOLS:
-Scatter Plot: It was used beacause, Scatter Plot can esily show the reltion betwenn 2 variable this relation can be in 2 ways strong or weak, negative or positive. In our case this is a strong relation because we have areas where the dots are closely packed and it takes the posiive direction. 
- Vanilla JS: It was easier to build with Javascript as the website does not require to do many things.
    nested rules, inline imports and more
- HTML5/CSS6
- D3.js: a Huge JavaScript libary that can be used to reprsent data, its very flxible thn most of the other ones out therelike chart.js though difficult to implement.;
- AJAX: with xhr element which is still widely sipported accross multiple browsers than the fetch API.
## USERS STORY COMPLETED
- I can see a title element that has a corresponding id="title.
- Bottom and left axis are present.
- I can see dots, that each have a class of dot, which represent the data being plotted.
- Each dot has a property of data-xvalue and data-yvalue, each dot should be within the range of the actual dta and in the caorrect format intergers for years or Date objects are acceptable for data-yvalue minutes use Date objets.
- I can see multiple tick labels on the y-axis with %M:%S time format.
- I can see a legend containing descriptive text that has id="legend".
- I can mouse over an area and see a tooltip with a corresponding `id="tooltip"` which displays more information about the dot.
- My tooltip should have a data-date property that corresponds to the data-date of the active area..

### PROBLEMS FACED
Using the correct axes to represent the time in minutes and seconds I also had to learn about how to edit tick formats to suit the purpose.

#### CREDITS
This scatter plot was created after completing my Data vizualization course on [FREE CODE CAMP](https://www.freecodecamp.org/).
