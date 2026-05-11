<?php
namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Models\DigilibCategory;

class DigilibCategoryController
{
    public function index(Request $request, Response $response)
    {
        $queryParams = $request->queryParams();
        try {
            $onlyActive = isset($queryParams['active']) && filter_var($queryParams['active'], FILTER_VALIDATE_BOOLEAN);

            $categories = DigilibCategory::all($onlyActive);
            
            if ($categories === false) {
                $response->json(['message' => 'Failed to retrieve digilib categories.'], 500);
            }
            $response->json($categories, 200);
        } catch (\PDOException $e) {
            error_log("Database Error in DigilibCategoryController@index: " . $e->getMessage());
            $response->json(['message' => 'Server error occurred while retrieving digilib categories.'], 500);
        } catch (\Exception $e) {
            error_log("General Error in DigilibCategoryController@index: " . $e->getMessage());
            $response->json(['message' => 'An unexpected error occurred.'], 500);
        }
    }

    public function show(Request $request, Response $response, $params)
    {
        $id = $params['id'] ?? null;

        if (!$id) {
            $response->json(['message' => 'Category ID not found.'], 400);
        }

        try {
            $category = DigilibCategory::find($id);

            if ($category) {
                $response->json($category, 200);
            } else {
                $response->json(['message' => 'Digilib category not found.'], 404);
            }
        } catch (\PDOException $e) {
            error_log("Database Error in DigilibCategoryController@show: " . $e->getMessage());
            $response->json(['message' => 'Server error occurred while retrieving category details.'], 500);
        } catch (\Exception $e) {
            error_log("General Error in DigilibCategoryController@show: " . $e->getMessage());
            $response->json(['message' => 'An unexpected error occurred.'], 500);
        }
    }

    public function store(Request $request, Response $response)
    {
        $requestData = $request->json();

        $requiredFields = ['id', 'name'];
        foreach ($requiredFields as $field) {
            if (empty($requestData[$field])) {
                $response->json(['message' => "Field '{$field}' is required."], 400);
            }
        }

        try {
            $existingCategory = DigilibCategory::find($requestData['id']);
            if ($existingCategory) {
                $response->json(['message' => 'Category ID already exists.'], 409);
            }

            $dataToCreate = [
                'id' => $requestData['id'],
                'name' => $requestData['name'],
                'description' => $requestData['description'] ?? null,
                'icon_class' => $requestData['icon_class'] ?? null,
                'target_page_url' => $requestData['target_page_url'] ?? null,
                'is_external_link' => $requestData['is_external_link'] ?? false,
                'is_active' => $requestData['is_active'] ?? true,
            ];

            $newCategoryId = DigilibCategory::create($dataToCreate);

            if ($newCategoryId) {
                $response->json(['message' => 'Digilib category successfully created!', 'id' => $newCategoryId], 201);
            } else {
                $response->json(['message' => 'Failed to create digilib category.'], 500);
            }
        } catch (\PDOException $e) {
            error_log("Database Error in DigilibCategoryController@store: " . $e->getMessage());
            $response->json(['message' => 'Server error occurred while creating digilib category.'], 500);
        } catch (\Exception $e) {
            error_log("General Error in DigilibCategoryController@store: " . $e->getMessage());
            $response->json(['message' => 'An unexpected error occurred.'], 500);
        }
    }

    public function update(Request $request, Response $response, $params)
    {
        $id = $params['id'] ?? null;
        $requestData = $request->json();

        if (!$id) {
            $response->json(['message' => 'Category ID not found.'], 400);
        }

        if (empty($requestData['name'])) {
            $response->json(['message' => 'Category name is required.'], 400);
        }

        try {
            $category = DigilibCategory::find($id);
            if (!$category) {
                $response->json(['message' => 'Digilib category not found.'], 404);
            }

            $dataToUpdate = [
                'name' => $requestData['name'],
                'description' => $requestData['description'] ?? $category['description'],
                'icon_class' => $requestData['icon_class'] ?? $category['icon_class'],
                'target_page_url' => $requestData['target_page_url'] ?? $category['target_page_url'],
                'is_external_link' => $requestData['is_external_link'] ?? $category['is_external_link'],
                'is_active' => $requestData['is_active'] ?? $category['is_active'],
            ];

            $updated = DigilibCategory::update($id, $dataToUpdate);

            if ($updated) {
                $response->json(['message' => 'Digilib category successfully updated.'], 200);
            } else {
                $response->json(['message' => 'No data changes or failed to update digilib category.'], 400);
            }
        } catch (\PDOException $e) {
            error_log("Database Error in DigilibCategoryController@update: " . $e->getMessage());
            $response->json(['message' => 'Server error occurred while updating digilib category.'], 500);
        } catch (\Exception $e) {
            error_log("General Error in DigilibCategoryController@update: " . $e->getMessage());
            $response->json(['message' => 'An unexpected error occurred.'], 500);
        }
    }

    public function destroy(Request $request, Response $response, $params)
    {
        $id = $params['id'] ?? null;

        if (!$id) {
            $response->json(['message' => 'Category ID not found.'], 400);
        }

        try {
            $deleted = DigilibCategory::delete($id);

            if ($deleted) {
                $response->json(['message' => 'Digilib category successfully deleted.'], 200);
            } else {
                $response->json(['message' => 'Digilib category not found or failed to delete.'], 404);
            }
        } catch (\PDOException $e) {
            error_log("Database Error in DigilibCategoryController@destroy: " . $e->getMessage());
            $response->json(['message' => 'Server error occurred while deleting digilib category.'], 500);
        } catch (\Exception $e) {
            error_log("General Error in DigilibCategoryController@destroy: " . $e->getMessage());
            $response->json(['message' => 'An unexpected error occurred.'], 500);
        }
    }
}
