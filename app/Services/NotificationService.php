<?php
namespace App\Services;

use App\Models\Notification;

class NotificationService {
    public function sendNotification($userId, $message, $type = 'info') {
        Notification::create([
            'user_id' => $userId,
            'message' => $message,
            'type' => $type,
            'is_read' => 0
        ]);
    }
}
