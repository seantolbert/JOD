from rest_framework import generics
from .models import BlogPage
from .serializers import BlogPageSerializer


class BlogPageList(generics.ListAPIView):
    queryset = BlogPage.objects.live().order_by('-date')
    serializer_class = BlogPageSerializer
