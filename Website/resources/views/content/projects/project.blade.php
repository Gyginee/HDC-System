@extends('layouts/layoutMaster')

@section('title', 'Project')

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
    <script src="{{ asset('assets/js/hdc/project.js') }}"></script>
    {{-- <script src="{{ asset('assets/js/hdc/client.js') }}"></script> --}}
@endsection

@section('content')
<h4 class="py-3 mb-2">
  <span class="text-muted fw-light">Khách hàng</span>
</h4>

    <!-- Clients List Table -->
    <div class="card">
        <div class="card-header border-bottom">
            <h5 class="card-title mb-3">Lọc</h5>
            <div class="d-flex justify-content-between align-items-center row pb-2 gap-3 gap-md-0">
                <div class="col-md-4 client_id"></div>
                <div class="col-md-4 client_plan"></div>
                <div class="col-md-4 client_status"></div>
            </div>
        </div>
        <div class="card-datatable table-responsive">
            <table class="datatables-clients table">
                <thead class="border-top">
                    <tr>
                        <th>ID</th>
                        <th>Khách hàng</th>
                        <th>Địa chỉ</th>
                        <th>Dự án</th>
                        <th>Tổng chi</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
            </table>
        </div>
        <!-- Offcanvas to add new client -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddClient"
            aria-labelledby="offcanvasAddClientLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasAddClientLabel" class="offcanvas-title">Thêm khách hàng</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body mx-0 flex-grow-0 pt-0 h-100">
                <form class="add-new-client pt-0" id="addNewClientForm">
                    <div class="mb-3">
                        <label class="form-label" for="add-client-fullname">Tên khách hàng</label>
                        <input type="text" class="form-control" id="add-client-fullname" placeholder="HDCreative Ltd"
                            name="clientFullname" aria-label="HDCreative Ltd" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="client-province">Tỉnh thành</label>
                        <select id="client-province" class="form-select" name="clientProvince">
                            <option value="">Chọn Tỉnh thành</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="client-district">Quận/Huyện</label>
                        <select id="client-district" class="form-select" name="clientDistrict">
                            <option value="">Chọn Quận/Huyện</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="add-client-address">Địa chỉ cụ thể</label>
                        <input type="text" class="form-control" id="add-client-address" placeholder="19F, Pearl Plaza"
                            name="clientAddress" aria-label="Client Address" />
                    </div>

                    <button type="submit" id="submitFormButton"
                        class="btn btn-primary me-sm-3 me-1 data-submit">Tạo</button>
                    <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Huỷ</button>
                </form>
            </div>
        </div>
    </div>

@endsection
