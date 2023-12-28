@php
    $customizerHidden = 'customizer-hide';
    $configData = Helper::appClasses();
@endphp

@extends('layouts/blankLayout')

@section('title', '405')

@section('page-style')
    <!-- Page -->
    <link rel="stylesheet" href="{{ asset('assets/vendor/css/pages/page-misc.css') }}">
@endsection


@section('content')
    <!-- Error -->
    <div class="container-xxl container-p-y">
        <div class="misc-wrapper">
          <h2 class="mb-1 mt-4">Lỗi 405 | Phương thức không được phép 😶</h2>
          <p class="mb-4 mx-2">Xin lỗi, nhưng trang bạn đang cố gắng truy cập không hỗ trợ phương thức này. Phương thức HTTP bạn đã sử dụng không được chấp nhận trên tài nguyên này. Vui lòng kiểm tra lại yêu cầu của bạn.</p>
            <a href="{{ url('/') }}" class="btn btn-primary mb-4">Trở vể</a>
            <div class="mt-4">
                <img src="{{ asset('assets/img/illustrations/page-misc-error.png') }}" alt="page-misc-error" width="225"
                    class="img-fluid">
            </div>
        </div>
    </div>
    <div class="container-fluid misc-bg-wrapper">
        <img src="{{ asset('assets/img/illustrations/bg-shape-image-' . $configData['style'] . '.png') }}" alt="page-misc-error"
            data-app-light-img="illustrations/bg-shape-image-light.png"
            data-app-dark-img="illustrations/bg-shape-image-dark.png">
    </div>
    <!-- /Error -->
@endsection
