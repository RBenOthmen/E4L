# Generated by Django 4.0.3 on 2022-04-18 16:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0016_delete_userimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('student', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='dashboard.eleve')),
                ('teacher', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='dashboard.professeur')),
            ],
        ),
    ]