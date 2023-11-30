@isset($pageConfigs)
{!! Helper::updatePageConfig($pageConfigs) !!}
@endisset
@php
$configData = Helper::appClasses();
@endphp

@isset($configData["layout"])
@include((( $configData["layout"] === 'horizontal') ? 'hdc.layouts.horizontalLayout' :
(( $configData["layout"] === 'blank') ? 'hdc.layouts.blankLayout' :
(($configData["layout"] === 'front') ? 'hdc.layouts.layoutFront' : 'hdc.layouts.contentNavbarLayout') )))
@endisset
