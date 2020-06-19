var original_data = []
var new_data = []

var count = 0;
var g
// On load of window store in local storgage
window.onload = function(){
  //Give URL over here!
  const URL = "https://raw.githubusercontent.com/goliakshay357/data-analysis-internship/master/sampledata/Sample%20Data/Continuous%20Usage/Noisy%20Data/24DA50%20-%20Persisting%20noise%20peaks%2C%20continuous.json?token=AHZSN5QLGLJUKZ4U6DTY3US66RUSI"
  fetch(URL)
  .then(data => {
    return data.json()
  })
  .then(res =>{
    localStorage.setItem('original-data', JSON.stringify(res));
    original_data = res;
  })
  
  original_data = JSON.parse(localStorage.getItem('original-data',"local"));
  original_data_final = convert(original_data)
  // demo();
  var lll = setInterval(() => {
    count = postMethod(count,original_data_final)
  }, 500);
}



function postMethod(count,data){
  //post URL
  const URL = "http://1e6c29506cc3.ngrok.io/predict"
  // console.log(original_data_final,"if");
  
  
  let postArray = []
  if(count > 10){
    // console.log("Count",count);
    for(let i=11;i>0;i--){
      console.log(data[count - i].date);
      postArray.push(data[count - i])
    }
    console.log(postArray,"Post array");
    
    const otherParams ={
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify({
        array:postArray
      }),
      method: "POST"
    }
    
    // posting
    fetch(URL,otherParams)
    .then(data => {return data.json()})
    .then(res => {
      // graphing(res);
      localStorage.setItem('post-data', JSON.stringify(res));
      res.array.forEach((item,i)=> {
        // console.log(item,"IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
        upsert(new_data,item)
      })
      // upsert(new_data,res)
      dyGraph(new_data);
      // console.log("Response",res);
      
      })
    .catch(err => {console.log(err)})
  }
  // console.log(count,data);  
  count = count+1;
  return count
}

function dyGraph(data){
  // let data = data.array
    // console.log(data.array);
    
  // Response
  // date: "2020-01-10T05:47:11.000Z"
  // id: 1
  // percent: 27
  //manipulating my array -- taking only date and percent
  var answer = data.map(function(el){
    var arr=[];
    for(var key in el){
      // console.log(el[key],"KEYY");
      if(key === "date"){
        let date = new Date(el[key]);
        // item.date = date;
        arr.push(date)
      }
      if(key === "percent"){
        arr.push(el[key])
      }
    }
    return arr
  })
  // console.log("ANSWERRRRRRRRRRRR",answer);
  
  // console.log(document.getElementById("div_g"));  

  g = new Dygraph(document.getElementById("div_g"), answer,
                          {
                            drawPoints: true,
                            showRoller: true,
                            // strokeWidth: 0.0,
                            labels: ['date', 'percent']
                          })
}

function convert(data){
  data.forEach((item,i) =>{
    let date = new Date(item.date);
    item.date = date;
    item.id = i + 1;
  })
  return data
}

//if that ID is there then Update then push the new ID
function upsert(array, item) {var original_data = []
  var new_data = []
  
  var count = 0;
  var g
  // On load of window store in local storgage
  window.onload = function(){
    //Give URL over here!
    const URL = "https://raw.githubusercontent.com/goliakshay357/data-analysis-internship/master/sampledata/Sample%20Data/Continuous%20Usage/Noisy%20Data/24DA50%20-%20Persisting%20noise%20peaks%2C%20continuous.json?token=AHZSN5QLGLJUKZ4U6DTY3US66RUSI"
    fetch(URL)
    .then(data => {
      return data.json()
    })
    .then(res =>{
      localStorage.setItem('original-data', JSON.stringify(res));
      original_data = res;
    })
    
    original_data = JSON.parse(localStorage.getItem('original-data',"local"));
    original_data_final = convert(original_data)
    // demo();
    var lll = setInterval(() => {
      count = postMethod(count,original_data_final)
    }, 500);
  }
  
  
  
  function postMethod(count,data){
    //post URL
    const URL = "http://798cd253e717.ngrok.io/predict"
    // console.log(original_data_final,"if");
    
    
    let postArray = []
  
    let date =[]
    let percent =[]
    let label = []
    let probability = []
    let id =[]
    if(count > 10){
      // console.log("Count",count);
      // for(i=11;i>0;i--){
      //   console.log(data[count - i].date);
      //   data[count - i].label = 0
      //   data[count - i].probability = 0
      //   postArray.push(data[count - i])
      // }
  
        //pushing date from old array
        date.push(data[count - i].date)
        //pushing percent from old array
        percent.push(data[count - i].percent)
        //pushing ID from old array
        id.push(data[count - i].id)
        //pushing label from new array
        if(new_data[count - i]){
          label.push(new_data[count - i].label)
        }else{
          let temp =0
          label.push(temp)
        }
        //pushing probability
        if(new_data[count - i]){
          probability.push(new_data[count - i].probability)
        }else{
          let temp1 = 0
          probability.push(temp1)
        }
      }
      console.log({
        id:id,
        date:date,
        percent:percent,
        label:label,
        probability:probability
      },"Post array");
      
      const otherParams ={
        headers:{
          "content-type":"application/json"
        },
        body: JSON.stringify({
          id:id,
          date:date,
          percent:percent,
          label:label,
          probability:probability
        }),
        method: "POST"
      }
      
      // posting
      fetch(URL,otherParams)
      .then(data => {return data.json()})
      .then(res => {
        // graphing(res);
        localStorage.setItem('post-data', JSON.stringify(res));
        // res.array.forEach((item,i)=> {
        //   // console.log(item,"IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
        //   upsert(new_data,item)
        // })
        // upsert(new_data,res)
        dyGraph(res);
        // console.log("Response",res);
        
        })
      .catch(err => {console.log(err)})
    }
    // console.log(count,data);  
    count = count+1;
    return count
  }
  
  function dyGraph(data){
    // let data = data.array
      // console.log(data.array);
      
    // Response
    // date: "2020-01-10T05:47:11.000Z"
    // id: 1
    // percent: 27
    //manipulating my array -- taking only date and percent
    var answer = data.map(function(el){
      var arr=[];
      for(var key in el){
        // console.log(el[key],"KEYY");
        if(key === "date"){
          let date = new Date(el[key]);
          // item.date = date;
          arr.push(date)
        }
        if(key === "percent"){
          arr.push(el[key])
        }
      }
      return arr
    })
    // console.log("ANSWERRRRRRRRRRRR",answer);
    
    // console.log(document.getElementById("div_g"));  
  
    g = new Dygraph(document.getElementById("div_g"), answer,
                            {
                              drawPoints: true,
                              showRoller: true,
                              // strokeWidth: 0.0,
                              labels: ['date', 'percent']
                            })
  }
  
  function convert(data){
    data.forEach((item,i) =>{
      let date = new Date(item.date);
      item.date = date;
      item.id = i + 1;
    })
    return data
  }
  
  //if that ID is there then Update then push the new ID
  function upsert(array, item) {
    const i = array.findIndex(_item => _item.id === item.id);
    //if id is present
    if (i > -1) array[i] = item;
    else array.push(item);
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //function for adding ids 
  function adding_ids(data){
    data.forEach((item, i) => {
      item.id = i + 1;
    });
    return data
  }
  
  function demo(){
    console.log(g,"gggggggggggggg");
    let postArray ={
      id:1, 
      bost: "xxxxxxx"
    }
  
    const URL = "http://860add5f32b1.ngrok.io/predict";
    const otherParams ={
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify(postArray),
      method: "POST"
    };
  
    fetch(URL,otherParams)
    .then(data => {return data.json()})
    .then(res => {  
      // console.log(res,"POST callback")
      // graphing(res)
    })
    .catch(err => {console.log(err)})
  
  }
  // const i = array.findIndex(_item => _item.id === item.id);
  // //if id is present
  // if (i > -1) array[i] = item;
  // else array.push(item);























//function for adding ids 
function adding_ids(data){
  data.forEach((item, i) => {
    item.id = i + 1;
  });
  return data
}

function demo(){
  console.log(g,"gggggggggggggg");
  let postArray ={
    id:1, 
    bost: "xxxxxxx"
  }

  const URL = "http://127.0.0.1:5000/predict";
  const otherParams ={
    headers:{
      "content-type":"application/json"
    },
    body: JSON.stringify(postArray),
    method: "POST"
  };

  fetch(URL,otherParams)
  .then(data => {return data.json()})
  .then(res => {  
    // console.log(res,"POST callback")
    // graphing(res)
  })
  .catch(err => {console.log(err)})

}