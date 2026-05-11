<?php

$router->get('/api/homepage-main-content', 'HomepageSectionController@getHomepageContent');

$router->get('/api/news', 'NewsArticleController@getApprovedNews');

$router->get('/api/activities', 'ActivityController@getApprovedActivities');

$router->get('/api/gallery', 'GalleryController@getApprovedGallery');

$router->post('/api/contact', 'ContactController@submitMessage');

$router->post('/api/logout', 'AuthController@logout');

?>
