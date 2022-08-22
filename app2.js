
getData();

async function getData() {
    const url = 'https://cgm.herokuapp.com/api/v1/entries/sgv.json?count=10';
    // const url = 'https://canning.herokuapp.com/api/v1/entries/sgv.json?find[dateString][$gte]=2022-06-018&find[dateString][$lte]=2022-06-19&count=10';
    const response = await fetch(url);
    const data = await response.json();

    return data;

}

//display SGV data in HTML table 

document.addEventListener("DOMContentLoaded", async () => {
    const bgData = await getData();
    bgData.forEach(bg => {
        const container = document.querySelector('#data-table tbody');
        const date = new Date(bg.dateString);
        container.innerHTML +=
            `<tr>
            <td>${date.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
            <td>${bg.sgv}</td>        
        </tr>`
    });
});

const btn = document.querySelector('#refresh-data');

btn.addEventListener('click', () => {
    getData();
    const updated = document.querySelector('#button-data');
    const date2 = new Date()
    updated.insertAdjacentHTML('afterend', `<p id='data-update'>Updated on ${date2.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>`);
})



// document.addEventListener('click', async () => {
//     const bgData = await getData();
//     bgData.forEach(bg => {
//         const container = document.querySelector('#data-table tbody');
//         container.innerHTML = ''
//         const date = new Date(bg.dateString);
//         container.innerHTML +=
//             `<tr>
//             <td>${date.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
//             <td>${bg.sgv}</td>        
//         </tr>`
//     });
// });


// ********** attempting to add new data when button is clicked

// async function getMore() {
//     const bgData = await getData();
//     bgData.forEach(bg => {
//         const container = document.querySelector('#data-table tbody');
//         const date = new Date(bg.dateString);
//         container.innerHTML +=
//             `<tr>
//             <td>${date.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
//             <td>${bg.sgv}</td>        
//         </tr>`
//     });
// }

// ************** event listeners
// document.addEventListener('DOMContentLoaded', getMore, false);
// document.addEventListener('click', getMore, false);


// document.addEventListener("DOMContentLoaded", async () => {
//     const bgData = await getData();
//     bgData.forEach(bg => {
//         const container = document.querySelector('#data-table tbody');
//         const date = new Date(bg.dateString);
//         container.innerHTML +=
//             `<tr>
//             <td>${date.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
//             <td>${bg.sgv}</td>        
//         </tr>`
//     });
// });

// Display data in div
// document.addEventListener("DOMContentLoaded", async () => {
//     const bgData = await getData();
//     const container = document.querySelector('#get-sgv');
//     bgData.forEach(bg => {
//         const paraElem = document.createElement('p');
//         const date = new Date(bg.dateString);
//         paraElem.innerText = `Date: ${date.toLocaleString()} \n SGV: ${bg.sgv} \n`;
//         container.appendChild(paraElem);

//     })
// });


