from wagtail.api.v2.views import PagesAPIViewSet

from .models import BlogPage
from .serializers import BlogPageSerializer

class BlogPostAPIEndpoint(PagesAPIViewSet):
    base_serializer_class = BlogPageSerializer
    queryset = BlogPage.objects.live().public().order_by('-date')
