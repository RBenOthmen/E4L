# Generated by Django 4.0.3 on 2022-04-19 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0019_rename_student_meeting_eleve_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='meeting',
            name='title',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
