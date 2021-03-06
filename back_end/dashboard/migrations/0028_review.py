# Generated by Django 4.0.3 on 2022-04-26 14:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0027_meet_username_recipient'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('rate', models.CharField(choices=[(0, '0'), (1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')], default='0', max_length=1)),
                ('eleve', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='dashboard.eleve')),
                ('professeur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='dashboard.professeur')),
            ],
        ),
    ]
