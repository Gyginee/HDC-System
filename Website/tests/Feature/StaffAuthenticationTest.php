<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Staff;
use Illuminate\Support\Facades\Auth;

class StaffAuthenticationTest extends TestCase
{
    use RefreshDatabase; // To reset the database between tests if necessary

    public function testStaffAuthenticationWithValidCredentials()
    {
        // Attempt to authenticate with valid credentials
        $credentials = [
            'email' => 'admin@hdc.vn',
            'password' => '@123456',
        ];

        $result = Auth::guard('staff')->attempt($credentials);

        $this->assertTrue($result); // Assert that the authentication was successful
    }

    public function testStaffAuthenticationWithInvalidCredentials()
    {
        // Attempt to authenticate with invalid credentials
        $credentials = [
            'email' => 'nonexistent@example.com',
            'password' => 'wrongpassword',
        ];

        $result = Auth::guard('staff')->attempt($credentials);

        $this->assertFalse($result); // Assert that the authentication failed
    }
}
