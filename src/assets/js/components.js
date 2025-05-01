
(function ($) {
    "use strict";

    /*=====================
     Image to background js
     ==========================*/
    $(".bg-top").parent().addClass('b-top');
    $(".bg-bottom").parent().addClass('b-bottom');
    $(".bg-center").parent().addClass('b-center');
    $(".bg-left").parent().addClass('b-left');
    $(".bg-right").parent().addClass('b-right');
    $(".bg_size_content").parent().addClass('b_size_content');
    $(".bg-img").parent().addClass('bg-size');
    $(".bg-img.blur-up").parent().addClass('blur-up lazyload');
    $('.bg-img').each(function () {

        var el = $(this),
            src = el.attr('src'),
            parent = el.parent();


        parent.css({
            'background-image': 'url(' + src + ')',
            'background-size': 'cover',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'display': 'block'
        });

        el.hide();
    });

})(jQuery);

// over view
var options = {
    series: [{
        name: '$2530.00',
        data: [20, 25, 20, 30, 20, 50, 30, 35, 25, 60, 0]
    }],
    chart: {
        height: 280,
        type: 'area',
        dropShadow: {
            enabled: true,
            top: 10,
            left: 0,
            blur: 3,
            color: '#720f1e',
            opacity: 0.15
        },
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        },
    },
    markers: {
        strokeWidth: 4,
        strokeColors: "#ffffff",
        hover: {
            size: 9,
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        lineCap: 'butt',
        width: 4,
    },
    legend: {
        show: false
    },
    colors: ["#ff5c41"],
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.4,
            stops: [0, 90, 100]
        }
    },
    grid: {
        xaxis: {
            lines: {
                borderColor: 'transparent',
                show: false,
            }
        },
        yaxis: {
            lines: {
                borderColor: 'transparent',
                show: false,
            }

        },
        padding: {
            right: -112,
            bottom: 0,
            left: 15
        }
    },
    responsive: [{
        breakpoint: 1200,
        options: {
            grid: {
                padding: {
                    right: -95,
                }
            },
        },
    },
    {
        breakpoint: 992,
        options: {
            grid: {
                padding: {
                    right: -69,
                }
            },
        },
    }
    ],
    yaxis: {
        labels: {
            formatter: function (value) {
                return value + "K";
            }
        },
        axisBorder: {
            low: 0,
            offsetX: 0,
            show: false,
        },
        axisTicks: {
            show: false,
        },
        crosshairs: {
            show: false,
        },
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",],
        range: undefined,
        axisBorder: {
            low: 0,
            offsetX: 0,
            show: false,
        },
        axisTicks: {
            show: false,
        },
        crosshairs: {
            show: true,
            position: 'back',
            stroke: {
                color: '#ff5c41',
                width: 1,
                dashArray: 0,
            },
        },
    },
    tooltip: {
        formatter: undefined,
    },
};

var chart = new ApexCharts(document.querySelector("#overviewchart"), options);
chart.render();

// chartist chart
new Chartist.Bar('.small-chart', {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
    series: [
        [400, 900, 800, 1000, 700, 1200, 300],
        [1000, 500, 600, 400, 700, 200, 1100]
    ]
}, {
    plugins: [
        Chartist.plugins.tooltip({
            appendToBody: false,
            className: "ct-tooltip"
        })
    ],
    stackBars: true,
    chartPadding: {
        top: -30,
        right: 0,
        left: 0,
        bottom: 0
    },
    axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0
    },
    axisY: {
        low: 0,
        showGrid: false,
        showLabel: false,
        offset: 0,
        labelInterpolationFnc: function (value) {
            return (value / 1000) + 'k';
        }
    }
}).on('draw', function (data) {
    if (data.type === 'bar') {
        data.element.attr({
            style: 'stroke-width: 3px'
        });
    }
});
