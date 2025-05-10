# todos/models.py
from django.db import models

class Todo(models.Model):
    text = models.CharField(max_length=200)
    is_complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text