# Generated by Django 4.0.3 on 2022-05-10 17:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0016_alter_user_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Phone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country_code', models.CharField(max_length=255)),
                ('number', models.CharField(max_length=255)),
            ],
        ),
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.phone'),
        ),
    ]