# Generated by Django 4.0.3 on 2022-04-25 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0025_meet_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='meet',
            name='username_organizer',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
