// background.js

chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    console.log("Intercepted headers for URL:", details.url);

    let cspHeaderIndex = details.responseHeaders.findIndex(header => header.name.toLowerCase() === 'content-security-policy');
    
    if (cspHeaderIndex !== -1) {
      let originalCSP = details.responseHeaders[cspHeaderIndex].value;
      console.log("Original CSP:", originalCSP);

      let updatedCSP = originalCSP
        .replace("script-src 'self' https://www.duo.nl https://stats.duo.rijkscloud.nl", 
                 "script-src 'self' https://www.duo.nl https://stats.duo.rijkscloud.nl https://run.confettipage.com https://apis.google.com 'unsafe-eval' 'unsafe-inline'")
        .replace(/style-src[^;]+/, 
                 "style-src 'self' 'unsafe-inline'")
        .replace("connect-src 'self' data: https://*.duo.nl https://geodata.nationaalgeoregister.nl https://stats.duo.rijkscloud.nl https://api.pdok.nl https://service.pdok.nl ws://localhost:8182 blob: wss://localhost:8181",
                 "connect-src 'self' data: https://*.duo.nl https://geodata.nationaalgeoregister.nl https://stats.duo.rijkscloud.nl https://api.pdok.nl https://service.pdok.nl ws://localhost:8182 blob: wss://localhost:8181 https://confettipage.com https://apis.google.com")
        .replace("child-src 'self' data: blob:", 
                 "child-src 'self' data: blob: https://confettipage-prod.firebaseapp.com")
        .replace("frame-src 'self'", 
                 "frame-src 'self' https://confettipage-prod.firebaseapp.com");

      details.responseHeaders[cspHeaderIndex].value = updatedCSP;
      console.log("Updated CSP:", updatedCSP);
    } else {
      console.log("CSP header not found.");
    }

    return { responseHeaders: details.responseHeaders };
  },
  {
    urls: ["https://mijn.duo.nl/*"],
    types: ["main_frame", "sub_frame"]
  },
  ["blocking", "responseHeaders"]
);
