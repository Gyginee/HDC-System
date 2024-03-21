@extends('layouts/layoutMaster')

@section('title', 'Clients')

<!-- Vendor Styles -->
@section('vendor-style')
    @vite(['resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.scss', 'resources/assets/vendor/libs/animate-css/animate.scss', 'resources/assets/vendor/libs/sweetalert2/sweetalert2.scss', 'resources/assets/vendor/libs/select2/select2.scss', 'resources/assets/vendor/libs/@form-validation/form-validation.scss'])
@endsection

<!-- Vendor Script -->
@section('vendor-script')
    @vite(['resources/assets/vendor/libs/moment/moment.js', 'resources/assets/vendor/libs/numeral/numeral.js', 'resources/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js', 'resources/assets/vendor/libs/sweetalert2/sweetalert2.js', 'resources/assets/vendor/libs/cleavejs/cleave.js', 'resources/assets/vendor/libs/cleavejs/cleave-phone.js', 'resources/assets/vendor/libs/select2/select2.js', 'resources/assets/vendor/libs/@form-validation/popular.js', 'resources/assets/vendor/libs/@form-validation/bootstrap5.js', 'resources/assets/vendor/libs/@form-validation/auto-focus.js'])
@endsection

@section('page-script')
    @vite(['resources/assets/js/hdc/internal/fixedcost.js'])
@endsection

@section('content')


    <h4 class="py-3 mb-4">
        <span class="text-muted fw-light">Quản lý /</span> Chi phí cố định
    </h4>

    <!-- Fixed Cost List Table -->
    <div class="card">
        <div class="card-datatable table-responsive">
            <table class="datatables-fixedcost table table-hover">
                <thead class="border-top">
                    <tr>
                        <th>ID</th>
                        <th>Loại</th>
                        <th>Tên chi phí</th>
                        <th>Chi phí</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Chi tiết bổ sung</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
            </table>
        </div>
        <!-- Offcanvas to add new fixedcost -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddFixedCost"
            aria-labelledby="offcanvasAddFixedCostLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasAddFixedCostLabel" class="offcanvas-title">Thêm chi phí</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body mx-0 flex-grow-0 pt-0 h-100">
                <form class="add-new-fixedcost pt-0" id="addNewFixedCostForm">


                    <div class="mb-3">
                        <label class="form-label" for="fixedcost-type">Loại chi phí</label>
                        <select id="project-client" class="form-select" name="projectClient">
                            <option value="">Chọn phân loại</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="add-fixedcost-name">Tên dự án</label>
                        <input type="text" class="form-control" id="add-fixedcost-name" placeholder="MTXCSX"
                            name="fixedcostName" aria-label="MTXCSX" />
                    </div>


                    <div class="mb-3">
                        <label class="form-label" for="add-fixedcost-cost">Chi phí</label>
                        <input type="text" class="form-control" id="add-fixedcost-cost" placeholder="10,000,000"
                            name="fixedcost" aria-label="Fixed Cost" />
                    </div>



                    <button type="submit" id="submitFormButton"
                        class="btn btn-primary me-sm-3 me-1 data-submit">Tạo</button>
                    <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Huỷ</button>
                </form>
            </div>
        </div>
    </div>
@endsection
