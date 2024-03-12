@extends('layouts/layoutMaster')

@section('title', 'Vendor')

@section('vendor-style')
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/select2/select2.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/@form-validation/umd/styles/index.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/animate-css/animate.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/sweetalert2/sweetalert2.css') }}" />

@endsection

@section('vendor-script')
    <script src="{{ asset('assets/vendor/libs/moment/moment.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/select2/select2.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/@form-validation/umd/bundle/popular.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/@form-validation/umd/plugin-bootstrap5/index.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/@form-validation/umd/plugin-auto-focus/index.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/cleavejs/cleave.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/cleavejs/cleave-phone.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/sweetalert2/sweetalert2.js') }}"></script>
@endsection

@section('page-script')
    <script src="{{ asset('assets/js/hdc/vendor.js') }}"></script>
    {{-- <script src="{{ asset('assets/js/hdc/vendor.js') }}"></script> --}}
@endsection

@section('content')
<h4 class="py-3 mb-4">
  <span class="text-muted fw-light">Quản lý /</span> Đối tác
</h4>


    <!-- Vendors List Table -->
    <div class="card">
        <div class="card-datatable table-responsive">
            <table class="datatables-vendors table">
                <thead class="border-top">
                    <tr>
                        <th>ID</th>
                        <th>Vendor</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Loại</th>
                        <th>Dự án</th>
                        <th>Tổng chi</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
            </table>
        </div>
        <!-- Offcanvas to add new vendor -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddVendor"
            aria-labelledby="offcanvasAddVendorLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasAddVendorLabel" class="offcanvas-title">Thêm Vendor</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body mx-0 flex-grow-0 pt-0 h-100">
                <form class="add-new-vendor pt-0" id="addNewVendorForm">
                    <div class="mb-3">
                        <label class="form-label" for="add-vendor-fullname">Tên Vendor</label>
                        <input type="text" class="form-control" id="add-vendor-fullname" placeholder="HDCreative Ltd"
                            name="vendorFullname" aria-label="HDCreative Ltd" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="vendor-province">Tỉnh thành</label>
                        <select id="vendor-province" class="form-select" name="vendorProvince">
                            <option value="">Chọn Tỉnh thành</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="vendor-district">Quận/Huyện</label>
                        <select id="vendor-district" class="form-select" name="vendorDistrict">
                            <option value="">Chọn Quận/Huyện</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="add-vendor-address">Địa chỉ cụ thể</label>
                        <input type="text" class="form-control" id="add-vendor-address" placeholder="19F, Pearl Plaza"
                            name="vendorAddress" aria-label="Vendor Address" />
                    </div>
                    <div class="mb-3">
                      <label class="form-label" for="add-vendor-phone">Số điện thoại</label>
                      <input type="text" class="form-control" id="add-vendor-phone" placeholder="0123 456 789"
                          name="vendorFullname" aria-label="0123 456 789" />
                  </div>

                    <button type="submit" id="submitFormButton"
                        class="btn btn-primary me-sm-3 me-1 data-submit">Tạo</button>
                    <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Huỷ</button>
                </form>
            </div>
        </div>
    </div>

@endsection
