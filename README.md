# SPLASH
Spash is a Tool to export Gmail information based on custom filter to data analyse

# How to work 
---
**NOTE**

You will need to host this on an web server, since Google Sign In API only works with an web server.
I recommend starting an python simple http server:
`python -m http.server <port>`
---
- Change the apiKey and clientId variables with your values.
- On `displayInbox` function, change the filter variable the desired value
- Access the server via bowser, ex: `localhost:8000/gmail-query.html`
- Click authorize and select your gmail account.
## Git Repository
Always do it:

Fork this is repository
- Add upstream: `git remote add upstream git@github.com:sec4you/splash.git`
- Before push, execute:
- `git fetch upstream`
- `git rebase upstream/master`
- finally: `git push`
- Open pull request