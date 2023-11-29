<?php

namespace App\Services;

use Illuminate\Support\Facades\Hash;

class Hasher
{
    public static function hashAttribute($model, $attribute) {
        $model->{$attribute} = Hash::make($model->{$attribute});
    }
    
    public static function make(string $value): string
    {
        return Hash::make($value);
    }

    public static function check(string $value, string $hashedValue): bool
    {
        return Hash::check($value, $hashedValue);
    }

    public static function needsRehash(string $hashedValue): bool
    {
        return Hash::needsRehash($hashedValue);
    }

    public static function hashColumn($model, string $column)
    {
        $model->{$column} = self::make($model->{$column});
    }
}
