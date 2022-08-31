refreshData()

async function refreshData() {
    // Get BG data
    async function getData() {
        const url = 'https://canning.herokuapp.com/api/v1/entries/sgv.json?count=24'
        const response = await fetch(url)
        const datapoints = await response.json()
        // reverse order of data so chart displays from left to right
        return datapoints.reverse()
    }

    // Map through data and pull out only bg (sgv) and date (datestring)
    getData().then(datapoints => {
        const date = datapoints.map(datapoint => {
            return new Date(datapoint.dateString).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        })
        const sgv = datapoints.map(datapoint => {
            return datapoint.sgv
        })

        // Change color of datapoint to indicate BG range
        const bkgcolor = [];

        for (i = 0; i < sgv.length; i++) {
            // pink if less than 50
            if (sgv[i] < 50) { bkgcolor.push('#e73c7e') }
            // blue if between 50 but less than 200
            if (sgv[i] >= 50 && sgv[i] < 200) { bkgcolor.push('#23a6d5') }
            // orange if over 200
            if (sgv[i] >= 200) { bkgcolor.push('#ee7752') }
        }

        // Chartjs setup  
        const labels = date
        const data = {
            labels: labels,
            datasets: [{
                label: 'BG Data',
                data: sgv, // result of sgv map
                backgroundColor: bkgcolor,
                borderColor: bkgcolor,
                // backgroundColor: 'rgba(255, 99, 132, 0.2)',
                // borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.4,
            }]
        }

        // Chartjs config
        const config = {
            type: 'line',
            data: data,
            options: {
                layout: {
                    padding: 20
                },
                //maintainAspectRatio: false,
                responsive: true,
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'BG',
                            font: {
                                size: 13
                            },
                        },
                        min: 40,
                        max: 400,
                        ticks: {
                            stepSize: 20
                        },
                        beginAtZero: false
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time',
                            font: {
                                size: 13
                            },
                            type: 'time',
                            time: {
                                unit: 'day'
                            },
                        },
                        ticks: {
                            // display only time in labels, but full data on datapoint hover
                            callback: function (value) {
                                return this.getLabelForValue(value).substr(-8);
                            }
                        },
                    }
                },
                // removes colored box next to BG Data title
                plugins: {
                    legend: {
                        labels: {
                            boxWidth: 0
                        }
                    }
                }
            }
        }

        // render Chartjs
        let myChart = null

        if (Chart.getChart('myChart')) {
            Chart.getChart('myChart').destroy();
        }

        myChart = new Chart(
            document.getElementById('myChart'),
            config
        )

        updateUser()
    });
}

// auto fetch new BG data every five minutes
setInterval(refreshData, 300000)

// update message

function updateUser() {
    const updated = document.querySelector('#refresh-data')
    const date2 = new Date().toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })

    updated.innerHTML = `<p id='data-update'>Updated on ${date2}</p>`
}


// optional manual button to refresh data
// const btn = document.querySelector('#refresh-data')

// btn.addEventListener('click', () => {
//     refreshData()
//     console.log('data refreshed')
//     const updated = document.querySelector('#button-data');
//     const date2 = new Date()
//     updated.insertAdjacentHTML('beforebegin', `<p id='data-update'>Updated on ${date2.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>`);
// })