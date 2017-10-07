# facebook-md
A chrome extension that transforms facebook styles into material design

### Pre-requisites
- [NodeJS](https://nodejs.org)
- [Git](https://git-scm.com/downloads)
- [Gulp](https://www.npmjs.com/package/gulp)

### Build
Run ```npm install && gulp```
This will create the ```prod``` folder.

### Installation
Drag the root folder to ```chrome://extensions```

### Notes

You can contribute by changing the styles of the newsfeed. You can use [fb-md.png](./master/fm-md.png) as a design reference.
When you contribute, please update CONTRIBUTING.md with your names along with the changes you have commited.

The naming format will be as follows:
```
Name :
Email :
Github Profile: 'link_to_github_profile'
```

If you are a beginner, please refer to the contribution flow below :

1. ``` Fork ``` this repo
2. After this repo is forked, click the **GREEN** button and copy the HTTPS link to your clipboard
3. Type in the command ``` git clone "the-https-link" && cd _$ ```
4. Create a branch **DON'T APPLY CHANGES DIRECTLY TO THE MASTER BRANCH**
``` git checkout -b 'branch-name' ```
5. Apply some changes and type in the commands, respectively:
```
git commit -am "your_commit_message"
git push -u origin "your_branch_name"
```
6. Github will update immediately, just click on **Create Pull Request** and you're done!

### Additional Notes

This Extension only alters the default css of facebook web ui.
It might need to be updated when facebook updates their ui.
