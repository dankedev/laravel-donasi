<?php

namespace App\Traits;

use App\Models\Campaigns\AssetStorage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

trait UseUploadImage
{


    private function uploadDoc(Request $request,)
    {
        $document = new AssetStorage();
        if ($request->has('id')) {
            $document = AssetStorage::find($request->get('id'));
            if ($document) {
                $this->deleteFile($document->file_name);
            } else {
                $document = new AssetStorage();
            }
        }

        $file = $request->file('file');
        $directory =  Str::slug($request->get("directory"));

        $fileName = $request->has('title') && trim($request->has('title')) !== "" ? Str::slug($request->get('title')) : $file->getClientOriginalName();
        $name = Str::slug($fileName) . '.' . $file->getClientOriginalExtension();
        // $file->storeAs($directory, $name);
        $path
            = $file->storePubliclyAs(
                $directory,
                $name
            );
        $document->path = $path;
        $document->mimeType = $file->getMimeType();
        $document->size = $file->getSize();
        $document->save();

        return $document;
    }
}
