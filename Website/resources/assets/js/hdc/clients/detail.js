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
  typeObj,
  vendorObj,
  typeObject,
  seriesData = [],
  typeCategories = [],
  projectId,
  costReportChartConfig,
  clientData = baseUrl + 'api/v1/clients',
  statusData = baseUrl + 'api/v1/status',
  projectDetail = baseUrl + 'api/v1/projects/detail',
  projectData = baseUrl + 'api/v1/projects/project',
  typeData = baseUrl + 'api/v1/types',
  costRepostData = baseUrl + 'api/v1/projects/total-cost';

document.addEventListener('DOMContentLoaded', function () {
  // Lấy ID của dự án từ URL
  projectId = window.location.pathname.split('/').pop();

  // Gọi API để lấy thông tin dự án dựa trên ID
  fetch(clientData + '/' + projectId)
    .then(response => response.json())
    .then(e => {
      var projectSpan = document.getElementById('project_name_placeholder');
      if (e.data.name) {
        projectSpan.innerText = e.data.name;
      } else {
        projectSpan.innerText = 'Dự án không tồn tại';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Nếu xảy ra lỗi, hiển thị thông báo là "Dự án không tồn tại"
      document.getElementById('project_name_placeholder').innerText = 'Dự án không tồn tại';
    });
