# Generated by Django 4.0.3 on 2022-03-18 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_remove_user_birth_date_remove_user_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('A', 'Admin'), ('T', 'Teacher'), ('S', 'Student'), ('TM', 'TaskManager')], max_length=2),
        ),
    ]