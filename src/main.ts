import './style.css'

// Common HTML element types
/*
HTMLInputElement → .value, .checked, .type
HTMLButtonElement → .disabled, .type
HTMLFormElement → .submit(), .reset()
HTMLAnchorElement → .href
HTMLDivElement, HTMLSpanElement → rarely needed (no special properties)

TYPESCRIPT NEEDS TO KNOW THE TYPE OF THE ELEMENT TO ACCESS THESE PROPERTIES.
You can use type assertions to tell TypeScript the specific type of an element.

Example:
const input = document.querySelector('#myInput') as HTMLInputElement;
const value = input.value; // Now TypeScript knows 'input' is an HTMLInputElement

Angle brackets syntax:
Generic type parameter syntax (preferred with querySelector):
const input = document.querySelector<HTMLInputElement>('#myInput');
const value = input?.value; // TypeScript knows 'input' is an HTMLInputElement | null

Example with document.getElementById:
const button = document.getElementById('myButton') as HTMLButtonElement;
button.disabled = true; // TypeScript knows 'button' is an HTMLButtonElement
*/

// Variable to track login state
let loggedInUser: string | null = null;

// Function to render the login form
function renderLogin(error: string = '') {
  // The ${error} below inserts the error variable into the HTML string
  // If error is empty, nothing shows. If it has text, it displays.
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="login-container">
      <h1>Login</h1>
      
      <!-- ${error} inserts the error message variable here -->
      <p style="color: red;">${error}</p>
      
      <form id="loginForm">
        <input type="email" id="email" placeholder="Email" required />
        <input type="password" id="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  `;

  // Add form submit handler
  document.querySelector('#loginForm')!.addEventListener('submit', handleLogin);
}

// Function to render welcome screen after login
function renderWelcome(username: string) {
  // ${username} inserts the username variable into the template
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="welcome-container">
      <!-- Here ${username} displays the logged in user's name -->
      <h1>Welcome, ${username}!</h1>
      <p>You are now logged in.</p>
      <button id="logoutBtn">Logout</button>
    </div>
  `;

  // The ! after document.querySelector('#logoutBtn') is TypeScript's non-null assertion operator.
  // It tells TypeScript: "I know this value won't be null or undefined, trust me."

  document.querySelector('#logoutBtn')!.addEventListener('click', () => {
    loggedInUser = null;
    renderLogin();
  });
}

// Handle login form submission
async function handleLogin(e: Event) {
  e.preventDefault();

  // Get input values
  const email = (document.querySelector('#email') as HTMLInputElement).value;
  const password = (document.querySelector('#password') as HTMLInputElement).value;

  try {
    // Fetch users from json-server (runs on port 3000 by default)
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();

    // Find matching user
    /*
    Explanation of the find method
    This code searches through an array of users to find one that matches the entered credentials.
    - users.find(...) iterates over each user object in the users array.
    - (u: { email: string; password: string; name?: string }) => ... is an arrow function that takes a user object u.
    - u.email === email && u.password === password checks if the email and password of the user object match the entered values.
    - If a match is found, that user object is returned and assigned to the user variable.
    - If no match is found, user will be undefined.
    */
    const user = users.find(
      (u: { email: string; password: string; name?: string }) =>
        u.email === email && u.password === password
    );

    if (user) {
      // Login success - use user.name or user.email as display name
      loggedInUser = user.name || user.email;
      renderWelcome(loggedInUser!);
    } else {
      // Login failed - pass error message to renderLogin
      // This error string becomes the ${error} in the template
      renderLogin('Invalid email or password');
    }
  } catch (err) {
    renderLogin('Could not connect to server. Is json-server running?');
  }
}

// Start the app
renderLogin();