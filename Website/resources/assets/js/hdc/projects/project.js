/**
 * Page Projects List
 */

'use strict';

import {
  makeAjaxRequest,
  extractTextFromHTML,
  customizePrintView,
  fetchAndPopulateSelect,
  formatDate,
  makeAjaxRequestPromise,
  getCssClassForStatusId
} from '../function.js';

// Define a custom format for Vietnamese đồng (VNĐ)
numeral.register('format', 'vn', {
  regexps: {
    format: /(\d)(?=(\d{3})+(?!\d))/g,
    unformat: /(\d+)/g
  },
  format: function (value) {
    return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + 'VNĐ';
  },
  unformat: function (string) {
    return parseFloat(string.replace(/[^\d]+/g, ''));
  }
});

// Variable declaration for table
var dt_project_table = $('.datatables-projects'),
  card = $('.card'),
  dt_project,
  statusObj,
  projectData = baseUrl + 'api/v1/projects/project',
  clientData = baseUrl + 'api/v1/clients',
  statusData = baseUrl + 'api/v1/status',
  detailData = baseUrl + 'project/detail';

function reloadDataAndRedrawTable() {
  // GET Request to retrieve project data
  makeAjaxRequest(projectData, 'GET', {}, function (response) {
    var cdata = response.data;
    if (Array.isArray(cdata) && cdata.length > 0) {
      cdata.forEach(function (project) {
        // Create promises for both client and status requests
        var clientPromise = makeAjaxRequestPromise(clientData + '/' + project.client_id, 'GET', {});

        // Wait for both promises to resolve
        Promise.all([clientPromise])
          .then(function (results) {
            var clientData = results[0].data;

            // Update project properties
            project.client_id = clientData.name;

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

            dt_project.row.add(dataToAdd).draw();
          })
          .catch(function (error) {
            console.error('Error occurred:', error);
          });
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
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

  // Fetch and populate client and status select options
  fetchAndPopulateSelect(clientData, 'project-client','id','name');
  fetchAndPopulateSelect(statusData, 'project-status','id','name');

  const addNewProjectForm = document.getElementById('addNewProjectForm'),
    submitButton = document.getElementById('submitFormButton');

  // Initialize Form Validation
  const fv = FormValidation.formValidation(addNewProjectForm, {
    fields: {
      projectName: {
        validators: {
          notEmpty: {
            message: 'Thiếu tên dự án' // Missing project's name
          }
        }
      },

      projectCost: {
        validators: {
          notEmpty: {
            message: 'Vui lòng nhập kinh phí dự án'
          }
        }
      },

      projectClient: {
        validators: {
          notEmpty: {
            message: 'Vui lòng chọn khách hàng' // Please select a project
          },
          callback: {
            message: 'Vui lòng chọn khách hàng', // Please select a province
            callback: function (value, validator, $field) {
              return value !== '';
            }
          }
        }
      },
      projectStatus: {
        validators: {
          notEmpty: {
            message: 'Vui lòng chọn trạng thái dự án' // Please select a status
          },
          callback: {
            message: 'Vui lòng chọn trạng thái dự án', // Please select a status
            callback: function (value, validator, $field) {
              return value !== '';
            }
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

  // Set Vietnamese as the default language
  numeral.locale('vi');

  // Function to handle form submission
  function handleFormSubmission() {
    const name = document.getElementById('add-project-name').value,
      cost = document.getElementById('add-project-cost').value,
      client_id = document.getElementById('project-client').value,
      status = parseInt(document.getElementById('project-status').value);

    const data = {
      name: name,
      cost: parseInt(cost),
      real_cost: 0,
      client_id: client_id,
      status: status
    };
    console.log(data);

    fetch(projectData, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(e => {
        reloadDataAndRedrawTable();
        Swal.fire({
          title: 'Success!',
          text: 'Thêm dự án thành công!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        });
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Xảy ra sự cố khi thêm dự án!',
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
  if (dt_project_table.length) {
    dt_project = dt_project_table.DataTable({
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
          title: 'Tên dự án',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + full['name'] + '</span>';
          }
        },
        {
          targets: [2],
          title: 'Kinh phí',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + numeral(full['cost']).format('0,0.00[.]vn');
            +'</span>';
          }
        },
        {
          targets: [3],
          title: 'Chi phí thực tế',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + numeral(full['real_cost']).format('0,0.00[.]vn');
            +'</span>';
          }
        },
        {
          targets: [4],
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
          targets: [5],
          title: 'Khách hàng',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + full['client_id'] + '</span>';
          }
        },
        {
          targets: [6],
          title: 'Ngày tạo',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + formatDate(full['created_at']) + '</span>';
          }
        },
        {
          targets: [-1],
          title: 'Actions',
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
          text: '<i class="ti ti-plus me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">Thêm dự án</span>',
          className: 'add-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'offcanvas',
            'data-bs-target': '#offcanvasAddProject'
          }
        }
      ],
      // Handle row click event
      rowCallback: function (row, data) {
        $(row).on('click', function () {
          // Redirect to another page with the project ID
          window.location.href = detailData + '/' + data.id;
        });
      },
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['status'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      },
      initComplete: function () {
        // Adding status filter once table initialized
        this.api()
          .columns(-2)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="project_status" class="form-select text-capitalize"><option value="">Trạng thái</option></select>'
            )
              .appendTo('.project_status')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                console.log(statusObj[d].title);
                select.append('<option value="' + statusObj[d].title + '">' + statusObj[d].title + '</option>');
              });
          });
      }
    });
    reloadDataAndRedrawTable();

    // Handle Delete Record
    $('.datatables-projects tbody').on('click', '.delete-record', function () {
      var row = $(this).closest('tr');
      var data = dt_project.row(row).data();
      var id = data.id;

      Swal.fire({
        title: 'Xác nhận xoá dự án?',
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
            url: projectData + '/' + id,
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
            text: 'Đã xoá dự án.',
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
