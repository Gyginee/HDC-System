/**
 * Page Detail Project List
 */

'use strict';
import {
  makeAjaxRequest,
  extractTextFromHTML,
  customizePrintView,
  makeAjaxRequestPromise,
  fetchAndPopulateSelect,
  getCssClassForStatusId,
  loadNumeral
} from '../function.js';

loadNumeral(); // Gọi hàm để đăng ký định dạng số

// Variable declaration for table
var dt_cost_table = $('.datatables-cost'),
  dt_cost,
  statusObj,
  typeObj,
  staffObject,
  vendorObj,
  typeObject,
  seriesData = [],
  typeCategories = [],
  projectId,
  costReportChartConfig,
  vendorData = baseUrl + 'api/v1/vendors',
  statusData = baseUrl + 'api/v1/status',
  staffData = baseUrl + 'api/v1/staffs/staff',
  projectDetail = baseUrl + 'api/v1/projects/detail',
  projectDetailbyID = baseUrl + 'api/v1/projects/get-all-projectid',
  projectData = baseUrl + 'api/v1/projects/project',
  typeData = baseUrl + 'api/v1/types',
  costRepostData = baseUrl + 'api/v1/projects/total-cost-type';

// Chart Colors
const chartColors = {
  bar: {
    series1: config.colors.primary,
    series2: '#7367F0CC',
    series3: '#7367f099',
    series4: '#7367f066'
  }
};

document.addEventListener('DOMContentLoaded', function () {
  // Lắng nghe sự kiện khi trường input thay đổi
  document.querySelectorAll('cost-client').forEach(function (input) {
    input.addEventListener('input', function () {
      // Lấy giá trị hiện tại của trường input
      var value = this.value;

      // Loại bỏ tất cả các ký tự không phải số
      var cleanValue = value.replace(/[^\d.]/g, '');

      // Định dạng lại số tiền và lưu vào biến formattedValue
      var formattedValue = numeral(cleanValue).format('0,0');

      // Hiển thị giá trị được định dạng trong trường input
      this.value = formattedValue;
    });
  });
  // Lấy ID của dự án từ URL
  projectId = window.location.pathname.split('/').pop();

  // Gọi API để lấy thông tin dự án dựa trên ID
  fetch(projectData + '/' + projectId)
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

  //Fetch vendor, add into vendorObj
  fetch(vendorData)
    .then(response => response.json())
    .then(data => {
      // Check if the fetched data contains the "data" property
      if (data && Array.isArray(data.data)) {
        vendorObj = data.data.reduce((obj, vendor) => {
          obj[vendor.id] = {
            title: vendor.name
          };
          return obj;
        }, {});
      } else {
        console.error('Fetched data is not in the expected format:', data);
      }
    })
    .catch(error => console.error('Error fetching status data:', error));

  //Fetch Type, add into typeObj
  fetch(typeData)
    .then(response => response.json())
    .then(data => {
      // Check if the fetched data contains the "data" property
      if (data && Array.isArray(data.data)) {
        typeObject = data.data.reduce((obj, type) => {
          obj[type.id] = {
            title: type.name
          };
          return obj;
        }, {});
        // Extract all the names from the data
      } else {
        console.error('Fetched data is not in the expected format:', data);
      }
    })
    .catch(error => console.error('Error fetching status data:', error));

  //Fetch Staff, add into staffObj
  fetch(staffData)
    .then(response => response.json())
    .then(data => {
      // Check if the fetched data contains the "data" property
      if (data && Array.isArray(data.data)) {
        staffObject = data.data.reduce((obj, staff) => {
          obj[staff.staff_id] = {
            title: staff.fullname
          };
          return obj;
        }, {});
        // Extract all the names from the data
      } else {
        console.error('Fetched data is not in the expected format:', data);
      }
    })
    .catch(error => console.error('Error fetching status data:', error));

  //Fetch Status, add into statusObj
  fetch(statusData)
    .then(response => response.json())
    .then(data => {
      // Check if the fetched data contains the "data" property
      if (data && Array.isArray(data.data)) {
        statusObj = data.data.reduce((obj, status) => {
          obj[status.id] = {
            title: status.name,
            class: getCssClassForStatusId(status.id)
          };
          return obj;
        }, {});
      } else {
        console.error('Fetched data is not in the expected format:', data);
      }
    })
    .catch(error => console.error('Error fetching status data:', error));

  //Fetch Select
  fetchAndPopulateSelect(typeData, 'cost-type', 'id', 'name');
  fetchAndPopulateSelect(vendorData, 'cost-vendor', 'id', 'name');
  fetchAndPopulateSelect(statusData, 'cost-status', 'id', 'name');
  fetchAndPopulateSelect(staffData, 'cost-handle', 'staff_id', 'fullname');

  // Initialize Form Validation
  let addNewCostForm = document.getElementById('CostAddForm'),
    submitButton = document.getElementById('submitFormButton');
  //Function Form Validation
  const fv = FormValidation.formValidation(addNewCostForm, {
    fields: {
      costName: {
        validators: {
          notEmpty: {
            message: 'Thiếu tên chi phí' // Missing vendor's name
          }
        }
      },

      costVendor: {
        validators: {
          notEmpty: {
            message: 'Vui lòng chọn đối tác'
          },
          callback: {
            message: 'Vui lòng chọn đối tác',
            callback: function (value, validator, $field) {
              return value !== '';
            }
          }
        }
      },

      costType: {
        validators: {
          notEmpty: {
            message: 'Vui lòng chọn phân loại'
          },
          callback: {
            message: 'Vui lòng chọn phân loại',
            callback: function (value, validator, $field) {
              return value !== '';
            }
          }
        }
      },

      costQuantity: {
        validators: {
          notEmpty: {
            message: 'Thiếu số lượng'
          }
        }
      },

      costUnit: {
        validators: {
          notEmpty: {
            message: 'Thiếu đơn vị'
          }
        }
      },
      costClient: {
        validators: {
          notEmpty: {
            message: 'Thiếu giá khách hàng'
          }
        }
      },
      costInternal: {
        validators: {
          notEmpty: {
            message: 'Thiếu giá nội bộ'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: '',
        rowSelector: function (field, ele) {
          return '.mb-3';
        }
      }),
      submitButton: new FormValidation.plugins.SubmitButton(),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  });

  // Function to handle form submission
  function handleFormSubmission() {
    const costName = document.getElementById('cost-name').value,
      costVendor = document.getElementById('cost-vendor').value,
      costQuantity = parseInt(document.getElementById('cost-quantity').value),
      costUnit = document.getElementById('cost-unit').value,
      costType = document.getElementById('cost-type').value,
      costClient = parseInt(document.getElementById('cost-client').value),
      costInternal = parseInt(document.getElementById('cost-internal').value),
      costClientRealInput = document.getElementById('cost-client-real').value,
      costInternalRealInput = document.getElementById('cost-internal-real').value,
      costClientReal = costClientRealInput == '' ? 0 : parseInt(costClientRealInput),
      costInternalReal = costInternalRealInput == '' ? 0 : parseInt(costInternalRealInput),
      costStatus = document.getElementById('cost-status').value,
      costHandle = document.getElementById('cost-handle').value;

    const data = {
      project_id: projectId,
      vendor_id: costVendor,
      name: costName,
      quantity: costQuantity,
      unit: costUnit,
      type: costType,
      client_cost: costClient,
      internal_cost: costInternal,
      real_client_cost: costClientReal,
      real_internal_cost: costInternalReal,
      status: costStatus,
      staff_id: costHandle
    };

    console.log(data);

    fetch(projectDetail, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(e => {
        dt_cost.rows
          .add([
            {
              id: e.data.id,
              name: e.data.name,
              vendor_id: e.data.vendor_id,
              quantity: e.data.quantity,
              unit: e.data.unit,
              type: e.data.type,
              client_cost: e.data.client_cost,
              internal_cost: e.data.internal_cost,
              real_client_cost: e.data.real_client_cost,
              real_internal_cost: e.data.real_internal_cost,
              status: e.data.status,
              staff_id: e.data.staff_id
            }
          ])
          .draw();
        Swal.fire({
          title: 'Thành công!',
          text: 'Thêm chi phí thành công!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        });
      })
      .catch(error => {
        // console.error('Error:', error);
        Swal.fire({
          title: 'Lỗi!',
          text: 'Xảy ra sự cố khi thêm chi phí!',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        });
      });
  }

  // Attach event listener to form's submit event
  submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    fv.validate().then(function (status) {
      if (status === 'Valid') {
        handleFormSubmission();
      }
    });
  });
});

// Datatable (jquery)
$(function () {
  let cardColor, headingColor, legendColor, labelColor, borderColor;
  if (isDarkStyle) {
    cardColor = config.colors_dark.cardColor;
    labelColor = config.colors_dark.textMuted;
    legendColor = config.colors_dark.bodyColor;
    headingColor = config.colors_dark.headingColor;
    borderColor = config.colors_dark.borderColor;
  } else {
    cardColor = config.colors.cardColor;
    labelColor = config.colors.textMuted;
    legendColor = config.colors.bodyColor;
    headingColor = config.colors.headingColor;
    borderColor = config.colors.borderColor;
  }

  // Cost datatable
  if (dt_cost_table.length) {
    dt_cost = dt_cost_table.DataTable({
      columnDefs: [
        {
          targets: [0],
          title: 'ID',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + full['id'] + '</span>';
          }
        },
        {
          targets: [1],
          title: 'Đối tác',
          render: function (data, type, full, meta) {
            const vendorData = vendorObj[full['vendor_id']];
            return '<span class="fw-medium">' + vendorData.title + '</span>';
          }
        },
        {
          targets: [2],
          title: 'Tên chi phí',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + full['name'] + '</span>';
          }
        },
        {
          targets: [3],
          title: 'Số lượng',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + full['quantity'] + '</span>';
          }
        },
        {
          targets: [4],
          title: 'Đơn vị',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + full['unit'] + '</span>';
          }
        },
        {
          targets: [5],
          title: 'Loại',
          render: function (data, type, full, meta) {
            const typeData = typeObject[full['type']];
            return '<span class="fw-light">' + typeData.title + '</span>';
          }
        },
        {
          targets: [6],
          title: 'Giá khách',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + numeral(full['client_cost']).format('0,0vn') + ' ₫' + '</span>';
          }
        },
        {
          targets: [7],
          title: 'Giá nội bộ',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + numeral(full['internal_cost']).format('0,0vn') + ' ₫' + '</span>';
          }
        },
        {
          targets: [8],
          title: 'Giá khách thực tế',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + numeral(full['real_client_cost']).format('0,0vn') + ' ₫' + '</span>';
          }
        },
        {
          targets: [9],
          title: 'Giá nội bộ thực tế',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + numeral(full['real_internal_cost']).format('0,0vn') + ' ₫' + '</span>';
          }
        },
        {
          targets: [10],
          title: 'Trạng thái',
          render: function (data, type, full, meta) {
            const statusName = full['status'];
            const statusData = statusObj[statusName];

            if (statusData) {
              return `<span class="badge ${statusData.class}" text-capitalized>${statusData.title} </span>`;
            } else {
              return `<span class="badge bg-label-dark">Chưa cập nhật</span>`;
            }
          }
        },
        {
          targets: [11],
          title: 'Phụ trách',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + staffObject[full['staff_id']].title + '</span>';
          }
        },
        {
          targets: [-1],
          title: 'Chức năng',
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-flex align-items-center">' +
              '<a href="javascript:;" id="del-btn" class="text-body delete-record"><i class="ti ti-trash ti-sm mx-2"></i></a>' +
              '</div>'
            );
          }
        }
      ],
      order: [[1, 'desc']],
      dom:
        '<"row me-2"' +
        '<"col-md-2"<"me-3"l>>' +
        '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
        '>t' +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: '_MENU_',
        search: '',
        searchPlaceholder: 'Tìm kiếm..'
      },
      buttons: [
        {
          extend: 'collection',
          text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
          className: 'btn btn-label-secondary dropdown-toggle mx-3',
          buttons: [
            {
              extend: 'print',
              text: '<i class="ti ti-printer me-2"></i>Print',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                format: {
                  body: function (inner, coldex, rowdex) {
                    return extractTextFromHTML(inner);
                  }
                }
              },
              customize: function (win) {
                customizePrintView(win);
              }
            },
            {
              extend: 'csv',
              text: '<i class="ti ti-file-text me-2"></i>Csv',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                format: {
                  body: function (inner, coldex, rowdex) {
                    return extractTextFromHTML(inner);
                  }
                }
              }
            },
            {
              extend: 'excel',
              text: '<i class="ti ti-file-spreadsheet me-2"></i>Excel',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                format: {
                  body: function (inner, coldex, rowdex) {
                    return extractTextFromHTML(inner);
                  }
                }
              }
            },
            {
              extend: 'pdf',
              text: '<i class="ti ti-file-code-2 me-2"></i>Pdf',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                format: {
                  body: function (inner, coldex, rowdex) {
                    return extractTextFromHTML(inner);
                  }
                }
              }
            },
            {
              extend: 'copy',
              text: '<i class="ti ti-copy me-2"></i>Copy',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                format: {
                  body: function (inner, coldex, rowdex) {
                    return extractTextFromHTML(inner);
                  }
                }
              }
            }
          ]
        },
        {
          text: '<i class="ti ti-plus me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">Thêm chi phí</span>',
          className: 'add-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'offcanvas',
            'data-bs-target': '#offcanvasCostAdd'
          }
        }
      ]
    });

    // GET Request to retrieve vendor data
    makeAjaxRequest(
      projectDetailbyID,
      'POST',
      {
        project_id: projectId
      },
      function (response) {
        var cdata = response.data;
        if (Array.isArray(cdata) && cdata.length > 0) {
          cdata.forEach(function (cost) {
            // Now that vendor is fully populated, add it to the DataTable
            var Data = [
              {
                id: cost.id,
                name: cost.name,
                vendor_id: cost.vendor_id,
                quantity: cost.quantity,
                unit: cost.unit,
                type: cost.type,
                client_cost: cost.client_cost,
                internal_cost: cost.internal_cost,
                real_client_cost: cost.real_client_cost,
                real_internal_cost: cost.real_internal_cost,
                status: cost.status,
                staff_id: cost.staff_id
              }
            ];
            dt_cost.rows.add(Data).draw();
          });
        }
      }
    );

    // Handle Delete Record
    $('.datatables-cost tbody').on('click', '.delete-record', function () {
      var row = $(this).closest('tr');
      var data = dt_cost.row(row).data();
      var id = data.id;

      Swal.fire({
        title: 'Xác nhận xoá chi phí?',
        text: 'Không thể hoàn tác nếu như xác nhận!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Chắc chắn!',
        customClass: {
          confirmButton: 'btn btn-primary me-3',
          cancelButton: 'btn btn-label-secondary'
        },
        buttonsStyling: false
      }).then(function (result) {
        if (result.value) {
          // Send a delete request to the server
          $.ajax({
            url: projectDetail + '/' + id,
            method: 'DELETE',
            success: function (response) {
              // Remove the row from the DataTable
              dt_cost.row(row).remove().draw();
            },
            error: function (error) {
              console.error(error);
            }
          });
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Đã xoá chi phí.',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
          dt_cost.row($(this).parents('tr')).remove().draw();
        }
      });
    });
  }

  const costReport = document.querySelector('#costReport');
  // Fetch data for each type
  fetch(typeData)
    .then(response => response.json())
    .then(data => {
      // Check if the fetched data contains the "data" property
      if (data && Array.isArray(data.data)) {
        // Reduce the fetched data to create typeObj
        let typeObj = data.data.reduce((obj, type) => {
          obj[type.id] = {
            title: type.name
          };
          return obj;
        }, {});

        // Now fetch data for each type using the API
        Promise.all(
          Object.keys(typeObj).map(id => {
            return fetch(costRepostData, {
              method: 'POST',
              body: JSON.stringify({
                id: projectId,
                type: id
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(response => response.json())
              .then(responseData => {
                // Assuming responseData contains x, y, and z
                const x = responseData.total_client_cost,
                  y = responseData.total_internal_cost,
                  z = responseData.total_real_client_cost,
                  h = responseData.total_real_internal_cost;

                // Store the fetched data in typeObj
                typeObj[id].data = [x, y, z, h];
              })
              .catch(error => console.error('Error fetching data for type', typeObj[id].title, ':', error));
          })
        ).then(() => {
          const clientArray = Object.keys(typeObj).map(id => parseInt(typeObj[id].data[0]));
          const internalArray = Object.keys(typeObj).map(id => parseInt(typeObj[id].data[1]));
          const realClientArray = Object.keys(typeObj).map(id => parseInt(typeObj[id].data[2]));
          const realInternalArray = Object.keys(typeObj).map(id => parseInt(typeObj[id].data[3]));

          seriesData.push(
            {
              name: 'Giá khách',
              type: 'column',
              data: clientArray
            },
            {
              name: 'Giá nội bộ',
              type: 'column',
              data: internalArray
            },
            {
              name: 'Giá khách thực tế',
              type: 'column',
              data: realClientArray
            },
            {
              name: 'Giá nội bộ thực tế',
              type: 'column',
              data: realInternalArray
            }
          );
          //Type Categorie
          typeCategories = Object.keys(typeObj).map(id => typeObj[id].title);
          //Define Config of Report Chart
          costReportChartConfig = {
            chart: {
              height: 550,
              type: 'bar',
              parentHeightOffset: 0,
              stacked: false,
              toolbar: {
                show: true
              },
              zoom: {
                enabled: false
              }
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '50%',
                startingShape: 'rounded',
                endingShape: 'flat',
                borderRadius: 4
              }
            },
            dataLabels: {
              enabled: false
            },
            series: seriesData,

            xaxis: {
              tickAmount: 10,
              categories: typeCategories,
              labels: {
                style: {
                  colors: labelColor,
                  fontSize: '13px',
                  fontFamily: 'Public Sans',
                  fontWeight: 400
                }
              },
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              }
            },
            yaxis: {
              tickAmount: 10,
              min: 1000000,
              max: 100000000,
              labels: {
                style: {
                  colors: labelColor,
                  fontSize: '13px',
                  fontFamily: 'Public Sans',
                  fontWeight: 400
                },
                formatter: function (val) {
                  return numeral(val).format(0, 0) + ' ₫';
                }
              }
            },
            legend: {
              show: true,
              position: 'bottom',
              markers: {
                width: 8,
                height: 8,
                offsetX: -3,
                radius: 12
              },
              height: 40,
              offsetY: 0,
              itemMargin: {
                horizontal: 10,
                vertical: 0
              },
              fontSize: '13px',
              fontFamily: 'Public Sans',
              fontWeight: 400,
              labels: {
                colors: headingColor,
                useSeriesColors: false
              },
              offsetY: 10
            },
            grid: {
              strokeDashArray: 6,
              padding: {
                bottom: 5
              }
            },
            colors: [
              chartColors.bar.series1,
              chartColors.bar.series2,
              chartColors.bar.series3,
              chartColors.bar.series4
            ],
            fill: {
              opacity: 1
            },
            responsive: [
              {
                breakpoint: 1400,
                options: {
                  chart: {
                    height: 275
                  },
                  legend: {
                    fontSize: '13px',
                    offsetY: 10
                  }
                }
              },
              {
                breakpoint: 576,
                options: {
                  chart: {
                    height: 300
                  },
                  legend: {
                    itemMargin: {
                      vertical: 5,
                      horizontal: 10
                    },
                    offsetY: 7
                  }
                }
              }
            ]
          };

          //console.log(seriesData);
          //console.log(costReportChartConfig);

          if (typeof costReport !== undefined && costReport !== null) {
            const costReportChart = new ApexCharts(costReport, costReportChartConfig);
            costReportChart.render();
          }
        });
      } else {
        console.error('Fetched data is not in the expected format:', data);
      }
    })
    .catch(error => console.error('Error fetching status data:', error));

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
