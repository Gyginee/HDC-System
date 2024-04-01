/**
 * Client Detail Project List
 */

'use strict';
import {
  makeAjaxRequest,
  extractTextFromHTML,
  customizePrintView,
  makeAjaxRequestPromise,
  fetchAndPopulateSelect,
  getCssClassForStatusId
} from '../function.js';

// Variable declaration for table
var dt_cost_table = $('.datatables-cost'),
  dt_cost,
  statusObj,
  projectId,
  costReportChartConfig,
  clientData = baseUrl + 'api/v1/clients';

document.addEventListener('DOMContentLoaded', function () {
  // Lấy ID của dự án từ URL
  projectId = window.location.pathname.split('/').pop();

  // Gọi API để lấy thông tin dự án dựa trên ID
  fetch(clientData + '/' + clientId)
    .then(response => response.json())
    .then(e => {
      var clientSpan = document.getElementById('client_name_placeholder');
      if (e.data.name) {
        clientSpan.innerText = e.data.name;
      } else {
        clientSpan.innerText = 'Dự án không tồn tại';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Nếu xảy ra lỗi, hiển thị thông báo là "Dự án không tồn tại"
      document.getElementById('client_name_placeholder').innerText = 'Dự án không tồn tại';
    });
});
