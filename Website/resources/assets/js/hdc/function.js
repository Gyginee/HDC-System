// Exported function to handle AJAX requests
export function makeAjaxRequest(url, method, requestData, successCallback) {
  $.ajax({
    url: url,
    method: method,
    data: requestData,
    success: successCallback,
    error: function (error) {
      console.error(error);
    }
  });
}

// Function to get current date or format a given date
export function formatDate(inputDate) {
  let date;
  if (!inputDate) {
      // If no inputDate provided, use current date
      date = new Date();
  } else {
      // If inputDate provided, parse it
      date = new Date(inputDate);
  }

  // Extract day, month, and year components
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  // Return formatted date string
  return `${day}/${month}/${year}`;
}

// Exported function to extract text from HTML
export function extractTextFromHTML(inner) {
  if (inner.length <= 0) return inner;
  var el = $.parseHTML(inner);
  var result = '';
  $.each(el, function (index, item) {
    if (item.classList !== undefined && item.classList.contains('name')) {
      result = result + item.lastChild.firstChild.textContent;
    } else if (item.innerText === undefined) {
      result = result + item.textContent;
    } else result = result + item.innerText;
  });
  return result;
}

// Exported function to customize print view
export function customizePrintView(win, headingColor, borderColor, bodyBg) {
  $(win.document.body).css('color', headingColor).css('border-color', borderColor).css('background-color', bodyBg);
  $(win.document.body)
    .find('table')
    .addClass('compact')
    .css('color', 'inherit')
    .css('border-color', 'inherit')
    .css('background-color', 'inherit');
}

// Function to handle AJAX requests and return a Promise
export function makeAjaxRequestPromise(url, method, requestData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      method: method,
      data: requestData,
      success: resolve,
      error: reject
    });
  });
}

// Function to get the CSS class for a given status ID
export function getCssClassForStatusId(statusId) {
  // Define your mapping of status IDs to CSS classes here
  const classMapping = {
    1: 'bg-label-warning',
    2: 'bg-label-success',
    3: 'bg-label-primary',
    4: 'bg-label-secondary',
    // Add more mappings as needed
  };

  return classMapping[statusId] || 'bg-label-default';
}

// Function to fetch and populate select options
export function fetchAndPopulateSelect(url, selectId) {
  fetch(url)
    .then(response => response.json())
    .then(jsonData => {
      const selectElement = document.getElementById(selectId);
      jsonData.data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        selectElement.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Earning Reports Tabs Function with modified categories
function EarningReportsBarChart(arrayData, highlightData, categories) {
  const basicColor = config.colors_label.primary,
    highlightColor = config.colors.primary;
  var colorArr = [];

  for (let i = 0; i < arrayData.length; i++) {
    if (i === highlightData) {
      colorArr.push(highlightColor);
    } else {
      colorArr.push(basicColor);
    }
  }

  const earningReportBarChartOpt = {
    chart: {
      height: 258,
      parentHeightOffset: 0,
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '32%',
        startingShape: 'rounded',
        borderRadius: 4,
        distributed: true,
        dataLabels: {
          position: 'top'
        }
      }
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: 0,
        left: -10,
        right: -10
      }
    },
    colors: colorArr,
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + 'k';
      },
      offsetY: -20,
      style: {
        fontSize: '15px',
        colors: [legendColor],
        fontWeight: '500',
        fontFamily: 'Public Sans'
      }
    },
    series: [
      {
        data: arrayData
      }
    ],
    legend: {
      show: false
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      categories: categories, // Use the provided categories
      axisBorder: {
        show: true,
        color: borderColor
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '13px',
          fontFamily: 'Public Sans'
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -15,
        formatter: function (val) {
          return parseInt(val / 1) + 'k';
        },
        style: {
          fontSize: '13px',
          colors: labelColor,
          fontFamily: 'Public Sans'
        },
        min: 0,
        max: 60000,
        tickAmount: 6
      }
    },
    responsive: [
      {
        breakpoint: 1441,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '41%'
            }
          }
        }
      },
      {
        breakpoint: 590,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '61%',
              borderRadius: 5
            }
          },
          yaxis: {
            labels: {
              show: false
            }
          },
          grid: {
            padding: {
              right: 0,
              left: -20
            }
          },
          dataLabels: {
            style: {
              fontSize: '12px',
              fontWeight: '400'
            }
          }
        }
      }
    ]
  };
  return earningReportBarChartOpt;
}
