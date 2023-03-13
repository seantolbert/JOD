from django.db import models
from django.utils import timezone

from wagtail.core.models import Page
from wagtail.core.fields import StreamField
from wagtail.search import index
from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.core import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.api.v2.serializers import StreamField as StreamFieldSerializer
from wagtail.api import APIField

from rest_framework.fields import DateField


class BlogPage(Page):
    date = models.DateField(default=timezone.now, blank=True, null=True)

    description = models.CharField(max_length=300, blank=True, null=True)

    main_image = models.ForeignKey(
        "wagtailimages.Image", null=True, blank=True, on_delete=models.SET_NULL
    )

    main_image_excerpt = models.CharField(
        max_length=500, blank=True, null=True)

    body = StreamField([
        ('image_block', blocks.StructBlock([
            ('image', ImageChooserBlock()),
            ('caption', blocks.CharBlock()),

        ])),
        ('heading', blocks.CharBlock()),
        ("paragraph", blocks.RichTextBlock()),
        ("image", ImageChooserBlock())
    ],
        blank=True,
        null=True,
    )

    api_fields = [
        APIField('date', serializer=DateField(format='%A %d %B %Y')),
        APIField('main_image'),
        APIField('main_image_excerpt'),
        APIField('description'),
        APIField('body'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel("date"),
        FieldPanel("description"),
        FieldPanel("main_image"),
        FieldPanel("main_image_excerpt"),
        StreamFieldPanel("body"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('body', partial_match=True, boost=10),
        index.SearchField('description', partial_match=True, boost=10),
    ]
