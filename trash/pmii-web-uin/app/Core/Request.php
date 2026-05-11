<?php
namespace App\Core;

class Request {
    protected $uri;
    protected $method;
    protected $headers;
    protected $body;
    protected $queryParams;

    public function __construct() {
        $this->uri = $_SERVER['REQUEST_URI'];
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->headers = getallheaders();
        $this->queryParams = $_GET;
        $this->body = file_get_contents('php://input');
    }

    public function uri() {
        return $this->uri;
    }

    public function method() {
        return $this->method;
    }

    public function headers() {
        return $this->headers;
    }

    public function body() {
        return $this->body;
    }

    public function json() {
        return json_decode($this->body, true);
    }

    public function queryParams() {
        return $this->queryParams;
    }

    public function query($key, $default = null) {
        return $this->queryParams[$key] ?? $default;
    }
}
