<?php

namespace App\Http\Controllers;

use App\Models\Campaigns\Campaign;
use App\Traits\ApiResponse;
use App\Traits\UseUploadImage;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AssetStorageController extends Controller
{
    use ApiResponse, UseUploadImage;
    public function upload(Request $request)
    {
        try {
            $rules = [
                'file' => ['required', 'file', 'mimes:jpeg,png,webp,jpg,svg,pdf', 'max:10240'],
                'directory' => ['required',  Rule::in(['articles', 'courses', 'tutorials', 'chapters', 'lessons', 'snippets', "featured"])],

            ];
            $messages = [
                'file.required' => "Gambar gak ada",
                'file.max' => "Maximum file size to upload is 10MB (10240 KB). If you are uploading a photo, try to reduce its resolution to make it under 8MB",
                'file.mimes' => 'File tidak didukung',
                'directory' => 'some variable not accepted',

            ];

            $validate = $this->requestValidation($request, $rules, $messages);
            if ($validate) {
                return $this->error($request->all());
            }

            $document = $this->uploadDoc($request);
            $document["url"] = $this->assetUrl($document->path);

            if ($document && $request->has('parent_id') && $request->get('directory')  === "featured") {
                $content = Campaign::find((int)$request->get('parent_id'));
                $content->featured_id = intval($document->id);
                $content->save();
            }

            // return $this->success($document);
            // return to_route('users.index');
            // return response()->json($document);
            if (request()->inertia()) {
                // return response()->json($document);

                redirect()->back()->with('response_data', $document);
            } else {
                return response()->json($document);
            }
        } catch (\Exception $e) {
            dd($e);
            return $this->error([], $e->getMessage());
        }
    }
}
