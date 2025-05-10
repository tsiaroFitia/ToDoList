# todos/urls.py
from django.urls import path
from .views import TodoListCreate, TodoRetrieveUpdateDestroy

urlpatterns = [
    path('todos/', TodoListCreate.as_view(), name='todo-list'),
    path('todos/<int:pk>/', TodoRetrieveUpdateDestroy.as_view(), name='todo-detail'),
]