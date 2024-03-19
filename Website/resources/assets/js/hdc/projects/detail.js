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
  getCssClassForStatusId
} from '../function.js';

// Variable declaration for table
var dt_cost_table = $('.datatables-cost'),
  dt_cost,
  statusObj,
  typeNames,projectId,
  vendorData = baseUrl + 'api/v1/vendors',
  statusData = baseUrl + 'api/v1/status',
  projectDetail = baseUrl + 'api/v1/projects/detail',
  projectData = baseUrl + 'api/v1/projects/project',
  typeData = baseUrl + 'api/v1/types';

document.addEventListener('DOMContentLoaded', function () {
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

  //Fetch Status, add into statusObj
  fetch(typeData)
    .then(response => response.json())
    .then(data => {
      // Extract only the names
      typeNames = data.data.map(item => item.name);
    })
    .catch(error => {
      console.error('Error:', error);
    });

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
  fetchAndPopulateSelect(typeData, 'cost-type');
  fetchAndPopulateSelect(vendorData, 'cost-vendor');
  fetchAndPopulateSelect(statusData, 'cost-status');

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
    const costName = document.getElementById('cost-name').value;
    const costVendor = document.getElementById('cost-vendor').value;
    const costQuantity = parseInt(document.getElementById('cost-quantity').value);
    const costUnit = document.getElementById('cost-unit');
    const costType = document.getElementById('cost-type');
    const costClient = parseInt(document.getElementById('cost-client').value);
    const costInternal = parseInt(document.getElementById('cost-internal').value);
    const costRealInput = document.getElementById('cost-real');
    const costReal = isNaN(parseInt(costRealInput.value)) ? 0 : parseInt(costRealInput.value);

    const costStatus = document.getElementById('cost-status');

    const data = {
      project_id: projectId,
      vendor_id: costVendor,
      name: costName,
      quantity: costQuantity,
      unit: costUnit,
      type: costType,
      client_cost: costClient,
      internal_cost: costInternal,
      real_cost: costReal,
      status: costStatus
    };

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
              real_cost: e.data.real_cost,
              status: e.data.status
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
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
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
          title: 'Vendor',
          render: function (data, type, full, meta) {
            var $image = full['imagePath'],
              $name = full['name'];
            if ($image) {
              // For Avatar image
              var $output =
                '<img src="' + assetsPath + 'img/vendors/' + $image + '" alt="Vendors" class="rounded-circle">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6);
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
            }

            var $row_output =
              '<div class="d-flex justify-content-start align-items-center vendor-name">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar me-2">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<a href="' +
              customerView +
              '" ><span class="fw-medium">' +
              $name +
              '</span></a>' +
              '</div>' +
              '</div>';
            return $row_output;
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
            return '<span class="fw-medium">' + full['unit'] + '</span>';
          }
        },
        {
          targets: [5],
          title: 'Loại',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + full['type'] + '</span>';
          }
        },
        {
          targets: [6],
          title: 'Giá khách',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + numeral(full['client_cost']).format('0,0$') + '</span>';
          }
        },
        {
          targets: [7],
          title: 'Giá nội bộ',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + numeral(full['client_cost']).format('0,0$') + '</span>';
          }
        },
        {
          targets: [8],
          title: 'Giá thực thế',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + numeral(full['client_cost']).format('0,0$') + '</span>';
          }
        },
        {
          targets: [9],
          title: 'Trạng thái',
          render: function (data, type, full, meta) {
            const statusName = full['status'];
            const statusData = Object.values(statusObj).find(status => status.title === statusName);

            if (statusData) {
              return `<span class="badge ${statusData.class}" text-capitalized>${statusData.title} </span>`;
            } else {
              return `<span class="badge bg-label-default">Chưa cập nhật</span>`;
            }
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
    makeAjaxRequest(projectDetail, 'GET', {}, function (response) {
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
              real_cost: cost.real_cost,
              status: cost.status
            }
          ];
          dt_cost.rows.add(Data).draw();
        });
      }
    });

    // Handle Delete Record
    $('.datatables-cost tbody').on('click', '.delete-record', function () {
      var row = $(this).closest('tr');
      var data = dt_cost.row(row).data();
      var id = data.id;

      Swal.fire({
        title: 'Xác nhận xoá vendor?',
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
              dt_vendor.row(row).remove().draw();
            },
            error: function (error) {
              console.error(error);
            }
          });
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Đã xoá vendor.',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
          dt_cost.row($(this).parents('tr')).remove().draw();
        }
      });
    });
  }

  const carrierPerformance = document.querySelector('#carrierPerformance'),
    carrierPerformanceChartConfig = {
      chart: {
        height: 275,
        type: 'bar',
        parentHeightOffset: 0,
        stacked: false,
        toolbar: {
          show: false
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
      series: [
        {
          name: 'Delivery rate',
          type: 'column',
          data: [5, 4.5, 4, 3]
        },
        {
          name: 'Delivery time',
          type: 'column',
          data: [4, 3.5, 3, 2.5]
        },
        {
          name: 'Delivery exceptions',
          type: 'column',
          data: [3.5, 3, 2.5, 2]
        }
      ],
      xaxis: {
        tickAmount: 10,
        categories: ['Carrier A', 'Carrier B', 'Carrier C', 'Carrier D'],
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
        tickAmount: 4,
        min: 1,
        max: 5,
        labels: {
          style: {
            colors: labelColor,
            fontSize: '13px',
            fontFamily: 'Public Sans',
            fontWeight: 400
          },
          formatter: function (val) {
            return val;
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
      colors: [chartColors.bar.series1, chartColors.bar.series2, chartColors.bar.series3],
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
  if (typeof carrierPerformance !== undefined && carrierPerformance !== null) {
    const carrierPerformanceChart = new ApexCharts(carrierPerformance, carrierPerformanceChartConfig);
    carrierPerformanceChart.render();
  }


  let reportChart = fetch(projectDetail)
    .then(response => response.json())
    .then(data => {

    });


  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
