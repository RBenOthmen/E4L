# Generated by Django 4.0.3 on 2022-03-09 13:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('category', models.CharField(choices=[('A1', 'A1'), ('A2', 'A2'), ('B1', 'B1'), ('C1', 'B2'), ('C1', 'C1'), ('C2', 'C2')], max_length=2)),
                ('eleve', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lessons', to='dashboard.eleve')),
            ],
        ),
    ]
