/**
 * Page Fixed Cost List
 */

'use strict';

import {
  makeAjaxRequest,
  extractTextFromHTML,
  customizePrintView,
  fetchAndPopulateSelect,
  formatDate,
  makeAjaxRequestPromise,
  initializeDatepicker,
  loadNumeral
} from '../function.js';

loadNumeral(); // Gọi hàm để đăng ký định dạng số

// Variable declaration for table
var dt_fixedcost_table = $('.datatables-fixedcost'),
  dt_fixedcost,
  card = $('.card'),
  statusObj,
  startDateEle = $('.start_date'),
  endDateEle = $('.end_date'),
  costTypeData = baseUrl + 'api/v1/internals/costtype',
  fixedcostData = baseUrl + 'api/v1/internals/fixedcost',
  statusData = baseUrl + 'api/v1/status',
  detailData = baseUrl + 'project/detail';

document.addEventListener('DOMContentLoaded', function () {
  // Khởi tạo datepicker cho Ngày bắt đầu
  initializeDatepicker('.flatpickr-start-date', 'DD/MM/YYYY');

  // Khởi tạo datepicker cho Ngày kết thúc
  initializeDatepicker('.flatpickr-end-date', 'DD/MM/YYYY');
  //Fetch Select
  fetchAndPopulateSelect(costTypeData, 'fixedcost-type', 'id', 'name');

  // Initialize Form Validation
  let addNewCostForm = document.getElementById('addNewFixedCostForm'),
    submitButton = document.getElementById('submitFormButton');

  //Function Form Validation
  const fv = FormValidation.formValidation(addNewCostForm, {
    fields: {
      fixedcostName: {
        validators: {
          notEmpty: {
            message: 'Thiếu tên chi phí' // Missing vendor's name
          }
        }
      },

      fixedcostType: {
        validators: {
          notEmpty: {
            message: 'Vui lòng chọn loại'
          },
          callback: {
            message: 'Vui lòng chọn loại',
            callback: function (value, validator, $field) {
              return value !== '';
            }
          }
        }
      },

      fixedcostAmount: {
        validators: {
          notEmpty: {
            message: 'Thiếu chi phí'
          }
        }
      },
      dt_date_start: {
        validators: {
          notEmpty: {
            message: 'Thiếu ngày bắt đầu'
          }
        }
      },
      dt_date_end: {
        validators: {
          notEmpty: {
            message: 'Thiếu ngày kết thúc'
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
    const fcostType = document.getElementById('fixedcost-type').value;
    const fcostName = document.getElementById('add-fixedcost-name').value;
    const fcostAmount = parseInt(document.getElementById('add-fixedcost-cost').value);
    const fcostSDate = document.getElementsByClassName('flatpickr-start-date').value;
    const fcostEDate = document.getElementsByClassName('flatpickr-end-date').value;
    const fcostD = document.getElementById('add-fixedcost-details').value;
    const fcostDetails = isNaN(fcostD) ? '' : fcostD;

    const data = {
      name: fcostName,
      type: fcostType,
      amount: fcostAmount,
      start_date: fcostSDate,
      end_date: fcostEDate,
      additional_details: fcostDetails
    };

    fetch(fixedcostData, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(e => {
        dt_fixedcost.rows
          .add([
            {
              id: e.data.id,
              name: e.data.name,
              type: e.data.type,
              amount: e.data.amount,
              start_date: e.data.start_date,
              end_date: e.data.end_date,
              additional_details: e.data.additional_details
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

  // Projects datatable
  if (dt_fixedcost_table.length) {
    dt_fixedcost = dt_fixedcost_table.DataTable({
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
          title: 'Loại chi phí',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + full['type'] + '</span>';
          }
        },
        {
          targets: [2],
          title: 'Tên chi phí',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + numeral(full['name']).format('0,0vn') + ' ₫';
            +'</span>';
          }
        },
        {
          targets: [3],
          title: 'Chi phí',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + numeral(full['amount']).format('0,0vn') + ' ₫';
            +'</span>';
          }
        },
        {
          targets: [4],
          title: 'Ngày bắt đầu',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + full['start_date'] + '</span>';
          }
        },
        {
          targets: [5],
          title: 'Ngày kết thúc',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + full['end_date'] + '</span>';
          }
        },
        {
          targets: [6],
          title: 'Chi tiết bổ sung',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + formatDate(full['additional_details']) + '</span>';
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
              '<a href="javascript:;" class="text-body"><i class="ti ti-edit ti-sm me-2"></i></a>' +
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
            'data-bs-target': '#offcanvasAddFixedCost'
          }
        }
      ]
    });

    // GET Request to retrieve project data
    makeAjaxRequest(fixedcostData, 'GET', {}, function (response) {
      var cdata = response.data;
      if (Array.isArray(cdata) && cdata.length > 0) {
        cdata.forEach(function (project) {
          // Create promises for both client and status requests

          var costtypePromise = makeAjaxRequestPromise(costTypeData, 'GET', {});

          // Wait for both promises to resolve
          Promise.all([costtypePromise])
            .then(function (results) {
              var typeType = results[0].name;

              // Update project properties
              project.client_id = clientData.name;
              project.status = statusData.name;

              // Add project data to the DataTable
              var dataToAdd = {
                id: project.id,
                name: project.name,
                cost: project.cost,
                real_cost: project.real_cost,
                status: project.status,
                client_id: project.client_id,
                created_at: project.created_at
              };

              dt_fixedcost.row.add(dataToAdd).draw();
            })
            .catch(function (error) {
              console.error('Error occurred:', error);
            });
        });
      }
    });

    // Handle Delete Record
    $('.datatables-fixedcost tbody').on('click', '.delete-record', function () {
      var row = $(this).closest('tr');
      var data = dt_fixedcost.row(row).data();
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
            url: fixedcostData + '/' + id,
            method: 'DELETE',
            success: function (response) {
              // Remove the row from the DataTable
              dt_project.row(row).remove().draw();
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
          dt_project.row($(this).parents('tr')).remove().draw();
        }
      });
    });
  }

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
