from __future__ import unicode_literals
from django.contrib.postgres.operations import UnaccentExtension

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movielistapp', '0013_extension_20190323_1554'),
    ]

    operations = [
        UnaccentExtension()
    ]
