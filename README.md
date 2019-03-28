# MovieList

## Deploy

deployment is made with Capistrano. To deploy run : `cap production deploy`

All the config of the app is in the env variables

## Database

The migrations will install some addon in Postgres. The user will need to be superuser in order to do so.

You can do it by running this command `ALTER USER myuser WITH SUPERUSER;` in the postgres cli.

The migrations to install an extension can be made with django and will look like this :

```python
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
```
