import django_js_reverse.views
from common.routes import routes as common_routes
from common.views import IndexView
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from rest_framework.routers import DefaultRouter
from tasks.routes import routes as tasks_routes
from users.routes import routes as users_routes

router = DefaultRouter()

routes = common_routes + users_routes + tasks_routes
for route in routes:
    router.register(route["regex"], route["viewset"], basename=route["basename"])

urlpatterns = [
    path("", IndexView.as_view(), name="frontend"),
    path("login/", IndexView.as_view(), name="frontend"),
    path("signup/", IndexView.as_view(), name="frontend"),
    path("admin/", admin.site.urls, name="admin"),
    path("api/accounts/", include("authemail.urls")),
    path("admin/defender/", include("defender.urls")),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path("api/", include(router.urls), name="api"),
    # drf-spectacular
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]
