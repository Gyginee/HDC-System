/**
 *  Pages Authentication
 */

'use strict';
const formAuthentication = document.querySelector('#formAuthentication');

document.addEventListener('DOMContentLoaded', function (e) {
  (function () {
    // Form validation for Add new record
    if (formAuthentication) {
      const fv = FormValidation.formValidation(formAuthentication, {
        fields: {
          username: {
            validators: {
              notEmpty: {
                message: 'Điền tài khoản'
              },
              stringLength: {
                min: 6,
                message: 'Tài khoản phải có nhiều hơn 6 ký tự'
              }
            }
          },
          email: {
            validators: {
              notEmpty: {
                message: 'Điền email của bạn'
              },
              emailAddress: {
                message: 'Email không hợp lệ'
              }
            }
          },
          'email-username': {
            validators: {
              notEmpty: {
                message: 'Yêu cầu nhập email hoặc tài khoản'
              },
              stringLength: {
                min: 6,
                message: 'Tài khoản phải có hơn 6 ký tự'
              }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: 'Yêu cầu nhập mật khẩu'
              },
              stringLength: {
                min: 6,
                message: 'Mật khẩu phải có hơn 6 ký tự'
              }
            }
          },
          'confirm-password': {
            validators: {
              notEmpty: {
                message: 'Xác nhận lại mật khẩu'
              },
              identical: {
                compare: function () {
                  return formAuthentication.querySelector('[name="password"]').value;
                },
                message: 'Hai mật khẩu không trùng nhau'
              },
              stringLength: {
                min: 6,
                message: 'Mật khẩu phải có hơn 6 ký tự'
              }
            }
          },
          terms: {
            validators: {
              notEmpty: {
                message: 'Vui lòng đồng ý các điều khoản và điều kiện'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: '',
            rowSelector: '.mb-3'
          }),
          submitButton: new FormValidation.plugins.SubmitButton(),

          defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          autoFocus: new FormValidation.plugins.AutoFocus()
        },
        init: instance => {
          instance.on('plugins.message.placed', function (e) {
            if (e.element.parentElement.classList.contains('input-group')) {
              e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
            }
          });
        }
      });
    }

    //  Two Steps Verification
    const numeralMask = document.querySelectorAll('.numeral-mask');

    // Verification masking
    if (numeralMask.length) {
      numeralMask.forEach(e => {
        new Cleave(e, {
          numeral: true
        });
      });
    }
  })();
});
