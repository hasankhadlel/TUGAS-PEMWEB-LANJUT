<?php

$router->get('/api/homepage-main-content', 'HomepageSectionController@getHomepageContent');

$router->get('/api/news', 'NewsArticleController@getApprovedNews');
$router->get('/api/news/{id}', 'NewsArticleController@show');

$router->get('/api/activities', 'ActivityController@getApprovedActivities');
$router->get('/api/activities/{id}', 'ActivityController@show');

$router->get('/api/gallery', 'GalleryController@getApprovedGallery');
$router->get('/api/gallery/{id}', 'GalleryController@show');

$router->get('/api/digilib/categories', 'DigilibCategoryController@index');
$router->get('/api/digilib/categories/{id}', 'DigilibCategoryController@show');

$router->get('/api/digilib/items', 'DigilibItemController@index');
$router->get('/api/digilib/items/{id}', 'DigilibItemController@show');

$router->get('/api/rayons', 'RayonController@index');
$router->get('/api/rayons/{id}', 'RayonController@show');

$router->get('/api/digital-signatures/verify/{id}', 'DigitalSignatureController@verifyPublic');

$router->post('/api/auth/login', 'AuthController@login');
$router->post('/api/auth/register', 'AuthController@register');
$router->post('/api/auth/forgot-password', 'AuthController@forgotPassword');
$router->post('/api/auth/reset-password', 'AuthController@resetPassword');

$router->post('/api/contact', 'ContactController@submitMessage');

$router->post('/api/logout', 'AuthControllerController@logout');


// Rute yang Memerlukan Autentikasi dan/atau Peran
// Karena Router Anda saat ini tidak memiliki metode 'group',
// Anda perlu menambahkan middleware secara manual di setiap controller
// atau mengimplementasikan metode 'group' di Router.php Anda.

// Contoh rute yang dilindungi (tanpa fungsi group):
// $router->get('/api/users', 'UserController@index');
// $router->put('/api/users/{id}', 'UserController@update');
// $router->post('/api/news', 'NewsArticleController@store');
