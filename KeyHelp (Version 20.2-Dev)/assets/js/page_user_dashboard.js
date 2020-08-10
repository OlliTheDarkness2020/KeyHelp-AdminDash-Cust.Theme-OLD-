//======================================================================================================================
// Disk space usage chart
//======================================================================================================================

// We do not want to display the chart, if disk space has not been calculated yet.
if (hideChart)
{
    $('.app-chart-container').hide();
}

var ctx = document.getElementById('app-chart-diskspace');

if (ctx)
{
    // Gather datasets
    var labels = [];
    var data = [];
    var colors = [];

    for (var i = 0; i < chartData.length; i++)
    {
        labels.push(chartData[i].label);
        data.push(chartData[i].percent);
        colors.push(chartData[i].color);
    }

    var ctx = ctx.getContext('2d');

    var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors
            }]
        },
        options: {
            cutoutPercentage: 35,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            animation: {
                animateRotate: false
            },
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 13
                }
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var currentValue = dataset.data[tooltipItem.index];
                        return ' ' + currentValue + ' %';
                    },
                    title: function(tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    }
                }
            }
        }
    });
}

//======================================================================================================================
// Show more domains
//======================================================================================================================

$('#app-show-more-domains').on('click', function() {
    $('#app-domain-items > .is-hidden').each(function() {
        $(this).removeClass('is-hidden');
    });
    $(this).remove();
});