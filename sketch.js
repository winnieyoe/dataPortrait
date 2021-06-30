let date;
let time;
let perDay;
let allCount = [];
let allLoaded = false;
let numLoaded = 1;
let totalImgs = 1000;
let imgsObj = {};
let boxWidth = 27;
let marginBtwBox = 7;
let marginB = 30;
let marginL = 45; //margin at chart's very left

let monthsData;
let allDatesArray = [];

let totalDiv;
let typeArray = [];
let directDiv;
let forwardedDiv;
let socialDiv;
let typeObj;

// let count = [];
// let data = [];
// let darkness = [];
// let color = [];
// let arr = [];



function preload() {
  table = loadTable('dataset.csv', 'csv', 'header');
}

function setup() {
  let cnv = createCanvas(6000, 750);
  cnv.parent('mySketch');
  date = table.getColumn('Date');
  time = table.getColumn('Time');

  totalDiv = document.getElementById("total");
  directDiv = document.getElementById("direct");
  socialDiv = document.getElementById("social");
  forwardedDiv = document.getElementById("forward");

  let object = {};
  // console.log(object);

  for (let i=0; i<table.getRowCount(); i++){    //for loop to get date count
    let day = table.getRow(i).get('Date');
    let time = table.getRow(i).get('Time');
    let type = table.getRow(i).get('Type');

    if (!object.hasOwnProperty(day)){
      object[day] = [];
    }
    let row = {};
    row['time'] = time;
    row['hour'] = time.substring(0,2);
    row['image'] = table.getRow(i).get('FileName');
    if (row['image'].length > 0){
      //FOR LOCAL SERVER
      // loadImage('smImages/' + row['image'] + '.PNG', function(img) {
      //     imgsObj[ row['image'] ] = img; //create new key and value in imgsObj
      //     numLoaded++;
      //     // console.log(numLoaded)
      //     if (numLoaded == totalImgs){
      //       allLoaded = true;
      //       console.log(allLoaded);
      //     }
      // }, () => {
      //   console.log(`This is not loaded: ${row['image']}`)
      // });

      //FOR GITHUB
      loadImage('https://raw.githubusercontent.com/winnieyoe/dataPortrait/revert/smImages/' + row['image'] + '.png', function(img) {
          imgsObj[ row['image'] ] = img; //create new key and value in imgsObj
          numLoaded++;
          if (numLoaded == totalImgs){
            allLoaded = true;
            console.log(allLoaded);
          }
      });
    }
    object[day].push(row);
    typeArray.push(type);
  }

  typeObj = {};
  for (let i = 0; i < typeArray.length; i++){
    if(typeObj.hasOwnProperty(typeArray[i])){
      typeObj[typeArray[i]] += 1;
    } else {
      typeObj[typeArray[i]] = 1;
    }
  }

  // date.substring(4,6)

  // const test = object['Sep 11 2019'].reduce((acc, item) => {
  //   // console.log(item);
  //   console.log(item)
  //   if (acc.hasOwnProperty(item['hour'])) {
  //     acc[item['hour']]++;
  //   } else {
  //     acc[item['hour']] = 1;
  //   }
  //   return acc;
  // }, {})
  // console.log(test)

  // const existedDays = []
  const existedMonths = []
  monthsData = {}

  for (var entry in object) {
    // const dayString = entry.substring(4,6)
    // existedDays.push(dayString)

    const monthString = entry.substring(0,3)
    const isMonthExists = existedMonths.filter(month => month === monthString).length > 0

    if (!isMonthExists) {
      existedMonths.push(monthString)
      if (monthsData[monthString] === undefined) monthsData[monthString] = []
    }

    monthsData[monthString].push(entry)
  }

  for (let monthEntry in monthsData) {
    const existedDays = []

    monthsData[monthEntry].forEach(dayEntry => {
      const dayString = dayEntry.substring(4,6)
      existedDays.push(dayString)
    })


    for (let day=0; day<=31; day++) {
      const hasDay = existedDays.filter(existedDay => existedDay == day).length > 0
      let dayTemplate = {0:{'count': 0, 'images':[]},
                         1:{'count': 0, 'images':[]},
                         2:{'count': 0, 'images':[]},
                         3:{'count': 0, 'images':[]},
                         4:{'count': 0, 'images':[]},
                         5:{'count': 0, 'images':[]},
                         6:{'count': 0, 'images':[]},
                         7:{'count': 0, 'images':[]},
                         8:{'count': 0, 'images':[]},
                         9:{'count': 0, 'images':[]},
                         10:{'count': 0, 'images':[]},
                         11:{'count': 0, 'images':[]},
                         12:{'count': 0, 'images':[]},
                         13:{'count': 0, 'images':[]},
                         14:{'count': 0, 'images':[]},
                         15:{'count': 0, 'images':[]},
                         16:{'count': 0, 'images':[]},
                         17:{'count': 0, 'images':[]},
                         18:{'count': 0, 'images':[]},
                         19:{'count': 0, 'images':[]},
                         20:{'count': 0, 'images':[]},
                         21:{'count': 0, 'images':[]},
                         22:{'count': 0, 'images':[]},
                         23:{'count': 0, 'images':[]}
                        };
      if (hasDay) {
        let allData = object[`${monthEntry} ${String(day)} 2019`];
        // console.log(dday);

        for (let i = 0; i < allData.length; i++) {
          let h = parseInt(allData[i].hour);
          dayTemplate[h].count += 1;
          dayTemplate[h].images.push(allData[i].image);
        }

        allCount.push(dayTemplate);

        // console.log(allCount)
      }
    }
  }
  deepIterator(monthsData);
}


function draw() {
  background(17);

  if (allLoaded){
    totalDiv.innerHTML = totalImgs;
    directDiv.innerHTML = typeObj.Direct;
    forwardedDiv.innerHTML = typeObj.Forwarded;
    socialDiv.innerHTML = totalImgs - typeObj.Direct - typeObj.Forwarded;

    for (let j = 0; j < allCount.length; j++){
      // console.log(allCount);
      for(let i = 0; i <24; i++){
        // let darkness = map(allCount[j][i].count, 0, 10, 250, 0);
        let alpha = map(allCount[j][i].count, 0, 10, 0, 255);
        noStroke();
        fill(255, 255, 255, alpha);
        allCount[j][i].x1 = j*boxWidth+marginBtwBox*j+ marginL; //adding new key
        allCount[j][i].x2 = j*boxWidth+marginBtwBox*j + boxWidth + marginL;
        allCount[j][i].y1 = (23-i)*(height-marginB)/24; //height-10 so that there is space for date legend
        allCount[j][i].y2 = (23-i)*(height-marginB)/24 + 25;
        rect(j*boxWidth+marginBtwBox*j+marginL, (23-i)*(height-marginB)/24, boxWidth, 25); //reverse
      }
    }

    // console.log(imgsObj);
    for (let j = 0; j < allCount.length; j++){
      // console.log("allCount", allCount);
      for(let i = 0; i <24; i++){
        let currentEle = allCount[j][i];
        if (mouseX > currentEle.x1 && currentEle.x2 > mouseX && currentEle.y1 < mouseY && currentEle.y2 > mouseY){
          // console.log("currentImage", currentEle.images);

          let horzOffset = 60;
          let totalWidthOfCurrentImages = 200 + ((currentEle.images.length-1) * horzOffset);
          let blockWidth = 60;


          for (let k = 0; k < currentEle.images.length; k++){
              let currentImg =  imgsObj[ currentEle.images[k] ];

              let imgY;
              let imgX;

              if (currentEle.y1 < height/2){
                  imgY = currentEle.y1+10;
              }
              if (currentEle.y1 > height/2){
                  imgY = currentEle.y1-135;
              }
              imgX = currentEle.x1 + 30;


              if (currentEle.x1 + blockWidth + totalWidthOfCurrentImages > width){
                imgX = currentEle.x1 - totalWidthOfCurrentImages;
              }

              imgX += horzOffset * k;
              image(currentImg, imgX, imgY);
          }
        }
      }
    }

    for (let t = 0; t < 25; t++){
      textSize(10);
      fill(72);
      if (t>14){
        text('0'+(24-t)+':00', 0, t*((height-marginB)/24)-15);
      } else {
        text((24-t)+':00', 0, t*((height-marginB)/24)-15);
      }
    }

    for (let t = 0; t < allDatesArray.length; t++){
      textSize(10);
      fill(72);

      let month = allDatesArray[t].substring(0,3);
      switch (month){
        case "Sep":
          month = "09";
          break;
        case "Oct":
          month = 10;
          break;
        case "Nov":
          month = 11;
          break;
      }

      let day = allDatesArray[t].substring(4,6);

      text(month + "." + twoDigitDay(day), 45+(t*34), height-2);
      // text('Sep ' + parseInt(11+t), 60+(t*70), height-2);
    }
  }
}

function deepIterator (target) {
  if (typeof target === 'object') {
    for (const key in target) {
      deepIterator(target[key]);
  }
  } else {
    allDatesArray.push(target);
  }
}

function twoDigitDay(day){
  return (day < 10 ? '0': '') + day;
}
