// content.js

// Function to inject the confetti script
function injectConfettiScript() {
  console.log("Injecting confetti script...");
  const script = document.createElement('script');
  script.src = 'https://run.confettipage.com/here.js';
  script.setAttribute('data-confetticode', 'U2FsdGVkX19QdK+fJt1ahtBnMOeGodGFRF+lDBFOS1IpXSoapEJU1mT4z+/BHlNHnHGl/5bEvz8/xkKNOc91c221BeCSElszPuXDcvaxgPdSmstLEacOlB8ucOPZxAR1Zcv+Pr66v2Y3oXiy4KU65NmKavPs6ONNg/GPDgMsbVpXHNttuZGRJevqCvJpJZ5xPT1GZMtvNJCIJmnhXrmkPxo3Pc3ENk81VZXNceUBdFwg3su5FFWFALQZsB9XDY4h4CH04YNw3oTMu38sOS7bX+HvxglHn0N20ZvOehkOnsrPRHpCL82lAfBnBWBN6KIGR8XiNdvGYgYGOQfN4zivBmJ1jMb0PKEJuiSs1q1WXaCtOK4UkBy3yxIuYHIQSHY9nbkKYqzPnDt5VbOOoERHk0nU5XHP+U+ovvH3Ja7LM9ckGPJ3hDK6EQnFm04+1VLqqaWbQzRsbgnseWSHh7HZMmEmBPZYPJZmN3F6UKbkII8EXeH3Y+DBEvWnErxOyAW5s+uT3fIpxYQmxPuA6X6PQsHWiu4c2NrVsPeefkoHhXxCyO6Q4dJGgTm8p4SoYgNZvolOW72sks0R/KVXFzAArkPh5NJBgJU81LohyE/P38y9+h76bo66qD+V+FCJeP5ZTWCWJKjAnwTXdbCqTd6qdMUOsN3cPa7l4bFyI7oqgxA=');
  document.body.appendChild(script);
}

// Function to check for the specific element
function checkForElement() {
  const element = document.getElementById('geen_schuld');
  if (element) {
    console.log("Element with id 'geen_schuld' found");
    injectConfettiScript();
    return true;
  } else {
    console.log("Element with id 'geen_schuld' not found");
    return false;
  }
}

// Function to observe DOM changes
function observeDOMChanges() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log("DOM mutation observed");
      if (checkForElement()) {
        observer.disconnect(); // Stop observing once the element is found
        console.log("Observer disconnected");
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
  console.log("MutationObserver setup");
}

// Wait for the DOM to fully load before setting up the observer
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");
  if (!checkForElement()) {
    observeDOMChanges();
  }
});

// Also check if the page is fully loaded
window.addEventListener('load', () => {
  console.log("Page fully loaded");
  if (!checkForElement()) {
    observeDOMChanges();
  }
});
