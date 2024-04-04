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
    @vite(['resources/assets/js/hdc/clients/client.js'])
@endsection

@section('content')


    <h4 class="py-3 mb-4">
        <span class="text-muted fw-light">Quản lý /</span> Khách hàng
    </h4>


    <!-- Clients List Table -->
    <div class="card">
        <div class="card-datatable table-responsive">
            <table class="datatables-clients table table-hover">
                <thead class="border-top">
                    <tr>
                        <th>ID</th>
                        <th>Khách hàng</th>
                        <th>Mã số thuế</th>
                        <th>Dự án</th>
                        <th>Tổng chi</th>
                        <th>Doanh thu</th>
                        <th>Thời gian hạch toán</th>
                    </tr>
                </thead>
            </table>
        </div>
        <!-- Offcanvas to add new client -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddClient" aria-labelledby="offcanvasAddClientLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasAddClientLabel" class="offcanvas-title">Thêm khách hàng</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body mx-0 flex-grow-0 pt-0 h-100">
                <form class="add-new-client pt-0" id="addNewClientForm">

                    <div class="mb-3">
                        <label class="form-label" for="add-tax-code">Mã số thuế</label>
                        <input type="text" class="form-control" id="add-tax-code" placeholder="0123456789" name="taxCode"
                            aria-label="" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="add-client-fullname">Tên khách hàng</label>
                        <input type="text" class="form-control" id="add-client-fullname" placeholder=""
                            name="clientFullname" aria-label="" disabled />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="add-client-shortname">Tên viết tắt</label>
                        <input type="text" class="form-control" id="add-client-shortname" placeholder="HD Creative"
                            name="clientShortname" aria-label="" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="add-client-address">Địa chỉ khách hàng</label>
                        <input type="text" class="form-control" id="add-client-address" placeholder=""
                            name="clientAddress" aria-label="" disabled />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="client-address">ĐỊA CHỈ LIÊN HỆ (nếu có)</label>
                        <div class="mb-3">
                            <label class="form-label" for="client-address">Tỉnh/Thành phố</label>
                            <select id="client-province" class="form-select" name="clientProvince">
                                <option value="">Chọn Tỉnh/Thành phố</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="client-address">Quận/Huyện</label>
                            <select id="client-district" class="form-select" name="clientDistrict">
                                <option value="">Chọn Quận/Huyện</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="project-status">Địa chỉ cụ thể</label>
                            <input type="text" class="form-control" id="add-client-diffaddress" placeholder=""
                                name="clientIndustry" aria-label="" />
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="client-contract">Thời hạn hợp đồng</label>
                        <select id="client-contract" class="form-select" name="clientCategory">
                            <option value="30 Ngày">30 Ngày</option>
                            <option value="35 Ngày">35 Ngày</option>
                            <option value="40 Ngày">40 Ngày</option>
                            <option value="45 Ngày">45 Ngày</option>
                            <option value="50 Ngày">50 Ngày</option>
                            <option value="55 Ngày">55 Ngày</option>
                            <option value="60 Ngày">60 Ngày</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="client-category">Phân loại</label>
                        <select id="client-category" class="form-select" name="clientCategory">
                            <option value="">Chọn phân loại</option>
                        </select>
                    </div>

                    <button type="submit" id="submitFormButton"
                        class="btn btn-primary me-sm-3 me-1 data-submit">Tạo</button>
                    <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Huỷ</button>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="clientModal" tabindex="-1" aria-labelledby="clientModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="clientModalLabel">Thông tin khách hàng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">

                                <label for="clientName" class="form-label">Tên khách hàng</label>
                                <input type="text" class="form-control" id="clientName" readonly>

                            </div>
                            <div class="mb-3">
                                <label for="clientShortName" class="form-label">Tên viết tắt</label>
                                <input type="text" class="form-control" id="clientShortName" readonly>
                            </div>
                            <div class="mb-3">
                                <label for="clientAddress" class="form-label">Địa chỉ</label>
                                <input type="text" class="form-control" id="clientAddress" readonly>
                            </div>
                            <div class="mb-3">
                                <label for="clientDiffAddress" class="form-label">Địa chỉ liên hệ</label>
                                <input type="text" class="form-control" id="clientDiffAddress" readonly>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="clientCategory" class="form-label">Phân loại</label>
                                <input type="text" class="form-control" id="clientCategory" readonly>
                            </div>
                            <div class="mb-3">
                                <label for="clientTaxCode" class="form-label">Mã số thuế</label>
                                <input type="text" class="form-control" id="clientTaxCode" readonly>
                            </div>
                            <div class="mb-3">
                                <label for="clientContractDuration" class="form-label">Thời hạn hợp đồng</label>
                                <input type="text" class="form-control" id="clientContractDuration" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type='button' class='btn btn-danger'><i class="ti ti-trash ti-sm mx-2"></i>Xoá khách
                        hàng</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>


@endsection
