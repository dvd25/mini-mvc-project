function fetchCountry(country_string) {
    const COUNTRY_URL = `http://localhost:3000/api/getCountry?name=${country_string}` 
    console.log('fetching country')
    fetch(COUNTRY_URL)
        .then(res => res.json())
        .then(result => {
            if (result.length > 0) {
                getRegions(result)
            } else { alert(`No available data for ${country_string}.`) }
        })
}

function fetchAllCountries() {
    const COUNTRY_URL = 'http://localhost:3000/api/getAllCountries'
    fetch(COUNTRY_URL)
        .then(res => res.json())
        .then(result => {
            //console.log(result)
            let list = document.getElementById('country-data-list');
            for (i in result) {
                let option = document.createElement('option');
                option.value = result[i].Country;
                list.appendChild(option);
                //appending keypair value to make the search box
            }
            console.log(list)
        })
}

function addCard(card) {
    //clearing out chart data, else it will append data rather than overwrite
    
    optionObj.series[0].data = [];
    optionObj.xAxis.data = [];
    optionObj2.series[0].data = [];
    optionObj2.series[1].data = [];
    optionObj2.xAxis.data = [];
    optionObj3.series.data = [];

    for (let i in card) {
        let province = "";
        console.log(card)
        if (card[i].Province == "") { //some provinces dont have names, 
            //likely because the country is too small and it just covers the whole country
            province = card[i].Country //assign the country name as the province name
        } else {
            province = card[i].Province 
        }

        document.getElementById("h1h1").innerText = card[i].Country;
        const deaths = (card[i].Deaths).toLocaleString()
        const confirmed = (card[i].Confirmed).toLocaleString()
        //toLocaleString gives numbers commas for readability, however it doesnt work well as integers no more.

        //pushing data to charts x axis
        optionObj.series[0].data.push(card[i].Deaths);
        optionObj.xAxis.data.push(province);
        //pushing data to charts x axis
        optionObj2.series[0].data.push(card[i].Confirmed);
        optionObj2.series[1].data.push(card[i].Deaths);
        optionObj2.xAxis.data.push(province);

        //using templates to help make bootstrap cards.
        const template = document.getElementById("card-template").content.cloneNode(true);
        template.querySelector('.card-title').innerText = province;
        template.querySelector('.card-text').innerText = "Total Cases: " + confirmed + "\n Total Deaths: " + deaths;
        document.querySelector('#card-list').appendChild(template);
    }
    //after data is injected into the graphs, create the graphs
    createDeathGraph();
    createCaseGraph();
}
function getRegions(result) {  //purpose of this function is to get the latest object of each region.
    
    const uniqueProvinceArray = [];
    for (let i = result.length - 1; i > result.length - 100; i--) {
        if (uniqueProvinceArray.indexOf(result[i].Province) === -1) {
            uniqueProvinceArray.push(result[i].Province)
        } else { break; }
    }

    console.log("length: " + uniqueProvinceArray.length)
    console.log(result)
    console.log(uniqueProvinceArray)
    let uniqueItems = uniqueProvinceArray.length
    const latestUniqueRegionArray = [];

    for (let j = result.length - 1; j > result.length - uniqueItems - 1; j--) {
        latestUniqueRegionArray.push(result[j])
    }

    console.log(latestUniqueRegionArray)
    addCard(latestUniqueRegionArray)
    createTable(latestUniqueRegionArray)
}

function chooseCountry() {
    
    countryName = document.countriesForm.countryName.value;
    console.log("inside choose country()")
    clearcontent('card-list')
    fetchCountry(countryName);

}

function clearcontent(elementID) {

    document.getElementById(elementID).innerHTML = "";
}

function createPieGraph() {
    let chartDom3 = document.getElementById('main3');
    let myChart3 = echarts.init(chartDom3);
    myChart3.setOption(optionObj3);
}

//function that creates the graph, its uses the obj created globally.
function createDeathGraph() {
    let chartDom = document.getElementById('main1');
    let myChart = echarts.init(chartDom);
    myChart.setOption(optionObj);
}

function createCaseGraph() {
    let chartDom2 = document.getElementById('main2');
    let myChart2 = echarts.init(chartDom2);
    myChart2.setOption(optionObj2);
}

//for showing a loading css animation then hiding after 4 seconds
function showAnimation() {
    document.getElementById("animationDiv").style.display = "block";
    document.getElementById("navBtnContainer").style.display = "block";
    setInterval(function () {
        document.getElementById("animationDiv").style.display = "none";
        document.getElementById("animationContainer").style.display = "none";
    }, 4000)
}

//should scroll to the top of the webpage when called
function scrollToStart() {
    document.body.scrollTop = 0;
}

//creates table with data fetched
function createTable(card) {
    
    clearcontent('tab1') //clear contents inside the table dom named tab1
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let tr1 = document.createElement('tr');
    let thtext1 = document.createTextNode("Province");
    let thtext2 = document.createTextNode("Total Cases");
    let thtext3 = document.createTextNode("Total Deaths");
    th1.appendChild(thtext1)
    th2.appendChild(thtext2)
    th3.appendChild(thtext3)
    tr1.appendChild(th1);
    tr1.appendChild(th2);
    tr1.appendChild(th3)
    document.getElementById('tab1').appendChild(tr1)

    for (let i in card) {
        //console.log(card[i])
        let province = "";
        
        if (card[i].Province == "") {
            province = card[i].Country
        } else {
            province = card[i].Province
        }
        const deaths = (card[i].Deaths).toLocaleString()
        const confirmed = (card[i].Confirmed).toLocaleString()

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let text1 = document.createTextNode(province);
        let text2 = document.createTextNode(confirmed);
        let text3 = document.createTextNode(deaths);
        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        document.getElementById('tab1').appendChild(tr)
    }

    console.log("inside table")
}

function showTableDiv() {
    document.getElementById("tableNavDiv").style.display = "block";
    document.getElementById("graphNavDiv").style.display = "none";
    document.getElementById("cardNavDiv").style.display = "none";
}

function showGraphDiv() {
    document.getElementById("tableNavDiv").style.display = "none";
    document.getElementById("graphNavDiv").style.display = "block";
    document.getElementById("cardNavDiv").style.display = "none";
}

function showCardDiv() {
    document.getElementById("tableNavDiv").style.display = "none";
    document.getElementById("graphNavDiv").style.display = "none";
    document.getElementById("cardNavDiv").style.display = "block";
}

//chart objects below

let optionObj = {
    color: [
        '#5bc0de',
        '#f0ad4e'
    ],
    title: {
        text: 'COVID19 DEATHS BY REGION'
    },
    tooltip: {},
    legend: {
        data: ['provinces']
    },
    xAxis: {
        data: [],
        axisLabel: {
            interval: 0,
            rotate: 45 //If the label names are too long you can manage this by rotating the label.
        }
    },
    yAxis: {},
    series: [
        {
            name: 'deaths',
            type: 'bar',
            data: []
        }

    ]
};

let optionObj2 = {
    color: [
        "#f0ad4e",
        "#d9534f"
    ],
    title: {
        text: 'COVID19 TOTAL CASES BY REGION'
    },
    tooltip: {},
    legend: {
        data: ['total cases', 'deaths']
    },
    xAxis: {
        data: ["a", "b", "c", "d"],
        axisLabel: {
            interval: 0,
            rotate: 45 //If the label names are too long you can manage this by rotating the label.
        }
    },
    yAxis: {},
    series: [
        {
            name: 'total cases',
            type: 'bar',
            data: [1, 2, 3, 4]
        },
        {
            name: 'deaths',
            type: 'bar',
            data: []
        }
    ]
};

window.onload = fetchAllCountries();
window.onload = scrollToStart();


