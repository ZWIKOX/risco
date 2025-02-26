<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'image_url'
    ];
    
    
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

}
    