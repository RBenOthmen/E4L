# Generated by Django 4.0.3 on 2022-04-18 16:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0017_meeting'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meeting',
            name='student',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='dashboard.eleve'),
        ),
        migrations.AlterField(
            model_name='meeting',
            name='teacher',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='dashboard.professeur'),
        ),
    ]
