// PUBLIC API By: Denise Britt


//Establishing body's background image
document.body.style.backgroundImage = "url('/Users/deniseb./Downloads/PUBLIC_API/bgImg.jpeg')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundSize = "cover";

//adds styling to h1
document.querySelector("h1").style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
document.querySelector("h1").style.fontSize = "xx-large";
document.querySelector("h1").style.color = "lawngreen"; 
document.querySelector("h1").style.textShadow = "3.5px 3.5px #c250c2";


//stores our api url in `url` var
const url = 'https://randomuser.me/api/?results=12&inc=name,email,location,picture,cell,dob,nat=us&lego';
// selects our gallery div and stores into `gallery` var
const gallery = document.querySelector("#gallery");

//variable where we will store our returned data to access later
let people;

//Fetch request returns a response, parses response into json, then calls our createHTML function.
fetch(url)

    .then(res => res.json())
    .then( data => {

        people = data.results;
        createHTML(people);

    })
    // catches error 
    .catch (err => (Error('Something has gone wrong', err)));


 // createHTML function creates our HTML to display our employee cards
function createHTML(data) {

    data.forEach(function (person, i) {

        const email = person.email;
        const card = document.createElement("div");

        card.setAttribute("class", "card");

        card.innerHTML = `
        <div class="card-img-container">
        <img class="card-img" src=${person.picture.large} alt="profile picture">
        </div>
        <div class="card-info-container">
        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>`;

        gallery.appendChild(card);

        card.addEventListener("click", () => {

        modal_container.style.display = "";
        createModal(person,i);

        });
    });
};

// Here we are creating our Search container 
const search_container = document.querySelector(".search-container");
const form = document.createElement("form");

form.setAttribute("action","#");
form.setAttribute("method", "get");
search_container.appendChild(form);

form.innerHTML = `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
`;

// these variables create and append the modal div, hides modal container
const modalDiv = document.createElement("div");

modalDiv.setAttribute("class", "modal-container");
document.querySelector("body").insertBefore(modalDiv,gallery.nextSibling);

const modal_container = document.querySelector(".modal-container");

modal_container.style.display = "none";


// creates modal for employee card that has is selected and formats DOB 
function createModal(person, i)  {

    const email = person.email;
    
    const bDay = new Date( person.dob.date );
    const birthday = `${("0" + (bDay.getMonth() + 1)).slice(-2)}/${("0" + (bDay.getDay() + 1)).slice(-2)}/${bDay.getFullYear()}`;

    modalDiv.innerHTML = `
    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${person.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="modal-text">${email}</p>
        <p class="modal-text cap">${person.location.city}, ${person.location.state}</p>
        <hr>
        <p class="modal-text">${person.cell}</p>
        <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
        <p class="modal-text">Birthday: ${birthday}</p>
    </div>
    <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    </div>
    `;

    // modal prev and next variables and `length` variable for amount of employees
    const prev = document.querySelector("#modal-prev");
    const next = document.querySelector("#modal-next");
    const length = people.length;

    //adds event listener to prev button to loop through employees on click
    prev.addEventListener( "click", () => {

        if( i === 0 ) {
           
            i = length;
        }
        
        if ( i >= 0 ) {

            modalDiv.innerHTML = "";
            createModal(people[i - 1],  i - 1);

        }

    })

    //adds event listener to prev button to loop through employees on click    
    next.addEventListener( "click", () => {

         if ( i === length - 1 ) {
        
            i = -1;
       
    }
        if ( i >= -1 ) {

           modalDiv.innerHTML = "";
           createModal(people[i + 1], i + 1);
        }

    })
   
}
        

//adds event listener exit modal on click
modalDiv.addEventListener( "click", function(event) {
    
    const e = event.target;

    if (e.tagName === "STRONG") {

    modal_container.style.display = "none";

   }
})


// Creates a div to notify user if the their search finds no matches... Adds styling to noMatch div... appeneds noMatch div to gallery.
const noMatch = document.createElement("div");

noMatch.textContent = "Sorry. No matches found. Try a new Search.";
noMatch.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
noMatch.style.textShadow = "3px 3px #c250c2" 
noMatch.style.fontSize = "xx-large";
noMatch.style.color = "#e1f1f0"; 

noMatch.style.display = "none";

gallery.append(noMatch);  

// stores input in input var
const input = document.querySelector("input");


// `filterEmployees` function filters through employees and displays employee with matching name value. 
    // if there are no matches a message is displayed to make user aware that no matches were found.

function filterEmployees() {

    //selects all elements with `card` class and stores them into `card` variable.
    const card = document.querySelectorAll(".card");

    // creates an array with elements stored in `card` variable, stores array into `names` variable.
    const names = Array.from(card);

    // grabs the value of `search-input`, converts that value to upper case then stores the converted value inside `searchValue` variable.
    let searchValue = document.getElementById('search-input').value.toUpperCase();    

    // creates array and stores it inside of `searchResults` variable.
    const searchResults = [];    
    
    // for loop iterates through the elements in `names` array.
    for(let i = 0; i < names.length; i++) {

       // hides element by setting it's display to `none`. 
       card[i].style.display = 'none';       

        // grabs the first element of live element with an `h3` tagname and stores it into our `h3` variable.  
       let h3 = card[i].getElementsByTagName('h3')[0];                     
           
       // if our `h3` variable's innerHTML, when converted to uppercase, includes our `searchValue` value:    
       if (h3.innerHTML.toUpperCase().includes(searchValue)) { 

        // push the live `card` element to our `searchResults` array.
        searchResults.push(card[i]); 

        // shows element by setting it's display to `block`.
        card[i].style.display = 'block'; 
                              
        } 

       // if the length of our `searchResults` array is equal to 0:   
       if(searchResults.length === 0) { 

        //display `noMatch` div (which lets the user know that no employee name matches were found).
        noMatch.style.display = 'block'; 

        //otherwise:
       } else { 

        //hide `noMatch` div by setting display to `none`.  
        noMatch.style.display = 'none';

       }
       
    }
        
}
                                        

// stores search submit button in `searchBtn` var, adds event listeners to search input & button. Both call filterEmployees function 
const searchBtn = document.querySelector(".search-submit"); 
input.addEventListener('keyup', filterEmployees);                                 
searchBtn.addEventListener('click', filterEmployees);  

