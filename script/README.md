# How To Use Greasemonkey Script

### 1. Install Extension

Install Tampermonkey or Greasemonkey as a browser extension:
- [Tampermonkey Extension](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) (Chrome)
- [Greasemonkey Extension](https://addons.mozilla.org/en-CA/firefox/addon/greasemonkey/) (Firefox)

### 2. Copy the Script

In your respective extension, find the "Create new script" button and copy the entire contents of the `greasemonkey.js` script.

The name of the script at this point is irrelevant so name it whatever you like.

### 3. Save and Enable the Script

Save the script and make sure it's "enabled" in your respective extension.

### 4. Test the Script

Navigate to someone's LinkedIn profile.

Currently, the script will only run if the URL navigated to matches `https://www.linkedin.com/*` and will pull the LinkedIn user's ID/username to be handed to the API.