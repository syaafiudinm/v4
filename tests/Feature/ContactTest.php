<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ContactTest extends TestCase
{
    public function test_local_whatsapp_number_is_normalized_to_international_format()
    {
        config(['services.whatsapp.number' => '0812-3456-7890']);

        $this->get('/contact')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Contact/Index')
                ->where('whatsappNumber', '6281234567890'));
    }

    public function test_missing_whatsapp_number_is_passed_as_null()
    {
        config(['services.whatsapp.number' => null]);

        $this->get('/contact')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->where('whatsappNumber', null));
    }
}
