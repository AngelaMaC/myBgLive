// const dateData = [];
// const sgvData = [];

// async function getData() {
//     const url = 'https://canning.herokuapp.com/api/v1/entries/sgv.json?find[dateString][$gte]=2022-05-01&find[dateString][$lte]=2022-05-02&count=10';
//     const response = await fetch(url);
//     const data = await response.json();



//     const dateTimeMap = data.map(
//         function (index) {
//             return new Date(index.dateString);
//         });


//     dateData.push(dateTimeMap.toLocaleString('en-US', { hour12: false }));

//     const sgvMap = data.map(
//         function (index) {
//             return index.sgv;
//         });

//     sgvData.push(sgvMap);

//     document.querySelector('#get-date').insertAdjacentHTML = data.dateTimeMap;

//     return data;
// }

// getData();
// console.log(dateData);
// console.log(sgvData);


const sgvData = [];
const dateData = [];
const globalData = [];

// document.querySelector('.app').insertAdjacentHTML('beforeend', /*html*/`
//     <div>
//     <h1>My BG's</h1>
//     <div id='data'>${getData()}</div>
//     </div>
// `);

const date = document.querySelector('#get-date');
date.insertAdjacentHTML('beforeend', /*html*/`
    <div>${globalData}</div>
`);


async function getData() {
    const url = 'https://canning.herokuapp.com/api/v1/entries/sgv.json?find[dateString][$gte]=2022-05-01&find[dateString][$lte]=2022-05-02&count=10';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);


    const dateTimeMap = data.map(
        function (index) {
            //return index.dateString;
            let date = new Date(index.dateString);
            return date.toLocaleString();
        });


    dateData.push(dateTimeMap);

    const sgvMap = data.map(
        function (index) {
            return index.sgv;
        });

    sgvData.push(sgvMap);


    globalData.push({ dateTimeMap, sgvMap })
    return data;

}
getData();
document.querySelector('#get-date').innerText = globalData;
console.log(sgvData);
console.log(dateData);
console.log(globalData);


