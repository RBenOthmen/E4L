# Generated by Django 4.0.3 on 2022-04-20 11:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0020_meeting_title'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meeting',
            old_name='date',
            new_name='start',
        ),
    ]
