<?php

namespace App\Models\Campaigns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class AssetStorage extends Model
{
    protected $appends = ["url"];
    public function getUrlAttribute()
    {
        $storage = env('FILESYSTEM_DISK', 'public');
        if ($storage == 'do_spaces') {
            return env('DO_SPACES_URL') . '/' . $this->path;
        }
        return asset("") . "assets/" . $this->path;
    }
}
