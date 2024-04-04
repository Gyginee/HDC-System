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

export function loadNumeral() {
  // Đăng ký định dạng số tùy chỉnh cho tiền tệ Việt Nam (VNĐ)
  numeral.register('format', 'vn', {
    regexps: {
      format: /(\d)(?=(\d{3})+(?!\d))/g,
      unformat: /(\d+)/g
    },
    format: function (value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' ₫';
    },
    unformat: function (string) {
      return parseFloat(string.replace(/[^\d]+/g, ''));
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

// define datepicker
export function initializeDatepicker(selector, dateFormat) {
  let datePickr = $(selector);

  if (datePickr.length) {
    datePickr.flatpickr({
      monthSelectorType: 'static',
      dateFormat: 'dd-mm-YYYY',
      orientation: isRtl ? 'auto right' : 'auto left',
      locale: {
        format: dateFormat
      },
      onClose: function (selectedDates, dateStr, instance) {
        var selectedDate = '';
        if (selectedDates[0]) {
          selectedDate = moment(selectedDates[0]).format(dateFormat);
        }
        datePickr.val(selectedDate);
        datePickr.trigger('change').trigger('keyup');
      }
    });
  }
}

// Function to get the CSS class for a given status ID
export function getCssClassForStatusId(statusId) {
  // Define your mapping of status IDs to CSS classes here
  const classMapping = {
    1: 'bg-label-warning',
    2: 'bg-label-success',
    3: 'bg-label-primary',
    4: 'bg-label-secondary'
    // Add more mappings as needed
  };

  return classMapping[statusId] || 'bg-label-default';
}

// Function to fetch and populate select options
export function fetchAndPopulateSelect(url, selectId, tableId, tableContent) {
  fetch(url)
    .then(response => response.json())
    .then(jsonData => {
      const selectElement = document.getElementById(selectId);
      jsonData.data.forEach(item => {
        const option = document.createElement('option');
        option.value = item[tableId];
        option.textContent = item[tableContent];
        selectElement.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}
