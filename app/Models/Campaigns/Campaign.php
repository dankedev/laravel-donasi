<?php

namespace App\Models\Campaigns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Campaign extends Model
{
    use SoftDeletes;

    protected $casts = [
        // "resources" => "json",
        'start_date' => 'datetime:Y-m-d H:i:s',
        'finish_date' => 'datetime:Y-m-d H:i:s'
    ];


    public function featuredImage()
    {
        return  $this->hasOne(AssetStorage::class, "id", "featured_id");
    }

    public function category()
    {
        return $this->belongsTo(Category::class, "category_id", "id");
    }
}
