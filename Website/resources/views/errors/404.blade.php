@php
    $customizerHidden = 'customizer-hide';
    $configData = Helper::appClasses();
@endphp

@extends('layouts/blankLayout')

@section('title', '404')

@section('page-style')
    <!-- Page -->
    @vite(['resources/assets/vendor/scss/pages/page-misc.scss'])
@endsection


@section('content')
    <!-- Error -->
    <div class="container-xxl container-p-y">
        <div class="misc-wrapper">
            <h2 class="mb-1 mt-2">Lỗi 404 | Không tìm thấy trang 😶</h2>
            <p class="mb-4 mx-2">Oopss! 😱 Trang bạn đang tìm kiếm không tồn tại trên máy chủ này. Có vẻ như trang đó đã
                "biến mất" hoặc chúng tôi đã "lạc" nó rồi.</p>
            <a href="{{ url('/') }}" class="btn btn-primary mb-4">Trở vể</a>
            <div class="mt-4">
                <img src="{{ asset('assets/img/illustrations/page-misc-under-maintenance.png') }}"
                    alt="page-misc-under-maintenance" width="550" class="img-fluid">
            </div>
        </div>
    </div>
    <div class="container-fluid misc-under-maintenance-bg-wrapper">
        <img src="{{ asset('assets/img/illustrations/bg-shape-image-' . $configData['style'] . '.png') }}"
            alt="page-misc-under-maintenance" data-app-light-img="illustrations/bg-shape-image-light.png"
            data-app-dark-img="illustrations/bg-shape-image-dark.png">
    </div>
    <!-- /Error -->
@endsection
