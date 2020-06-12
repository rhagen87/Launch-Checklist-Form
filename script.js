// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function() {
   let form = document.querySelector("form");

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){ 
      response.json().then(function(json) {
      const missionTarget = document.getElementById("missionTarget");
      missionTarget.innerHTML = `
      <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[5].name}</li>
            <li>Diameter: ${json[5].diameter}</li>
            <li>Star: ${json[5].star}</li>
            <li>Distance from Earth: ${json[5].distance}</li>
            <li>Number of Moons: ${json[5].moons}</li>
         </ol>
         <img src="${json[5].image}">
         `;
   });
});

   form.addEventListener("submit", function(event) {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      let faultyItems = document.getElementById("faultyItems")
      let launchStatus = document.getElementById("launchStatus")
      let trigger = 0;
      
      if (pilotName.value === '' || copilotName.value === '' || fuelLevel.value === '' || cargoMass.value === '') {
         alert("All fields are required!");
         trigger = 1;
         event.preventDefault();
      } else {
         pilotStatus.innerHTML = `${pilotName.value} is ready.`;
         copilotStatus.innerHTML = `${copilotName.value} is ready.`;
      }

      if ( isNaN(fuelLevel.value) || isNaN(cargoMass.value) || !isNaN(pilotName.value) || !isNaN(copilotName.value) ) {
         alert("Please enter valid inputs!");
         trigger = 1;
         event.preventDefault();
      } 

      if (fuelLevel.value < 10000) {
         faultyItems.style.visibility = 'visible';
         fuelStatus.innerHTML = `Fuel level too low for launch`;
         launchStatus.style.color = 'red';
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         trigger = 1;
         event.preventDefault();
      }

      if (cargoMass.value > 10000) {
         faultyItems.style.visibility = 'visible';
         cargoStatus.innerHTML = `Cargo mass not low enough for launch`;
         launchStatus.style.color = 'red';
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         trigger = 1;
         event.preventDefault();
      }

      if (trigger === 0) {
         launchStatus.style.color = 'green';
         launchStatus.innerHTML = `Shuttle is ready for launch`
         event.preventDefault();
   };
   });
});