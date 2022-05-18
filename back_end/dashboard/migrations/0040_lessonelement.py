# Generated by Django 4.0.3 on 2022-05-18 10:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0039_professeur_linkedin'),
    ]

    operations = [
        migrations.CreateModel(
            name='LessonElement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('element', models.CharField(max_length=255)),
                ('lesson', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='dashboard.lesson')),
            ],
        ),
    ]
