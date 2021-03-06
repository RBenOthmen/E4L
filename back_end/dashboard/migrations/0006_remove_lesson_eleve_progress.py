# Generated by Django 4.0.3 on 2022-03-13 08:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0005_alter_lesson_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lesson',
            name='eleve',
        ),
        migrations.CreateModel(
            name='Progress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('progression', models.PositiveIntegerField()),
                ('eleve', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.eleve')),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.lesson')),
            ],
        ),
    ]
