<?php

namespace App\Models\Campaigns;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function featuredImage()
    {
        return  $this->hasOne(AssetStorage::class, "id", "featured_id");
    }

    // public function campaigns()
    // {
    //     return $this->hasMany(Campaign::class, "category_id", "id");
    // }
}
