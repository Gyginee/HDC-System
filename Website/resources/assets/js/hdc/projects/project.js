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
  makeAjaxRequestPromise
} from '../function.js';

// Variable declaration for table
var dt_project_table = $('.datatables-projects'),
  dt_project,
  projectData = baseUrl + 'api/v1/projects/project',
  clientData = baseUrl + 'api/v1/clients',
  statusData = baseUrl + 'api/v1/status';

document.addEventListener('DOMContentLoaded', function () {
  // Fetch and populate client and status select options
  fetchAndPopulateSelect(clientData, 'project-client');
  fetchAndPopulateSelect(statusData, 'project-status');

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
            message: 'Vui lòng nhập chi phí dự án'
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

  // Function to handle form submission
  function handleFormSubmission() {
    const name = document.getElementById('add-project-name').value,
      cost = document.getElementById('add-project-cost').value,
      client_id = document.getElementById('project-client').value,
      status = document.getElementById('project-status').value;

    const data = {
      name: name,
      cost: cost,
      client_id: client_id,
      status: status
    };

    fetch(projectData, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(e => {
        // Move the definition of date inside the promise chain
        const date = formatDate();
        dt_project.rows
          .add([
            {
              id: e.data.id,
              name: e.data.name,
              cost: e.data.cost,
              status: e.data.status,
              client_id: e.data.client_id,
              created_at: date
            }
          ])
          .draw();
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
            return '<span class="fw-medium">' + full['id'] + '</span>';
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
          title: 'Chi phí',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + full['cost'] + '</span>';
          }
        },
        {
          targets: [3],
          title: 'Trạng thái',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + full['status'] + '</span>';
          }
        },
        {
          targets: [4],
          title: 'Khách hàng',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + full['client_id'] + '</span>';
          }
        },
        {
          targets: [5],
          title: 'Ngày tạo',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + formatDate(full['created_at']) + '</span>';
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
      ]
    });

    // GET Request to retrieve project data
    makeAjaxRequest(projectData, 'GET', {}, function (response) {
      var cdata = response.data;
      if (Array.isArray(cdata) && cdata.length > 0) {
          cdata.forEach(function (project) {
              // Create promises for both client and status requests
              var clientPromise = makeAjaxRequestPromise(clientData + "/" + project.client_id, 'GET', {});
              var statusPromise = makeAjaxRequestPromise(statusData + "/" + project.status, 'GET', {});

              // Wait for both promises to resolve
              Promise.all([clientPromise, statusPromise]).then(function (results) {
                  var clientData = results[0].data;
                  var statusData = results[1].data;

                  // Update project properties
                  project.client_id = clientData.name;
                  project.status = statusData.name;

                  // Add project data to the DataTable
                  var dataToAdd = {
                      id: project.id,
                      name: project.name,
                      cost: project.cost,
                      status: project.status,
                      client_id: project.client_id,
                      created_at: project.created_at
                  };

                  dt_project.row.add(dataToAdd).draw();
              }).catch(function (error) {
                  console.error('Error occurred:', error);
              });
          });
      }
  });


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
