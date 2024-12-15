<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;
// use Illuminate\Support\;
use Illuminate\Support\Facades\Validator;

trait ApiResponse
{
    protected $response = [
        'status' => 'Error',
        'success' => false,
        'data' => null,
        'errors' => null,
        'message' => null,
        'code' => 401,
    ];

    /**
     * @param $data
     * @param  string|null  $message
     * @param  int  $code
     * @return JsonResponse
     */
    protected function success($data, string $message = null, int $code = 200): JsonResponse
    {
        $this->response['success'] = true;
        $this->response['status'] = 'Success';
        $this->response['data'] = $data;
        $this->response['code'] = $code;

        $this->response['message'] = $message;
        // unset($this->response['errors']);

        return response()->json($this->response, $code);
    }

    /**
     * @param  array|string|null  $message
     * @param  int  $code
     * @param  array|string|null  $data
     * @return JsonResponse
     */
    protected function error(array|string|null $data, array|string|null $message = '', int $code = 400): JsonResponse
    {
        $this->response['data'] = $data;
        $this->response['message'] = $message;
        $this->response['code'] = $code;

        return response()->json($this->response, $code);
        //        return response()->json([
        //            'success' => false,
        //            'code' => $code,
        //            'status' => 'Error',
        //            'message' => $message,
        //            'data' => $data
        //        ], $code);
    }

    protected function requestValidation($request, $rules, $messages = [])
    {
        $request = is_array($request) ? $request : $request->all();
        $validator = Validator::make($request, $rules, $messages);

        $errors = $validator->errors();

        foreach ($rules as $key => $rule) {
            if ($errors->has($key)) {
                $this->response['errors'][$key] = $errors->first($key);
                // $this->response['data'][$key] = $errors->first($key);
            }
        }

        if (! empty($this->response['errors'])) {
            $this->response['message'] = Arr::join($this->response['errors'], ', ', ' dan');

            return response()->json($this->response, 200);
        }
    }

    private function mapPostRelation(array $args, string $type)
    {
        $output = [];
        foreach ($args as $item) {
            $output[] = [intval($item) => ['type' => $type]];
        }

        return $output;
    }

    public function assetUrl($path)
    {
        return asset("") . "assets/" . $path;
    }
}
