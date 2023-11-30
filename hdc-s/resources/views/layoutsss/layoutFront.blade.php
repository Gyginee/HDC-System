@php
$configData = Helper::appClasses();
$isFront = true;
@endphp

@section('layoutContent')

@extends('hdc.layouts/commonMaster' )

@include('hdc.layouts/sections/navbar/navbar-front')

<!-- Sections:Start -->
@yield('content')
<!-- / Sections:End -->

@include('hdc.layouts/sections/footer/footer-front')
@endsection
