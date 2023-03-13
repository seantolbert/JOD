from rest_framework import serializers
from wagtail.api.v2.serializers import PageSerializer
from .models import BlogPage


class BlogPageSerializer(PageSerializer):
    class Meta:
        model = BlogPage
        fields = (
            # 'date',
            # 'description',
            # 'main_image',
            # 'main_image_excerpt',
            # 'body',
            "__all__"
        )
