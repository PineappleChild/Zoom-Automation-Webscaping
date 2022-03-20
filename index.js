const Discord = require("discord.js");
const puppeteer = require('puppeteer');
const { prefix, key, API_K_ONE } = require('./client.json');
const client = new Discord.Client();

var inputVal = "";
var emailAcc = "";
var passAcc = "";
var meetPass = "";
var displayNameE = "";
var classHour = 4;
var classMin = 20;
var classMonth = 0;
var classDay = 0;

// classSelector(classHour, classMin, inputVal, emailAcc, passAcc, meetPass, displayNameE);
// function getVal(){
//     console.log("clicked");
//     let month = document.getElementById('monthI').value;
//     let day = document.getElementById('dayI').value;
//     let hour = document.getElementById('hourI').value;
//     let min = document.getElementById('minuteI').value;
//     let amORpm = document.getElementById('amOPmI').value;
//     let email = document.getElementById('emailI').value;
//     let pass = document.getElementById('passI').value;
//     let meetID = document.getElementById('meetIDI').value;
//     let meetPassE = document.getElementById('meetPassI').value;
//     let dispName = document.getElementById('dispNameI').value;
//     console.log("LINK");
//     if(amORpm === "AM"){
//         if(parseInt(hour) === 12){
//             classHour = 0
//         }else{
//             classHour = parseInt(hour);
//         }
//     }else{
//         classHour = (parseInt(hour)+ 12);
//     }
//     classMonth = parseInt(month);
//     classDay = parseInt(day);
//     classMin = parseInt(min);
//     console.log(classHour);

//     inputVal = meetID;
//     emailAcc = email;
//     passAcc = pass;
//     meetPass = meetPassE;
//     displayNameE = dispName;

//     console.log(inputVal);
//     console.log(emailAcc);
//     console.log(passAcc);
//     console.log(meetPass);
//     console.log(displayNameE);
//     console.log('https://zoom.us/wc/join/' + inputVal);
//     var classObj = {
//         hour: classHour,
//         minute: classMin,
//         inputValue: "" + inputVal,
//         emailAccount:"" + emailAcc,
//         passAccount:"" + passAcc,
//         displayName:"" + displayNameE,
//         meetPassword:"" + meetPass,
//     };
//     classArr.push(classObj);
// }

// const button = document.getElementById('inputBtn');
// button.addEventListener('click', function(e) {
//     console.log('button was clicked');
// });

client.once('ready', () => {
    console.log('Ready!');
    console.log('https://zoom.us/wc/join/' + inputVal);
    setInterval(function(){ // Set interval for checking
        var date = new Date(); // Create a Date object to find out what time it is
        var hour = date.getHours();
        var min = date.getMinutes();
        classArr.forEach(element => {
            console.log(element);
        });
        console.log(hour + ":" + min);
        for (let i = 0; i < classArr.length; i++) {
            if(date.getHours() === classArr[i].hour && date.getMinutes() === classArr[i].minute){ // Check the time
                console.log("works:" + (i + 1));
                zoomScript(classArr[i].inputValue, classArr[i].emailAccount, classArr[i].passAccount, classArr[i].displayName, classArr[i].meetPassword);
            }
        }
    }, 60000);
})

async function zoomScript(inputVal, accEmail, accPass, passMeet, displayName){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  await page.goto('https://zoom.us/wc/join/' + inputVal);
  
  await page.waitFor(1500);
  await page.type("#email", accEmail);
  await page.type("#password", accPass);
  await page.click("#login-form > div:nth-child(3) > div > div.signin > a");
  await page.waitFor(3000);
  await page.screenshot({path: 'example.png'});
  try {
    await page.waitForSelector("#inputpasscode", { timeout: 5000 })
    await page.type("#inputpasscode", passMeet); 
    await page.waitFor(1000);
    const input = await page.$('#inputname');
    await input.click({ clickCount: 3 })
    await input.type(displayName);
    await page.waitFor(1000);
    await page.click("#joinBtn");
    await page.waitFor(4000);
    await page.screenshot({path: 'example2.png'});
    await page.waitFor(5000);
    let classImgMain = new Discord.Attachment('example2.png');
    let classImg = new Discord.RichEmbed({
        color: 0xed2e38,
        title: "Your Class:",
        image: {
            url: 'attachment://example2.png',
        },
        timestamp: new Date(),
        footer: {
            text: message.author.tag,
            icon_url: message.author.avatarURL,
        },
    });
    var channel = client.channels.get('670520683603689504')
    channel.send({ files: [classImgMain], embed: classImg });
  } catch (error) {
    console.log("The class did not start yet...");
    await page.screenshot({path: 'example2.png'});
    await page.waitFor(5000);
    let classImgMain = new Discord.Attachment('example2.png');
    let classImg = new Discord.RichEmbed({
        color: 0xed2e38,
        title: "Your class:",
        description:"Your class is either a bit later or you were not able to join.",
        image: {
            url: 'attachment://example2.png',
        },
        timestamp: new Date(),
    });
    var channel = client.channels.get('670520683603689504')
    channel.send({ files: [classImgMain], embed: classImg });
  }
  var notOn = true;
  var counter = 0;
  while(notOn)
    try {
        await page.waitForSelector("#wc-footer")
        await page.screenshot({path: 'example2.png'});
        await page.waitFor(5000);
        let classImgMain = new Discord.Attachment('example2.png');
        let classImg = new Discord.RichEmbed({
            color: 0xed2e38,
            title: "Your Class:",
            image: {
                url: 'attachment://example2.png',
            },
            timestamp: new Date(),
        });
        var channel = client.channels.get('670520683603689504')
        channel.send({ files: [classImgMain], embed: classImg });
        console.log("YOU ARE IN")
        await page.click("#wc-footer > div:nth-child(2) > button:nth-child(5)");
        await page.click("#wc-container-right > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > textarea");
        await page.type("#wc-container-right > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > textarea", "Hello");
        await page.waitFor(400);
        await page.keyboard.press('Enter');
        await page.screenshot({path: "menu.png"})
        notOn = false;
    } catch (error) {
        console.log(error);
        await page.waitFor(15000);
        if(counter++ == 5){
            console.log("TimeOut");
            notOn = false;
        }
    }
    await browser.close();
}



client.login(key);