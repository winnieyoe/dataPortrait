let date;
let time;
let perDay;
let allCount = [];
let allLoaded = false;
let numLoaded = 0;
let totalImgs = 258;
let imgsObj = {};
let marginB = 20;
let marginL = 45;

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

// function getHour(timeString){
//   let hour;
//   if (timeString[0] === '0'){
//     let hour = timeString[1];
//     return parseInt(String(hour));
//   }
//   else{
//     hour = timeString[0] + timeString[1];
//     hour = parseInt(hour);
//   }
//   return hour;
// }
//
// function getDate(dateString){
//   return dateString.substring(4,6)-11;
// }

function setup() {
  let cnv = createCanvas(1600, 750);
  cnv.parent('mySketch');
  date = table.getColumn('Date');
  time = table.getColumn('Time');

  totalDiv = document.getElementById("total");
  directDiv = document.getElementById("direct");
  socialDiv = document.getElementById("social");
  forwardedDiv = document.getElementById("forward");

  let object = {};

  // for (let hour=0; hour<24; hour++) {
  //   let hourStr = "00"
  //
  //   if (hour < 10) {
  //     hourStr = `0${String(hour)}`
  //   } else {
  //     hourStr = String(hour)
  //   }
  // }

  for (let i=0; i<table.getRowCount(); i++){    //for loop to get date count
    let day = table.getRow(i).get('Date');
    let time = table.getRow(i).get('Time');
    let type = table.getRow(i).get('Type');

    // if (object.hasOwnProperty(day)){
    //   // object[day]['count']++;
    //   let row = {};
    //   row['time'] = time;
    //   row['hour'] = time.substring(0,2);
    //   row['image'] = table.getRow(i).get('FileName');
    //   object[day].push(row);
    // } else {
    //   // object[day] = {count:0};
    //   object[day] = [];
    // }
    if (!object.hasOwnProperty(day)){
      object[day] = [];
    }
    let row = {};
    row['time'] = time;
    row['hour'] = time.substring(0,2);
    row['image'] = table.getRow(i).get('FileName');
    if (row['image'].length > 0){
      loadImage('images/' + row['image'] + '.png', function(img) {
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
  // console.log(object);

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

  const existedDays = []
  for (var entry in object) {
    existedDays.push(entry.substring(4,6))
  }
  // console.log(object);

  for (let day=11; day<=31; day++) {
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
      let allData = object[`Sep ${String(day)} 2019`];
      // console.log(dday);

      for (let i = 0; i < allData.length; i++) {
        let h = parseInt(allData[i].hour);
        dayTemplate[h].count += 1;
        dayTemplate[h].images.push(allData[i].image);
      }
      // console.log(dayTemplate);


      // perDay = object[`Sep ${String(day)} 2019`].reduce((acc, item) => {
      //   if (acc.hasOwnProperty(item['hour'])) {
      //     acc[item['hour']]++;
      //   } else {
      //     acc[item['hour']] = 1;
      //   }
      //   return acc;
      // }, {})
      allCount.push(dayTemplate);
    }
  }

  // for (let i = 0; i<time.length; i++){
  //   count[i] = getHour(time[i]); //take all times available and put in an array
  // }
  //
  // for (let i=0; i<date.length; i++){
  //   console.log(date[i]);
  //   console.log(getDate(date[i]));
  // }
  //
  // for (let i = 0; i<24; i++){
  //   data[i] = countItem(count, i);
  //   darkness[i] = map(data[i], 0, 15, 250, 0);
  // }
  //   darkness = darkness.reverse(); //reverse array so 00:00 starts from bottom
    // console.log(darkness);
}

// function countItem(arr, searchValue) {
//   let c = 0;
//   for (let i = 0; i<arr.length; i++){
//     if(arr[i] == searchValue) c++;
//   }
//   return c;
// }



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
        allCount[j][i].x1 = j*60+10*j+ marginL; //adding new key
        allCount[j][i].x2 = j*60+10*j + 60 + marginL;
        allCount[j][i].y1 = (23-i)*(height-marginB)/24; //height-10 so that there is space for date legend
        allCount[j][i].y2 = (23-i)*(height-marginB)/24 + 25;
        rect(j*60+10*j+marginL, (23-i)*(height-marginB)/24, 60, 24); //reverse
      }
    }

    // console.log(imgsObj);
    for (let j = 0; j < allCount.length; j++){
      // console.log(allCount);
      for(let i = 0; i <24; i++){
        let currentEle = allCount[j][i];
        if (mouseX > currentEle.x1 && currentEle.x2 > mouseX && currentEle.y1 < mouseY && currentEle.y2 > mouseY){
          // console.log(currentEle.images);
          for (let k = 0; k < currentEle.images.length; k++){
              let currentImg =  imgsObj[ currentEle.images[k] ];

              // currentImg.resize(200, 0);
              if (currentEle.y1 < height/2 && currentEle.x1 > width*2/3 && currentEle.x1 < width){
                image(currentImg, (k+12)*60+10, currentEle.y1+10);
              } else if(currentEle.y1 > height/2 && currentEle.x1 > width*2/3 && currentEle.x1 < width){
                image(currentImg, (k+12)*60+10, currentEle.y1-135);
              } else if (currentEle.x1 < width*2/3 && currentEle.x1 > width/3 && currentEle.y1 < height/2){
                image(currentImg, (k+6)*60+15, currentEle.y1+10);
              } else if (currentEle.x1 < width*2/3 && currentEle.x1 > width/3 && currentEle.y1 > height/2){
                image(currentImg, (k+6)*60+15, currentEle.y1-135);
              } else if (currentEle.x1 < width/3 && currentEle.y1 < height/2){
                image(currentImg, (k+1)*60+20, currentEle.y1+10);
              } else {
                image(currentImg, (k+1)*60+20, currentEle.y1-135);
              }
          }
          // imgsObj[ currentEle.images[0] ]
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

    for (let t = 0; t < allCount.length; t++){
      textSize(10);
      fill(72);
      text('Sep ' + parseInt(11+t), 60+(t*70), height-2);
    }
  }


  // for (let j = 0; j < allCount.length; j++){
  //   for(let i = 23; i >= 0; i--){
  //     let darkness = map(allCount[j][i], 0, 15, 250, 0);
  //     noStroke();
  //     fill(darkness);
  //     rect(j*60+10*j, (23-i)*height/24, 60, 25);
  //   }
  // }

  // console.log(perDay);

  // for(let i=0; i<perDay; i++){

//
// let initPos;
// initPos = 0;
// for(let j = 0; j < 10; j++) {
//   for (let i = 0; i < 24; i++){
//       noStroke();
//       fill(darkness[i]);
//       rect(initPos, i*height/24, 60, 25);
//   }
//   initPos += 80;
// }
}
