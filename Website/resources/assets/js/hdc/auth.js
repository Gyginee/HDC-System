'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Form validation for login form
    const formAuthentication = document.querySelector('#formAuthentication');

    if (formAuthentication) {
        const fv = FormValidation.formValidation(formAuthentication, {
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Nhập email'
                        },
                        emailAddress: {
                            message: 'Email không hợp lệ'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'Nhập mật khẩu'
                        },
                        stringLength: {
                            min: 6,
                            message: 'Mật khẩu phải dài hơn 6 kí tự'
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
});
