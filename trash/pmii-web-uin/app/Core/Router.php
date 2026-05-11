<?php
namespace App\Core;

class Router {
    protected $routes = [];

    public function get($uri, $controllerAction) {
        $this->routes['GET'][$uri] = $controllerAction;
    }

    public function post($uri, $controllerAction) {
        $this->routes['POST'][$uri] = $controllerAction;
    }

    public function dispatch(Request $request, Response $response) {
        $uri = $request->uri();
        $method = $request->method();

        $uri = strtok($uri, '?');

        if (strpos($uri, '/index.php') === 0) {
            $uri = substr($uri, strlen('/index.php'));
        }
        if (empty($uri)) {
            $uri = '/';
        }

        if (array_key_exists($uri, $this->routes[$method] ?? [])) {
            list($controllerName, $methodName) = explode('@', $this->routes[$method][$uri]);
            $controllerClass = "App\\Controllers\\" . $controllerName;

            if (class_exists($controllerClass) && method_exists($controllerClass, $methodName)) {
                $controller = new $controllerClass();
                $controller->$methodName($request, $response);
            } else {
                $response->json(['message' => 'Controller atau metode tidak ditemukan.'], 500);
            }
        } else {
            $response->json(['message' => 'Endpoint tidak ditemukan.'], 404);
        }
    }
}
