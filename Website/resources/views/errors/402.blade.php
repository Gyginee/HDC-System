
@php
    $customizerHidden = 'customizer-hide';
    $configData = Helper::appClasses();
@endphp

@extends('layouts/blankLayout')

@section('title', '402')

@section('page-style')
    <!-- Page -->
    <link rel="stylesheet" href="{{ asset('assets/vendor/css/pages/page-misc.css') }}">
@endsection


@section('content')
    <!-- Error -->
    <div class="container-xxl container-p-y">
        <div class="misc-wrapper">
          <h2 class="mb-1 mt-4">Lỗi 402 | Yêu cầu thanh toán 😶</h2>
          <p class="mb-4 mx-2">Oopss! 😱 Bạn cần thanh toán để truy cập trang này. Vui lòng thực hiện thanh toán trước khi tiếp tục.</p>
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
