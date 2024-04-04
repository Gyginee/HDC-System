/**
 * Page Vendor List
 */

'use strict';
import {
  makeAjaxRequest,
  extractTextFromHTML,
  customizePrintView,
  makeAjaxRequestPromise,
  fetchAndPopulateSelect,
  loadNumeral
} from './function.js';

loadNumeral();

// Variable declaration for table
var dt_vendor_table = $('.datatables-vendors'),
  customerView = baseUrl + 'app/ecommerce/customer/details/overview',
  dt_vendor,
  typeObject,
  vendorData = baseUrl + 'api/v1/vendors',
  ProjectDCountData = baseUrl + 'api/v1/projects/detailcount',
  ProjectDCostData = baseUrl + 'api/v1/projects/detailtotal',
  typeData = baseUrl + 'api/v1/types';

document.addEventListener('DOMContentLoaded', function () {
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

  // Fetch JSON data from your Laravel application
  fetch(assetsPath + 'json/vietnam-provinces.json')
    .then(response => response.json())
    .then(jsonData => {
      // Populate province select
      const provinceSelect = document.getElementById('vendor-province');
      jsonData.forEach(province => {
        const option = document.createElement('option');
        option.value = province.name;
        option.textContent = province.name;
        provinceSelect.appendChild(option);
      });

      // Populate district select based on province selection
      document.getElementById('vendor-province').addEventListener('change', function () {
        const selectedProvince = this.value;
        const districtSelect = document.getElementById('vendor-district');
        districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>'; // Reset district select

        const selectedProvinceData = jsonData.find(province => province.name === selectedProvince);
        if (selectedProvinceData) {
          selectedProvinceData.districts.forEach(district => {
            const option = document.createElement('option');
            option.textContent = district.name;
            districtSelect.appendChild(option);
          });
        }
      });
    })
    .catch(error => {
      console.error('Lỗi đồng bộ data:', error);
    });

  fetchAndPopulateSelect(typeData, 'vendor-type', 'id', 'name');

  const addNewVendorForm = document.getElementById('addNewVendorForm');
  const submitButton = document.getElementById('submitFormButton');

  // Initialize Form Validation
  const fv = FormValidation.formValidation(addNewVendorForm, {
    fields: {
      vendorFullname: {
        validators: {
          notEmpty: {
            message: 'Thiếu tên đối tác' // Missing vendor's name
          }
        }
      },

      vendorProvince: {
        validators: {
          notEmpty: {
            message: 'Vui lòng chọn tỉnh thành' // Please select a province
          },
          callback: {
            message: 'Vui lòng chọn Tỉnh thành', // Please select a province
            callback: function (value, validator, $field) {
              return value !== '';
            }
          }
        }
      },

      vendorDistrict: {
        validators: {
          notEmpty: {
            message: 'Vui lòng chọn quận/huyện' // Please select a province
          },
          callback: {
            message: 'Vui lòng chọn Tỉnh thành', // Please select a province
            callback: function (value, validator, $field) {
              return value !== '';
            }
          }
        }
      },

      vendorAddress: {
        validators: {
          notEmpty: {
            message: 'Thiếu địa chỉ đối tác' // Missing vendor's address
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
    const name = document.getElementById('add-vendor-fullname').value;
    const addressDetail = document.getElementById('add-vendor-address').value;
    const phoneNumber = document.getElementById('add-vendor-phone').value;
    const provinceSelect = document.getElementById('vendor-province');
    const districtSelect = document.getElementById('vendor-district');
    const typeSelect = parseInt(document.getElementById('vendor-type').value);

    const provinceName = provinceSelect.options[provinceSelect.selectedIndex].text;
    const districtName = districtSelect.options[districtSelect.selectedIndex].text;
    const address = `${addressDetail}, ${districtName}, ${provinceName}`;

    const contract_duration = document.getElementById('vendor-contract').value;
    const tax_code = document.getElementById('add-tax-code').value;

    const data = {
      name: name,
      address: address,
      phone: phoneNumber,
      type_id: typeSelect,
      contract_duration: contract_duration,
      tax_code: tax_code
    };

    fetch(vendorData, {
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
          title: 'Thành công!',
          text: 'Thêm đối tác thành công!',
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
          text: 'Xảy ra sự cố khi thêm đối tác!',
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

  // Vendors datatable
  if (dt_vendor_table.length) {
    dt_vendor = dt_vendor_table.DataTable({
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
          title: 'Mã số thuế',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + full['tax_code'] + '</span>';
          }
        },
        /*    {
          targets: [3],
          title: 'Địa chỉ',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + full['address'] + '</span>';
          }
        }, */
        {
          targets: [3],
          title: 'SĐT',
          render: function (data, type, full, meta) {
            return '<span class="fw-medium">' + full['phone'] + '</span>';
          }
        },
        {
          targets: [4],
          title: 'Loại',
          render: function (data, type, full, meta) {
            const typeData = typeObject[full['type']];
            return '<span class="fw-medium">' + typeData.title + '</span>';
          }
        },
        {
          targets: [5],
          title: 'Dự án',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + full['count'] + '</span>';
          }
        },
        {
          targets: [6],
          title: 'Tổng chi',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + numeral(full['total_cost']).format('0,0vn') + ' ₫';
            +'</span>';
          }
        },
        {
          targets: [7],
          title: 'Thời gian hạch toán',
          render: function (data, type, full, meta) {
            return '<span class="fw-light">' + full['contract_duration'] + '</span>';
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
          text: '<i class="ti ti-plus me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">Thêm đối tác</span>',
          className: 'add-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'offcanvas',
            'data-bs-target': '#offcanvasAddVendor'
          }
        }
      ]
    });
    // After successful submission, reload data and redraw table
    reloadDataAndRedrawTable();

    // Handle Delete Record
    $('.datatables-vendors tbody').on('click', '.delete-record', function () {
      var row = $(this).closest('tr');
      var data = dt_vendor.row(row).data();
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
            url: vendorData + '/' + id,
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
            title: 'Xoá thành công!',
            text: 'Đã xoá vendor.',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
          dt_vendor.row($(this).parents('tr')).remove().draw();
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

function reloadDataAndRedrawTable() {
  dt_vendor.clear().draw(); // Clear existing data in DataTables

  // Make AJAX request to retrieve vendor data
  makeAjaxRequest(vendorData, 'GET', {}, function (response) {
    var cdata = response.data;
    if (Array.isArray(cdata) && cdata.length > 0) {
      cdata.forEach(function (vendor) {
        // Create promises for both count and total_cost requests
        var countPromise = makeAjaxRequestPromise(ProjectDCountData, 'POST', {
          vendor_id: vendor.id
        });
        var costPromise = makeAjaxRequestPromise(ProjectDCostData, 'POST', {
          vendor_id: vendor.id
        });

        // Wait for both promises to resolve
        Promise.all([countPromise, costPromise])
          .then(function (results) {
            vendor.count = results[0].count;
            vendor.total_cost = results[1].total_cost;

            // Now that vendor is fully populated, add it to the DataTable
            var Data = [
              {
                id: vendor.id,
                name: vendor.name,
                imagePath: vendor.imagePath,
                address: vendor.address,
                phone: vendor.phone,
                type: vendor.type_id,
                count: vendor.count,
                total_cost: vendor.total_cost,
                contract_duration: vendor.contract_duration,
                tax_code: vendor.tax_code
              }
            ];
            dt_vendor.rows.add(Data).draw(); // Add data and draw table
          })
          .catch(function (error) {
            console.error('Error in AJAX requests', error);
          });
      });
    }
  });
}
