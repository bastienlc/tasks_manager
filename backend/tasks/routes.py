from .views import TaskViewSet

routes = [
    {"regex": r"tasks", "viewset": TaskViewSet, "basename": "task"},
]
