<?php

namespace App\Utils;

class NormalizeString
{
    public static function removeEmoji(string $text): string
    {
        $text = iconv('UTF-8', 'ISO-8859-15//IGNORE', $text);
        $text = preg_replace('/\s+/', ' ', $text);
        return iconv('ISO-8859-15', 'UTF-8', $text);
    }
}
