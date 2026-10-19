<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact/Index', [
            'whatsappNumber' => $this->normalizeNumber(config('services.whatsapp.number')),
        ]);
    }

    /**
     * Convert a local or formatted number (e.g. "0812-3456-7890") into the
     * digits-only international format wa.me expects (e.g. "6281234567890").
     */
    private function normalizeNumber(?string $number): ?string
    {
        $digits = preg_replace('/\D/', '', (string) $number);

        if ($digits === '') {
            return null;
        }

        return str_starts_with($digits, '0') ? '62'.substr($digits, 1) : $digits;
    }
}
