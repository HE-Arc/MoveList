from __future__ import unicode_literals
from django.contrib.postgres.operations import HStoreExtension, TrigramExtension

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movielistapp', '0012_auto_20190314_1714'),
    ]

    operations = [
        HStoreExtension(),
        TrigramExtension(),
    ]
