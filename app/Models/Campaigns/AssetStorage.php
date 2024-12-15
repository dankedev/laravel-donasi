<?php

namespace App\Models\Campaigns;

use Illuminate\Database\Eloquent\Model;

class AssetStorage extends Model
{
    protected $appends = ["url"];
    public function getUrlAttribute()
    {

        return asset("") . "assets/" . $this->path;
    }
}
