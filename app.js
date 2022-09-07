let count
refreshData()

function refreshData(count) {
    // Get BG data    
    async function getData() {
        const url = 'https://canning.herokuapp.com/api/v1/entries/sgv.json?count='
        if (!count) count = 48
        let response = await fetch(url + count)
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

        // Activate loading screen fade animation after data renders chart
        document.querySelector('.loader').className += ' hidden' // CSS: class '.loader .hidden'

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
                data: sgv, // BG Values
                backgroundColor: bkgcolor,
                borderColor: bkgcolor,
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
                responsive: true,
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'BG Value',
                            color: '#23a6d5',
                            font: {
                                size: 13,
                                weight: 'bold',
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
                            color: '#23a6d5',
                            font: {
                                size: 13,
                                weight: 'bold'
                            },
                            time: {
                                unit: 'day'
                            },
                        },
                        ticks: {
                            // display only time in labels, but full data on datapoint hover
                            callback: function (value) {
                                return this.getLabelForValue(value).substr(-8)
                            }
                        },
                    }
                },
                // removes colored box next to BG Data title, adds bold to dataset text
                plugins: {
                    legend: {
                        labels: {
                            boxWidth: 0,
                            font: {
                                weight: 'bold'
                            },
                        },
                    }
                }
            }
        }

        // render Chartjs
        if (Chart.getChart('myChart')) {
            Chart.getChart('myChart').destroy()
        }

        myChart = new Chart(
            document.getElementById('myChart'),
            config
        )
        updateUser()

    })
}

// auto fetch new BG data every five minutes
// setInterval(refreshData, 50000)


// Updated message
function updateUser() {
    const updated = document.querySelector('#refresh-data')
    const date2 = new Date().toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })

    updated.innerHTML = `<p id='data-update'>Updated on ${date2}</p>`
}

// Change view
const four = document.querySelector('#four')
const eight = document.querySelector('#eight')
const twelve = document.querySelector('#twelve')
four.addEventListener('click', changeView)
eight.addEventListener('click', changeView)
twelve.addEventListener('click', changeView)

function changeView(e) {
    if (e.target.matches('#four')) {
        refreshData(49)
    }
    if (this.matches('#eight')) {
        refreshData(97)
    }
    if (e.target.matches('#twelve')) {
        refreshData(145)
    }
}