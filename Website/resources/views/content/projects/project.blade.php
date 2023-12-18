@extends('layouts/layoutMaster')
@section('title', 'Project')

@section('vendor-style')
<link rel="stylesheet" href="{{asset('assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css')}}" />
<link rel="stylesheet" href="{{asset('assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css')}}" />
<link rel="stylesheet" href="{{asset('assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css')}}" />
<link rel="stylesheet" href="{{asset('assets/vendor/libs/select2/select2.css')}}" />
<link rel="stylesheet" href="{{asset('assets/vendor/libs/@form-validation/umd/styles/index.min.css')}}" />
@endsection

@section('vendor-script')
<script src="{{asset('assets/vendor/libs/moment/moment.js')}}"></script>
<script src="{{asset('assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js')}}"></script>
<script src="{{asset('assets/vendor/libs/select2/select2.js')}}"></script>
<script src="{{asset('assets/vendor/libs/@form-validation/umd/bundle/popular.min.js')}}"></script>
<script src="{{asset('assets/vendor/libs/@form-validation/umd/plugin-bootstrap5/index.min.js')}}"></script>
<script src="{{asset('assets/vendor/libs/@form-validation/umd/plugin-auto-focus/index.min.js')}}"></script>
<script src="{{asset('assets/vendor/libs/cleavejs/cleave.js')}}"></script>
<script src="{{asset('assets/vendor/libs/cleavejs/cleave-phone.js')}}"></script>
@endsection

@section('page-script')
<script src="{{asset('assets/js/app-ecommerce-customer-all.js')}}"></script>
@endsection

@section('content')
<h4 class="py-3 mb-2">
  <span class="text-muted fw-light">Khách hàng</span>
</h4>


<!-- customers List Table -->
<div class="card">

  <div class="card-datatable table-responsive">
    <table class="datatables-customers table border-top">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Khách hàng</th>
          <th class="text-nowrap">Số điện thoại</th>
          <th>Địa chỉ</th>
          <th>Dự án</th>
          <th class="text-nowrap">Tổng dự án</th>
        </tr>
      </thead>
    </table>
  </div>
  <!-- Offcanvas to add new customer -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEcommerceCustomerAdd" aria-labelledby="offcanvasEcommerceCustomerAddLabel">
    <div class="offcanvas-header">
      <h5 id="offcanvasEcommerceCustomerAddLabel" class="offcanvas-title">Thêm khách hàng</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body mx-0 flex-grow-0">
      <form class="ecommerce-customer-add pt-0" id="eCommerceCustomerAddForm" onsubmit="return false">
        <div class="ecommerce-customer-add-basic mb-3">
          <h6 class="mb-3">Basic Information</h6>
          <div class="mb-3">
            <label class="form-label" for="ecommerce-customer-add-name">Tên khách hàng</label>
            <input type="text" class="form-control" id="ecommerce-customer-add-name" placeholder="John Doe" name="customerName" aria-label="John Doe" />
          </div>
          <div class="mb-3">
            <label class="form-label" for="ecommerce-customer-add-email">Email</label>
            <input type="text" id="ecommerce-customer-add-email" class="form-control" placeholder="john.doe@example.com" aria-label="john.doe@example.com" name="customerEmail" />
          </div>
          <div>
            <label class="form-label" for="ecommerce-customer-add-contact">Số điện thoại</label>
            <input type="text" id="ecommerce-customer-add-contact" class="form-control phone-mask" placeholder="+(123) 456-7890" aria-label="+(123) 456-7890" name="customerContact" />
          </div>
        </div>

        <div class="ecommerce-customer-add-shiping mb-3 pt-3">
          <h6 class="mb-3">Địa chỉ khách hàng (nếu có)</h6>
          <div class="mb-3">
            <label class="form-label" for="ecommerce-customer-add-address">Địa chỉ</label>
            <input type="text" id="ecommerce-customer-add-address" class="form-control" placeholder="19F, Pearl Plaza" aria-label="19F, Pearl Plaza" name="customerAddress1" />
          </div>

          <div class="mb-3">
            <label class="form-label" for="ecommerce-customer-add-town">Quận/Huyện</label>
            <input type="text" id="ecommerce-customer-add-town" class="form-control" placeholder="Bình Thạnh" aria-label="Bình Thạnh" name="customerTown" />
          </div>
          <div class="mb-3">
            <label class="form-label" for="ecommerce-customer-add-city">Thành Phố</label>
            <input type="text" id="ecommerce-customer-add-city" class="form-control" placeholder="TP.HCM" aria-label="TP.HCM" name="customerCity" />
          </div>



        </div>

        <div class="d-sm-flex mb-3 pt-3">
          <div class="me-auto mb-2 mb-md-0">
            <h6 class="mb-0">Sử dụng làm địa chỉ nhận văn bản, hoá đơn ?</h6>
            <small class="text-muted">Thông tin chi tiết sẽ được bổ sung sau.</small>
          </div>
          <label class="switch m-auto pe-2">
            <input type="checkbox" class="switch-input" />
            <span class="switch-toggle-slider">
              <span class="switch-on"></span>
              <span class="switch-off"></span>
            </span>
          </label>
        </div>
        <div class="pt-3">
          <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">Thêm</button>
          <button type="reset" class="btn btn-label-danger" data-bs-dismiss="offcanvas">Huỷ</button>
        </div>
      </form>
    </div>
  </div>
</div>
@endsection
