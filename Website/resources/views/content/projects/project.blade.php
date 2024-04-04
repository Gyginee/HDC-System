@extends('layouts/layoutMaster')

@section('title', 'Project')

<!-- Vendor Styles -->
@section('vendor-style')
    @vite(['resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.scss', 'resources/assets/vendor/libs/animate-css/animate.scss', 'resources/assets/vendor/libs/sweetalert2/sweetalert2.scss', 'resources/assets/vendor/libs/select2/select2.scss', 'resources/assets/vendor/libs/@form-validation/form-validation.scss'])
@endsection

<!-- Vendor Script -->
@section('vendor-script')
    @vite(['resources/assets/vendor/libs/moment/moment.js', 'resources/assets/vendor/libs/numeral/numeral.js', 'resources/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js', 'resources/assets/vendor/libs/sweetalert2/sweetalert2.js', 'resources/assets/vendor/libs/cleavejs/cleave.js', 'resources/assets/vendor/libs/cleavejs/cleave-phone.js', 'resources/assets/vendor/libs/select2/select2.js', 'resources/assets/vendor/libs/@form-validation/popular.js', 'resources/assets/vendor/libs/@form-validation/bootstrap5.js', 'resources/assets/vendor/libs/@form-validation/auto-focus.js'])
@endsection

@section('page-script')
    @vite(['resources/assets/js/hdc/projects/project.js'])
@endsection

@section('content')
    <h4 class="py-3 mb-4">
        <span class="text-muted fw-light">Quản lý /</span> Dự án
    </h4>


    <!-- Projects List Table -->
    <div class="card">
        <div class="card-header border-bottom">
            <h5 class="card-title mb-3">Lọc</h5>
            <div class="d-flex justify-content-between align-items-center row pb-2 gap-3 gap-md-0">
                <div class="col-md-4 project_status"></div>
            </div>
        </div>
        <div class="card-datatable table-responsive">
            <table class="datatables-projects table table-hover">
                <thead class="border-top">
                    <tr>
                        <th>ID</th>
                        <th>Tên dự án</th>
                        <th class="text-nowrap">Kinh phí</th>
                        <th class="text-nowrap">Chi phí thực tế</th>
                        <th class="text-nowrap">Doanh thu</th>
                        <th>Khách hàng</th>
                        <th>Địa điểm</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
            </table>
        </div>
        <!-- Offcanvas to add new project -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddProject"
            aria-labelledby="offcanvasAddProjectLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasAddProjectLabel" class="offcanvas-title">Thêm dự án</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body mx-0 flex-grow-0 pt-0 h-100">
                <form class="add-new-project pt-0" id="addNewProjectForm">
                    <div class="mb-3">
                        <label class="form-label" for="add-project-name">Tên dự án</label>
                        <input type="text" class="form-control" id="add-project-name" placeholder="MTXCSX"
                            name="projectName" aria-label="MTXCSX" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="project-client">Khách hàng</label>
                        <select id="project-client" class="form-select" name="projectClient">
                            <option value="">Chọn khách hàng</option>
                        </select>
                    </div>

                    <div class="mb-3">
                      <label class="form-label" for="add-project-location">Địa điểm</label>
                      <select id="add-project-location" class="form-select" name="add-project-location">
                          <option value="">Chọn Tỉnh/Thành phố</option>
                      </select>
                  </div>

                    <div class="mb-3">
                        <label class="form-label" for="project-status">Trạng thái</label>
                        <select id="project-status" class="form-select" name="projectStatus">
                            <option value="">Chọn trạng thái</option>
                        </select>
                    </div>

                    <button type="submit" id="submitFormButton"
                        class="btn btn-primary me-sm-3 me-1 data-submit">Tạo</button>
                    <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Huỷ</button>
                </form>
            </div>
        </div>
    </div>

@endsection
