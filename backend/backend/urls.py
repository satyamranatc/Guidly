from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('api/roadmap/', include('RoadMap.urls')),
    path('api/auth/', include('UserApp.urls')),
    path('admin/', admin.site.urls),
]
