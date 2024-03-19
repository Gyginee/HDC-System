@extends('layouts/layoutMaster')

@section('title', 'Detail Project')

<!-- Vendor Styles -->
@section('vendor-style')
    @vite(['resources/assets/vendor/libs/apex-charts/apex-charts.scss', 'resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.scss', 'resources/assets/vendor/libs/animate-css/animate.scss', 'resources/assets/vendor/libs/sweetalert2/sweetalert2.scss', 'resources/assets/vendor/libs/select2/select2.scss', 'resources/assets/vendor/libs/@form-validation/form-validation.scss'])
@endsection

<!-- Vendor Script -->
@section('vendor-script')
    @vite(['resources/assets/vendor/libs/apex-charts/apexcharts.js', 'resources/assets/vendor/libs/moment/moment.js', 'resources/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js', 'resources/assets/vendor/libs/sweetalert2/sweetalert2.js', 'resources/assets/vendor/libs/cleavejs/cleave.js', 'resources/assets/vendor/libs/cleavejs/cleave-phone.js', 'resources/assets/vendor/libs/select2/select2.js', 'resources/assets/vendor/libs/@form-validation/popular.js', 'resources/assets/vendor/libs/@form-validation/bootstrap5.js', 'resources/assets/vendor/libs/@form-validation/auto-focus.js'])
@endsection

<!-- Page Script -->
@section('page-script')
    @vite(['resources/assets/js/hdc/projects/detail.js'])
@endsection


@section('content')
    <h4 class="py-3 mb-4">
        <span class="text-muted fw-light">Dự án/</span>
        <span id="project_name_placeholder"></span>
    </h4>
    <!-- Report Cost -->
    <div class="col-12 col-lg-12 mb-4 order-3 order-xl-0">
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
                <div class="card-title m-0">
                    <h5 class="card-title m-0 me-2">Báo cáo thống kê chi phí của loại chi phí</h5>
                    <small class="text-muted">Các cột chi phí được hiển thị trong bảng bao gồm thông tin, tổng tiền của từng
                        loại</small>
                </div>
            </div>
            <div class="card-body">
                <div id="costReport"></div>
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-between align-items-center flex-wrap mb-2 gap-1">
        <div class="me-1">
            <h5 class="mb-1">Chi phí dự án</h5>
            <p class="mb-1 fw-medium">Các khoản chi của dự án và tình trạng tiến độ thanh toán</p>
        </div>
        <div class="d-flex align-items-center">
            <span class="badge bg-label-danger">Chi phí</span>
        </div>
    </div>

    <!-- Cost List Table -->
    <div class="card">
        <div class="card-datatable table-responsive">
            <table class="datatables-cost table border-top">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Đối tác</th>
                        <th>Tên chi phí</th>
                        <th>Số lượng</th>
                        <th>Đơn vị</th>
                        <th>Loại</th>
                        <th>Giá khách</th>
                        <th>Giá nội bộ</th>
                        <th>Giá thực tế</th>
                        <th>Trạng thái</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
            </table>
        </div>

        <!-- Offcanvas to add new customer -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCostAdd" aria-labelledby="offcanvasCostAddLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasCostAddLabel" class="offcanvas-title">Thêm chi phí</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div class="offcanvas-body mx-0 flex-grow-0">
                <form class="cost-add pt-0" id="CostAddForm" onsubmit="return false">
                    <div class="cost-add-basic mb-3">
                        <h6 class="mb-3">Basic Information</h6>

                        <div class="mb-3">
                            <label class="form-label" for="cost-vendor">Đối tác</label>
                            <select id="cost-vendor" class="form-select" name="costVendor">
                                <option value="">Chọn đối tác</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label" for="cost-name">Tên chi phí</label>
                            <input type="text" id="cost-name" class="form-control" placeholder="Màn hình led"
                                aria-label="Màn hình led" name="costName" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label" for="cost-quantity">Số lượng</label>
                            <input type="text" id="cost-quantity" class="form-control" placeholder="10" aria-label="10"
                                name="costQuantity" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label" for="cost-unit">Đơn vị</label>
                            <input type="text" id="cost-unit" class="form-control" placeholder="m2" aria-label="m2"
                                name="costUnit" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label" for="cost-type">Phân loại</label>
                            <select id="cost-type" class="form-select" name="costType">
                                <option value="">Chọn phân loại</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label" for="cost-client">Giá báo khách</label>
                            <input type="text" id="cost-client" class="form-control" placeholder="1,000,000"
                                aria-label="1,000,000" name="costClient" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label" for="cost-internal">Giá nội bộ</label>
                            <input type="text" id="cost-internal" class="form-control" placeholder="800,000"
                                aria-label="800,000" name="costInternal" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label" for="cost-real">Giá thực tế</label>
                            <small class="text-muted">Có thể bổ sung sau.</small>
                            <input type="text" id="cost-real" class="form-control" placeholder="900,000"
                                aria-label="900,000" name="costReal" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="cost-status">Trạng thái</label>
                            <select id="cost-status" class="form-select" name="costStatus">
                                <option value="">Chọn trạng thái</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" id="submitFormButton"
                        class="btn btn-primary me-sm-3 me-1 data-submit">Tạo</button>
                    <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Huỷ</button>
                </form>
            </div>
        </div>
    </div>
@endsection
